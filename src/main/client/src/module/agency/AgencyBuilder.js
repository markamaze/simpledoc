import React from 'react'
import styled from 'styled-components'
import { Container, Row, Collapse, Button, Col } from 'react-bootstrap'

import AgentTemplateEditor from './AgentTemplateEditor'
import DataTableWrapper from '../../components/DataTableWrapper'
import DataTagEditor from './DataTagEditor'
import List from '../../components/List'
import ModalTool from '../../components/ModalTool'
import StructuralNodeEditor from './StructuralNodeEditor'
import TagWrapper from '../../components/TagWrapper'

const AgencyBuilderWrapper = styled.div`
  padding: 1rem;
  margin: 0 auto;
`


export default class AgencyBuilder extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      agenttemplatemanageropen: false,
      structuralnodemanageropen: false,
      tagmanageropen: false,
      tagdatamanageropen: false,
      modalData: null,
      showModal: false
    }
  }

  toggleCollapse(toggleElement){
    switch(toggleElement){
      case "agenttemplatemanager": {
        this.setState({ agenttemplatemanageropen: this.state.agenttemplatemanageropen ? false : true })
        break
      }
      case "structuralnodemanager": {
        this.setState({ structuralnodemanageropen: this.state.structuralnodemanageropen ? false : true })
        break
      }
      case "tagmanager": {
        this.setState({ tagmanageropen: this.state.tagmanageropen ? false : true })
        break
      }
      case "tagdatamanager": {
        this.setState({ tagdatamanageropen: this.state.tagdatamanageropen ? false : true })
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
      case "structuralNode":
        modalTitle = "Structural Node Editor"
        modalBody = <StructuralNodeEditor {...this.props}
                        structuralNode={modalData}
                        buttons={modalButtons} />
        break
      case "agentTemplate":
        modalTitle = "Agent Template Editor"
        modalBody = <AgentTemplateEditor {...this.props}
                        agent={modalData}
                        buttons={modalButtons} />
        break
      case "dataTag":
        modalTitle = "Data Tag Editor"
        modalBody = <DataTagEditor {...this.props}
                        dataTag={modalData}
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
    console.log(buttonAction, data)
    switch(buttonAction){
      case "submit":
        if(data.type === "structuralNode")
          if(!data.id || data.id === null) this.props.agency_actions.createStructuralNode(data)
          else this.props.agency_actions.updateStructuralNode(data)
        else if(data.type === "agentTemplate")
          if(!data.id || data.id === null) this.props.agency_actions.createAgentTemplate(data)
          else this.props.agency_actions.updateAgentTemplate(data)
        else if(data.type === "dataTag")
          if(!data.id || data.id === null) this.props.agency_actions.createDataTag(data)
          else this.props.agency_actions.updateDataTag(data)
        this.closeModal()
        break
      case "revert":
        this.props.layout_actions.clearTempState(data.id)
        break
      case "delete":
        if(data.type === "structuralNode")
          this.props.agency_actions.deleteStructuralNode(data)
        else if(data.type === "agentTemplate")
          this.props.agency_actions.deleteAgentTemplate(data)
        else if(data.type === "dataTag")
          this.props.agency_actions.deleteDataTag(data)
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

  getTableColumnsStructural(){
    return [
      { name: "Label", selector: "label", sortable: true },
      { name: "Parent Structure", selector: "parent", hide: "md", sortable: true, hide: 766 },
      { name: "Tags", selector: "dataTags", center: true, hide: "sm", cell: row => row.dataTags.map(tag => <TagWrapper>{tag}</TagWrapper>)}
    ]
  }

  getTableColumnsAgentTemplate(){
    return [
      { name: "Label", selector: "label", sortable: true },
      { name: "Tags", selector: "dataTags", cell: row => row.dataTags.map(tag => <TagWrapper>{tag}</TagWrapper>)}
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
    return  <AgencyBuilderWrapper>

              <Row
                  aria-controls="structuralnodemanager"
                  aria-expanded={this.state.structuralnodemanageropen}
                  className="manager-panel"
                  onClick={() => this.toggleCollapse("structuralnodemanager")} >
                <header>Manage Agency Structure</header>
                <Collapse in={this.state.structuralnodemanageropen} className="manager-tray">
                  <DataTableWrapper
                      className=""
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
                </Collapse>
              </Row>

              <Row
                  aria-controls="agenttemplatemanager"
                  aria-expanded={this.state.agenttemplatemanageropen}
                  className="manager-panel"
                  onClick={() => this.toggleCollapse("agenttemplatemanager")} >
                <header>Manage AgentsTemplates</header>
                <Collapse in={this.state.agenttemplatemanageropen}>
                  <DataTableWrapper
                      className="manager-tray"
                      noHeader={true}
                      subHeader={true}
                      subHeaderComponent={
                        <div
                            className="px-2 mr-0 ml-auto"
                            style={{background: "lightGray"}}
                            onClick={()=> this.setState({showModal: true, modalData: {type: "agentTemplate"}})}>New Agent Template</div>
                      }
                      columns={this.getTableColumnsAgentTemplate()}
                      data={this.getTableDataAgentTemplate()}
                      onRowClicked={row => this.setState({showModal: true, modalData: this.props.agentTemplates.find( template => template.id === row.id )})}
                  />
                </Collapse>
              </Row>



              <Row
                  aria-controls="tagmanager"
                  aria-expanded={this.state.tagmanageropen}
                  className="manager-panel"
                  onClick={() => this.toggleCollapse("tagmanager")} >
                <header>Manage Data Tags</header>
                <div
                    className="px-2 mr-0 ml-auto"
                    style={{background: "lightGray"}}
                    onClick={() => this.setState({showModal: true, modalData: {type: "dataTag"}})} >+</div>
                <Collapse in={this.state.tagmanageropen} className="manager-tray">
                  <Row className="">
                    <Col lg={4} id="structural-tagmanager" className="p-3 mx-3 border">
                      <header className="p-1">Structural Tags</header>
                      {
                        this.props.dataTags.filter(dataTag => dataTag.tagFor === 'structural').map( dataTag =>
                          <Row
                              onClick={() => this.setState({showModal: true, modalData: dataTag })}
                              key={`structural-tagmanager-${dataTag.id}`}>
                            {dataTag.label}
                          </Row> )
                      }
                    </Col>
                    <Col lg={4} id="agent-tagmanager" className="p-3 mx-3 border">
                      <header className="p-1">Agent Tags</header>
                      {
                        this.props.dataTags.filter(dataTag => dataTag.tagFor === 'agent').map( dataTag =>
                          <Row
                              onClick={() => this.setState({showModal: true, modalData: dataTag })}
                              key={`agent-tagmanager-${dataTag.id}`}>
                            {dataTag.label}
                          </Row> )
                      }
                    </Col>
                  </Row>
                </Collapse>
              </Row>


              { !this.state.showModal ? null : this.renderModal() }

            </AgencyBuilderWrapper>

  }
}
