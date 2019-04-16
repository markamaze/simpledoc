import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import appStateReducer from './component/appstate_reducer'
import agencyReducer from './component/agency/agency_reducer'

var middleware = composeWithDevTools(applyMiddleware(thunk))

var reducers = combineReducers({ appState: appStateReducer,
																 agency: agencyReducer
															  })

export default createStore(reducers, middleware)
