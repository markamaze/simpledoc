import React from 'react'
import uuidv4 from 'uuid/v4'
import { agencyObject } from './agencyObject'



const prototype = agencyState => ({
  type: () => "role",
  properties: {
    id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.Role.id"
        else if(!this.properties.id.validate(id)) throw "invalid property: Agency.Role.id"
        else this.id = id
        return true
      },
      getObject: function(){ return this.id },
      validate: ()=>{ return true }
    },
    role_label: {
      setValue: function(label){
        if(label === null || label === undefined) this.role_label = "new role"
        else if(!this.properties.role_label.validate(label)) throw "invalid property: Agency.Role.role_label"
        else this.role_label = label
        return true
      },
      getObject: function(){ return this.role_label },
      validate: ()=>{ return true }
    },
    security_code: {
      setValue: function(code){
        if(code === null || code === undefined) this.security_code = new Integer("0000")
        else if(!this.properties.security_code.validate(code)) throw "invalid property: Agency.Role.security_code"
        else this.security_code = code
        return true
      },
      getObject: function(){ return this.security_code },
      validate: ()=>{ return true }
    }
  }
})


const displayProps = agencyState => ({
  displayKey: "role_label",
  component: {
    list: {
      columns: {
        limited: [{label: "", selector: "role_label"}],
        expanded: [
          {label: "", selector: "role_label"}
        ]
      },
      tableData: Object.values(agencyState.role),
      listActions: [
        {label: "New Role", action: () => {
          let newRole = agencyObject("role", {id: "new_object"}, err=>console.log(err))
          return newRole.display.call(newRole, agencyState, error=>{throw new Error(`${error}`)}).builder
        }}
      ],
      drawerComponents: [
        {label: "card", component: item => item.display.call(item, agencyState, err=>{throw err}).card},
        {label: "builder", component: item => item.display.call(item, agencyState, error=>{throw error}).builder}
      ],
      overlayComponents: []
    },
    agencyObject: {
      objectData: {
        getObjectData: role => ({
          label: role.role_label
        })
      }
    }
  }
})


export { prototype, displayProps }
