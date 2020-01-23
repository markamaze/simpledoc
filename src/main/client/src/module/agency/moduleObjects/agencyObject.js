import React from 'react'
import AgencyObject from '../moduleComponents/AgencyObject'

import store from '../../../store' //modify setup to import from agency index
import { createAgencyObject, updateAgencyObject, deleteAgencyObject }  from '../module_actions'

import * as user from './user'
import * as dataTag from './dataTag'
import * as structuralNode from './structuralNode'
import * as agentTemplate from './agentTemplate'
import * as agent from './agent'



const agencyState = () => store.getState().agency

const agencyPrototypes = {
  user: user.prototype(agencyState),
  dataTag: dataTag.prototype(agencyState),
  structuralNode: structuralNode.prototype(agencyState),
  agentTemplate: agentTemplate.prototype(agencyState),
  agent: agent.prototype(agencyState)
}

const agencyDisplayProps = {
  user: user.displayProps(),
  dataTag: dataTag.displayProps(),
  structuralNode: structuralNode.displayProps(),
  agentTemplate: agentTemplate.displayProps(),
  agent: agent.displayProps()
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
      card:     <AgencyObject.Card className="agencyObject-card"
                    displayProps={agencyDisplayProps[this.type()].component.agencyObject.card}
                    dataItem={this}
                    onError={onError} />,
      editor:   <AgencyObject.Editor className="agencyObject-editor"
                    displayProps={agencyDisplayProps[this.type()].component.agencyObject.editor}
                    dataItem={this}
                    onError={onError} />,
      builder:  <AgencyObject.Builder className="agencyObject-builder"
                    displayProps={agencyDisplayProps[this.type()].component.agencyObject.builder}
                    dataItem={this}
                    onError={onError} />
    }},

  storage: {
    save: {
      label: "Submit",
      key: function(){return `action-creater-save-${this.type()}-${this.id}`},
      action: function(success, failure, confirm){
                let result
                try{
                  if(!confirm || !confirm()) return false
                  result = this.id === "new_object" ? storageActions.createAgencyObject(this, success, failure)
                    : storageActions.updateAgencyObject(this, success, failure)

                  result.error ? failure(result) : success(result)
                } catch(err){ failure(err) }}
    },
    delete: {
      label: "Delete",
      key: function(){return `action-creater-delete-${this.type()}-${this.id}`},
      action: function(success, failure, confirm){
                let result
                try{
                  if(!confirm || !confirm()) return false
                  result  = storageActions.deleteAgencyObject(this, success, failure)

                  result.error ? failure(result) : success(result)
                } catch(err){ failure(err) }}
    }
  }
})

const agencyObject = (type, state, failure) => {
  try {
    let _agencyObj = Object.create(agencyObjectPrototype(agencyPrototypes[type]))
    _agencyObj.init(state, failure)

    return _agencyObj
  } catch(error){ failure(new Error(`${error}: failure to create agencyObject`)) }
}


const agencyTypeData = type => agencyDisplayProps[type]


export { agencyObject, agencyTypeData }
