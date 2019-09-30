import React from 'react'
import { connect } from 'react-redux'

import * as layout_actions from '../../layout/layout_actions'
import * as agency_actions from './module_actions'

import DataTableWrapper from '../../components/DataTableWrapper'
import { ManagerWrapper } from '../../styles/moduleStyles'
import Overlay from '../../components/Overlay'
import UserEditor from './UserEditor'




class UserManager extends React.Component {

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
              header="User Object Editor"
              content={
                <UserEditor {...this.props}
                                user={this.state.overlayData}
                                buttons={this.overlayButtons()} />
              } />
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
        if(!data.id || data.id === null) this.props.agency_actions.createUser(data)
        else this.props.agency_actions.updateUser(data)
        this.closeOverlay()
        break
      case "revert":
        this.props.layout_actions.clearTempState(data.id)
        break
      case "delete":
        this.props.agency_actions.deleteUser(data)
        this.closeOverlay()
        break
      case "save":
        this.props.layout_actions.updateTempState(data.id, data)
        this.closeOverlay()
        break
      case "workspace":
        this.props.layout_actions.addToWorkspace(data.type, data)
        this.closeOverlay()
        break
    }
  }

  closeOverlay(){ this.setState({showOverlay: false, overlayData: null}) }

  getTableColumns() {
    return [
      { name: "Username", selector: "username", sortable: true },
      { name: "Assigned Agents", selector: "agents"}
    ]
  }

  getTableData() {
    let dataSet = []

    this.props.users.forEach( user => {
      let users_agents = this.props.agents.filter( agent => agent.assignedUserId === user.id )
      dataSet = Object.assign([], dataSet.concat({
        username: user.username,
        id: user.id,
        agents: users_agents.map(agent=><div>{this.props.agentTemplates.find(temp => temp.id === agent.templateId).label}</div>)}))
    })
    return dataSet
  }

  render() {
    return  <ManagerWrapper>
                <header>Manage Users</header>
                <DataTableWrapper
                    noHeader={true}
                    subHeader={true}
                    subHeaderComponent={
                      <div onClick={()=> this.setState({showOverlay: true, overlayData: {type: "user"}})}>
                        New User
                      </div>
                    }
                    columns={this.getTableColumns()}
                    data={this.getTableData()}
                    onRowClicked={row => this.setState({showOverlay: true, overlayData: this.props.users.find(user => user.id === row.id )})} />

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
    temp_state: state.layout.savedTempState,
    layout_actions: layout_actions,
    agency_actions: agency_actions
  }
}

export default connect(mapStateToProps)(UserManager)
