import React from 'react'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'


import AgencyOrganization from './AgencyOrganization'
import Agents from './Agents'
import AgentBuilder from './AgentBuilder'
import StructureManager from './StructureManager'
import TagManager from './TagManager'
import UserManager from './UserManager'

import colors from '../../colors'



const StyleWrapper = styled.div`
  display: flex;
  height: 100%;
  max-height: 100%;
  width: 100%;
  max-width: 100%;
  padding: 0;
  margin: 0;

  nav {
    max-width: 10%;
    background: ${colors.three};

  }
  nav .active {
  }

  .viewport {
    background: ${colors.four};
    height: 100%;
    max-height: 100%;
    overflow-y: auto;
    flex-grow: 2;
  }
`


export default class AgencyModule extends React.Component {


  render() {

    return  <StyleWrapper>
              <div className="viewport">
                <Switch>
                  <Route
                      exact
                      path="/Agency"
                      render={() => <AgencyOrganization /> } />
                  <Route
                      exact
                      path="/Agency/Agents"
                      render={() => <Agents /> } />
                  <Route
                      exact
                      path="/Agency/AgentBuilder"
                      render={() => <AgentBuilder /> } />
                  <Route
                      exact
                      path="/Agency/TagManager"
                      render={() => <TagManager /> } />
                  <Route
                      exact
                      path="/Agency/UserManager"
                      render={() => <UserManager /> } />
                  <Route

                      path="/Agency/StructureManager"
                      render={() => <StructureManager /> } />
                </Switch>
              </div>
            </StyleWrapper>
  }
}
