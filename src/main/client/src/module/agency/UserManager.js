import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import * as layout_actions from '../../layout/layout_actions'
import * as agency_actions from './module_actions'

import DataTableWrapper from '../../components/DataTableWrapper'
import List from '../../components/List'
import ModalTool from '../../components/ModalTool'
import UserEditor from './UserEditor'

const Wrapper = styled.div`
  padding: 1rem;

`



class UserManager extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showModal: false,
      modalData: null
    }
  }

  renderModal(){
    return  <ModalTool
              showModal={this.state.showModal}
              hideModal={() => this.closeModal()}
              title="User Object Editor"
              body={
                <UserEditor {...this.props}
                                user={this.state.modalData}
                                buttons={this.modalButtons()} />
              } />
  }

  modalButtons() {
    return [
      {label: "Submit", handler: (data)=> this.modalButtonAction("submit", data)},
      {label: "Revert", handler: (data)=> this.modalButtonAction("revert", data)},
      {label: "Delete", handler: (data)=> this.modalButtonAction("delete", data)},
      {label: "Save", handler: (data)=> this.modalButtonAction("save", data)},
      {label: "Workspace", handler: (data)=> this.modalButtonAction("workspace", data)}
    ]
  }

  modalButtonAction(buttonAction, data){
    switch(buttonAction){
      case "submit":
        if(!data.id || data.id === null) this.props.agency_actions.createUser(data)
        else this.props.agency_actions.updateUser(data)
        this.closeModal()
        break
      case "revert":
        this.props.layout_actions.clearTempState(data.id)
        break
      case "delete":
        this.props.agency_actions.deleteUser(data)
        this.closeModal()
        break
      case "save":
        this.props.layout_actions.updateTempState(data.id, data)
        this.closeModal()
        break
      case "workspace":
        this.props.layout_actions.addToWorkspace(data.type, data)
        this.closeModal()
        break
    }
  }

  closeModal(){
    this.setState({showModal: false, modalData: null})
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
                    onItemClick={item => this.setState({showModal: true, modalData: item})}
                    listHeaders={["username"]} />

              { !this.state.showModal ? null : this.renderModal() }

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
