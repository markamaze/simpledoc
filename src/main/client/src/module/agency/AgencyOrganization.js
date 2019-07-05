import React from 'react'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'



const StyleWrapper = styled(Container)`

`


export default class AgencyOrganization extends React.Component {

  loadChildrenAgents(parent_id){
    let children = this.props.agency_agents.filter( agent =>
                      agent.agent_link_id === parent_id )


    return  <ul>{children.map( child =>
              <li>
                {child.label}
                {this.loadChildrenAgents(child.id)}
              </li>)}
            </ul>
  }

  render() {
    let root_agent = this.props.agency_agents.find( agent =>
                        agent.agent_link_id === 'root')
    return  <StyleWrapper>
              <ul>
                <li>
                  {root_agent.label}
                  {this.loadChildrenAgents(root_agent.id)}
                </li>
              </ul>
            </StyleWrapper>
  }
}
