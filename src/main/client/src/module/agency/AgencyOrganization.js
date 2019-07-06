import React from 'react'
import { Container, ListGroup, Col, Row } from 'react-bootstrap'
import styled from 'styled-components'

import colors from '../../colors'


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

  findAgentDefinition(agent_definition_id){
    return this.props.agency_definitions.find( definition =>
              definition.id === agent_definition_id)
  }

  loadChildrenAgents(parent_id){
    let children = this.props.agency_agents.filter( agent =>
                      agent.agent_link_id === parent_id )


    return  <Row className="p-1 m-1" key={`agent_structure_item_${parent_id}`}>{children.map( child =>
              <Col className="agent border m-1 flex-wrap" key={`agent_structure_item_${child.id}`}>
                <header className="p-1 m-0">{child.label}</header>
                <p>-{this.findAgentDefinition(child.definition_id).label}</p>
                {this.loadChildrenAgents(child.id)}
              </Col>)}
            </Row>
  }

  render() {
    let root_agent = this.props.agency_agents.find( agent =>
                        agent.agent_link_id === 'root')
    return  <StyleWrapper>
              <Row>
                <Col xl={12} className='agent border m-1 flex-wrap'>
                  <header className="p-1 m-0">{root_agent.label}</header>
                  <p>-{this.findAgentDefinition(root_agent.definition_id).label}</p>
                  {this.loadChildrenAgents(root_agent.id)}
                </Col>
              </Row>
            </StyleWrapper>
  }
}
