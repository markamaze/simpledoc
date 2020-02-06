import React from 'react'
import uuidv4 from 'uuid/v4'
import { agencyObject } from './agencyObject'



const prototype = agencyState => ({
  type: () => "property",
  properties: {
    id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.Property.id"
        else if(!this.properties.id.validate(id)) throw "invalid property: Agency.Property.id"
        else this.id = id
        return true
      },
      getObject: function(){ return this.id },
      validate: ()=>{ return true }
    },
    property_key: {
      setValue: function(key){
        if(key === null || key === undefined) throw "missing required property: Agency.Property.property_key"
        else if(!this.properties.property_key.validate(key)) throw "invalid property: Agency.Property.property_key"
        else this.property_key = key
        return true
      },
      getObject: function(){ return this.property_key },
      validate: ()=>{ return true }
    },
    property_value_type: {
      setValue: function(type){
        if(type === null || type === undefined) throw "missing required property: Agency.Property.id"
        else if(!this.properties.property_value_type.validate(type)) throw "invalid property: Agency.Property.property_value_type"
        else this.property_value_type = type
        return true
      },
      getObject: function(){ return this.property_value_type},
      validate: ()=>{ return true }
    },

  }
})


const displayProps = agencyState => ({
  displayKey: "property_key",
  component: {
    list: {
      columns: {
        limited: [{label: "key", selector: "property_key"}],
        expanded: [{label: "key", selector: "property_key"}]
      },
      tableData: Object.values(agencyState.property),
      listActions: [
        {label: "New Property", action: () => {
          let newProperty = agencyObject("property", {}, null)
          return newProperty.display.call(newProperty, agencyState, error=>{throw new Error(`${error}`)}).builder
        }}
      ],
      drawerComponents: [
        {label: "card", component: item => item.display.call(item, agencyState, err=>{throw err}).card},
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
