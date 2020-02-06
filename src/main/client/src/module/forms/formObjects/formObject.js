import React from 'react'
import FormDisplay from '../formComponents/FormDisplay'
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
    else if(state.id === "new_object") state.id = uuidv4()

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

  display: function(formState, onError){
    return {
      document: <FormDisplay.Document className="formObject-document"
                    displayProps={formDisplayProps[this.type()](formState).component.formDisplay.document}
                    dataItem={this}
                    onError={onError} >document</FormDisplay.Document>,
      editor:   <FormDisplay.Editor className="formObject-editor"
                    displayProps={formDisplayProps[this.type()](formState).component.formDisplay.editor}
                    dataItem={this}
                    onError={onError} >editor</FormDisplay.Editor>,
      creator:  <FormDisplay.Creator className="formObject-creator"
                    displayProps={formDisplayProps[this.type()](formState).component.formDisplay.creator}
                    dataItem={this}
                    onError={onError} >creator</FormDisplay.Creator>

  }},

  storage: {
    save: {
      label: "Submit",
      key: function(){return `action-creater-save-${this.type()}-${this.id}`},
      action: function(success, failure, confirm){
                let result
                try{
                  if(!confirm || !confirm()) return false
                  result = this.id === "new_object" ? storageActions.createFormObject(this, success, failure)
                    : storageActions.updateFormObject(this, success, failure)

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
                  result  = storageActions.deleteFormObject(this, success, failure)

                  result.error ? failure(result) : success(result)
                } catch(err){ failure(err) }}
    }
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
