import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'

import Footer from './Footer'
import Header from './Header'
import Navigation from './Navigation'
import Workspace from './Workspace'

import AgencyModule from '../module/agency/AgencyModule'

import colors from '../colors'

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: stretch;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;

`
const BodyViewport = styled.div`
  display: flex;
  background: ${colors.four};
  height: 100%;
  width: 100%;
  max-height: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
`

export default class Layout extends React.Component {

  render() {
    return  <BrowserRouter history={history}>
              <BodyWrapper >
                <Header >
                  <Navigation />
                </Header>
                <BodyViewport>
                  <Switch>
                    <Route exact path="/" render={()=> <div>Welcome</div>} />
                    <Route path="/Home" render={()=> <div>Home</div>} />
        						<Route path="/Agency" render={() => <AgencyModule />} />
                  </Switch>
        				</BodyViewport>
                <Footer />
              </BodyWrapper>
            </BrowserRouter>
  }
}
