import React from 'react'
import {moduleObjectPrototype} from './moduleObjectPrototype'



const agentTemplatePrototype = {
  properties: {
    id: {
      setValue: function(id){
        if(!agentTemplatePrototype.properties.id.validate(id)) return false
        this.id = id
        return true
      },
      validate: id => { return true }
    },
    agentTemplate_label: {
      setValue: function(label){
        if(!agentTemplatePrototype.properties.agentTemplate_label.validate(label)) return false
        this.agentTemplate_label = label ? label : ""
        return true
      },
      validate: label => { return true }
    },
    agentTemplate_security: {
      setValue: function(security){
        if(!agentTemplatePrototype.properties.agentTemplate_security.validate(security)) return false
        this.agentTemplate_security = security ? security : "0000"
        return true
      },
      validate: security => { return true }
    },
    agentTemplate_dataTag_ids: {
      setValue: function(tagIds){
        if(!agentTemplatePrototype.properties.agentTemplate_dataTag_ids.validate(tagIds)) return false
        this.agentTemplate_dataTag_ids = tagIds ? tagIds : []
        return true
      },
      validate: tagIds => { return true }
    },
    agentTemplate_properties: {
      setValue: function(templateProperties){
        if(!agentTemplatePrototype.properties.agentTemplate_properties.validate(templateProperties)) return false
        this.agentTemplate_properties = templateProperties ? templateProperties : []
        return true
      },
      validate: templateProperties => { return true }
    }
  },

  displayProps: {
    builder: {
      // dataItem: () => {
      //   let label = agentTemplate.agentTemplate_label === undefined ? "" : agentTemplate.agentTemplate_label
      //   let security = agentTemplate.agentTemplate_security === undefined ? "" : agentTemplate.agentTemplate_security
      //   let tagIds = agentTemplate.agentTemplate_dataTag_ids === undefined ? [] : agentTemplate.agentTemplate_dataTag_ids
      //   let properties = agentTemplate.agentTemplate_properties === undefined ? [] : agentTemplate.agentTemplate_properties
      //
      //   return agentTemplate.update({
      //     agentTemplate_label: label,
      //     agentTemplate_security: security,
      //     agentTemplate_dataTag_ids: tagIds,
      //     agentTemplate_properties: properties
      //   })
      // },

      agencyObjectData: {
        sections: dataItem => ([
          {title: "AgentTemplate Id", inputType: "text-disabled", value: dataItem.id, propertyName: "id"},
          {title: "AgentTemplate Label", inputType: "text", value: dataItem.agentTemplate_label, propertyName: "agentTemplate_label"}
        ])
      },

      propertyBuilder: {
        propertiesSet: dataItem => dataItem.agentTemplate_properties,
        propertyName: "agentTemplate_properties",
        inheritedProperties: (dataItem, allTags) =>
          allTags.filter( tag => dataItem.agentTemplate_dataTag_ids.includes(tag.id))
            .map( tag => ({ inheritedFrom: tag.dataTag_label, data: tag.dataTag_properties})),
      },

      roleBuilder: {
        propertyName: "agentTemplate_security",
        agentRole: dataItem => ({security: dataItem.agentTemplate_security}),
        inheritedRole: (dataItem, allTags) =>
          allTags.filter( tag => dataItem.agentTemplate_dataTag_ids.includes(tag.id))
            .map( tag => ({inheritedFrom: tag.dataTag_label, data: tag.dataTag_typeObjects}))
      },

      dataTagSetBuilder: {
        availableTags: allTags => allTags.filter( tag => tag.dataTag_tagType === "agent"),
        tagPropertyName: "agentTemplate_dataTag_ids",
        activeTags: dataItem => dataItem.agentTemplate_dataTag_ids
      }
    },
    editor: {},
    card: {
      header: function(){
        return `Agent Template: ${this.agentTemplate_label}`
      },
      assignments: function(props){},
      properties: function(props){},
      agencyObjectData: function(props){
        return <div className={``}>{this.id}</div>
      },
      roleData: function(props){},
      tags: function(props){}
    }
  },

  typeFunctions: {}
}

export const agentTemplate = state => {
  let agentTemplate = Object.create(moduleObjectPrototype("agentTemplate", agentTemplatePrototype))
  agentTemplate.init(state)
  return agentTemplate
}
