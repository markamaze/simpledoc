import React from 'react'
import DataTableWrapper from '../../../components/DataTableWrapper'




const assignmentsColumns = props => ([
    {
      name:"agentTemplate", ignoreRowClick: true, cell: row => {
      if(!row) return null
      else {
        let template = props.agentTemplates.find(template => template.id === row.agentTemplate_id)
        if(template) return template.agentTemplate_label
        else return null
      }}
    },
    {
      name: "reports to", ignoreRowClick: true, cell: row => {
      if(!row) return null
      else if(row.reports_to === 'supervisor') return "supervisor"
      else return props.agentTemplates.find(template => template.id === row.reports_to).agentTemplate_label }
    },
    {
      name: "implement_agent", ignoreRowClick: true, cell: row => {
        return <div onClick={() => props.updateValues(props.propertyName, [...props.implementedAssignments, {...row, assignment_id: "new_assignment" }])}>implement</div>
      }
    }
])

const implementedColumns = props => ([
  {
    name: "Implemented Agent", ignoreRowClick: true, cell: row => {
      if(!row) return null
      else {
        let template = props.agentTemplates.find(template => template.id === row.agentTemplate_id)
        if(template) return template.agentTemplate_label
        else return null
    }}
  },
  {
    name: "Assigned User", ignoreRowClick: true, cell: row => !row ? null :
      row.assigned_user_id
        ? props.users.find( user => user.id === row.assigned_user_id).username
        : <select value={row.assigned_user_id} onChange={() => props.updateValues(props.propertyName, props.implementedAssignments.map( impl => impl.assignment_id !== row.assignment_id ? impl : Object.assign({}, row, { assigned_user_id: event.target.value })))}>
        <option value=""></option>
          {
            props.users.map(user => <option value={user.id}>{user.username}</option>)
          }
      </select>
  },
  {
    name: "deactivate", ignoreRowClick: true, cell: row => {
      if(!row) return null
      else return <div onClick={()=> props.updateValues(props.propertyName, props.implementedAssignments.filter(ia => ia.assignment_id !== row.assignment_id))}>x</div>
    }
  }
])

const combineAssignments = (ownAssignments, inheritedAssignments) => {
    let tempAssignments = [...ownAssignments]

    inheritedAssignments.forEach( assignment => {
      assignment.data.forEach( asgn => { tempAssignments.push(asgn) }) })

    return tempAssignments
  }


function AssignmentEditor(props){
  let agentAssignments = props.agentAssignments ? props.agentAssignments : []
  let inheritedAssignments = props.inheritedAssignments ? props.inheritedAssignments : []

  return  <div>
            <header>Assignment Editor</header>
            <DataTableWrapper
                className="object-list"
                noHeader={true}
                columns={assignmentsColumns(props)}
                data={combineAssignments(agentAssignments, inheritedAssignments)} />

            <DataTableWrapper
                className="object-list"
                noHeader={true}
                columns={implementedColumns(props)}
                data={props.implementedAssignments} />

          </div>
}

export default AssignmentEditor
