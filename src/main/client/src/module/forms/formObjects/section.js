import React from 'react'
import * as validationTool from './validationTool'
import { formObject } from './formObject'



const prototype = getFormState => ({
  type: function() { return "section"; },
  properties: {
    id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Forms.Section.id"
        else if(!this.properties.id.validate(id)) throw "invalid property: Forms.Section.id"
        else this.id = id
        return true
      },
      getObject: function(){ return this.id },
      validate: id => { return true }
    },
    label: {
      setValue: function(label){
        if(label === null || label === undefined) throw "missing required property: Forms.Section.label"
        else if(!this.properties.label.validate(label)) throw "invalid property: Forms.Section.label"
        else this.label = label
        return true
      },
      getObject: function(){ return this.label },
      validate: label => { return true }
    },
    form_id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Forms.Section.form_id"
        else if(!this.properties.form_id.validate(id)) throw "invalid property: Forms.Section.form_id"
        else this.form_id = id
        return true
      },
      getObject: function(){ return this.id },
      validate: id => { return true }
    },
    layout_ids: {
      setValue: function(ids){
        if(ids === null || ids === undefined) this.layout_ids = []
        else if(!this.properties.layout_ids.validate(ids)) throw "invalid property: Forms.Section.layout_ids"
        else this.layout_ids = ids
        return true
      },
      getObject: function(){},
      validate: ids => { return true }
    },
    completion_rules: {
      setValue: function(completionRules){
        if(completionRules === null || completionRules === undefined) this.completion_rules = {}
        else if(!this.properties.completion_rules.validate(completionRules)) throw "invalid property: Forms.Section.completion_rules"
        else this.completion_rules = completionRules
        return true
      },
      validate: rules => { return true }
    },
    security_settings: {
      setValue: function(securitySettings){
        if(securitySettings === null || securitySettings === undefined) this.security_settings = {}
        else if(!this.properties.security_settings.validate(securitySettings)) throw "invalid property: Forms.Section.security_settings"
        else this.security_settings = securitySettings
        return true
      },
      validate: settings => { return true }
    }
  },
  typeFunctions: {}
})


const displayProps = getFormState => ({
  displayKey: "",
  component: {}
})


export { prototype, displayProps }
