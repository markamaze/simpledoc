import React from 'react'
import uuidv4 from 'uuid/v4'
import { agencyObject } from './agencyObject'



const prototype = agencyState => ({
  type: function(){ return "dataTag" },
  properties: {
    id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.DataTag.id"
        else if(!this.properties.id.validate(id)) throw "invalid property: Agency.DataTag.id"
        else this.id = id
        return true
      },
      getObject: function(){ return this.id },
      validate: id => { return true }
    },
    dataTag_label: {
      setValue: function(label){
        if(label === null || label === undefined) throw "missing required property: Agency.DataTag.dataTag_label"
        else if(!this.properties.dataTag_label.validate(label)) throw "invalid property: Agency.DataTag.dataTag_label"
        else this.dataTag_label = label
        return true
      },
      getObject: function(){ return this.dataTag_label },
      validate: ()=>{ return true }
    },
    dataTag_tagType: {
      setValue: function(tagType){
        if(tagType === null || tagType === undefined) throw "missing required property: Agency.DataTag.dataTag_tagType"
        else if(!this.properties.dataTag_tagType.validate(tagType)) throw "invalid property: Agency.DataTag.dataTag_tagType"
        else this.dataTag_tagType = tagType
        return true
      },
      getObject: function(){ return this.datTag_tagType },
      validate: ()=>{ return true }
    },
    dataTag_property_ids: {
      setValue: function(ids){
        if(ids === null || ids === undefined) this.dataTag_property_ids = []
        else if(!this.properties.dataTag_property_ids.validate(ids)) throw "invalid property: Agency.DataTag.dataTag_property_ids"
        else this.dataTag_property_ids = ids
        return true
      },
      getObject: function(){ return this.dataTag_property_ids.map(id => agencyState["property"][id] )},
      validate: ()=>{ return true }
    },
    dataTag_typeObject_ids: {
      setValue: function(ids){
        if(ids === null || ids === undefined) this.dataTag_typeObject_ids = []
        else if(!this.properties.dataTag_typeObject_ids.validate(ids)) throw "invalid property: Agency.DataTag.dataTag_typeObject_ids"
        else this.dataTag_typeObject_ids = ids
        return true
     },
      getObject: function(){
        if(this.dataTag_tagType === "agent") return agencyState["role"][this.dataTag_typeObject_ids]
        else if(this.dataTag_tagType === "structural") return this.dataTag_typeObject_ids.map(id => agencyState["assignment"][id] )
        else return null
      },
      validate: ()=>{ return true }
    }
  },
  typeFunctions: {}
})



const displayProps = agencyState => ({
  displayKey: "dataTag_label",
  component: {
    list: {
      columns: {
        limited: [{label: "Tag Name", selector: "dataTag_label"}],
        expanded: [
          {label: "Tag Name", selector: "dataTag_label"},
          {label: "Type", selector: "dataTag_tagType"}
        ]
      },
      tableData: Object.values(agencyState.dataTag),
      listActions: [{label: "New DataTag", action: () => {
        let newDataTag = agencyObject("dataTag", {}, null)
        return newDataTag.display.call(newDataTag, agencyState, error=>{throw new Error(`${error}`)}).builder
      }}],
      drawerComponents: [{label: "card", component: item => item.display.call(item, agencyState, err=>{throw err}).card}],
      overlayComponents: [
        {label: "editor", component: item => item.display.call(item, agencyState, err=>{throw err}).editor},
        {label: "builder", component: item => item.display.call(item, agencyState, err=>{throw err}).builder}
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
