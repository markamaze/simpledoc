import React from 'react'
import { Container, ListGroup, Col, Row } from 'react-bootstrap'
import styled from 'styled-components'

import colors from '../../colors'
import ModalTool from '../../components/ModalTool'


const StyleWrapper = styled(Container)`
  .agent {
    header {
      font-size: 1.1rem;
    }
    p {
      font-size: .75rem;
    }
  }
`


export default class AgencyOrganization extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showModal: false,
      agentModal: null
    }
  }

  findAgentDefinition(agent_definition_id){
    return this.props.agency_definitions.find( definition =>
              definition.id === agent_definition_id)
  }



  /*
      need to set a depth index and use as a z-index in order to
      be sure to select the correct agent when editing
  */
  loadChildrenAgents(parent_id, depth){
    let children = this.props.agency_agents.filter( agent =>
                      agent.agent_link_id === parent_id )

    let depth_index = depth + 1

    return  <Row className="p-1 m-1 agent_structure_item" key={`agent_structure_item_${parent_id}`}>{children.map( child =>
              <Col className="agent border m-1 flex-wrap"
                    style={{zIndex: depth_index}}
                    key={`agent_structure_item_${child.id}`}
              >
                <header className="p-1 m-0 agent_structure_header"
                        onClick={() => this.showModal(child)}>
                  {child.label}
                </header>
                <p>-{this.findAgentDefinition(child.definition_id).label}</p>
                {this.loadChildrenAgents(child.id, depth_index)}
              </Col>)}
            </Row>
  }

  hideModal(){ this.setState({ showModal: false, agentModal: null }) }

  showModal(agent){ this.setState({ showModal: true, agentModal: agent }) }

  modalButtonHandler(type){
    switch(type){
      case "discard":
        this.hideModal()
        break
      case "revert":
        console.log("revert changes, keep modal open")
        break
      case "save":
        console.log("save changes, keep modal open")
        break
      case "workspace":
        console.log("send to workspace, close modal")
        this.hideModal()
        break
      case "delete":
        console.log("delete item, close modal")
        this.hideModal()
        break
    }
  }

  render() {
    let root_agent = this.props.agency_agents.find( agent =>
                        agent.agent_link_id === 'root')
    return  <StyleWrapper>
              <Row>
                <Col xl={12}
                      className='agent border m-1 flex-wrap'
                      style={{zIndex: 0}} >
                  <header className="p-1 m-0 agency_org_agent_header"
                          onClick={() => this.showModal(root_agent)}>
                    {root_agent.label}
                  </header>
                  <p>-{this.findAgentDefinition(root_agent.definition_id).label}</p>
                  {this.loadChildrenAgents(root_agent.id, 0)}
                </Col>
              </Row>

              {
                this.state.showModal ?
                <ModalTool
                  showModal={this.state.showModal}
                  hideModal={this.hideModal.bind(this)}
                  title='Modify Structural Agent'
                  body={<div>Structural Agent to Edit: {this.state.agentModal.label}</div>}
                  modalButtonHandler={this.modalButtonHandler.bind(this)}
                />
                : null
              }


            </StyleWrapper>
  }
}
