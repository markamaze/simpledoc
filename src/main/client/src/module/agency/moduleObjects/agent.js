import React from 'react'
import {moduleObjectPrototype} from './moduleObjectPrototype'


const agentPrototype = {
  properties: {
    id: {
      setValue: function(idString){
        if(!agentPrototype.properties.id.validate(idString)) return false
        this.id = idString

        return true
      },
      validate: id => { return true }
    },
    structuralNode_link_id: {
      setValue: function(linkId){
        if(!agentPrototype.properties.structuralNode_link_id.validate(linkId)) return false
        this.structuralNode_link_id = linkId

        return true
      },
      validate: linkId => { return true }
    },
    agentTemplate_id: {
      setValue: function(templateId){
        if(!agentPrototype.properties.agentTemplate_id.validate(templateId)) return false
        this.agentTemplate_id = templateId

        return true
      },
      validate: templateId => { return true }
    },
    assigned_user_id: {
      setValue: function(userId){
        if(!agentPrototype.properties.assigned_user_id.validate(userId)) return false
        this.assigned_user_id = userId

        return true
      },
      validate: userId => { return true }
    },
    agent_is_active: {
      setValue: function(isActive){
        if(!agentPrototype.properties.agent_is_active.validate(isActive)) return false
        this.agent_is_active = isActive

        return true
      },
      validate: isActive => { return true }
    },
    agent_dataTag_ids: {
      setValue: function(tagIds){
        if(!agentPrototype.properties.agent_dataTag_ids.validate(tagIds)) return false
        this.agent_dataTag_ids = tagIds

        return true
      },
      validate: tagIds => { return true }
    }
  },

  displayProps: {
    builder: {},
    editor: {},
    card: {
      header: dataItem => `Agent: ${dataItem.agent_label}`,
      assignments: {},
      properties: {},
      agencyObjectData: {},
      roleData: {},
      tagData: {}
    }
  },

  typeFunctions: {}
}


export const agent = state => {
  let agent = Object.create(moduleObjectPrototype("agent", agentPrototype))
  agent.init(state)
  return agent
}
