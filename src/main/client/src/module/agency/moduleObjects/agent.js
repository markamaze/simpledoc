import React from 'react'
import uuidv4 from 'uuid/v4'
import { agencyObject } from './agencyObject'



const prototype = agencyState => ({
  type: () => "agent",
  properties: {
    id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.Agent.id"
        else if(!this.properties.id.validate(id)) throw "invalid property: Agency.Agent.id"
        else this.id = id
        return true
      },
      getObject: function(){ return this.id},
      validate: id => { return true }
    },
    agent_user_id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.Agent.agent_user_id"
        else if(!this.properties.agent_user_id.validate(id)) throw "invalid property: Agency.Agent.agent_user_id"
        else this.agent_user_id = id
        return true
      },
      getObject: function(){ return agencyState["user"][this.agent_user_id] },
      validate: id => { return true }
    },
    structuralNode_id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.Agent.structuralNode_id"
        else if(!this.properties.structuralNode_id.validate(id)) throw "invalid property: Agency.Agent.structuralNode_id"
        else this.structuralNode_id = id
        return true
      },
      getObject: function(){ return agencyState["structuralNode"][this.structuralNode_id] },
      validate: ()=>{ return true }
    },
    assignment_id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.Agent.assignment_id"
        else if(!this.properties.assignment_id.validate(id)) throw "invalid property: Agency.Agent.assignment_id"
        else this.assignment_id = id
        return true
      },
      getObject: function(){ return agencyState["assignment"][this.assignment_id] },
      validate: ()=>{ return true }
    }
  },
  display: {
    card: agent => {
      return  <div className="agent container-row">{agencyState().user[agent.agent_user_id].username}</div>
    },
    document: agent => {
      return  <div className="agent container-fill">
                <div className="container-row">
                  agent document: {agent.id}
                </div>
              </div>
    },
    builder: (agent, updateHandler) => {
      function Builder(props){

        return  <div className="agent container-fill">
                  <div className="container-row">
                    agent builder: {agent.id}
                  </div>
                </div>
      }

      return <Builder agent={agent} updateHandler={updateHandler} />
    }
  }
})


const displayProps = agencyState => ({
  displayKey: "",
  component: {
    list: {
      columns: {
        limited: [{label: "", selector: "id"}],
        expanded: [{label: "", selector: "id"}]
      },
      tableData: Object.values(agencyState.agent),
      listActions: [{label: "New Agent", action: () => {
        let newAgent = agencyObject("agent", {id: "new_object"}, err=>{console.log(err)})
        return newAgent.display.builder(newAgent)
      }}],
      drawerComponents: [
        {label: "card", component: item => item.display.card(item)},
        {label: "document", component: item => item.display.document(item)},
        {label: "modify", component: item => item.display.builder(item)}
      ],
      overlayComponents: []
    }
  }
})


export { prototype, displayProps }
