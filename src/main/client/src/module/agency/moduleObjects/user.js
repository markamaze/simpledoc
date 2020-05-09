import React from 'react'
import { agencyObject } from './agencyObject'
import List from '../../../components/List'


//TODO: move and import
const utility = {
  validateId: id => true, //handle flags
  validateString: (string, params) => true,

}

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
      validate: id => utility.validateId(id) 
    },
    username: {
      setValue: function(uname){
        if(uname === null || uname === undefined) throw "missing required property: Agency.User.username"
        else if(!this.properties.username.validate(uname)) throw "invalid property: Agency.User.username"
        else this.username = uname
        return true
      },
      validate: username => utility.validateString(username, {min_len: 4, max_len: 12, allow_spaces: false, allow_special_chars: false})
    },
    password: {
      setValue: function(pword){
        if(pword === null || pword === undefined) throw "missing required property: Agency.User.password"
        else if(!this.properties.password.validate(pword)) throw "invalid property: Agency.User.password"
        else this.password = pword
        return true
      },
      validate: pword => utility.validateString(pword, {min_len: 8, max_len: 32, allow_spaces: false, allow_special_chars: true})
    },
    property_values: {
      setValue: function(values){
        if(values === null || values === undefined) this.property_values = []
        else if(!this.properties.property_values.validate(values)) throw "invalid property: Agency.User.property_values"
        else this.property_values = values
        return true
      },
      validate: (kvSet)=>{
        let store = getStore()
        if(!Array.isArray(kvSet)) return false
        if(kvSet.length === 0) return true

        return kvSet.reduce( (result, kvpair) => {
          if(!result) return false
          else if(typeof kvpair !== "string") return false

          let pair = kvpair.split("=")
          if(pair.length !== 3) return false
          else if(!utility.validateId(pair[0])) return false
          else if(typeof pair[1] !== 'string' || typeof pair[2] !== 'string') return false
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
          return true
        })
      }
    }
  },
  display: {
    card: user => {
      return  <div className="container-item">{user.tools.getDisplayName(user)}</div>
    },
    document: user => {
      return  <List className="container"
                  headerComponent={<header>{user.display.card(user)}</header>}
                  tableData={[
                    user.agencyComponents.showAssignments(user.tools.getAssignedAgents(user)),
                    user.agencyComponents.showPropertyValues(user.tools.getProperties(user), user.property_values)
                  ]}
                  iconComponent={ item => item } />
    },
    editor: (user, success, failure) => {
      function Editor(props) {
        const [tempUser, updateTempUser] = React.useState(props.user)
        const updateHandler = newState => updateTempUser(tempUser.update(newState))

        return  <List className="container"
                    headerComponent={<header>{props.user.display.card(props.user)}</header>}
                    tableData={[
                      tempUser.agencyComponents.setPropertyValues(tempUser, updateHandler)
                    ]}
                    footerComponent={tempUser.storage.handlers.call(tempUser, success, failure)}
                    iconComponent={ item => item } />
      }
      return <Editor user={user} />
    },
    builder: (user, success, failure) => {
      function Builder(props){
        const [tempUser, updateTempUser] = React.useState(props.user)
        const updateHandler = newState => updateTempUser(tempUser.update(newState))

        return  <List className="container"
                    headerComponent={<header>{props.user.display.card(props.user)}</header>}
                    tableData={[
                      tempUser.components.setUsername(tempUser, updateHandler),
                      tempUser.components.setPassword(tempUser, updateHandler)
                    ]}
                    footerComponent={tempUser.storage.handlers.call(tempUser, success, failure)}
                    iconComponent={ item => item } />
      }
      return <Builder user={user} />
    }
  },
  tools: {
    getDisplayName: user => user.username,
    getProperties: user => {
      return []
    },
    getAssignedAgents: user => {
      return []
    }
  },
  components: {
    setUsername: (user, updateHandler) => {

      return  <div className="container-row border-bottom">
                <div className="container-item item-label">Set Username</div>
                <input className="container-item container-fill"
                    type="text"
                    value={user.username}
                    onChange={() => updateHandler({username: event.target.value})} />
              </div>
    },
    setPassword: (user, updateHandler) => {

      return  <div className="container-row border-bottom">
                <div className="container-item item-label">Reset Password</div>
                <input className="container-item container-fill"
                    type="text"
                    placeholder="enter new password"
                    onChange={() => updateHandler({password: event.target.value})} />
              </div>
    }
  }
})

export { prototype }
