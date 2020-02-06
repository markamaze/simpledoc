import React from 'react'
import { agencyObject } from './agencyObject'



const prototype = agencyState => ({
  type: () => "assignment",
  properties: {
    id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.Assignment.id"
        else if(!this.properties.id.validate(id)) throw "invalid property: Agency.Assignment.id"
        else this.id = id
        return true
      },
      getObject: function(){ return this.id },
      validate: ()=>{ return true }
    },
    agentTemplate_id: {
      setValue: function(id){
        if(id === null || id === undefined) this.agentTemplate_id = null
        // throw "missing required property: Agency.Assignment.agentTemplate_id"
        else if(!this.properties.agentTemplate_id.validate(id)) throw "invalid property: Agency.Assignment.agentTemplate_id"
        else this.agentTemplate_id = id
        return true
    },
      getObject: function(){ return agencyState["agentTemplate"][this.agentTemplate_id] },
      validate: ()=>{ return true }
    },
    supervising_assignment_id: {
      setValue: function(id){
        if(id === null || id === undefined) this.supervising_assignment_id = null 
        // throw "missing required property: Agency.Assignment.supervising_assignment_id"
        else if(!this.properties.supervising_assignment_id.validate(id)) throw "invalid property: Agency.Assignment.supervising_assignment_id"
        else this.supervising_assignment_id = id
        return true
   },
      getObject: function(){ return agencyState["assignment"][id] },
      validate: ()=>{ return true }
    },

  },
  typeFunctions: {

  }
})


const displayProps = agencyState => ({
  displayKey: "id",
  component: {
    list: {
      columns: {
        limited: [{label: "", selector: "id"}],
        expanded: [{label: "", selector: "id"}]
      },
      tableData: Object.values(agencyState.assignment),
      listActions: [
        {label: "New Assignment", action: () => {
          let newAssignment = agencyObject("assignment", {}, null)
          return newAssignment.display.call(newAssignment, agencyState, error=>{throw new Error(`${error}`)}).builder
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
