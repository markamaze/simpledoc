import React from 'react'
import { agencyObject } from './agencyObject'
import List from '../../../components/List'

const validateUUID = idstring => true
const validateString = (string) => true


const prototype = (getStore, services, utilities) => ({
  type: () => "user",
  properties: {
    id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.User.id"
        else if(!this.properties.id.validate(id)) throw "invalid property: Agency.User.id"
        else this.id = id
        return true
      },
      validate: id => {
        if(id.substring(0,2) === "n-") return validateUUID(id.substring(2))
        else return validateUUID(id)
      } 
    },
    username: {
      setValue: function(uname){
        if(uname === null || uname === undefined) throw "missing required property: Agency.User.username"
        else if(!this.properties.username.validate(uname)) throw "invalid property: Agency.User.username"
        else this.username = uname
        return true
      },
      validate: username => validateString(username)
    },
    password: {
      setValue: function(pword){
        if(pword === null || pword === undefined) throw "missing required property: Agency.User.password"
        else if(!this.properties.password.validate(pword)) throw "invalid property: Agency.User.password"
        else this.password = pword
        return true
      },
      validate: pword => validateString(pword)
    },
    property_values: {
      setValue: function(values){
        if(values === null || values === undefined) this.property_values = []
        else if(!this.properties.property_values.validate(values)) throw "invalid property: Agency.User.property_values"
        else this.property_values = values
        return true
      },
      validate: (kvSet)=>{
        if(!Array.isArray(kvSet)) return false
        if(kvSet.length === 0) return true

        return kvSet.reduce( (result, kvpair) => {
          if(!result) return false

          let pair = kvpair.split("=")
          if(pair.length !== 2) return false
          else if(typeof pair[0] !== 'string' || typeof pair[1] !== 'string') return false
          else true
        })
      }
    },
    assigned_agent_ids: {
      setValue: function(agentIds){
        if(agentIds === null || agentIds === undefined) this.assigned_agent_ids = []
        else if(!this.properties.assigned_agent_ids.validate(agentIds)) throw "invalid property: Agency.User.assigned_agent_ids"
        else this.assigned_agent_ids = agentIds
        return true
      },
      validate: agentIds => {
        let store = getStore()
        if(!Array.isArray(agentIds)) return false
        if(agentIds.length === 0) return true
        return agentIds.reduce( (result, id) => {
          if(!result) return false
          else if(!validateUUID(id)) return false
          else if(!store.agent[id]) return false
          else if(!store.agent[id].agent_user.id !== this.id) return false
          else return true
        })
      }
    }
  },
  display: {
    card: user => {
      return  <div className="container-item">{user.agencyTools.getDisplayLabel(user)}</div>
    },
    document: user => {
      return  <List className="container"
                  headerComponent={<header>User Document</header>}
                  tableData={[
                    user.agencyComponents.agentsList(user),
                    user.agencyComponents.propertiesList(user)
                  ]}
                  iconComponent={ item => item } />
    },
    editor: (user, success, failure) => {
      function Editor(props) {
        const [tempUser, updateTempUser] = React.useState(props.user)
        const updateHandler = newState => updateTempUser(tempUser.moduleTools.updateObject(newState, tempUser))

        return  <List className="container"
                    headerComponent={<header>User Editor</header>}
                    tableData={[
                      tempUser.components.propertiesEditor(tempUser, updateHandler)
                    ]}
                    footerComponent={tempUser.storage.handlers.call(tempUser, success, failure)}
                    iconComponent={ item => item } />
      }
      return <Editor user={user} />
    },
    builder: (user, success, failure) => {
      function Builder(props){
        const [tempUser, updateTempUser] = React.useState(props.user)
        const updateHandler = newState => updateTempUser(tempUser.moduleTools.updateObject(newState, tempUser))

        return  <List className="container"
                    headerComponent={<header>User Builder</header>}
                    tableData={[
                      tempUser.components.modifyUsername(tempUser, updateHandler),
                      tempUser.components.resetPassword(tempUser, updateHandler)
                    ]}
                    footerComponent={tempUser.storage.handlers.call(tempUser, success, failure)}
                    iconComponent={ item => item } />
      }
      return <Builder user={user} />
    }
  },
  tools: {
    getProperties: user => {
      let store = getStore()
      let userTags = 
    }
  },
  components: {
    modifyUsername: (user, updateHandler) => {

      return  <div className="container-row border-bottom">
                <div className="container-item item-label">Set Username</div>
                <input className="container-item container-fill"
                    type="text"
                    value={user.username}
                    onChange={() => updateHandler({username: event.target.value})} />
              </div>
    },
    resetPassword: (user, updateHandler) => {

      return  <div className="container-row border-bottom">
                <div className="container-item item-label">Reset Password</div>
                <input className="container-item container-fill"
                    type="text"
                    placeholder="enter new password"
                    onChange={() => updateHandler({password: event.target.value})} />
              </div>
    },
    propertiesEditor: (user, updateHandler => {
      return  <List className="container-row border-bottom"
                headerComponent={<div className="container-item item-label">Udate Property Values</div>}
                tableData={item.tools.getProperties(item).map(property => ({
                  property_editor:
                    <div className="property container-row">
                      <div className="container-item item-label">{property.property_key}</div>
                      <input className="container-item"
                          type="text"
                          value={item.property_values[property.id]}
                          onChange={() => updateHandler({property_values: Object.assign({}, item.property_values, { [`${property.id}`]: event.target.value })})} />
                    </div>,
                  selectable: false
                }))}
                columns={[{selector:"property_editor"}]} />
              })
})

export { prototype }
