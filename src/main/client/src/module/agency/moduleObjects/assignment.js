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
    card: assignment => {
      let position = agencyState().agentTemplate[assignment.agentTemplate_id]

      return  <div className="assignment container-row">{`Position: ${position.agentTemplate_label}`}</div>
    },
    document: assignment => {
      let store = agencyState()
      let position = store.agentTemplate[assignment.agentTemplate_id]
      let supervisor = assignment.supervising_assignment_id === null ? null : store.agentTemplate[store.assignment[assignment.supervising_assignment_id].agentTemplate_id]

      return  <div className="assignment container-fill">
                <div className="container-row">{`Position: ${position.agentTemplate_label}`}</div>
                <div className="container-row">{`Reports To: ${supervisor === null ? "node supervisor"
                    : supervisor.agentTemplate_label}`}</div>
              </div>
    },
    builder: (assignment, updateHandler) => {
      function Builder(props){
        const [tempAssignment, updateTempAssignment] = React.useState(props.assignment)
        const updateHandler = newState => props.updateHandler ? props.updateHandler(newState)
          : updateTempAssignment(Object.assign(Object.create(Object.getPrototypeOf(tempAssignment)), tempAssignment, newState))


        return  <div className="assignment container-fill">

                  <div className="container-fill">
                    <div className="container-row">
                      <label>Set AgentTemplate</label>
                      <select onChange={() => updateHandler({agentTemplate_id: event.target.value})}
                              value={tempAssignment.agentTemplate_id} >
                          <option value=""></option>
                          {
                            Object.values(agencyState().agentTemplate).map(template =>
                              <option value={template.id}>{template.agentTemplate_label}</option>)
                          }
                      </select>
                    </div>

                    <div className="container-row">
                      <label>set assignment supervisor</label>
                      <select onChange={() => updateHandler({supervising_assignment_id: event.target.value})}
                              value={tempAssignment.supervising_assignment_id} >
                          <option value=""></option>
                          {
                            Object.values(agencyState().assignment).map( assignment => {
                              let assignmentTemplate = agencyState().agentTemplate[assignment.agentTemplate_id]
                              return <option value={assignmentTemplate.id}>{assignmentTemplate.agentTemplate_label}</option>
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

  }
})


const displayProps = agencyState => ({
  displayKey: "id",
  component: {
    list: {
      columns: {
        limited: [{label: "", selector: "id"}],
        expanded: [{label: "", selector: "id"}]
      },
      tableData: Object.values(agencyState.assignment),
      listActions: [
        {label: "New Assignment", action: () => {
          let newAssignment = agencyObject("assignment", {id: "new_object"}, err=>{throw err})
          return newAssignment.display.builder(newAssignment)
        }}
      ],
      drawerComponents: [
        {label: "document", component: item => item.display.document(item)}
      ],
      overlayComponents: [
        {label: "builder", component: item => item.display.builder(item)}
      ]
    }
  }
})


export { prototype, displayProps }
