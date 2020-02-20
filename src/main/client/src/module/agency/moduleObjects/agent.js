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
      let state = agencyState()
      return  <div className="agent container-row">
                <div>{state.user[agent.agent_user_id].username}</div>
                <div>{agent.typeFunctions.getAgentTemplateLabel(agent)}</div>
              </div>
    },
    document: agent => {
      let state = agencyState()
      return  <div className="agent container-fill">
                <div className="container-row">
                  <label>Assigned User</label>
                  <div>{agent.typeFunctions.getAssignedUsername(agent)}</div>
                </div>
                <div className="container-row">
                  <label>Assigned Node</label>
                  <div>{agent.typeFunctions.getAssignedNodeLabel(agent)}</div>
                </div>
                <div className="container-row">
                  <label>Position</label>
                  <div>{agent.typeFunctions.getAgentTemplateLabel(agent)}</div>
                </div>
              </div>
    },
    builder: (agent, updateHandler) => {
      function Builder(props){

        const [tempAgent, updateTempAgent] = React.useState(props.agent)
        const updateHandler = newState => props.updateHandler ? props.updateHandler(newState) :
          updateTempAgent(Object.assign(Object.create(Object.getPrototypeOf(tempAgent)), tempAgent, newState))

        const state = agencyState()

        return  <div className="agent container-fill">

                  <div className="container-fill">

                    { tempAgent.display.document(tempAgent) }

                    <div className="container-row">
                      <label>Assign User</label>
                      <select value={tempAgent.agent_user_id}
                              onChange={() => updateHandler({agent_user_id: event.target.value})}>
                        {
                          Object.values(state.user).map( user =>
                            <option value={user.id}>{user.username}</option>)
                        }
                      </select>
                    </div>


                  </div>

                  { props.updateHandler ? null : tempAgent.storage.handlers.call(tempAgent) }

                </div>
      }

      return <Builder agent={agent} updateHandler={updateHandler} />
    }
  },
  typeFunctions: {
    getAgentTemplateLabel: agent => agencyState().agentTemplate[agencyState().assignment[agent.assignment_id].agentTemplate_id].agentTemplate_label,
    getAssignedUsername: agent => agent.agent_user_id === undefined ? "unassigned" : agencyState().user[agent.agent_user_id].username,
    getAssignedNodeLabel: agent => agencyState().structuralNode[agent.structuralNode_id].structuralNode_label,

  }
})


const displayProps = agencyState => ({
  displayKey: "",
  component: {
    list: {
      iconComponent: agent => agent.display.card(agent),
      tableData: Object.values(agencyState.agent),
      listActions: [],
      drawerComponents: [
        {label: "document", component: item => item.display.document(item)}
      ],
      overlayComponents: [
        {label: "modify", component: item => item.display.builder(item)}
      ]
    }
  }
})


export { prototype, displayProps }
