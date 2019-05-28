import React from 'react'
import { Route} from 'react-router-dom'

import { agencyToolbar } from '../component/agency/agency_toolbar'
import {  moduleToolbar } from './toolbar'
import { LayoutSidebar } from '../styles/layoutStyles'


export default class Sidebar extends React.Component {
  render() {

    return  <LayoutSidebar >
              <Route exact path ='/' render={()=>moduleToolbar} />
              <Route path="/Agency" render={()=>agencyToolbar} />
            </LayoutSidebar>
  }
}
