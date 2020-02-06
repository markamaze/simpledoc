import React from 'react'
import uuidv4 from 'uuid/v4'
import { agencyObject } from './agencyObject'



const prototype = agencyState => ({
  type: () => "agent",
  properties: {
    id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.Agent.id"
        else if(!this.properties.id.validate(id)) throw "invalid property: Agency.Agent.id"
        else this.id = id
        return true
      },
      getObject: function(){ return this.id},
      validate: id => { return true }
    },
    agent_user_id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.Agent.agent_user_id"
        else if(!this.properties.agent_user_id.validate(id)) throw "invalid property: Agency.Agent.agent_user_id"
        else this.agent_user_id = id
        return true
      },
      getObject: function(){ return agencyState["user"][this.agent_user_id] },
      validate: id => { return true }
    },
    structuralNode_id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.Agent.structuralNode_id"
        else if(!this.properties.structuralNode_id.validate(id)) throw "invalid property: Agency.Agent.structuralNode_id"
        else this.structuralNode_id = id
        return true
      },
      getObject: function(){ return agencyState["structuralNode"][this.structuralNode_id] },
      validate: ()=>{ return true }
    },
    assignment_id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.Agent.assignment_id"
        else if(!this.properties.assignment_id.validate(id)) throw "invalid property: Agency.Agent.assignment_id"
        else this.assignment_id = id
        return true
      },
      getObject: function(){ return agencyState["assignment"][this.assignment_id] },
      validate: ()=>{ return true }
    },
    property_values: {
      setValue: function(values){
        if(values === null || values === undefined) this.property_values = {}
        else if(!this.properties.property_values.validate(values)) throw "invalid property: Agency.Agent.property_values"
        else this.property_values = values
        return true
      },
      getObject: function(){ return agencyState["property"][this.property_values] },
      validate: ()=>{ return true }
    },
    active_role: {
      setValue: function(role){
        if(role === null || role === undefined) this.active_role = {}
        else if(!this.properties.active_role.validate(role)) throw "invalid property: Agency.Agent.active_role"
        else this.active_role = role
        return true
      },
      getObject: function(){ return agencyState["role"][this.active_role] },
      validate: ()=>{ return true }
    }
  }
})


const displayProps = agencyState => ({
  displayKey: "",
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
