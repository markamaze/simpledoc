import React from 'react'
import { connect } from 'react-redux'

import * as workspace_actions from '../workspace/workspace_actions'
import * as agency_actions from './module_actions'

import AgentTemplateEditor from './AgentTemplateEditor'
import DataTableWrapper from '../../components/DataTableWrapper'
import Overlay from '../../components/Overlay'
import { ManagerWrapper } from '../moduleStyles'
import TagWrapper from '../../components/TagWrapper'




class AgentBuilder extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      overlayData: null,
      showOverlay: false
    }
  }

  renderOverlay(){
    return  <Overlay
              header="Agent Template Editor"
              closeOverlay={() => this.closeOverlay()}
              content={
                <AgentTemplateEditor {...this.props}
                                agent={this.state.overlayData}
                                buttons={this.overlayButtons()} /> } />
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
        if(!data.id || data.id === null) this.props.agency_actions.createAgencyObject("agentTemplate", data)
        else this.props.agency_actions.updateAgencyObject("agentTemplate", data)
        this.closeOverlay()
        break
      case "revert":
        this.props.workspace_actions.clearTempState(data.id)
        break
      case "delete":
        this.props.agency_actions.deleteAgencyObject("agentTemplate", data)
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

  getTableColumnsAgentTemplate(){
    return [
      { name: "Label", selector: "label", sortable: true },
      { name: "Tags", selector: "dataTags", cell: row => row.dataTags.map(tag => <TagWrapper>{tag}</TagWrapper>)}
    ]
  }

  getTableDataAgentTemplate(){
    let dataSet = []
    this.props.agentTemplates.forEach( template => {
      dataSet = Object.assign([], dataSet.concat({
        id: template.id,
        label: template.label,
        dataTags: template.dataTags.map( tagId => this.props.dataTags.find( dataTag => dataTag.id === tagId).label )
      }))
    })


    return dataSet
  }

  render() {
    return  <ManagerWrapper>
              <header>Manage AgentsTemplates</header>
              <DataTableWrapper
                  noHeader={true}
                  subHeader={true}
                  subHeaderComponent={
                    <div
                        className="px-2 mr-0 ml-auto"
                        style={{background: "lightGray"}}
                        onClick={()=> this.setState({showOverlay: true, overlayData: {type: "agentTemplate"}})}>New Agent Template</div>
                  }
                  columns={this.getTableColumnsAgentTemplate()}
                  data={this.getTableDataAgentTemplate()}
                  onRowClicked={row => this.setState({showOverlay: true, overlayData: this.props.agentTemplates.find( template => template.id === row.id )})}
              />


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

export default connect(mapStateToProps)(AgentBuilder)
