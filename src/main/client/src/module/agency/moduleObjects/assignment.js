import React from 'react'
import { agencyObject } from './agencyObject'
import List from '../../../components/List'



const prototype = (getStore, services, utilities) => ({
  type: () => "assignment",
  properties: {
    id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.Assignment.id"
        else if(!this.properties.id.validate(id)) throw "invalid property: Agency.Assignment.id"
        else this.id = id
        return true
      },
      validate: ()=>{ return true }
    },
    agentTemplate_id: {
      setValue: function(id){
        if(id === null || id === undefined) this.agentTemplate_id = null
        // throw "missing required property: Agency.Assignment.agentTemplate_id"
        else if(!this.properties.agentTemplate_id.validate(id)) throw "invalid property: Agency.Assignment.agentTemplate_id"
        else this.agentTemplate_id = id
        return true
      },
      validate: ()=>{ return true }
    },
    supervising_assignment_id: {
      setValue: function(id){
        if(id === null || id === undefined) this.supervising_assignment_id = null
        // throw "missing required property: Agency.Assignment.supervising_assignment_id"
        else if(!this.properties.supervising_assignment_id.validate(id)) throw "invalid property: Agency.Assignment.supervising_assignment_id"
        else this.supervising_assignment_id = id
        return true
      },
      validate: ()=>{ return true }
    },
    assignment_for_structuralNode_id: {
      setValue: function(id){
        if(id === null || id === undefined) this.assignment_for_structuralNode_id = null
        else if(!this.properties.assignment_for_structuralNode_id.validate(id)) throw "invalid property: Agency.Assignment.assignment_for_structuralNode_id"
        else this.assignment_for_structuralNode_id = id
        return true
      },
      validate: (id) => true
    },
    supervisor_for_structuralNode_id: {
      setValue: function(id){
        if(id === null || id === undefined) this.supervisor_for_structuralNode_id = null
        else if(!this.properties.supervisor_for_structuralNode_id.validate(id)) throw "invalid property: Agency.Assignment.supervisor_for_structuralNode_id"
        else this.supervisor_for_structuralNode_id = id
        return true
      },
      validate: id => true
    }
  },
  display: {
    card: assignment => <div className="container-item">
      {assignment.tools.getDisplayLabel(assignment)}
    </div>,
    document: assignment => {
      let position = assignment.agencyTools.getAgentTemplates(assignment)
      let supervisorAssignment = assignment.agencyTools.getSupervisor(assignment)
      let supervisorTemplate = supervisorAssignment.agencyTools.getAgentTemplates(assignment)
      let supervisorAgent = supervisorAssignment.agencyTools.getActiveAgents(supervisorAssignment)

      return  <List className="container"
                  headerComponent={<header>Assignment Document</header>}
                  tableData={[
                    {label: "Position",
                      display: position.tools.getDisplayLabel(position)},
                    {label: "Reports To",
                      display: supervisorAssignment === null ? <div>node supervisor</div> : supervisorAgent.tools.getDisplayLabel(supervisorAgent)}
                  ]}
                  columns={[{selector: "label", selectable: false}, {selector: "display", selectable: false}]} />
    },
    builder: (assignment, close, alert) => {
      function Builder(props){
        const [tempAssignment, updateTempAssignment] = React.useState(props.assignment)
        const updateHandler = newState =>
          updateTempAssignment(tempAssignment.moduleTools.updateObject(newState, tempAssignment))

        return  <List className="container"
                    headerComponent={<div>Modify Assignment</div>}
                    tableData={[
                      tempAssignment.components.setTemplate(tempAssignment, updateHandler),
                      tempAssignment.components.setSupervisor(tempAssignment, updateHandler)
                    ]}
                    footerComponent={ tempAssignment.storage.handlers.call(tempAssignment, close, alert) }
                    iconComponent={ item => item } />
      }
      return <Builder assignment={assignment} />
    }
  },
  tools: {
    getDisplayLabel: (assignment) => {
      let store = getStore()

      let assignedTemplate = store.agentTemplate[assignment.agentTemplate_id]
      let assignmentNode = store.structuralNode[assignment.assignment_for_structuralNode_id]

      return `${assignedTemplate.tools.getDisplayLabel(assignedTemplate)} : ${assignmentNode.tools.getDisplayLabel(assignmentNode)}`
    }
  },
  components: {
    setTemplate: (assignment, updateHandler) => {

      return  <div className="container-row border-bottom">
                <div className="container-item item-label">Set AgentTemplate</div>
                <select className="container-item container-fill"
                    onChange={() => updateHandler({agentTemplate_id: event.target.value})}
                    value={assignment.agentTemplate_id} >
                  <option value=""></option>
                  {
                    Object.values(getStore().agentTemplate).map(template =>
                      <option value={template.id}>{template.agentTemplate_label}</option>)
                  }
                </select>
              </div>
    },
    setSupervisor: (assignment, updateHandler) => {

      return  <div className="container-row border-bottom">
        <div className="container-item item-label">set assignment supervisor</div>
        <select className="container-item container-fill"
            onChange={() => updateHandler({supervising_assignment_id: event.target.value})}
            value={assignment.supervising_assignment_id} >
          <option value=""></option>
          {
            Object.values(getStore().assignment).map( assignment => {
              let assignmentTemplate = getStore().agentTemplate[assignment.agentTemplate_id]
              return <option value={assignment.id}>{assignmentTemplate.agentTemplate_label}</option>
            })
          }
        </select>
      </div>
    }
  }
})

export { prototype }
