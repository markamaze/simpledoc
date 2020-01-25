import React from 'react'
import * as validationTool from './validationTool'



const prototype = agencyState => ({
  type: function(){ return "agentTemplate" },
  properties: {
    id: {
      setValue: function(id){
        if(!id) throw `Missing required AGENTTEMPLATE property: id`
        else if(!this.properties.id.validate(id)) throw `Invalid AGENTTEMPLATE property: id -> ${id}`
        else this.id = id
        return true
      },
      validate: id => {
        if(id === "new_object" && typeof this === "undefined") return true
        else if(validationTool.id(id)) return true
        else return false
      }
    },
    agentTemplate_label: {
      setValue: function(label){
        if(!label && this.id === "new_object") this.agentTemplate_label = "new agentTemplate"
        else if(!label) throw `Mising required AGENTTEMPLATE property: agentTemplate label`
        else if(!this.properties.agentTemplate_label.validate(label)) throw `Invalid AGENTTEMPLATE property: label -> ${label}`
        else this.agentTemplate_label = label
        return true
      },
      validate: label => {
        if(validationTool.string(label, {noSpaces: false, minLength: 1, maxLength: 48})) return true
        return false
      }
    },
    agentTemplate_security: {
      setValue: function(security){
        if(!security) this.agentTemplate_security = "0000"
        else if(!this.properties.agentTemplate_security.validate(security)) throw `Invalid AGENTTEMPLATE property: agentTemplate security -> ${security}`
        else this.agentTemplate_security = security
        return true
      },
      validate: security => {
        if(validationTool.string(security, {noSpaces: true, minLength: 4, maxLength: 4})) return true
        return false
      }
    },
    agentTemplate_dataTag_ids: {
      setValue: function(tagIds){
        if(!tagIds) this.agentTemplate_dataTag_ids = []
        else if(!this.properties.agentTemplate_dataTag_ids.validate(tagIds)) throw `Invalid AGENTTEMPLATE property: dataTag id set`
        else this.agentTemplate_dataTag_ids = tagIds
        return true
      },
      validate: tagIds => {
        // TODO: finisih validating dataTag id set
        return true
      }
    },
    agentTemplate_properties: {
      setValue: function(templateProperties){
        if(!templateProperties) this.agentTemplate_properties = []
        else if(!this.properties.agentTemplate_properties.validate(templateProperties)) throw `Invalid AGENTTEMPLATE property: properties set -> ${templateProperties}`
        else this.agentTemplate_properties = templateProperties
        return true
      },
      validate: templateProperties => {
        // TODO: finish balidating properties set
        return true
      }
    }
  },
  typeFunctions: {}
})



const displayProps = agencyState => ({
  displayKey: "agentTemplate_label",
  component: {
    list: {
      columns: {
        limited: [{label: "Template Name", selector: "agentTemplate_label"}],
        expanded: [{label: "Template Name", selector: "agentTemplate_label"}]
      },
      tableData: agencyState.agentTemplates,
      listActions: [{label: "New Template", action: ()=> console.log("fire action to create agentTemplate")}],
      drawerComponents: [
        {label: "card", component: item => item.display.call(item, agencyState, err=>{throw err}).card}
      ],
      overlayComponents: [
        {label: "editor", component: item => item.display.call(item, agencyState, error=>{throw error}).editor},
        {label: "builder", component: item => item.display.call(item, agencyState, error=>{throw error}).builder}
      ]
    },
    agencyObject: {
      card: {
        objectData: {},
        properties: {},
        tags: {},
        assignments: {},
        roles: {}
      },
      editor: {
        objectData: {},
        properties: {},
        tags: {},
        assignments: {},
        roles: {}
      },
      builder: {
        objectData: {},
        properties: {},
        tags: {},
        assignments: {},
        roles: {}
      }
    }
  }
})


export { prototype, displayProps }
