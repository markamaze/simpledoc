import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'

import * as layout_actions from '../../layout/layout_actions'
import * as agency_actions from './module_actions'

import DataTagEditor from './DataTagEditor'
import ModalTool from '../../components/ModalTool'
import TagWrapper from '../../components/TagWrapper'

const Wrapper = styled.div`
  padding: 1rem;
  margin: 0 auto;
`


class TagManager extends React.Component {

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
              title="Data Tag Editor"
              body={
                <DataTagEditor {...this.props}
                                dataTag={this.state.modalData}
                                buttons={this.modalButtons()} /> } />
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
        if(!data.id || data.id === null) this.props.agency_actions.createDataTag(data)
        else this.props.agency_actions.updateDataTag(data)
        this.closeModal()
        break
      case "revert":
        this.props.layout_actions.clearTempState(data.id)
        break
      case "delete":
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

  closeModal(){ this.setState({showModal: false, modalType: null}) }

  render() {
    return  <Wrapper>
              <header>Manage Data Tags</header>
              <div
                  className="px-2 mr-0 ml-auto"
                  style={{background: "lightGray"}}
                  onClick={() => this.setState({showModal: true, modalData: {type: "dataTag"}})} >+</div>
              <Row className="">
                <Col lg={4} id="structural-tagmanager" className="p-3 mx-3 border">
                  <header className="p-1">Structural Tags</header>
                  {
                    this.props.dataTags.filter(dataTag => dataTag.tagFor === 'structural').map( dataTag =>
                      <Row
                          onClick={() => this.setState({showModal: true, modalData: dataTag })}
                          key={`structural-tagmanager-${dataTag.id}`}>
                          <TagWrapper>{dataTag.label}</TagWrapper>
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
                        <TagWrapper>{dataTag.label}</TagWrapper>
                      </Row> )
                  }
                </Col>
              </Row>

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

export default connect(mapStateToProps)(TagManager)
