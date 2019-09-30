import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

import workspaceReducer from './module/workspace/workspace_reducer'
import agencyReducer from './module/agency/module_reducer'

var middleware = composeWithDevTools(applyMiddleware(thunk))

var reducers = combineReducers({ workspace: workspaceReducer,
																 agency: agencyReducer
															  })


export default createStore(reducers, middleware)
