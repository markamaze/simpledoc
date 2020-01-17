import React from 'react'
import * as validationTool from './validationTool'



export const dataTagPrototype = (storageActions, importedActions) => ({
  type: function(){ return "dataTag" },
  properties: {
    id: {
      setValue: function(id){
        if(!id) throw `Missing required DATATAG property: id`
        else if(!this.properties.id.validate(id)) throw `Invalid DATATAG property: id`
        else this.id = id
        return true
      },
      validate: id => {
        if(id === "new_object" && typeof this === "undefined") return true
        if(validationTool.id(id)) return true
        return false
      }
    },
    dataTag_label: {
      setValue: function(label){
        if(!label && this.id === "new_object") this.dataTag_label = "new dataTag"
        else if(!label) throw 'Missing required DATATAG property: dataTag label'  //I should use a custom error for this to add indicators on screen
        else if(!this.properties.dataTag_label.validate(label)) throw `Invalid DATATAG property: dataTag label -> ${label}`
        else this.dataTag_label = label
        return true
      },
      validate: label => {
        if(validationTool.string(label, {})) return true
        else return false
      }
    },
    dataTag_tagType: {
      setValue: function(tagType){
        if(!tagType) this.dataTag_tagType = ""
        else if(!this.properties.dataTag_tagType.validate(tagType)) throw `Invalid DATATAG property: dataTag tagType -> ${tagType}`
        else this.dataTag_tagType = tagType
        return true
      },
      validate: tagType => {
        if(tagType === "agent") return true
        else if(tagType === "structuralNode") return true
        return false
      }
    },
    dataTag_properties: {
      setValue: function(tagProperties){
        if(!tagProperties) this.dataTag_properties = {}
        else if(!this.properties.dataTag_properties.validate(tagProperties)) throw `Invalid DATATAG property: dataTag properties -> ${tagProperties}`
        else this.dataTag_properties = tagProperties
        return true
      },
      validate: properties => {
        // TODO: finish validating properties
        return true
      }
    },
    dataTag_typeObjects: {
      setValue: function(typeObjects){
        if(!typeObjects) this.dataTag_typeObjects = []
        else if(!this.properties.dataTag_typeObjects.validate(typeObjects)) throw `Invalid DATATAG property: dataTag typeObjects -> ${typeObjects}`
        else this.dataTag_typeObjects = typeObjects
        return true
      },
      validate: typeObjects => {
        // TODO: finish validating typeObjects
        return true
      }
    }
  },
  typeFunctions: {},
  displayProps: {
    displayName: function(){ return this.dataTag_label },
    actionCreators: {
      saveInStorage: {
        label: "Submit Changes",
        key: function(){return `action-creater-save-dataTag-${this.id}`},
        action: function(success, failure){
                  try{
                    if(this.id === "new_object") success(storageActions.createAgencyObject(this))
                    else success(storageActions.updateAgencyObject(this))
                  } catch(err){ failure(err) }}
      },
      deleteFromStorage: {
        label: "Delete DataTag",
        key: function(){return `action-creater-delete-dataTag-${this.id}`},
        action: function(success, failure){
                  try{
                    success(storageActions.deleteAgencyObject(this))
                  } catch(err){ failure(err) }}
      }
    },
    objectData: {
      builder: {},
      editor: {},
      card: {}
    },
    properties: {
      builder: {},
      editor: {},
      card: {}
    },
    tags: {
      builder: {},
      editor: {},
      card: {}
    },
    assignments: {
      builder: {},
      editor: {},
      card: {}
    },
    roles: {
      builder: {},
      editor: {},
      card: {}
    }
  }
})
