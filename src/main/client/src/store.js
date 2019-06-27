import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import layoutReducer from './layout/layout_reducer'
import agencyReducer from './modules/Agency/module_reducer'

var middleware = composeWithDevTools(applyMiddleware(thunk))

var reducers = combineReducers({ layout: layoutReducer,
																 agency: agencyReducer
															  })

export default createStore(reducers, middleware)
