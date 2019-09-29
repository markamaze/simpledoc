import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import * as layout_actions from '../../layout/layout_actions'
import * as agency_actions from './module_actions'

import DataTableWrapper from '../../components/DataTableWrapper'
import List from '../../components/List'
import Overlay from '../../components/Overlay'
import UserEditor from './UserEditor'

const Wrapper = styled.div`
  padding: 1rem;

`



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

  closeOverlay(){
    this.setState({showOverlay: false, overlayData: null})
  }

  getTableColumnsUsers() {
    console.log("get table columns for Users table")
  }

  getTableDataUsers() {
    console.log("get table data for Users table")
  }

  render() {
    return  <Wrapper>
                <header>Manage Users</header>
                <List
                    listData={this.props.users}
                    emptySetMessage="No Users have been created"
                    onItemClick={item => this.setState({showOverlay: true, overlayData: item})}
                    listHeaders={["username"]} />

              { !this.state.showOverlay ? null : this.renderOverlay() }

            </Wrapper>
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
