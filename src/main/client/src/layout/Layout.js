import React from 'react'
import { BrowserRouter} from 'react-router-dom'

import {  appStyle,
          LayoutStyle } from '../styles/layoutStyles'
import Body from './Body'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar'
import Drawer from './Drawer'


export default class Layout extends React.Component {


  componentWillMount() {

    for (let i in appStyle.body){
      document.body.style[i] = appStyle.body[i]
    }

    for (let i in appStyle.body){
      document.getElementById("app").style[i] = appStyle.body[i]
    }


}

  render () {
    return (
	      <BrowserRouter history={history}>
          <LayoutStyle className="layoutgrid">
            <Header />
            <Sidebar />
            <Body />
            <Drawer />
            <Footer />
	      	</LayoutStyle>
		    </BrowserRouter>
    )
  }
}
