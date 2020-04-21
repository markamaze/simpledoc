import React from 'react'
import uuidv4 from 'uuid/v4'


import store from '../../../store'
import * as storageActions from '../actions'
import * as form from './form'
import * as section from './section'
import * as layout from './layout'
import * as element from './element'
import * as formSet from './formSet'
import * as submission from './submission'

const getFormState = () => store.getState().forms

const formPrototypes = {
  form: form.prototype(getFormState),
  section: section.prototype(getFormState),
  layout: layout.prototype(getFormState),
  element: element.prototype(getFormState),
  formSet: formSet.prototype(getFormState),
  submissions: submission.prototype(getFormState)
}

const formDisplayProps = {
  form: formState => form.displayProps(formState),
  formSet: formState => formSet.displayProps(formState),
  submission: formState => submission.displayProps(formState)
}

const formObjectPrototype = (objectPrototype) => ({
  ...objectPrototype,

  init: function(state, onError) {
    try{
    let success = true, index = 0
    let propObjects = Object.entries(objectPrototype.properties)

    if(state === null || state === undefined) success = false
    else if(state.id === "new_object") state.id = `n-${uuidv4()}`

    while(success && index < propObjects.length){
      let property = propObjects[index]
      let key = property[0]

      if(!property[1].setValue.call(this, state[key])) success = false
      ++index
    }


    return success ? this : false
  }catch(error){onError(error)}
  },

  // update: function(newState, onError){
  //   try{let success = true
  //
  //   //check that each property is valid
  //   Object.entries(newState).forEach( ([key, value]) => {
  //     if(!objectPrototype.properties[key].validate.call(this, value)) success = false
  //   })
  //
  //   //if all valid, set values
  //   if(success)
  //     Object.entries(newState).map( property => {
  //       let key = property[0]
  //       let value = property[1]
  //       if(!objectPrototype.properties[key].setValue.call(this, value)) success = false
  //     })
  //
  //   return success ? this : false}catch(error){ onError(error) }
  // },

  toJSON: function(/*TODO:add failure callback*/){
    let type = this.type()
    if(type === "form") type = "FORMS.FORM"
    else if(type === "formSet") type = "FORMS.FORMSET"
    else if(type === "submission") type = "FORMS.SUBMISSION"
    else if(type === "section") type = "FORMS.SECTION"
    else if(type === "layout") type = "FORMS.LAYOUT"
    else if(type === "element") type = "FORMS.ELEMENT"
    else throw "invalid formObject"

    let objectData = Object.entries(this).filter(entry => entry[0] !== "id")
    return `{
      \"id\":\"${this.id.toString()}\",
      \"type\":\"${type}\",
      \"object_data\": ${JSON.stringify(Object.fromEntries(objectData))}
    }`
  },

  storage: {
    handlers: function(success, failure){
      return  <div className="storage-handlers d-flex flex-row justify-content-around btn-group p-2" key={`storage-handlers-${this.id}`}>
                <div className="storage-handler-item btn-primary px-4"
                      key={this.storage.save.key.call(this)}
                      onClick={()=>this.storage.save.action.call(this, success, failure)}>{this.storage.save.label}</div>
                <div className="storage-handler-item btn-danger px-4"
                      key={this.storage.delete.key.call(this)}
                      onClick={()=>this.storage.delete.action.call(this, success, failure)}>{this.storage.delete.label}</div>
              </div>
    },
    save: {
      label: "Submit",
      key: function(){return `action-creater-save-${this.type()}-${this.id}`},
      action: function(success, failure){
                try{
                  let objectSet = this.typeFunctions.flatten(this)
                  let isNew = this.id.substring(0,2) === 'n-'
                  // if(this.new_object) {
                  //   objectSet = [...this.new_object]
                  //   delete this.new_object
                  //   objectSet = [this, ...objectSet]
                  // }
                  // else objectSet = [this]


                  let result = isNew ?
                    storageActions.createFormObjects(objectSet, success, failure)
                    : storageActions.updateFormObjects(objectSet, success, failure)

                } catch(err){ failure(err) }}
    },
    delete: {
      label: "Delete",
      key: function(){return `action-creater-delete-${this.type()}-${this.id}`},
      action: function(success, failure){
                let result
                try{
                  result = removeFormObjects(this.typeFunctions.flatten(this), success, failure)

                  return result && result.error ? failure(result) : true
                } catch(err){ failure(err) }}
    }
  },

  tools: {
    ...objectPrototype.tools

  },

  settings: {
    ...objectPrototype.settings,
    completion: {}
  }
})

const formObject = (type, state, failure) => {
  try {
    let _formObj = Object.create(formObjectPrototype(formPrototypes[type]))
    _formObj.init(state, failure)

    return _formObj
  } catch(error){ failure(new Error(`${error}: failure to create formObject`)) }
}

const formTypeData = (type, formState) => formDisplayProps[type](formState)

export { formObject, formTypeData }
