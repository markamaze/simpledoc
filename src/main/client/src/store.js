import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import modules from './module/index'


var middleware = composeWithDevTools(applyMiddleware(thunk))

var reducers = () => {
	let reducersList = modules.map(module => module.reducer)
	let reducers = {}
	modules.forEach( module => { module.onLoad() })

	reducersList.forEach(reducer => {
		reducers = {...reducers, ...reducer}
	})
	return combineReducers(reducers)
}

export default createStore(reducers(), middleware)
