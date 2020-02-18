import React from 'react'
import * as validationTool from './validationTool'
import { formObject } from './formObject'



const prototype = getFormState => ({
  type: function() { return "submission" },
  properties: {
    id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Forms.Submission.id"
        else if(!this.properties.id.validate(id)) throw "invalid property: Forms.Submission.id"
        else this.id = id
        return true
      },
      getObject: function(){ return this.id },
      validate: id => { return true }
    },
    form_id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Forms.Submission.form_id"
        else if(!this.properties.form_id.validate(id)) throw "invalid property: Forms.Submission.form_id"
        else this.form_id = id
        return true
      },
      getObject: function(){ return this.id },
      validate: id => { return true }
    },
    section_id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Forms.Submission.section_id"
        else if(!this.properties.section_id.validate(id)) throw "invalid property: Forms.Submission.section_id"
        else this.section_id = id
        return true
      },
      getObject: function(){ return this.section_id },
      validate: id => { return true }
    },
    layout_id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Forms.Submission.layout_id"
        else if(!this.properties.layout_id.validate(id)) throw "invalid property: Forms.Submission.layout_id"
        else this.layout_id = id
        return true
      },
      getObject: function(){ return this.layout_id },
      validate: id => { return true }
    },
    element_id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Forms.Submission.element_id"
        else if(!this.properties.element_id.validate(id)) throw "invalid property: Forms.Submission.element_id"
        else this.element_id = id
        return true
      },
      getObject: function(){},
      validate: id => { return true }
    },
    value: {
      setValue: function(val){
        if(val === null || val === undefined) throw "missing required property: Forms.Submission.value"
        else if(!this.properties.value.validate(val)) throw "invalid property: Forms.Submission.value"
        else this.value = val
        return true
      },
      getObject: function(){ return this.value },
      validate: key => { return true }
    },
    submitted_on: {
      setValue: function(timestamp){
        if(timestamp === null || timestamp === undefined) throw "missing required property: Forms.Submission.submitted_on"
        else if(!this.properties.submitted_on.validate(timestamp)) throw "invalid property: Forms.Submission.submitted_on"
        else this.submitted_on = timestamp
        return true
      },
      getObject: function(){},
      validate: timestamp => { return true }
    },
    submitted_by: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Forms.Submission.submitted_by"
        else if(!this.properties.submitted_by.validate(id)) throw "invalid property: Forms.Submission.submitted_by"
        else this.submitted_by = id
        return true
      },
      getObject: function(){},
      validate: id => { return true }
    }
  },
  display: {
    document: submission => {},
    editor: submission => {},
    creator: submission => {}
  },
  typeFunctions: {}
})


const displayProps = getFormState => ({
  displayKey: "",
  component: {}
})


export { prototype, displayProps }
