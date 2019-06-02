import React from 'react'
import { Route} from 'react-router-dom'

import { agency_toolbar } from '../modules/Agency/module_toolbar'
import { SidebarWrapper } from './layout_styles'
import Toolbar from '../components/Toolbar'
import StyledLink from '../components/StyledLink'



const default_toolbar = <Toolbar column>
            <StyledLink to="/Home" label="Home" />
            <StyledLink to="/Agency" label="Agency" />
            <StyledLink to="/Forms" label="Forms" />
          </Toolbar>


export default class Sidebar extends React.Component {

  render() {

    return  <SidebarWrapper >
              <Route exact path ='/' render={()=>default_toolbar} />
              <Route exact path='/Agency' render={()=>agency_toolbar} />
            </SidebarWrapper>
  }
}
