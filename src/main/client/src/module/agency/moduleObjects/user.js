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
      let store = agencyState()
      return  <div className="user container-fill">

                <div className="container-row btm-border">{ user.display.card(user) }</div>

                <div className="container-row">
                  <label>username:</label>
                  <input type="text" disable value={user.username} />
                </div>
              </div>
    },
    editor: (user, updateHandler) => {
      function Editor(props) {
        const [tempUser, updateTempUser] = React.useState(props.user)
        const updateHandler = newState => props.updateHandler ? props.updateHandler(newState)
          : updateTempUser(Object.assign(Object.create(Object.getPrototypeOf(tempUser)), tempUser, newState))

        return  <div className="user container-fill">
                  <div className="container-fill">
                    <div className="container-row btm-border">{ tempUser.display.card(tempUser) }</div>

                    <div className="container">
                      <label>Property Values</label>
                    </div>
                  </div>

                  { props.updateHandler ? null : tempUser.storage.handlers.call(tempUser) }

                </div>
      }
      return <Editor user={user} updateHandler={updateHandler} />
    },
    builder: (user, updateHandler) => {
      function Builder(props){
        const [tempUser, updateTempUser] = React.useState(props.user)
        const updateHandler = newState => props.updateHandler ? props.updateHandler(newState)
          : updateTempUser(Object.assign(Object.create(Object.getPrototypeOf(tempUser)), tempUser, newState))

        return  <div className="user container-fill">
                  <div className="container-fill">

                    <div className="container-row btm-border">{tempUser.display.card(tempUser)}</div>

                    <div className="container-row">
                      <label>set username:</label>
                      <input value={tempUser.username}
                            onChange={() => updateHandler({username: event.target.value})} />
                    </div>

                    <div className="container-row">
                      <label>update password:</label>
                      <input value={tempUser.password}
                            onChange={() => updateHandler({password: event.target.value})} />
                    </div>
                  </div>

                  { props.updateHandler ? null : tempUser.storage.handlers.call(tempUser) }

                </div>
      }
      return <Builder user={user} updateHandler={updateHandler} />
    }
  },
  typeFunctions: {}
})



const displayProps = agencyState => ({
  displayKey: "username",
  component: {
    list: {
      columns: {
        limited: [{label: "Username", selector: "username"}],
        expanded: [
          {label: "Username", selector: "username"}
        ]
      },
      tableData: Object.values(agencyState.user),
      listActions: [
        {label: "New User", action: () => {
          let newUser = agencyObject("user", {id: "new_object", username:"new user", password: "password"}, err=>{throw err})
          return newUser.display.builder(newUser)
        }}
      ],
      drawerComponents: [
        {label: "card", component: item => item.display.card(item)},
      ],
      overlayComponents: [
        {label: "document", component: item => item.display.document(item)},
        {label: "editor", component: item => item.display.editor(item)},
        {label: "builder", component: item => item.display.builder(item)}
      ]
    }
  }
})


export { prototype, displayProps }
