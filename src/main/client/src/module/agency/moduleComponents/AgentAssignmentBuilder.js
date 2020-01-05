import React from 'react'
import DataTableWrapper from '../../../components/DataTableWrapper'



export default class AgentAssignmentBuilder extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      agentAssignments: this.props.agentAssignments ? this.props.agentAssignments : [],
      inheritedAssignments: this.props.inheritedAssignments ? this.props.inheritedAssignments : [],
      tempNewAssignment: {}
    }
  }

  addAssignment(){
    let updatedAssignments
    if(this.props.agentAssignments === undefined) updatedAssignments = [this.state.tempNewAssignment]
    else updatedAssignments = [...this.props.agentAssignments, this.state.tempNewAssignment]

    this.props.updateAssignments(this.props.propertyName, updatedAssignments)

    this.setState({
      agentAssignments: updatedAssignments,
      tempNewAssignment: { agentTemplate_id: undefined, reports_to: undefined }
    })
  }

  removeAssignment(dataRow){
    let updatedAssignments = this.state.agentAssignments.filter(asgn => asgn.agentTemplate_id !== dataRow.agentTemplate_id)

    this.props.updateAssignments(this.props.propertyName, updatedAssignments)

    this.setState({
      agentAssignments: updatedAssignments
    })
  }

  getAgentTemplateLabel(templateId){
    if(templateId === "supervisor") return "node supervisor"
    if(templateId === undefined) return undefined
    let template = this.props.agentTemplates.find( template => template.id === templateId)

    return template.agentTemplate_label === undefined ? "could not find label" : template.agentTemplate_label
  }

  assignmentsColumns(){
    return [
      { name: "Agent Template", ignoreRowClick: true, cell: row => {
              if(row.newAssignment)
                return  <select value={this.state.tempNewAssignment.agentTemplate_id} onChange={() => this.updateTempNewAssignment("agentTemplate_id", event.target.value)}>
                          <option value=""></option>
                          {
                            this.props.agentTemplates.map(item=>
                              <option value={item.id}>{item.agentTemplate_label}</option>)
                          }
                        </select>
              else
                return this.getAgentTemplateLabel(row.agentTemplate_id)
          }},
      { name: "Reports To", ignoreRowClick: true, cell: row => {
              if(row.newAssignment)
                return  <select value={this.state.tempNewAssignment.reports_to} onChange={() => this.updateTempNewAssignment("reports_to", event.target.value)}>
                          <option value=""></option>
                          {
                            this.state.agentAssignments.length < 1 ?
                              <option value="supervisor">Node Supervisor</option>
                              : this.state.agentAssignments.map(item=>
                                  <option value={item.agentTemplate_id}>
                                    { this.getAgentTemplateLabel(item.agentTemplate_id) }
                                  </option>)
                          }
                        </select>
              else return row.reports_to === "supervisor" ? "Supervisor" : this.getAgentTemplateLabel(row.reports_to)
      }},
      { name: "", ignoreRowClick: true, cell: row => {
            if(row.newAssignment) return <div onClick={()=>this.addAssignment()}>add</div>
            else if(row.inheritedFrom) return <div>{`inherited from ${row.inheritedFrom}`}</div>
            else if(this.props.disableEditing) return null
            else return row.required ? null : <div onClick={() => this.removeAssignment(row)}>remove</div>}
          }
    ]
  }

  updateTempNewAssignment(property, id){
    this.setState({ tempNewAssignment: Object.assign({},
        this.state.tempNewAssignment, { [`${property}`]: id })})
  }

  assignmentsData(){
    let newAssignmentTool = { newAssignment: true }

    let combinedData = this.props.disableEditing ?
      this.state.agentAssignments
      : [newAssignmentTool, ...this.state.agentAssignments]

    if(this.props.inheritedAssignments && this.props.inheritedAssignments.length > 0){
      this.props.inheritedAssignments.forEach( assgn => {
        assgn.data.map(assignment => combinedData.push({agentTemplate_id: assignment.agentTemplate_id, reports_to: assignment.reports_to, inheritedFrom: assgn.inheritedFrom}))
      })
    }

    return combinedData
  }

  toggleTable(){
    this.setState({ showNewAssignmentTools: this.state.showNewAssignmentTools ? false : true })
  }

  render() {
    return  <div className="editor-container">

              <header>Assignments</header>

              <DataTableWrapper
                          className="editor-properties-table"
                          noHeader={true}
                          columns={this.assignmentsColumns()}
                          data={this.assignmentsData()} />

            </div>

  }
}
