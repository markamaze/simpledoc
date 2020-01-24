import React from 'react'
import FormObject from '../components/FormObject'

import store from '../../../store'
import * as storageActions from '../actions'
import * as form from './form'
import * as formSet from './formSet'


const formState = () => store.getState().forms

const formPrototypes = {
  form: form.prototype(formState),
  formSet: formSet.prototype(formState)
}

const formDisplayProps = {
  form: form.displayProps(),
  formSet: formSet.displayProps()
}

const formObjectPrototype = (objectPrototype) => ({
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

  toJSON: function(/*TODO:add failure callback*/){
    let type = this.type()
    if(type === "form") type = "FORMS.FORM"
    else if(type === "formSet") type = "FORMS.FORMSET"
    else

    let objectData = Object.entries(this).filter(entry => entry[0] !== "id")
    return `{
      \"id\":\"${this.id.toString()}\",
      \"type\":\"${type}\",
      \"object_data\": ${JSON.stringify(Object.fromEntries(objectData))}
    }`
  },

  display: function(onError){
    return {
      card:     <FormObject.Card className="formObject-card"
                    displayProps={formDisplayProps[this.type()].component.formObject.card}
                    dataItem={this}
                    onError={onError} />,
      editor:   <FormObject.Editor className="formObject-editor"
                    displayProps={formDisplayProps[this.type()].component.formObject.editor}
                    dataItem={this}
                    onError={onError} />,
      builder:  <FormObject.Builder className="formObject-builder"
                    displayProps={formDisplayProps[this.type()].component.formObject.builder}
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
}f

const formTypeData = type => formDisplayProps[type]

export { formObject, formTypeData }
