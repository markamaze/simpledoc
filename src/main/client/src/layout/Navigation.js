import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import colors from '../colors'


const NavigationWrapper = styled.div`
  /* background: ${colors.three}; */
  .nav-tool-closed {
    display: block:
    flex-direction: row;
    width: auto;
    height: auto;
    padding: .5rem;
  }

  .nav-tool-open {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    padding: 1rem;
    background: ${colors.two};
    min-width: 98%;
    max-width: 98%;
    min-height: 30%;
    max-height: 100%;
    margin: auto;
    z-index: 5;
  }
  .subnav {
    display: inline-flex;
  }

  a {
    display: inline-flex;
    text-decoration: none;
    color: ${colors.four};
    padding: .25rem;

    /* .active {
      background: ${colors.four};
      border-radius: .5rem;
      color: ${colors.three};
    } */
  }

  .link-container {
    display: inline-flex;
    flex-direction: column;
  }
  .link {
    padding: 2vh + 2vw;
    margin: .5rem 0 0 0;
    border-top: 1px solid ${colors.four};
  }


  .toggle-tool {
    display: inline-flex;
    padding: .4rem .8rem;
  }
`

export default class Navigation extends React.Component {

  constructor(props){
    super()
    this.state = {
      collapsed: true
    }
  }
  toggleMenuState(flag) {
    if(flag === "sub-only") this.setState({ collapsed: this.state.collapsed ? false : true })
    else {
      this.props.subnav && !this.state.collapsed ?
        this.props.toggleparent()
        : this.setState({ collapsed: this.state.collapsed ? false : true })
    }

  }

  getToggleBody(activepath) {
    let isSubnav = this.props.subnav ? this.props.subnav : false
    let isCollapsed = this.state.collapsed
    let body = ""

    switch(isSubnav){
      case true:
        if(!isCollapsed) body = "X"
        else body = ">"
        break
      case false:
        if(!isCollapsed) body = "X"
        else {
        let tempbody = activepath.split("/")
        tempbody.forEach(item => {
          item === "" ? null : body += " > " + item
        })}
    }
    return body === "" ? "menu" : body
  }

  render() {

    let activepath = window.location.pathname

    return  <NavigationWrapper className={this.props.subnav ? "subnav" : "mainnav"} >
              <nav className={this.props.subnav ? "" : this.state.collapsed ? "nav-tool-closed" : "nav-tool-open"}>
                <div className={'toggle-tool'} onClick={() => this.toggleMenuState("sub-only")}>
                  { this.getToggleBody(activepath) }
                </div>
                <div className={`link-container`}>
                  {
                    this.state.collapsed ? null
                      : this.props.links.map(link =>
                        <div className={`link`}>
                          <Link
                              className={ activepath === link.to ? "active" : ""}
                              to={link.to}
                              onClick={() => this.toggleMenuState()} >
                            { link.title } </Link>
                            { link.links ? <Navigation
                                              subnav
                                              links={link.links}
                                              toggleparent={this.toggleMenuState.bind(this)} />
                                          : null }
                        </div>
                        )
                  }
                </div>
              </nav>
            </NavigationWrapper>
  }
}
