import React from 'react'
import {moduleObjectPrototype} from './moduleObjectPrototype'


const userPrototype = {
  properties: {
    id: {
    setValue: function(idString){
      if(!userPrototype.properties.id.validate(idString)) return false
      this.id = idString

      return true
    },
    validate: id => { return true }
    },
    username: {
      setValue: function(username){
        if(!userPrototype.properties.username.validate(username)) return false
        this.username = username

        return true
      },
      validate: username => { return true }
    },
    password: {
      setValue: function(password){
        if(!userPrototype.properties.username.validate(password)) return false
        this.password = password

        return true
      },
      validate: password => { return true }
    }
  },

  typeFunctions: {
      getAgents: props => {},
},

  displayProps: {
    builder: {
      agencyObjectData: {
        sections: function(){
          return [
          {title: "User Id", inputType: "text-disabled", value: this.id, propertyName: "id"},
          {title: "Username", inputType: "text", value: this.username, propertyName: "username"},
          {title: "Password", inputType: "text", value: this.password, propertyName: "password"}
        ]}
      }
    },
    editor: {},
    card: {
        header: function(){
          return `User Data`
        },
        agencyObjectData: function(props){
          return  <div className={``}>
                    <div>
                      <span>Username:</span>
                      <span>{this.username}</span>
                    </div>
                  </div>
        },
        objectLinks: function(props){
          return  <div>
                    <header>Assigned to Agents:</header>
                    {
                      //get all assignments with this user as assigned_user and return with a link 
                    }
                  </div>
        }
      }
  }
}

export const user = state => {
  let user = Object.create(moduleObjectPrototype("user", userPrototype))
  user.init(state)
  return user
}
