import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import * as layout_actions from '../../layout/layout_actions'
import * as agency_actions from './module_actions'

import AgentEditor from './AgentEditor'
import DataTableWrapper from '../../components/DataTableWrapper'
import ModalTool from '../../components/ModalTool'

const Wrapper = styled.div`
  padding: 1rem;

`



class Agents extends React.Component {

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
              title={"Agent Object Editor"}
              body={
                <AgentEditor {...this.props}
                                agent={this.state.modalData}
                                buttons={this.modalButtons()} /> }
            />
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
        if(!data.id || data.id === null) this.props.agency_actions.createAgent(data)
        else this.props.agency_actions.updateAgent(data)
        this.closeModal()
        break
      case "revert":
        this.props.layout_actions.clearTempState(data.id)
        break
      case "delete":
        this.props.agency_actions.deleteAgent(data)
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
    this.setState({showModal: false, modalType: null})
  }

  getTableColumnsAgents() {
    console.log("get table columns for Agents table")
  }

  getTableDataAgents() {
    console.log("get table data for Agents table")
  }

  render() {
    return  <Wrapper>
              <header>Manage Agents</header>
              <DataTableWrapper
                  noHeader={true}
                  subHeader={true}
                  subHeaderComponent={
                    <div
                        className="px-2 mr-0 ml-auto"
                        style={{background: "lightGray"}}
                        onClick={() => this.setState({showModal: true, modalData: {type: "agent"}})} >+</div>
                  }
                  columns={this.getTableColumnsAgents()}
                  data={this.getTableDataAgents()}
                  onRowClicked={row => this.setState({showModal: true, modalData: this.props.agents.find(agent=> agent.id === row.id)})} />

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

export default connect(mapStateToProps)(Agents)
