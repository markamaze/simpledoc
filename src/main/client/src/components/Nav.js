import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import colors from '../colors'

const NavWrapper = styled.nav`
  display: flex;
  flex-direction: ${props => props.column ? "column" : "row" };
  flex-grow: 2;
  a {
    display: block;
    width: auto;
    padding: .5rem;
    color: ${colors.four}
  }
  .active {
    background: ${colors.four};
    color: ${colors.three};
  }
`

export default class Nav extends React.Component {



  render() {
    let children = document.activeElement.parentElement.children
    let num_children = children.length
    let index = 0
    while(index < num_children){
      children[index].classList.remove("active")
      ++index
    }
    document.activeElement.className += " active"

    return  <NavWrapper column={this.props.column}>
              { this.props.children }
            </NavWrapper>

  }
}
