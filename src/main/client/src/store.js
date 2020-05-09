import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import modules from './module/index'


var middleware = () =>composeWithDevTools(applyMiddleware(thunk))

var setup = () => {
	let reducers = {}
	Object.values(modules).forEach( mod => { reducers = Object.assign(reducers, mod.reducer) })
	return combineReducers(reducers)
}

export default createStore(setup(), middleware())
