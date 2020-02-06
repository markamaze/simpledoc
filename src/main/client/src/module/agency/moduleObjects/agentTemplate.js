import React from 'react'
import { agencyObject } from './agencyObject'



const prototype = agencyState => ({
  type: () => "agentTemplate",
  properties: {
    id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.AgentTemplate.id"
        else if(!this.properties.id.validate(id)) throw "invalid property: Agency.AgentTemplate.id"
        else this.id = id
        return true
      },
      getObject: function(){ return this.id },
      validate: (id)=>{ return true }
    },
    agentTemplate_label: {
      setValue: function(label){
        if(label === null || label === undefined) throw "missing required property: Agency.AgentTemplate.agentTemplate_label"
        else if(!this.properties.agentTemplate_label.validate(label)) throw "invalid property: Agency.AgentTemplate.agentTemplate_label"
        else this.agentTemplate_label = label
        return true
      },
      getObject: function(){ return this.agentTemplate_label },
      validate: (label)=>{ return true }
    },
    agentTemplate_dataTag_ids: {
      setValue: function(ids){
        if(ids === null || ids === undefined) this.agentTemplate_dataTag_ids = []
        else if(!this.properties.agentTemplate_dataTag_ids.validate(ids)) throw "invalid required property: Agency.AgentTemplate.agentTemplate_dataTag_ids"
        else this.agentTemplate_dataTag_ids = ids
        return true
      },
      getObject: function(){ return this.agentTemplate_dataTag_ids.map(id => agencyState["dataTag"][id] ) },
      validate: (ids)=>{ return true }
    }
  }
})



const displayProps = agencyState => ({
  displayKey: "agentTemplate_label",
  component: {
    list: {
      columns: {
        limited: [{label: "Template Name", selector: "agentTemplate_label"}],
        expanded: [{label: "Template Name", selector: "agentTemplate_label"}]
      },
      tableData: Object.values(agencyState.agentTemplate),
      listActions: [{label: "New Template", action: () => {
        let newTemplate = agencyObject("agentTemplate", {}, null)
        return newTemplate.display.call(newTemplate, agencyState, error=>{throw new Error(`${error}`)}).builder
      }}],
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
