import React from 'react'
import { createBrowserHistory } from 'history'



function Header(props){

  const [menuState, setMenuState] = React.useState(false)

  const activeModuleRoute = () => props.pathArray.length === 0
    ? props.routes["home"]
    : props.routes[`${props.pathArray[0]}`]

  const updateRoute = (path) => {
    if(props.location.pathname !== path) props.pushHistory(path, {stateKey: "value"})
    setMenuState(false)
  }

  return  <div className={props.className}>
            <div className="row">
              <header className="col-8" onClick={() => updateRoute("/")}>Simpledoc</header>
              {
                !menuState
                  ? <div className="col-4 text-right selected-module"
                          onClick={() => setMenuState(true)}>
                      {activeModuleRoute().title}
                    </div>
                  : <div className="fixed-top d-flex align-items-center flex-column p-3 h-100 bg-dark text-light">
                        {
                          Object.values(props.routes).map(moduleRoute =>
                            <h4 onClick={() => updateRoute(moduleRoute.path)}>
                              {moduleRoute.title}
                            </h4>)
                        }
                      </div>
              }
            </div>

            {
              activeModuleRoute().routes !== undefined ?
                <div className="row d-flex flex-row justify-content-between px-4 py-1">
                  {
                    Object.values(activeModuleRoute().routes).map(route =>
                      <div className={""}
                            onClick={()=>updateRoute(route.path)}>{route.title}</div>)
                  }
                </div>
                : null
            }
          </div>
}

function Footer(props){

  return <div className={props.className}>
            <div>A learning project developed by: MARK A MAZE</div>
          </div>
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

  return  <div className="fixed-top container d-flex flex-column h-100 p-0" >
              <Header
                  className="flex-grow-0 bg-dark text-light p-2"
                  style={{overflow: "auto"}}
                  routes={props.modules}
                  pushHistory={(path, state)=> history.push(path, state) }
                  location={location}
                  pathArray={pathArray} />
              <div className="flex-grow-1 bg-light text-dark p-2 overflow-auto">{activePageComponent()}</div>
              <Footer className="flex-grow-0 bg-dark text-light p-2"/>
            </div>

}
