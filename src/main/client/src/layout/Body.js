import React from 'react'
import { Route } from 'react-router'

import Drawer from './Drawer'
import { BodyWrapper } from './layout_styles'
import Agency from '../modules/Agency/Agency'
import AgencyAdmin from '../modules/Agency/AgencyAdmin'
import { BodyViewport } from './layout_styles'
import { createDrawerComponent } from './layout_actions'
import AboutPage from '../modules/AboutPage/AboutPage'


export default class Body extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			drawerOpen: false
		}
	}

	toggleDrawer() {
		this.setState({
			drawerOpen: this.state.drawerOpen ? false : true
		})
	}


	render() {

		return (
			<BodyWrapper >
				<BodyViewport drawerOpen={this.state.drawerOpen} >

					<Route exact path="/" render={()=> <div>Welcome</div>} />

					<Route exact path="/Agency" render={() =>
						<Agency createDrawerComponent={ createDrawerComponent } />} />

					<Route exact path="/Agency/Admin" render={() =>
						<AgencyAdmin createDrawerComponent={ createDrawerComponent } />} />

					<Route exact path="/About" component={AboutPage} />

				</BodyViewport>

				<Drawer drawerOpen={this.state.drawerOpen}
								toggleDrawer={this.toggleDrawer.bind(this)} />

			</BodyWrapper>
		)
	}
}
