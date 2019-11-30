import React from 'react'
import { connect } from 'react-redux'

import * as workspace_actions from '../workspace/workspace_actions'
import * as agency_actions from './module_actions'

import AgentEditor from './AgentEditor'
import DataTableWrapper from '../../components/DataTableWrapper'
import { ManagerWrapper } from '../moduleStyles'
import Overlay from '../../components/Overlay'




class Agents extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showOverlay: false,
      overlayData: null
    }
  }

  renderOverlay(){
    return  <Overlay
              closeOverlay={() => this.closeOverlay()}
              header={"Agent Object Editor"}
              content={
                <AgentEditor {...this.props}
                                agent={this.state.overlayData}
                                buttons={this.overlayButtons()} /> }
            />
  }

  overlayButtons() {
    return [
      {label: "Submit", handler: (data)=> this.overlayButtonAction("submit", data)},
      {label: "Revert", handler: (data)=> this.overlayButtonAction("revert", data)},
      {label: "Delete", handler: (data)=> this.overlayButtonAction("delete", data)},
      {label: "Save", handler: (data)=> this.overlayButtonAction("save", data)},
      {label: "Workspace", handler: (data)=> this.overlayButtonAction("workspace", data)}
    ]
  }

  overlayButtonAction(buttonAction, data){
    switch(buttonAction){
      case "submit":
        if(!data.id || data.id === null) this.props.agency_actions.createAgencyObject("agent", data)
        else this.props.agency_actions.updateAgencyObject("agent", data)
        this.closeOverlay()
        break
      case "revert":
        this.props.workspace_actions.clearTempState(data.id)
        break
      case "delete":
        this.props.agency_actions.deleteAgencyObject("agent", data)
        this.closeOverlay()
        break
      case "save":
        this.props.workspace_actions.updateTempState(data.id, data)
        this.closeOverlay()
        break
      case "workspace":
        this.props.workspace_actions.addToWorkspace(data.type, data)
        this.closeOverlay()
        break
    }
  }

  closeOverlay(){
    this.setState({showOverlay: false, overlayType: null})
  }

  getTableColumnsAgents() {
    return [
      { name: "Label", selector: "label", sortable: true },
      { name: "Agent Type", selector: "agentType", sortable: true },
      { name: "Agent Of", selector: "agentLink", sortable: true },
      { name: "Assigned User", selector: "user", sortable: true }
    ]
  }

  getTableDataAgents() {
    let dataSet = []

    this.props.agents.forEach( agent => {

      dataSet = Object.assign([], dataSet.concat({
        id: agent.id,
        label: agent.label,
        agentType: this.props.agentTemplates.find(temp => temp.id === agent.templateId).label,
        agentLink: this.props.agencyStructures.find(struct => struct.id === agent.agentLink).label,
        user: this.getUserUsername(agent)
      }))
    })

    return dataSet
  }

  getUserUsername(userId){
    let user = this.props.users.find( user => user.id == userId.assignedUserId )
    return user ? user.username : null
  }

  render() {
    return  <ManagerWrapper>
              <header>Manage Agents</header>
              <DataTableWrapper
                  noHeader={true}
                  subHeader={true}
                  subHeaderComponent={
                    <div
                        className="px-2 mr-0 ml-auto"
                        style={{background: "lightGray"}}
                        onClick={() => this.setState({showOverlay: true, overlayData: {type: "agent"}})} >+</div>
                  }
                  columns={this.getTableColumnsAgents()}
                  data={this.getTableDataAgents()}
                  onRowClicked={row => this.setState({showOverlay: true, overlayData: this.props.agents.find(agent=> agent.id === row.id)})} />

              { !this.state.showOverlay ? null : this.renderOverlay() }

            </ManagerWrapper>
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    agents: state.agency.agents,
    agencyStructures: state.agency.structuralNodes,
    agentTemplates: state.agency.agentTemplates,
    dataTags: state.agency.dataTags,
    users: state.agency.users,
    temp_state: state.workspace.savedTempState,
    workspace_actions: workspace_actions,
    agency_actions: agency_actions
  }
}

export default connect(mapStateToProps)(Agents)
