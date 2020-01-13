import React from 'react'
import {moduleObjectPrototype} from './moduleObjectPrototype'


const structuralNodePrototype = {
  properties: {
    id: {
      setValue: function(id){
        if(!structuralNodePrototype.properties.id.validate(id)) return false
        this.id = id
        return true
      },
      validate: id => { return true }
    },
    structuralNode_label: {
      setValue: function(label){
        if(!structuralNodePrototype.properties.structuralNode_label.validate(label)) return false
        this.structuralNode_label = label
        return true
      },
      validate: label => { return true }
    },
    structuralNode_parent_id: {
      setValue: function(parentId){
        if(!structuralNodePrototype.properties.structuralNode_parent_id.validate(parentId)) return false
        this.structuralNode_parent_id = parentId
        return true
      },
      validate: parentId => { return true }
    },
    structuralNode_supervisor_assignment: {
      setValue: function(supervisorAssignment){
        if(!structuralNodePrototype.properties.structuralNode_supervisor_assignment.validate(supervisorAssignment)) return false
        this.structuralNode_supervisor_assignment = supervisorAssignment
        return true
      },
      validate: supervisorAssignment => { return true }
    },
    agent_assignments: {
      setValue: function(assignments){
        if(!structuralNodePrototype.properties.agent_assignments.validate(assignments)) return false
        this.agent_assignments = assignments
        return true
      },
      validate: assignments => { return true }
    },
    structuralNode_dataTag_ids: {
      setValue: function(dataTagIds){
        if(!structuralNodePrototype.properties.structuralNode_dataTag_ids.validate(dataTagIds)) return false
        this.structuralNode_dataTag_ids = dataTagIds
        return true
      },
      validate: dataTagIds => { return true }
    },
    structuralNode_properties: {
      setValue: function(nodeProperties){
        if(!structuralNodePrototype.properties.structuralNode_properties.validate(nodeProperties)) return false
        this.structuralNode_properties = nodeProperties
        return true
      },
      validate: nodeProperties => { return true }
    },
    agent_assignments_implemented: {
      setValue: function(assignmentsImplemented){
        if(!structuralNodePrototype.properties.agent_assignments_implemented.validate(assignmentsImplemented)) return false
        this.agent_assignments_implemented = assignmentsImplemented
        return true
      },
      validate: assignmentsImplemented => { return true }
    }
  },

  displayProps: {
    builder: {

      agencyObjectData: {
        sections: (dataItem, allNodes) => (
          [ {title: "StructuralNode Id", inputType: "text-disabled", value: dataItem.id, propertyName: "id"},
            {title: "Label", inputType: "text", value: dataItem.structuralNode_label, propertyName: "structuralNode_label"},
            {title: "Set Parent", inputType: "select",
                selectOptions: allNodes.length === 0 ?
                  [{key: "root", value: "root"}]
                  : allNodes.map(node => ({key: node.structuralNode_label, value: node.id})),
                value: dataItem.structuralNode_parent_id,
                propertyName: "structuralNode_parent_id"}
          ]) },

      propertyBuilder: {
        propertiesSet: dataItem => dataItem.structuralNode_properties,
        propertyKey: "structuralNode_properties",
        inheritedProperties: (dataItem, allTags) =>
          dataItem.structuralNode_dataTag_ids === undefined ? [] :
          allTags.filter( tag => dataItem.structuralNode_dataTag_ids.includes(tag.id))
            .map( tag => ({ inheritedFrom: tag.dataTag_label, data: tag.dataTag_properties})) },

      assignmentBuilder: {
        agentAssignments: dataItem => dataItem.agent_assignments,
        propertyName: "agent_assignments",
        inheritedAssignments: (dataItem, allTags) =>
          dataItem.structuralNode_dataTag_ids === undefined ? [] :
          allTags.filter( tag => dataItem.structuralNode_dataTag_ids.includes(tag.id))
            .map( tag => ({inheritedFrom: tag.dataTag_label, data: tag.dataTag_typeObjects})) },

      dataTagSetBuilder: {
        availableTags: allTags => allTags.filter( tag => tag.dataTag_tagType === "structuralNode"),
        activeTags: dataItem => dataItem.structuralNode_dataTag_ids,
        tagPropertyName: "structuralNode_dataTag_ids" }
    },

    editor: {

      dataItemInfo: (dataItem, props) => ([
        {key: "label", value: dataItem.structuralNode_label},
        {key: "subLabel", value: props.structuralNodes.find(node => node.id === dataItem.structuralNode_parent_id).label},
        {key: "tags", value: props.dataTags.filter(tag => dataItem.structuralNode_dataTag_ids.includes(tag.id)).map(tag => tag.structuralNode_label)}
      ]),

      propertyEditor: {
        propertyName: "structuralNode_property_values",
        propertiesSet: dataItem => dataItem.structuralNode_properties,
        inheritedProperties: (dataItem, props) => !dataItem.structuralNode_dataTag_ids ? [] :
          props.dataTags.filter( tag => dataItem.structuralNode_dataTag_ids.includes(tag.id))
                  .map( tag => ({ inheritedFrom: tag.dataTag_label, data: tag.dataTag_properties}))
      },

      assignmentEditor: {
        propertyName: "agent_assignments_implemented",
        agentAssignments: dataItem => !dataItem.agent_assignments ? [] :
          dataItem.agent_assignments,
        inheritedAssignments: dataItem => !dataItem.structuralNode_dataTag_ids ? [] :
          props.dataTags.filter( tag => dataItem.structuralNode_dataTag_ids.includes(tag.id))
              .map( tag => ({ inheritedFrom: tag.dataTag_label, data: tag.dataTag_typeObjects})),
        implementedAssignments: dataItem => !dataItem.agent_assignments_implemented ? [] : dataItem.agent_assignments_implemented
      }
    },

    card: {
      header: dataItem => `StructuralNode: ${dataItem.structuralNode_label}`,
      assignments: {},
      properties: {},
      agencyObjectData: {},
      roleData: {},
      tagData: {}
    }
  },

  typeFunctions: {
    getChildren: function(id, allNodes){
      return allNodes.filter( node => node.structuralNode_parent_id === id && node.structuralNode_parent_id !== node.id )
    },

    branch: function(id, allNodes){},

    getNodeSupervisor: function(id, allNodes){}}
}

export const structuralNode = state => {
  let structuralNode = Object.create(moduleObjectPrototype("structuralNode", structuralNodePrototype))
  structuralNode.init(state)
  return structuralNode
}
