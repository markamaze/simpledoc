import React from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import styled from 'styled-components'

import Footer from './Footer'
import Header from './Header'
import Navigation from './Navigation'
import { modules, linkdata } from './moduleData'


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




const modulesRoutes = () =>
  <Switch>
    {
      modules.map(route =>
        <Route exact={route.exact} path={route.path} render={()=> route.render} />)
    }
  </Switch>

export default class Layout extends React.Component {

  render() {
    console.log(window.location.pathname)
    return  <BrowserRouter history={history}>
              <BodyWrapper >
                <Header >
                  <Navigation links={linkdata} />
                </Header>
                <BodyViewport>{ modulesRoutes() }</BodyViewport>
                <Footer />
              </BodyWrapper>
            </BrowserRouter>
  }
}
