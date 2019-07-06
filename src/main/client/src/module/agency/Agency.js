import React from 'react'
import { Container, Tabs, Tab } from 'react-bootstrap'
import styled from 'styled-components'
import { connect } from 'react-redux'

import AgentDefCat from './AgentDefCat'
import AgencyOrganization from './AgencyOrganization'
import ImplementedAgents from './ImplementedAgents'

import colors from '../../colors'
import * as layout_actions from '../../layout/layout_actions'


const StyleWrapper = styled(Container)`

  .nav-tabs a {
    color: ${colors.three};
  }
`


class Agency extends React.Component {


  render() {

    return  <StyleWrapper className="p-1">
              <Tabs defaultActiveKey="organization" >

                <Tab eventKey="organization" title="Agency Org Chart">
                  <AgencyOrganization {...this.props} />
                </Tab>

                <Tab eventKey="agents" title="Implemented Agents">
                  <ImplementedAgents {...this.props} />
                </Tab>

                <Tab eventKey="def_cat" title="Definitions & Categories">
                  <AgentDefCat {...this.props} />
                </Tab>

              </Tabs>
            </StyleWrapper>
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    agency_agents: state.agency.agency_agents,
    agency_definitions: state.agency.agency_definitions,
    agency_categories: state.agency.agency_categories,
    layout_actions: layout_actions
  }
}

export default connect(mapStateToProps)(Agency)
