import React from 'react'
import { Route} from 'react-router-dom'


import {  moduleToolbar,
          agencyToolbar } from './toolbar'
import { LayoutSidebar } from '../styles/layoutStyles'


export default class Sidebar extends React.Component {
  render() {

    return  <LayoutSidebar >
              {moduleToolbar}
            </LayoutSidebar>
            // <Route exact path ='/' render={()=>moduleToolbar} />
            // <Route path="/Agency" render={()=>agencyToolbar} />
  }
}
