import React from 'react'
import { Route } from 'react-router-dom'

import { SidebarWrapper } from './layout_styles'
import Toolbar from '../components/Toolbar'
import StyledLink from '../components/StyledLink'





export default class Sidebar extends React.Component {

  render() {

    return  <SidebarWrapper >
              <Toolbar column>
                <StyledLink to="/Home" label="Home" />
                <StyledLink to="/Agency" label="Agency" >
                  <Route path="/Agency" render={() =>
                      <StyledLink to="/Agency/Admin" label="> Admin" /> } />
                  </StyledLink>
                  <StyledLink to="/Forms" label="Forms" />
                </Toolbar>
            </SidebarWrapper>
  }
}
