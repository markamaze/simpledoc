import React from 'react'
import * as validationTool from './validationTool'



const prototype = agencyState => ({
  type: function(){ return "user" },
  properties: {
    id: {
      setValue: function(idString){
        // throw "testing error path"
        if(!idString) throw `Missing required USER property: id`
        else if(!this.properties.id.validate(idString)) throw `Invalid USER property: id -> ${idString}`
        else this.id = idString
        return true
      },
      validate: id => {
        if(id === "new_object" && typeof this === "undefined") return true
        else if(validationTool.id(id)) return true
        else return false
      }
    },
    username: {
      setValue: function(username){
        if(!username && this.id === "new_object") this.username = "new user"
        else if(!username) throw `Missing required USER property: username`
        else if(!this.properties.username.validate(username)) throw `Invalid USER Property: username -> ${username}`
        else this.username = username
        return true
      },
      validate: username => {
        if(validationTool.string(username, {noSpaces: true, maxLength: 24, minLength: 4})) return true
        return false
      }
    },
    password: {
      setValue: function(password){
        if(!password && this.id === "new_object") this.password = ""
        else if(!password) throw `Missing required USER property: password`
        else if(!this.properties.username.validate(password)) throw `Invalid USER Property: password -> ${password}`
        else this.password = password
        return true
      },
      validate: password => {
        if(validationTool.string(password, {noSpaces: true, maxLength: 24, minLength: 8})) return true
        return false
      }
    }
  },
  typeFunctions: {
    getAgents: function(){}
  }
})


const displayProps = () => ({
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
      }
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
