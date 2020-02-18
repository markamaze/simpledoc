import React from 'react'
import * as validationTool from './validationTool'
import { formObject } from './formObject'



const prototype = getFormState => ({
  type: function() { return "element"; },
  properties: {
    id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Forms.Element.id"
        else if(!this.properties.id.validate(id)) throw "invalid property: Forms.Element.id"
        else this.id = id
        return true
      },
      getObject: function(){ return this.id },
      validate: id => { return true }
    },
    form_id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Forms.Element.form_id"
        else if(!this.properties.form_id.validate(id)) throw "invalid property: Forms.Element.form_id"
        else this.form_id = id
        return true
      },
      getObject: function(){ return this.id },
      validate: id => { return true }
    },
    section_id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Forms.Element.section_id"
        else if(!this.properties.section_id.validate(id)) throw "invalid property: Forms.Element.section_id"
        else this.section_id = id
        return true
      },
      getObject: function(){ return this.section_id },
      validate: id => { return true }
    },
    layout_id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Forms.Element.layout_id"
        else if(!this.properties.layout_id.validate(id)) throw "invalid property: Forms.Element.layout_id"
        else this.layout_id = id
        return true
      },
      getObject: function(){ return this.layout_id },
      validate: id => { return true }
    },
    key: {
      setValue: function(key){
        if(key === null || key === undefined) throw "missing required property: Forms.Element.key"
        else if(!this.properties.key.validate(key)) throw "invalid property: Forms.Element.key"
        else this.key = key
        return true
      },
      getObject: function(){ return this.key },
      validate: key => { return true }
    },
    value_properties: {
      setValue: function(valueProperties){
        if(valueProperties === null || valueProperties === undefined) throw "missing required property: Forms.Element.value_properties"
        else if(!this.properties.value_properties.validate(valueProperties)) throw "invalid property: Forms.Element.value_properties"
        else this.value_properties = valueProperties
        return true
      },
      getObject: function(){ return this.value_properties },
      validate: props => { return true }
    },
    completion_rules: {
      setValue: function(completionRules){
        if(completionRules === null || completionRules === undefined) this.completion_rules = {}
        else if(!this.properties.completion_rules.validate(completionRules)) throw "invalid property: Forms.Element.completion_rules"
        else this.completion_rules = completionRules
        return true
      },
      validate: rules => { return true }
    },
    security_settings: {
      setValue: function(securitySettings){
        if(securitySettings === null || securitySettings === undefined) this.security_settings = {}
        else if(!this.properties.security_settings.validate(securitySettings)) throw "invalid property: Forms.Element.security_settings"
        else this.security_settings = securitySettings
        return true
      },
      validate: settings => { return true }
    }
  },
  display: {
    document: element => {},
    editor: element => {},
    creator: element => {}
  },
  typeFunctions: {}
})


const displayProps = getFormState => ({
  displayKey: "",
  component: {}
})


export { prototype, displayProps }
