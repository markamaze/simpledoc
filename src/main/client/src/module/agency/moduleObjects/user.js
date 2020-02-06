import React from 'react'
import { agencyObject } from './agencyObject'



const prototype = agencyState => ({
  type: () => "user",
  properties: {
    id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.User.id"
        else if(!this.properties.id.validate(id)) throw "invalid property: Agency.User.id"
        else this.id = id
        return true
      },
      getObject: function(){ return this.id },
      validate: ()=>{ return true }
    },
    username: {
      setValue: function(uname){
        if(uname === null || uname === undefined) throw "missing required property: Agency.User.username"
        else if(!this.properties.username.validate(uname)) throw "invalid property: Agency.User.username"
        else this.username = uname
        return true
      },
      getObject: function(){ return this.username },
      validate: (uname)=>{ return true }
    },
    password: {
      setValue: function(pword){
        if(pword === null || pword === undefined) throw "missing required property: Agency.User.password"
        else if(!this.properties.password.validate(pword)) throw "invalid property: Agency.User.password"
        else this.password = pword
        return true
      },
      getObject: function(){ return this.password },
      validate: pword => { return true }
    }
  }

})



const displayProps = agencyState => ({
  displayKey: "username",
  component: {
    list: {
      columns: {
        limited: [{label: "Username", selector: "username"}],
        expanded: [
          {label: "Username", selector: "username"},
          {label: "Password", selector: "password"},
          {label: "userId", selector: "id"}
        ]
      },
      tableData: Object.values(agencyState.user),
      listActions: [
        {label: "New User", action: () => {
          let newUser = agencyObject("user", {}, null)
          return newUser.display.call(newUser, agencyState, error=>{throw new Error(`${error}`)}).builder
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
