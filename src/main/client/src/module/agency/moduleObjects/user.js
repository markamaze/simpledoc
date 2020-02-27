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
    },
    property_values: {
      setValue: function(values){
        if(values === null || values === undefined) this.property_values = {}
        else if(!this.properties.property_values.validate(values)) throw "invalid property: Agency.Agent.property_values"
        else this.property_values = values
        return true
      },
      getObject: function(){ return agencyState["property"][this.property_values] },
      validate: ()=>{ return true }
    }
  },
  display: {
    card: user => {
      return  <div className="user container-row">{user.username}</div>
    },
    document: user => {
      return  <div className="user document">
                <header>{`User: ${user.username}`}</header>
                <div className="container-fill">
                  <div className="container-row border-bottom">
                    <div className="container-item item-label">Username:</div>
                    <div className="container-item container-fill">{user.username}</div>
                  </div>

                  <div className="container-row border-bottom">
                    <div className="container-item item-label">Active Agents:</div>
                    <div className="container-item container-fill">
                      {
                        user.typeFunctions.getUserAgents(user).map( agent =>
                          <div className="container-item">{agent.display.card(agent)}</div>)
                      }
                    </div>
                  </div>

                  <div className="container-row border-bottom">
                    <div className="container-item item-label">Properties:</div>
                    <div className="container-item container-fill">
                      {
                        user.typeFunctions.getProperties(user).length < 1 ?
                          "no properties"
                          : user.typeFunctions.getProperties(user).map( property =>
                          property.display.document(property, user.property_values[property.id]))
                      }
                    </div>
                  </div>
                </div>
              </div>

    },
    editor: (user, updateHandler) => {
      function Editor(props) {
        const [tempUser, updateTempUser] = React.useState(props.user)
        const updateHandler = newState => props.updateHandler ? props.updateHandler(newState)
          : updateTempUser(Object.assign(Object.create(Object.getPrototypeOf(tempUser)), tempUser, newState))

        return  <div className="user document">
                  <header>Edit User Property Values</header>
                  <div className="container-fill">

                    <div className="container-row border-bottom">
                      <div className="container-item item-label">Properties:</div>
                      <div className="container-item container-fill">
                        {
                          tempUser.typeFunctions.getProperties(tempUser).length < 1 ?
                            "no properties"
                            : tempUser.typeFunctions.getProperties(tempUser).map( property =>
                            property.display.editor(property, tempUser.property_values[property.id], newValue => updateHandler({property_values: Object.assign({}, tempUser.property_values, { [`${property.id}`]: newValue })})))
                        }
                      </div>
                    </div>

                  </div>

                  { props.updateHandler ? null : tempUser.storage.handlers.call(tempUser) }

                </div>
      }
      return <Editor user={user} updateHandler={updateHandler} />
    },
    builder: (user) => {
      function Builder(props){
        const [tempUser, updateTempUser] = React.useState(props.user)
        const updateHandler = newState => updateTempUser(Object.assign(Object.create(Object.getPrototypeOf(tempUser)), tempUser, newState))

        return  <div className="user document">
                  <header>Modify User</header>
                  <div className="container-fill">

                    <div className="container-row border-bottom">
                      <div className="container-item item-label">Set Username</div>
                      <input className="container-item container-fill"
                          type="text"
                          value={tempUser.username}
                          onChange={() => updateHandler({username: event.target.value})} />
                    </div>

                    <div className="container-row border-bottom">
                      <div className="container-item item-label">Reset Password</div>
                      <input className="container-item container-fill"
                          type="text"
                          placeholder="enter new password"
                          onChange={() => updateHandler({password: event.target.value})} />
                    </div>

                  </div>

                  { tempUser.storage.handlers.call(tempUser) }

                </div>
      }
      return <Builder user={user} />
    }
  },
  typeFunctions: {
    getUserAgents: user => Object.values(agencyState().agent).filter(agent => agent.agent_user_id === user.id),
    getUserDataTags: user => {
      let tagSet = []
      user.typeFunctions.getUserAgents(user).forEach( agent => {
        agent.typeFunctions.getDataTags(agent).forEach(dataTag => { tagSet = [...tagSet, dataTag]})
      })
      return tagSet
    },
    getProperties: user => {
      let state = agencyState()
      let propertySet = []

      user.typeFunctions.getUserDataTags(user)
        .map( tag => tag.dataTag_property_ids.forEach(propId => { propertySet = [...propertySet, state.property[propId]] }))

        return propertySet
    },
  }
})



const displayProps = agencyState => ({
  displayKey: "username",
  component: {
    list: {
      columns: [{selector: "username"}],
      tableData: Object.values(agencyState.user),
      listActions: [
        {label: "New User", action: () => {
          let newUser = agencyObject("user", {id: "new_object", username:"new user", password: "password"}, err=>{throw err})
          return newUser.display.builder(newUser)
        }}
      ],
      drawerComponents: [
        {label: "show document", component: item => item.display.document(item)},
      ],
      overlayComponents: [
        {label: "edit properties", component: item => item.display.editor(item)},
        {label: "modify user", component: item => item.display.builder(item)}
      ]
    }
  }
})


export { prototype, displayProps }
