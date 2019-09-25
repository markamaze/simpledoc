import React from 'react'
// import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import styled from 'styled-components'
import { Link, Switch, Route } from 'react-router-dom'

import colors from '../colors'
import Nav from '../components/Nav'


const NavbarWrapper = styled(Nav)`

`


export default class Navigation extends React.Component {

  render() {
    return  <NavbarWrapper>
              <Link to="/Home">Home</Link>
              <Link to="/Agency">Agency</Link>
              <Link to="/Workspace">Workspace</Link>
            </NavbarWrapper>
  }
}
