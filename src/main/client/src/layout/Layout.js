import React from 'react'
import { createBrowserHistory } from 'history'

import { BodyWrapper, BodyViewport, HeaderWrapper, FooterWrapper } from './layoutStyles'




function Header(props){

  const [menuState, setMenuState] = React.useState(false)

  const activeModuleRoute = () => props.pathArray.length === 0
    ? props.routes["home"]
    : props.routes[`${props.pathArray[0]}`]

  const updateRoute = (path) => {
    if(props.location.pathname !== path) props.pushHistory(path, {stateKey: "value"})
    setMenuState(false)
  }

  return  <HeaderWrapper>
            <div className="header">
              <header onClick={() => updateRoute("/")}>Simpledoc</header>
              {
                !menuState
                  ? <div className="selected-module"
                          onClick={() => setMenuState(true)}>
                      {activeModuleRoute().title}
                    </div>
                  : <div className="module-menu">
                        {
                          Object.values(props.routes).map(moduleRoute =>
                            <div className="module-menu-item" onClick={() => updateRoute(moduleRoute.path)}>
                              {moduleRoute.title}
                            </div>)
                        }
                      </div>
              }
            </div>

            {
              activeModuleRoute().routes !== undefined ?
                <div className="subheader">
                  {
                    Object.values(activeModuleRoute().routes).map(route =>
                      <div className={"subheader-item"}
                            onClick={()=>updateRoute(route.path)}>{route.title}</div>)
                  }
                </div>
                : null
            }
          </HeaderWrapper>
}

function Footer(props){

  return <FooterWrapper className="footer_container">
            <p>A learning project developed by: MARK A MAZE</p>
          </FooterWrapper>
}

export default function Layout(props){
  const history = createBrowserHistory()
  const [location, setLocation] = React.useState(history.location)
  const unlisten = history.listen((location, action) => {
    setLocation(location)
  })

  const pathArray = location.pathname.split("/").filter( item => item !== "" )

  const activePageComponent = () => {
    let found
    if(pathArray.length === 0) found = props.modules["home"]
    else if(pathArray.length === 1) found = props.modules[`${pathArray[0]}`]
    else if(pathArray.length === 2) found = props.modules[`${pathArray[0]}`].routes[`${pathArray[1]}`]
    else throw new Error("unhandled location.pathname")

    if(!found) throw new Error("could not find activePageRoute")


    if(found.component) return found.component()
    let componentRoute = Object.values(found.routes).find(route => route.default)

    if(componentRoute.component) return componentRoute.component()
    else throw new Error("could not find default route in given path")
  }

  return  <BodyWrapper >
              <Header
                  routes={props.modules}
                  pushHistory={(path, state)=> history.push(path, state) }
                  location={location}
                  pathArray={pathArray} />
              <BodyViewport className="module-viewport">
                {
                  activePageComponent()
                }
              </BodyViewport>
              <Footer />
            </BodyWrapper>

}
