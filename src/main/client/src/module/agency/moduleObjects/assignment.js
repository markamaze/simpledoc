import React from 'react'
import { agencyObject } from './agencyObject'



const prototype = agencyState => ({
  type: () => "assignment",
  properties: {
    id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.Assignment.id"
        else if(!this.properties.id.validate(id)) throw "invalid property: Agency.Assignment.id"
        else this.id = id
        return true
      },
      getObject: function(){ return this.id },
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
      getObject: function(){ return agencyState["agentTemplate"][this.agentTemplate_id] },
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
      getObject: function(){ return agencyState["assignment"][id] },
      validate: ()=>{ return true }
    }
  },
  display: {
    card: assignment =>
      <div className="assignment container">
        {assignment.typeFunctions.getTemplate(assignment).agentTemplate_label}
      </div>,
    document: assignment => {
      let position = assignment.typeFunctions.getTemplate(assignment)
      let supervisor = assignment.typeFunctions.getSupervisorTemplate(assignment)

      return  <div className="assignment container-row">
                <div className="container-item">{`Position: ${position.agentTemplate_label}`}</div>
                <div className="container-item">{`Reports To: ${supervisor === null ? "node supervisor"
                    : supervisor.agentTemplate_label}`}</div>
              </div>
    },
    builder: (assignment, updateHandler) => {
      function Builder(props){
        const [tempAssignment, updateTempAssignment] = React.useState(props.assignment)
        const updateHandler = newState => props.updateHandler ? props.updateHandler(newState)
          : updateTempAssignment(Object.assign(Object.create(Object.getPrototypeOf(tempAssignment)), tempAssignment, newState))


        return  <div className="assignment document">

                  <header>Modify Assignment</header>

                  <div className="container-fill">
                    <div className="container-row border-bottom">
                      <div className="container-item item-label">Set AgentTemplate</div>
                      <select className="container-item container-fill"
                          onChange={() => updateHandler({agentTemplate_id: event.target.value})}
                          value={tempAssignment.agentTemplate_id} >
                        <option value=""></option>
                        {
                          Object.values(agencyState().agentTemplate).map(template =>
                            <option value={template.id}>{template.agentTemplate_label}</option>)
                        }
                      </select>
                    </div>

                    <div className="container-row border-bottom">
                      <div className="container-item item-label">set assignment supervisor</div>
                      <select className="container-item container-fill"
                          onChange={() => updateHandler({supervising_assignment_id: event.target.value})}
                          value={tempAssignment.supervising_assignment_id} >
                        <option value=""></option>
                        {
                          Object.values(agencyState().assignment).map( assignment => {
                            let assignmentTemplate = agencyState().agentTemplate[assignment.agentTemplate_id]
                            return <option value={assignment.id}>{assignmentTemplate.agentTemplate_label}</option>
                          })
                        }
                      </select>
                    </div>
                  </div>

                  { props.updateHandler ? null : tempAssignment.storage.handlers.call(tempAssignment) }
                </div>
      }
      return <Builder assignment={assignment} updateHandler={updateHandler} />
    }
  },
  typeFunctions: {
    getTemplate: assignment => agencyState().agentTemplate[assignment.agentTemplate_id],
    getSupervisorTemplate: assignment => assignment.supervising_assignment_id === null ? null : agencyState().agentTemplate[agencyState().assignment[assignment.supervising_assignment_id].agentTemplate_id],
    getDisplayLabel: assignment => `${assignment.typeFunctions.getTemplate(assignment).agentTemplate_label} - reports to - ${assignment.typeFunctions.getSupervisorTemplate(assignment) ? assignment.typeFunctions.getSupervisorTemplate(assignment).agentTemplate_label : " node supervisor"}`
  }
})


const displayProps = agencyState => ({
  displayKey: "id",
  component: {
    list: {
      columns: [{selector: "display"}],
      tableData: Object.values(agencyState.assignment).map(assignment => ({data: assignment, display: assignment.display.document(assignment)})),
      listActions: [
        {label: "New Assignment", action: () => {
          let newAssignment = agencyObject("assignment", {id: "new_object"}, err=>{throw err})
          return newAssignment.display.builder(newAssignment)
        }}
      ],
      overlayComponents: [{label: "modify", component: item => item.data.display.builder(item.data)}]
    }
  }
})


export { prototype, displayProps }
