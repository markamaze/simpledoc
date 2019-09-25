import React from 'react'
import styled from 'styled-components'
import { Row, Collapse, Button } from 'react-bootstrap'

import AgentEditor from './AgentEditor'
import DataTableWrapper from '../../components/DataTableWrapper'
import List from '../../components/List'
import ModalTool from '../../components/ModalTool'
import UserEditor from './UserEditor'

const AgentManagerWrapper = styled.div`
  padding: 1rem;

`



export default class AgentManager extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      agentmanageropen: false,
      usermanageropen: false,
      showModal: false,
      modalData: null
    }
  }

  toggleCollapse(toggleElement){
    switch(toggleElement){
      case "agentmanager": {
        this.setState({ agentmanageropen: this.state.agentmanageropen ? false : true })
        break
      }
      case "usermanager": {
        this.setState({ usermanageropen: this.state.usermanageropen ? false : true })
        break
      }
    }
  }

  renderModal(){
    let modalTitle, modalBody, modalData, modalButtons

    modalData = this.state.modalData
    modalButtons =  [
      {label: "Submit", handler: (data)=> this.modalButtonAction("submit", data)},
      {label: "Revert", handler: (data)=> this.modalButtonAction("revert", data)},
      {label: "Delete", handler: (data)=> this.modalButtonAction("delete", data)},
      {label: "Save", handler: (data)=> this.modalButtonAction("save", data)},
      {label: "Workspace", handler: (data)=> this.modalButtonAction("workspace", data)}
    ]

    switch(modalData.type){
      case "agent":
        modalTitle = "Agent Object Editor"
        modalBody = <AgentEditor {...this.props}
                        agent={modalData}
                        buttons={modalButtons} />
        break
      case "user":
        modalTitle = "User Object Editor"
        modalBody = <UserEditor {...this.props}
                        user={modalData}
                        buttons={modalButtons} />
        break
    }

    return  <ModalTool
              showModal={this.state.showModal}
              hideModal={() => this.closeModal()}
              title={modalTitle}
              body={modalBody} />
  }

  modalButtonAction(buttonAction, data){
    switch(buttonAction){
      case "submit":
        if(data.type === "agent")
          if(!data.id || data.id === null) this.props.agency_actions.createAgent(data)
          else this.props.agency_actions.updateAgent(data)
        else if(data.type === "user")
          if(!data.id || data.id === null) this.props.agency_actions.createUser(data)
          else this.props.agency_actions.updateUser(data)
        this.closeModal()
        break
      case "revert":
        this.props.layout_actions.clearTempState(data.id)
        break
      case "delete":
        if(data.type === "agent")
          this.props.agency_actions.deleteAgent(data)
        else if(data.type === "user")
          this.props.agency_actions.deleteUser(data)
        this.closeModal()
        break
      case "save":
        this.props.layout_actions.updateTempState(data.id, null)
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
    return  <AgentManagerWrapper>
              <Row
                  aria-controls="agentmanager"
                  aria-expanded={this.state.agentmanageropen}
                  className="manager-panel"
                  onClick={() => this.toggleCollapse("agentmanager")} >
                <header>Manage Agents</header>
                <Collapse in={this.state.agentmanageropen}>
                  <Row id="agentmanager" className="manager-tray">
                    <DataTableWrapper
                        className=""
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
                  </Row>
                </Collapse>
              </Row>

              <Row
                  aria-controls="usermanager"
                  aria-expanded={this.state.usermanageropen}
                  className="manager-panel"
                  onClick={() => this.toggleCollapse("usermanager")} >
                <header>Manage Users</header>
                <div
                    className="px-2 mr-0 ml-auto"
                    style={{background: "lightGray"}}
                    onClick={() => this.setState({showModal: true, modalData: {type: "user"}})} >+</div>
                <Collapse in={this.state.usermanageropen}>
                  <Row id="usermanager" className="manager-tray">
                    <List
                        listData={this.props.users}
                        emptySetMessage="No Users have been created"
                        onItemClick={item => this.setState({showModal: true, modalData: item})}
                        listHeaders={["username"]} />
                  </Row>
                </Collapse>
              </Row>


              { !this.state.showModal ? null : this.renderModal() }

            </AgentManagerWrapper>
    }
}
