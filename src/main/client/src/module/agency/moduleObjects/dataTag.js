import React from 'react'
import {moduleObjectPrototype} from './moduleObjectPrototype'


const dataTagPrototype = {
  properties: {
    id: {
      setValue: function(id){
        if(!dataTagPrototype.properties.id.validate(id)) return false
        this.id = id
        return true
      },
      validate: id => { return true }
    },
    dataTag_label: {
      setValue: function(label){
        if(!dataTagPrototype.properties.dataTag_label.validate(label)) return false
        this.dataTag_label = label
        return true
      },
      validate: label => { return true }
    },
    dataTag_tagType: {
      setValue: function(tagType){
        if(!dataTagPrototype.properties.dataTag_tagType.validate(tagType)) return false
        this.dataTag_tagType = tagType
        return true
      },
      validate: tagType => { return true }
    },
    dataTag_properties: {
      setValue: function(tagProperties){
        if(!dataTagPrototype.properties.dataTag_properties.validate(tagProperties)) return false
        this.dataTag_properties = tagProperties
        return true
      },
      validate: properties => { return true }
    },
    dataTag_typeObjects: {
      setValue: function(typeObjects){
        if(!dataTagPrototype.properties.dataTag_typeObjects.validate(typeObjects)) return false
        this.dataTag_typeObjects = typeObjects
      },
      validate: typeObjects => { return true }
    }
  },

  displayProps: {
    builder: {
      agencyObjectData: {
        sections: function(){
          return [
            {title: "DataTag Id", inputType: "text-disabled", value: this.id, propertyName: "id"},
            {title: "Label", inputType: "text", value: this.dataTag_label, propertyName: "dataTag_label"},
            {title: "DataTag Type", inputType: "select", selectOptions: [{key: "Agent", value: "agent"}, {key: "Structural", value: "structuralNode"}], value: this.dataTag_tagType, propertyName: "dataTag_tagType"}
        ]}
      },

      propertyBuilder: {
        propertiesSet: dataItem => dataItem.dataTag_properties,
        inheritedProperties: () => [],
        propertyKey: "dataTag_properties" },

      //   //this shouldn't be a function
      // typeSpecificBuilder: type => {
      //   if(type === "agent")
      //     return {
      //       roleBuilder: {
      //         agentRole: dataItem => dataItem.dataTag_typeObjects,
      //         inheritedRole: () => {},
      //         propertyName: "dataTag_typeObjects"}
      //     }
      //   else if(type === "structuralNode")
      //     return {
      //       assignmentBuilder: {
      //         agentAssignments: dataItem => dataItem.dataTag_typeObjects,
      //         inheritedAssignments: () => [],
      //         propertyName: "dataTag_typeObjects" }
      //     }
      // }
    },
    editor: {},
    card: {
      header: function(){ return `Agent Template: ${this.dataTag_label}` },
      assignments: function(){},
      properties: function(){},
      agencyObjectData: function(){},
      roleData: function(){},
      tagData: function(){}}
  },

  typeFunctions: {}
}


export const dataTag = state => {
  let dataTag = Object.create(moduleObjectPrototype("dataTag", dataTagPrototype))
  dataTag.init(state)
  return dataTag
}
