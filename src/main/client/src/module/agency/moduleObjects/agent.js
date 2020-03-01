import React from 'react'
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
                <div className="container-item">{agent.typeFunctions.getAssignedUser(agent).username}</div>
                <div className="container-item">{agent.typeFunctions.getAssignedAgentTemplate(agent).agentTemplate_label}</div>
              </div>
    },
    document: agent => {
      let assignedUser = agent.typeFunctions.getAssignedUser(agent)
      let assignedNode = agent.typeFunctions.getAssignedNode(agent)
      let assignedTemplate = agent.typeFunctions.getAssignedAgentTemplate(agent)
      return  <div className="agent document">
                <header>Agent Document</header>

                <div className="container-fill">
                  <div className="container-row border-bottom">
                    <div className="container-item item-label">Assigned User:</div>
                    <div className="container-item item-fill">{assignedUser.display.card(assignedUser)}</div>
                  </div>

                  <div className="container-row border-bottom">
                    <div className="container-item item-label">Assigned Node:</div>
                    <div className="container-item item-fill">{assignedNode.display.card(assignedNode)}</div>
                  </div>

                  <div className="container-row">
                    <div className="container-item item-label">Position:</div>
                    <div className="container-item item-fill">{assignedTemplate.display.card(assignedTemplate)}</div>
                  </div>

                </div>
              </div>
    }
  },
  typeFunctions: {
    getAssignedAgentTemplate: agent => agencyState().agentTemplate[agencyState().assignment[agent.assignment_id].agentTemplate_id],
    getAssignedUser: agent => agent.agent_user_id === undefined ? null : agencyState().user[agent.agent_user_id],
    getAssignedNode: agent => agencyState().structuralNode[agent.structuralNode_id],
    getProperties: agent => {
      let state = agencyState()
      let properties = []

      agent.typeFunctions.getDataTags(agent).map( dataTag => {
        dataTag.dataTag_property_ids.forEach( id => {
          properties = [...properties, state.property[id]]
        })
      })
      return properties
    },
    getDataTags: agent => {
      let state = agencyState()
      return state.agentTemplate[state.assignment[agent.assignment_id].agentTemplate_id].agentTemplate_dataTag_ids.map( id => state.dataTag[id])
    },
    getAssignedNode: agent => agencyState().structuralNode[agent.structuralNode_id],
    getDisplayLabel: agent => {
      let title = agent.typeFunctions.getAssignedAgentTemplate(agent).agentTemplate_label
      let user = agent.typeFunctions.getAssignedUser(agent)

      return `${title}:${user.typeFunctions.getDisplayLabel(user)}`
    }
  }
})


const displayProps = agencyState => ({
  displayKey: "",
  component: {
    list: {
      tableData: Object.values(agencyState.agent).map(agent => ({data: agent, display: agent.display.card(agent)})),
      columns: [{selector: "display"}],
      drawerComponents: [
        {label: "document", component: item => item.data.display.document(item.data)}
      ]
    }
  }
})


export { prototype, displayProps }
