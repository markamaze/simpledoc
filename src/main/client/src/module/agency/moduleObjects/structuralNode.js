import React from 'react'
import uuidv4 from 'uuid/v4'
import { agencyObject } from './agencyObject'


const prototype = agencyState => ({
  type: () => "structuralNode",
  properties: {
    id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.StructualNode.id"
        else if(!this.properties.id.validate(id)) throw "invalid property: Agency.StructualNode.id"
        else this.id = id
        return true
      },
      getObject: function(){ return this.id},
      validate: ()=>{ return true }
    },
    structuralNode_label: {
      setValue: function(label){
        if(label === null || label === undefined) throw "missing required property: Agency.StructualNode.label"
        else if(!this.properties.structuralNode_label.validate(label)) throw "invalid property: Agency.StructualNode.label"
        else this.structuralNode_label = label
        return true
      },
      getObject: function(){ return this.structuralNode_label},
      validate: ()=>{ return true }
    },
    structuralNode_parent_id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.StructualNode.structuralNode_parent_id"
        else if(!this.properties.structuralNode_parent_id.validate(id)) throw "invalid property: Agency.StructualNode.structuralNode_parent_id"
        else this.structuralNode_parent_id = id
        return true
      },
      getObject: function(){ return agencyState["structuralNode"][this.structuralNode_parent_id]},
      validate: ()=>{ return true }
    },
    structuralNode_dataTag_ids: {
      setValue: function(ids){
        if(ids === null || ids === undefined) this.structuralNode_dataTag_ids = []
        else if(!this.properties.structuralNode_dataTag_ids.validate(ids)) throw "invalid required property: Agency.StructualNode.structuralNode_dataTag_ids"
        else this.structuralNode_dataTag_ids = ids
        return true
      },
      getObject: function(){ return this.structuralNode_dataTag_ids.map(id => agencyState["dataTag"][id] )},
      validate: ()=>{ return true }
    },
    property_values: {
      setValue: function(values){
        if(values === null || values === undefined) this.property_values = {}
        else if(!this.properties.property_values.validate(values)) throw "invalid property: Agency.StructuralNode.property_values"
        else this.property_values = values
        return true
      },
      getObject: function(){},
      validate: ()=>{ return true }
    },
    active_assignments: {
      setValue: function(assignments){
        if(assignments === null || assignments === undefined) this.active_assignments = {}
        else if(!this.properties.active_assignments.validate(assignments)) throw "invalid property: Agency.StructualNode.active_assignments"
        else this.active_assignments = assignments
        return true
      },
      getObject: function(){},
      validate: ()=>{ return true }
    },
  },
  typeFunctions: {
    getChildren: function(){
      let stateStructuralNodes = agencyState().structuralNode
      return Object.entries(stateStructuralNodes).filter( ([id, value]) => value.structuralNode_parent_id === this.id && value.structuralNode_parent_id !== id ).map(([key, value]) => value)
    },
    branch: function(id, allNodes){},
    getNodeSupervisor: function(id, allNodes){}
  }
})


const displayProps = agencyState => ({
  displayKey: "structuralNode_label",
  component: {
    list: {
      root: Object.values(agencyState["structuralNode"]).find(node => node.id === node.structuralNode_parent_id),
      nodeBranch: node => node.typeFunctions.getChildren.call(node),
      columns: {
        limited: [{label: "", selector: "structuralNode_label"}],
        expanded: [{label: "", selector: "structuralNode_label"}]
      },
      iconComponent: item =>
        <div>
          {item.structuralNode_label}
          <div>{Object.values(agencyState.dataTag).filter(tag => item.structuralNode_dataTag_ids.includes(tag.id)).map( tag=> <div className="dataTag">{tag.dataTag_label}</div>)}</div>
        </div>,
      listActions: [{label: "new node", action: () => {
        let newNode = agencyObject("structuralNode", {}, null)
        return newNode.display.call(newNode, agencyState, error=>{throw new Error(`${error}`)}).builder
      }}],
      drawerComponents: [
        {label: "card", component: item => item.display.call(item, agencyState, error=>{throw new Error(`${error}: handled by Agency`)}).card},
      ],
      overlayComponents: [
        {label: "Add Branch", component: ()=>console.log("fire action to create branch node")},
        {label: "editor", component: item => item.display.call(item, agencyState, error=>{throw new Error(`${error}: handled by Agency`)}).editor},
        {label: "builder", component: item => item.display.call(item, agencyState, error=>{throw new Error(`${error}: handled by Agency`)}).builder},
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
