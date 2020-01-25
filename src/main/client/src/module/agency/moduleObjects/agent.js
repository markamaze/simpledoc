import React from 'react'
import * as validationTool from './validationTool'


const prototype = agencyState => ({
  type: function(){ return "agent" },
  properties: {
    id: {
      setValue: function(idString){
        if(!this.properties.id.validate(idString)) return false
        this.id = idString

        return true
      },
      validate: id => { return true }
    },
    structuralNode_link_id: {
      setValue: function(linkId){
        if(!this.properties.structuralNode_link_id.validate(linkId)) return false
        this.structuralNode_link_id = linkId

        return true
      },
      validate: linkId => { return true }
    },
    agentTemplate_id: {
      setValue: function(templateId){
        if(!this.properties.agentTemplate_id.validate(templateId)) return false
        this.agentTemplate_id = templateId

        return true
      },
      validate: templateId => { return true }
    },
    assigned_user_id: {
      setValue: function(userId){
        if(!this.properties.assigned_user_id.validate(userId)) return false
        this.assigned_user_id = userId

        return true
      },
      validate: userId => { return true }
    },
    agent_is_active: {
      setValue: function(isActive){
        if(!this.properties.agent_is_active.validate(isActive)) return false
        this.agent_is_active = isActive

        return true
      },
      validate: isActive => { return true }
    },
    agent_dataTag_ids: {
      setValue: function(tagIds){
        if(!this.properties.agent_dataTag_ids.validate(tagIds)) return false
        this.agent_dataTag_ids = tagIds

        return true
      },
      validate: tagIds => { return true }
    }
  },
  typeFunctions: {

  }
})


const displayProps = agencyState => ({
  displayKey: "agent_label",
  component: {
    list: {
      columns: {
        limited: [],
        expanded: []
      }
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
