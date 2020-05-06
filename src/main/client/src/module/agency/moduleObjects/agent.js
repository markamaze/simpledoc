import React from 'react'
import { agencyObject } from './agencyObject'
import List from '../../../components/List'


const prototype = (getStore, services, utilities) => ({
  type: () => "agent",
  properties: {
    id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.Agent.id"
        else if(!this.properties.id.validate(id)) throw "invalid property: Agency.Agent.id"
        else this.id = id
        return true
      },
      validate: id => { return true }
    },
    agent_user_id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.Agent.agent_user_id"
        else if(!this.properties.agent_user_id.validate(id)) throw "invalid property: Agency.Agent.agent_user_id"
        else this.agent_user_id = id
        return true
      },
      validate: id => { return true }
    },
    structuralNode_id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.Agent.structuralNode_id"
        else if(!this.properties.structuralNode_id.validate(id)) throw "invalid property: Agency.Agent.structuralNode_id"
        else this.structuralNode_id = id
        return true
      },
      validate: ()=>{ return true }
    },
    assignment_id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.Agent.assignment_id"
        else if(!this.properties.assignment_id.validate(id)) throw "invalid property: Agency.Agent.assignment_id"
        else this.assignment_id = id
        return true
      },
      validate: ()=>{ return true }
    }
  },
  display: {
    card: agent => {
      let user = agent.agencyTools.getUsers(agent)
      let template = agent.agencyTools.getAgentTemplates(agent)
      let node = agent.agencyTools.getStructuralNode(agent)
      return  <div className="container-row">
                <div className="container-item">{node.agencyTools.getDisplayLabel(node)}</div>
                <div className="container-item">{template.agencyTools.getDisplayLabel(template)}</div>
                <div className="container-item">{user.agencyTools.getDisplayLabel(user)}</div>
              </div>
    },
    document: agent => {
      let assignedUser = agent.tools.getAssignedUser(agent)
      let assignedNode = agent.tools.getAssignedNode(agent)
      let assignedTemplate = agent.tools.getAssignedAgentTemplate(agent)

      return  <List className="container"
                  headerComponent={<header>Agent Document</header>}
                  tableData={[
                    { label: "assigned User", display: assignedUser.display.card(assignedUser) },
                    { label: "assigned Node:", display: assignedNode.display.card(assignedNode) },
                    { label: "assigned Template:", display: assignedTemplate.display.card(assignedTemplate) },
                    { label: "chain of command", display: agent.components.showChainOfCommand(agent) },
                    { label: "properties", display: agent.agencyComponents.propertiesList(agent) },
                    { label: "data tags", display: agent.agencyComponents.dataTagList(agent) },
                    { label: "subscriptions", display: agent.agencyComponents.subscriptionsList(agent) }
                  ]}
                  columns={[{selector: "label", selectable: false}, {selector: "display", selectable: false}]} />

    }
  },
  tools: {},
  components: {
    showChainOfCommand: agent => {}
  }
})


export { prototype }
