import React from 'react'
import { Route } from 'react-router-dom'

import { BodyWrapper } from './layout_styles'
import Agency from '../modules/Agency/Agency'
// import Home from '../component/home/Home'


export default class Body extends React.Component {

	render() {
		return (
			<BodyWrapper >
				<Route exact path="/" render={()=> <div>Welcome</div>} />

				<Route path="/Agency" component={Agency} />
			</BodyWrapper>
		)
	}
}

// <Route path="/Home" component={Home} />
