import React from 'react'
import styled from 'styled-components'
import { createBrowserHistory } from 'history'

import Footer from './Footer'
import Header from './Header'


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
  margin: 0 auto;

  @media (min-width: 500px) {
    width: 500px;
  }
  @media (min-width: 700px) {
    width: 700px;
  }
  @media (min-width: 950px) {
    width: 950px;
  }
  @media (min-width: 1200px) {
    width: 1200px;
  }
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






export default function Layout(props){
  const history = createBrowserHistory()
  const [location, setLocation] = React.useState(history.location)

  const unlisten = history.listen((location, action) => {
    setLocation(location)
  })

  const findRoute = (routes, path) => {
    let foundRoute = routes.find(route => path.startsWith(route.path))

    if(foundRoute.path === path && foundRoute.component) return foundRoute
    else foundRoute = Object.values(foundRoute.routes).find(route => path === route.path)

    if(foundRoute.component) return foundRoute
    else console.log("error finding route")
    }

  return  <BodyWrapper >
              <Header routes={props.modules} pushHistory={(path, state)=> history.push(path, state) } location={location}/>

              <BodyViewport >
                {
                  findRoute(props.modules, location.pathname).component(location.state)
                }
              </BodyViewport>
              <Footer />
            </BodyWrapper>

}
