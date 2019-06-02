import React from 'react'
import { BrowserRouter} from 'react-router-dom'

import { LayoutWrapper } from './layout_styles'
import Body from './Body'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar'
import Drawer from './Drawer'


export default class Layout extends React.Component {

  render () {
    return (
	      <BrowserRouter history={history}>
          <LayoutWrapper >
            <Header />
            <Sidebar />
            <Body />
            <Drawer />
            <Footer />
	      	</LayoutWrapper>
		    </BrowserRouter>
    )
  }
}
