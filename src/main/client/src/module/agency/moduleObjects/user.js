import React from 'react'
import { agencyObject } from './agencyObject'
import List from '../../../components/List'



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
      return  <div className="user container">
                <header>{`User: ${user.username}`}</header>
                <div className="row">
                  <List className="col-md-6"
                      headerComponent={<div>Active Agents:</div>}
                      columns={[{selector:"display"}]}
                      tableData={user.typeFunctions.getUserAgents(user).map(agent => ({display: agent.typeFunctions.getDisplayLabel(agent), data: agent}))}
                      drawerComponents={[{component: item => item.data.display.document(item.data)}]} />

                  <List className="col-md-6"
                      headerComponent={<div>Properties:</div>}
                      tableData={user.typeFunctions.getProperties(user).map(property => ({display: property.display.document(property, user.property_values[property.id])}))}
                      columns={[{selector: "display"}]} />
                </div>
              </div>

    },
    editor: (user, success, failure) => {
      function Editor(props) {
        const [tempUser, updateTempUser] = React.useState(props.user)
        const updateHandler = newState => updateTempUser(Object.assign(Object.create(Object.getPrototypeOf(tempUser)), tempUser, newState))

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

                  { tempUser.storage.handlers.call(tempUser, success, failure) }

                </div>
      }
      return <Editor user={user} />
    },
    builder: (user, success, failure) => {
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

                  { tempUser.storage.handlers.call(tempUser, success, failure) }

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
    getProperties: user => Object.keys(user.property_values).map( property_id => agencyState().property[property_id]),
    getDisplayLabel: user => {
      return user.username
    }
  }
})



const displayProps = agencyState => ({
  displayKey: "username",
  component: {
    list: {
      columns: [{selector: "username"}],
      tableData: Object.values(agencyState.user),
      listActions: [
        {label: "New User", action: (close, alert) => {
          let newUser = agencyObject("user", {id: "new_object", username:"new user", password: "password"}, alert )
          return newUser.display.builder(newUser, close, alert)
        }}
      ],
      drawerComponents: [
        {label: "show document", component: item => item.display.document(item)},
      ],
      overlayComponents: [
        {label: "edit properties", component: (item, close, alert) => item.display.editor(item, close, alert)},
        {label: "modify user", component: (item, close, alert) => item.display.builder(item, close, alert)}
      ]
    }
  }
})


export { prototype, displayProps }
