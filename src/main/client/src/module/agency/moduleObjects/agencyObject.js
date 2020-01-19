import React from 'react'
import AgencyObject from '../moduleComponents/AgencyObject'

import { userPrototype } from './user'
import { dataTagPrototype } from './dataTag'
import { structuralNodePrototype } from './structuralNode'
import { agentTemplatePrototype } from './agentTemplate'
import { agentPrototype } from './agent'

import { externalActions } from '../index'
import { createAgencyObject, updateAgencyObject, deleteAgencyObject } from '../module_actions'



const storageActions = {
  createAgencyObject,
  updateAgencyObject,
  deleteAgencyObject
}

const importedActions = { externalActions }

const agencyPrototypes = {
  user: userPrototype(storageActions, importedActions),
  dataTag: dataTagPrototype(storageActions, importedActions),
  structuralNode: structuralNodePrototype(storageActions, importedActions),
  agentTemplate: agentTemplatePrototype(storageActions, importedActions),
  agent: agentPrototype(storageActions, importedActions)
}


const agencyObjectPrototype = (objectPrototype) => ({
  ...objectPrototype,

  init: function(state, onError) {
    try{
    let success = true, index = 0
    let propObjects = Object.entries(objectPrototype.properties)

    if(state === null || state === undefined) success = false

    while(success && index < propObjects.length){
      let property = propObjects[index]
      let key = property[0]

      if(!property[1].setValue.call(this, state[key])) success = false
      ++index
    }


    return success ? this : false
  }catch(error){onError(error)}
  },

  update: function(newState, onError){
    try{let success = true

    //check that each property is valid
    Object.entries(newState).forEach( ([key, value]) => {
      if(!objectPrototype.properties[key].validate.call(this, value)) success = false
    })

    //if all valid, set values
    if(success)
      Object.entries(newState).map( property => {
        let key = property[0]
        let value = property[1]
        if(!objectPrototype.properties[key].setValue.call(this, value)) success = false
      })

    return success ? this : false}catch(error){ onError(error) }
  },

  toJSON: function(){
    let type = this.type()
    if(type === "agent") type = "AGENCY.USER"
    else if(type === "agentTemplate") type = "AGENCY.AGENTTEMPLATE"
    else if(type === "structuralNode") type = "AGENCY.STRUCTURALNODE"
    else if(type === "dataTag") type = "AGENCY.DATATAG"
    else if(type === "user") type = "AGENCY.USER"

    let objectData = Object.entries(this).filter(entry => entry[0] !== "id")
    return `{
      \"id\":\"${this.id.toString()}\",
      \"type\":\"${type}\",
      \"object_data\": ${JSON.stringify(Object.fromEntries(objectData))}
    }`
  },

  display: function(props, onError){
    return {
      card: <AgencyObject.Card {...props} className="agencyObject-card"
                displayProps={this.displayProps.card}
                dataItem={this}
                onError={onError} />,
      editor: <AgencyObject.Editor {...props}
                  displayProps={this.displayProps.editor}
                  dataItem={this}
                  onError={onError} />,
      builder: <AgencyObject.Builder {...props}
                    displayProps={this.displayProps.builder}
                    dataItem={this}
                    onError={onError} />
    }}
})


export const agencyObject = (type, state, failure) => {
  try {
    let _agencyObj = Object.create(agencyObjectPrototype(agencyPrototypes[type]))
    _agencyObj.init(state, failure)

    return _agencyObj
  } catch(error){ failure(new Error(`${error}: failure to create agencyObject`)) }
}
