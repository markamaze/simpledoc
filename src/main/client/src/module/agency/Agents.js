import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import * as layout_actions from '../../layout/layout_actions'
import * as agency_actions from './module_actions'

import AgentEditor from './AgentEditor'
import DataTableWrapper from '../../components/DataTableWrapper'
import Overlay from '../../components/Overlay'

const Wrapper = styled.div`
  padding: 1rem;

`



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
        if(!data.id || data.id === null) this.props.agency_actions.createAgent(data)
        else this.props.agency_actions.updateAgent(data)
        this.closeOverlay()
        break
      case "revert":
        this.props.layout_actions.clearTempState(data.id)
        break
      case "delete":
        this.props.agency_actions.deleteAgent(data)
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
    this.setState({showOverlay: false, overlayType: null})
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
                        onClick={() => this.setState({showOverlay: true, overlayData: {type: "agent"}})} >+</div>
                  }
                  columns={this.getTableColumnsAgents()}
                  data={this.getTableDataAgents()}
                  onRowClicked={row => this.setState({showOverlay: true, overlayData: this.props.agents.find(agent=> agent.id === row.id)})} />

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

export default connect(mapStateToProps)(Agents)
