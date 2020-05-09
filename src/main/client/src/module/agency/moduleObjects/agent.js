import React from 'react'
import { agencyObject } from './agencyObject'
import List from '../../../components/List'


//TODO: move and import
const utility = {
  validateId: id => true, //handle flags
  validateString: (string, params) => true,

}


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
      validate: id => utility.validateId(id)
    },
    agent_user_id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.Agent.agent_user_id"
        else if(!this.properties.agent_user_id.validate(id)) throw "invalid property: Agency.Agent.agent_user_id"
        else this.agent_user_id = id
        return true
      },
      validate: id => utility.validateId(id)
    },
    node_id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.Agent.node_id"
        else if(!this.properties.node_id.validate(id)) throw "invalid property: Agency.Agent.node_id"
        else this.node_id = id
        return true
      },
      validate: id => utility.validateId(id)
    },
    assignment_id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.Agent.assignment_id"
        else if(!this.properties.assignment_id.validate(id)) throw "invalid property: Agency.Agent.assignment_id"
        else this.assignment_id = id
        return true
      },
      validate: id => utility.validateId(id)
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
      // let assignedTemplate = agent.tools.getAssignedAgentTemplate(agent)

      return  <List className="container"
                  headerComponent={<header>Agent Document</header>}
                  tableData={[
                    { label: "assigned User", display: assignedUser.display.card(assignedUser) },
                    { label: "assigned Node:", display: assignedNode.display.card(assignedNode) },
                    // { label: "assigned Template:", display: assignedTemplate.display.card(assignedTemplate) },
                    { label: "chain of command", display: agent.components.showChainOfCommand(agent) },
                    { label: "properties", display: agent.agencyComponents.showPropertyValues(agent.tools.getProperties(agent), assignedUser.property_values) },
                    { label: "data tags", display: agent.agencyComponents.showTags(agent.tools.getTags(agent)) },
                    { label: "subscriptions", display: agent.agencyComponents.showSubscriptions(agent.tools.getSubscriptions(agent)) }
                  ]}
                  columns={[{selector: "label", selectable: false}, {selector: "display", selectable: false}]} />

    }
  },
  tools: {
    getAssignedUser: agent => getStore().user[agent.agent_user_id],
    getAssignedNode: agent => getStore().node[agent.node_id],
    getProperties: agent => [],
    getSubscriptions: agent => [],
    getTags: agent => []
  },
  components: {
    showChainOfCommand: agent => {
      return  <div>show agent's chain of command</div>
    }
  }
})


export { prototype }
