import React from 'react'
import { Route } from 'react-router-dom'

import { LayoutBody } from '../styles/layoutStyles'
import Agency from '../component/agency/Agency'
import Home from '../component/home/Home'
import Welcome from '../component/Welcome'


export default class Body extends React.Component {

	render() {
		return (
			<LayoutBody >
				<Route exact path="/" component={Welcome} />
				<Route path="/Home" component={Home} />
				<Route path="/Agency" component={Agency} />
			</LayoutBody>
		)
	}
}
