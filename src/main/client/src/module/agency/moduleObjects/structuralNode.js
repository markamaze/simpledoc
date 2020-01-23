import React from 'react'
import * as validationTool from './validationTool'


const prototype = agencyState => ({
  type: function(){ return "structuralNode" },
  properties: {
    id: {
      setValue: function(id){
        if(!id) throw `Missing required STRUCTURALNODE property: id`
        else if(!this.properties.id.validate(id)) throw `Invalid STRUCTURALNODE property: id -> ${id}`
        else this.id = id
        return true
      },
      validate: id => {
        if(id === "new_object" && typeof this === "undefined") return true
        else if(validationTool.id(id)) return true
        else return false
      }
    },
    structuralNode_label: {
      setValue: function(label){
        if(!label && this.id === "new_object") this.structuralNode_label = "new structuralNode"
        else if(!label) throw `Missing required STRUCTURALNODE property: structuralNode label`
        else if(!this.properties.structuralNode_label.validate(label)) throw `Invalid STRUCTURALNODE property: structuralNode label -> ${label}`
        else this.structuralNode_label = label
        return true
      },
      validate: label => {
        if(validationTool.string(label, {noSpaces: false, minLength: 1, maxLength: 48})) return true
        return false
      }
    },
    structuralNode_parent_id: {
      setValue: function(parentId){
        if(!parentId && this.id === "new_object") this.structuralNode_parent_id = ""
        else if(!parentId) throw `Missing required STRUCTURALNODE property: parentId`
        else if(!this.properties.structuralNode_parent_id.validate(parentId)) throw `Invalid STRUCTURALNODE property: parentId -> ${parentId}`
        else this.structuralNode_parent_id = parentId
        return true
      },
      validate: parentId => {
        if(validationTool.id(parentId))
          if(true) return true //TODO: replace conditional with a check that the parentId is an existing structural node
        return false
      }
    },
    structuralNode_supervisor_assignment: {
      setValue: function(supervisorAssignment){
        if(!supervisorAssignment && this.id === "new_object") this.structuralNode_supervisor_assignment = ""

        //don't require at the moment for compiling
        // else if(!supervisorAssignment) throw new Error(`Missing required STRUCTURALNODE property: supervisor assignment`)
            else if(!supervisorAssignment) this.structuralNode_supervisor_assignment = {}


        else if(!this.properties.structuralNode_supervisor_assignment.validate(supervisorAssignment)) throw `Invalid STRUCTURALNODE property: supervisor assignment -> ${supervisorAssignment}`
        else this.structuralNode_supervisor_assignment = supervisorAssignment
        return true
      },
      validate: supervisorAssignment => {
        // TODO: finish validating supervisor assignment
        return true
      }
    },
    agent_assignments: {
      setValue: function(assignments){
        if(!assignments && this.id === "new_object") this.agent_assignments = []
        else if(!this.properties.agent_assignments.validate(assignments)) throw `Invalid STRUCTURALNODE property: agent assignments -> ${assignments}`
        else this.agent_assignments = assignments
        return true
      },
      validate: assignments => {
        // TODO: finish validating assignments
        return true
      }
    },
    structuralNode_dataTag_ids: {
      setValue: function(dataTagIds){
        if(!dataTagIds && this.id === "new_object") this.structuralNode_dataTag_ids = []
        else if(!this.properties.structuralNode_dataTag_ids.validate(dataTagIds)) throw `Invalid STRUCTURALNODE property: dataTagIds -> ${dataTagIds}`
        else this.structuralNode_dataTag_ids = dataTagIds
        return true
      },
      validate: dataTagIds => {
        //TODO: finish validating datatags
        return true
      }
    },
    structuralNode_properties: {
      setValue: function(nodeProperties){
        if(!nodeProperties && this.id === "new_object") this.structuralNode_properties = {}
        else if(!this.properties.structuralNode_properties.validate(nodeProperties)) throw `Invalid STRUCTURALNODE property: structuralNode properties -> ${nodeProperties}`
        else this.structuralNode_properties = nodeProperties
        return true
      },
      validate: nodeProperties => {
        //TODO: finish validating node properties
        return true
      }
    },
    agent_assignments_implemented: {
      setValue: function(assignmentsImplemented){
        if(!assignmentsImplemented && this.id === "new_object") this.agent_assignments_implemented = []
        else if(!this.properties.agent_assignments_implemented.validate(assignmentsImplemented)) throw `Invalid STRUCTURALNODE property: assignments implemented -> ${assignmentsImplemented}`
        else this.agent_assignments_implemented = assignmentsImplemented
        return true
      },
      validate: assignmentsImplemented => {
        // TODO: finsih validating implemented assignments
        return true
      }
    }
  },
  typeFunctions: {
    getChildren: function(props){
      return props.structuralNodes.filter( node => node.structuralNode_parent_id === this.id && node.structuralNode_parent_id !== node.id )
    },
    branch: function(id, allNodes){},
    getNodeSupervisor: function(id, allNodes){}
  }
})


const displayProps = () => ({
  displayKey: "structuralNode_label",
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
