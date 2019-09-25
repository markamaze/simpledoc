import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import DataTableWrapper from '../../components/DataTableWrapper'
import ModalTool from '../../components/ModalTool'
import StructuralNodeEditor from './StructuralNodeEditor'
import TagWrapper from '../../components/TagWrapper'
import * as layout_actions from '../../layout/layout_actions'
import * as agency_actions from './module_actions'
const Wrapper = styled.div`
  padding: 1rem;
  margin: 0 auto;
`


class StructureManager extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      modalData: null,
      showModal: false
    }
  }

  renderModal(){
    return  <ModalTool
              showModal={this.state.showModal}
              hideModal={() => this.closeModal()}
              title={"Structural Node Editor"}
              body={
                <StructuralNodeEditor {...this.props}
                                structuralNode={this.state.modalData}
                                buttons={this.modalButtons()} />
              } />
  }

  closeModal() { this.setState({showModal: false, modalData: null}) }

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
    console.log(buttonAction, data)
    switch(buttonAction){
      case "submit":
        if(!data.id || data.id === null) this.props.agency_actions.createStructuralNode(data)
        else this.props.agency_actions.updateStructuralNode(data)
        this.closeModal()
        break
      case "revert":
        this.props.layout_actions.clearTempState(data.id)
        break
      case "delete":
        this.props.agency_actions.deleteStructuralNode(data)
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

  getTableColumnsStructural(){
    return [
      { name: "Label", selector: "label", sortable: true },
      { name: "Parent Structure", selector: "parent", hide: "md", sortable: true, hide: 766 },
      { name: "Tags", selector: "dataTags", center: true, hide: "sm", cell: row => row.dataTags.map(tag => <TagWrapper>{tag}</TagWrapper>)}
    ]
  }



  getTableDataStructural(){
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
    return  <Wrapper>
              <header>Manage Agency Structure</header>
              <DataTableWrapper
                  noHeader={true}
                  subHeader={true}
                  subHeaderComponent={
                    <div
                        className="px-2 mr-0 ml-auto"
                        style={{background: "lightGray"}}
                        onClick={()=> this.setState({showModal: true, modalData: {type: "structuralNode"}})}>New Agency Structure</div>
                  }
                  columns={this.getTableColumnsStructural()}
                  data={this.getTableDataStructural()}
                  onRowClicked={row => this.setState({showModal: true, modalData: this.props.agencyStructures.find( structure => structure.id === row.id )})}
              />

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

export default connect(mapStateToProps)(StructureManager)
