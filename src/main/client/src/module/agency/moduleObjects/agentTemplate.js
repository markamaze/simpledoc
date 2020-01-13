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
      agencyObjectData: {
        sections: function(){
          return [
            {title: "AgentTemplate Id", inputType: "text-disabled", value: this.id, propertyName: "id"},
            {title: "AgentTemplate Label", inputType: "text", value: this.agentTemplate_label, propertyName: "agentTemplate_label"}
          ]}
      },

      propertyBuilder: {
        propertiesSet: function(){ return this.agentTemplate_properties },
        propertyKey: "agentTemplate_properties",
        inheritedProperties: function(props){
          return props.dataTags.filter( tag => this.agentTemplate_dataTag_ids.includes(tag.id))
            .map( tag => ({ inheritedFrom: tag.dataTag_label, data: tag.dataTag_properties}))
        }
      },

      roleBuilder: {
        propertyName: "agentTemplate_security",
        agentRole: function(){
          return {security: this.agentTemplate_security}
        },
        inheritedRole: function(props){
          return props.dataTags.filter( tag => this.agentTemplate_dataTag_ids.includes(tag.id))
            .map( tag => ({inheritedFrom: tag.dataTag_label, data: tag.dataTag_typeObjects}))
        }
      },

      dataTagSetBuilder: {
        availableTags: function(props){
          return props.dataTags.filter( tag => tag.dataTag_tagType === "agent")
        },
        tagPropertyName: "agentTemplate_dataTag_ids",
        activeTags: function(props){
          return this.agentTemplate_dataTag_ids
        }
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
