import React from 'react'
import * as validationTool from './validationTool'
import { formObject } from './formObject'


const prototype = getFormState => ({
  type: function() { return "form" },
  properties: {
    id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Forms.Form.id"
        else if(!this.properties.id.validate(id)) throw "invalid property: Forms.Form.id"
        else this.id = id
        return true
      },
      validate: id => { return true }
    },
    label: {
      setValue: function(label){
        if(label === null || label === undefined) throw "missing required property: Forms.Form.label"
        else if(!this.properties.label.validate(label)) throw "invalid property: Forms.Form.label"
        else this.label = label
        return true
      },
      validate: label => { return true }
    },
    section_ids: {
      setValue: function(section_ids){
        if(section_ids === null || section_ids === undefined) this.section_ids = []
        else if(!this.properties.section_ids.validate(section_ids)) throw "invalid property: Forms.Form.section_ids"
        else this.section_ids = section_ids
        return true
      },
      validate: ids => { return true }
    },
    completion_rules: {
      setValue: function(completionRules){
        if(completionRules === null || completionRules === undefined) this.completion_rules = {}
        else if(!this.properties.completion_rules.validate(completionRules)) throw "invalid property: Forms.Form.completion_rules"
        else this.completion_rules = completionRules
        return true
      },
      validate: rules => { return true }
    },
    security_settings: {
      setValue: function(securitySettings){
        if(securitySettings === null || securitySettings === undefined) this.security_settings = {}
        else if(!this.properties.security_settings.validate(securitySettings)) throw "invalid property: Forms.Form.security_settings"
        else this.security_settings = securitySettings
        return true
      },
      validate: settings => { return true }
    }
  },
  typeFunctions: {
    formSections: function(){
      let formStore = getFormState()
      return this.section_ids.map(id => formStore['section'][id]).map(section => section.loadSection())
    }
  }
})


const displayProps = formState => ({
  displayKey: "label",
  component: {
    list: {
      columns: {
        limited: [{label: "Form Title", selector: "label"}],
        expanded: [{label: "Form Title", selector: "label"}]
      },
      tableData: Object.values(formState.form),
      listActions: [
        { label: "create form", action: () => {
            let newForm = formObject("form", {id: "new_object", label: "new form"}, error => console.log(error))
            return newForm.display.call(newForm, formState, error => console.log(error)).creator
        }}
      ],
      drawerComponents: [
        {label: "show form", component: item => item.display.call(item, formState, err=>{throw err}).document}
      ],
      overlayComponents: [
        {label: "editor", component: item => item.display.call(item, formState, err=>{throw err}).editor},
        {label: "creator", component: item => item.display.call(item, formState, err=>{throw err}).creator}
      ]
    },
    formDisplay: {
      document: {
        formInfo: form => { console.log(form) },
        sections: form => { console.log(form) },
        layouts: section => { console.log(section)},
        elements: layout => { console.log(layout) },
        completionRules: form => { console.log(form) },
        securityRules: form => { console.log(form) }
      },
      editor: {
        formInfo: form => { console.log(form) },
        sections: form => { console.log(form) },
        layouts: section => { console.log(section)},
        elements: layout => { console.log(layout) },
        completionRules: form => { console.log(form) },
        securityRules: form => { console.log(form) }
      },
      creator: {
        formInfo: form => { console.log(form) },
        sections: form => { console.log(form) },
        layouts: section => { console.log(section)},
        elements: layout => { console.log(layout) },
        completionRules: form => { console.log(form) },
        securityRules: form => { console.log(form) }
      }
    }
  }
})


export { prototype, displayProps }
