import React from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import styled from 'styled-components'
import { Link, Switch, Route } from 'react-router-dom'

import colors from '../colors'


const NavbarWrapper = styled(Navbar)`
  background: ${colors.three};

  a {
    color: ${colors.four};
    padding: .5rem;
  }

  .dropdown .nav-link {
    color: ${colors.four};
  }

  .dropdown-menu {
    background: ${colors.three};
    a {
      color: ${colors.four}
    }
  }

  header {
    font-size: 2rem;
    letter-spacing: .2rem;
    font-style: italic;
    font-weight: 500;
    color: ${colors.four};
  }
`


export default class Navigation extends React.Component {

  render() {
    return <NavbarWrapper expand="sm" className="d-flex align-content-stretch">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Link to="/Home">Home</Link>
                  <Link to="/Agency">Agency</Link>
                  <Link to="/Workspace">Workspace</Link>
                </Nav>
              </Navbar.Collapse>
              <Container className="flex-grow-1 justify-content-center">
                <Switch>
                  <Route exact path="/" render={()=> <header>Welcome</header>} />
                  <Route exact path="/Home" render={()=> <header>Home</header>} />
                  <Route exact path="/Agency" render={() => <header>Agency</header>} />
                  <Route exact path="/Workspace" render={() => <header>Workspace</header>} />
                </Switch>
              </Container>
            </NavbarWrapper>
  }
}
