import React from 'react'
import { Route } from 'react-router-dom'

import { BodyWrapper } from './layout_styles'
import Agency from '../modules/Agency/Agency'
import AgencyAdmin from '../modules/Agency/AgencyAdmin'

// import Home from '../component/home/Home'


export default class Body extends React.Component {

	render() {
		return (
			<BodyWrapper >
				<Route exact path="/" render={()=> <div>Welcome</div>} />
				<Route exact path="/Agency" component={Agency} />
				<Route exact path="/Agency/Admin" component={AgencyAdmin} />
			</BodyWrapper>
		)
	}
}

// <Route path="/Home" component={Home} />
