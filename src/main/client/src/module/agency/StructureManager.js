import React from 'react'
import { connect } from 'react-redux'

import Overlay from '../../components/Overlay'
import DataTableWrapper from '../../components/DataTableWrapper'
import { ManagerWrapper } from '../moduleStyles'
import StructuralNodeEditor from './StructuralNodeEditor'
import TagWrapper from '../../components/TagWrapper'
import * as workspace_actions from '../workspace/workspace_actions'
import * as agency_actions from './module_actions'




class StructureManager extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      overlayData: null,
      showOverlay: false
    }
  }

  renderOverlay(){
    return  <Overlay
                header="Structural Node Editor"
                content={
                  <StructuralNodeEditor
                      {...this.props}
                      structuralNode={this.state.overlayData}
                      buttons={ this.overlayButtons()}/>
                }
                closeOverlay={ () => this.closeOverlay() }/>

  }

  closeOverlay() { this.setState({showOverlay: false, overlayData: null}) }

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
    console.log(buttonAction, data)
    switch(buttonAction){
      case "submit":
        if(!data.id || data.id === null) this.props.agency_actions.createAgencyObject("structuralNode", data)
        else this.props.agency_actions.updateAgencyObject("structuralNode", data)
        this.closeOverlay()
        break
      case "revert":
        this.props.workspace_actions.clearTempState(data.id)
        break
      case "delete":
        this.props.agency_actions.deleteAgencyObject("structuralNode", data)
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

  getTableColumns(){
    return [
      { name: "Label", selector: "label", sortable: true },
      { name: "Parent Structure", selector: "parent", hide: "md", sortable: true, hide: 766 },
      { name: "Tags", selector: "dataTags", center: true, hide: "sm", cell: row => row.dataTags.map(tag => <TagWrapper>{tag}</TagWrapper>)}
    ]
  }



  getTableData(){
    let dataSet = []
    this.props.agencyStructures.forEach( structure => {
      let parentLabel = structure.parentId === "root" ? "root"
                          : this.props.agencyStructures.find( parent => parent.id === structure.parentId ).label
      dataSet = Object.assign([], dataSet.concat(
        {
          id: structure.id,
          label: structure.label,
          parent: parentLabel,
          dataTags: structure.dataTags.map( tagId => this.props.dataTags.find( dataTag => dataTag.id === tagId).label )
        }))
    })
    return dataSet
  }



  render() {
    return  <ManagerWrapper>
              <header>Manage Agency Structure</header>
              <DataTableWrapper
                  noHeader={true}
                  subHeader={true}
                  subHeaderComponent={
                    <div
                        className="px-2 mr-0 ml-auto"
                        style={{background: "lightGray"}}
                        onClick={()=> this.setState({showOverlay: true, overlayData: {type: "structuralNode"}})}>New Agency Structure</div>
                  }
                  columns={this.getTableColumns()}
                  data={this.getTableData()}
                  onRowClicked={row => this.setState({showOverlay: true, overlayData: this.props.agencyStructures.find( structure => structure.id === row.id )})}
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

export default connect(mapStateToProps)(StructureManager)
