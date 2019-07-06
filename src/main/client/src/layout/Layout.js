import React from 'react'
import Container from 'react-bootstrap/Container'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'

import Footer from './Footer'
import Header from './Header'
import Navigation from './Navigation'
import Workspace from './Workspace'

import Agency from '../module/agency/Agency'

import colors from '../colors'

const BodyWrapper = styled(Container)`
  background: ${colors.one};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  overflow-y: auto;
`
const BodyViewport = styled(Container)`
  background: ${colors.four};
  border-radius: .5rem;
`

export default class Layout extends React.Component {

  render() {
    return  <BrowserRouter history={history}>
              <BodyWrapper className="d-flex flex-column align-content-stretch my-1 mx-auto" >
                <Header >
                  <Navigation />
                </Header>
                <BodyViewport className="my-3 mx-auto flex-grow-1">
                  <Switch>
                    <Route exact path="/" render={()=> <Container>Welcome</Container>} />
                    <Route exact path="/Home" render={()=> <div>Home</div>} />
        						<Route exact path="/Agency" render={() => <Agency />} />
                    <Route exact path="/Workspace" render={() => <Workspace />} />
                  </Switch>
        				</BodyViewport>
                <Footer />
              </BodyWrapper>
            </BrowserRouter>
  }
}
