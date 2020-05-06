import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import Layout from './layout/Layout'
import store from './store'
import appModules from './module/index'

if (module.hot) {
  module.hot.accept()
}

var services = {}
var utilities = {}
Object.values(appModules).forEach( mod => {
  services = Object.assign(services, mod.services)
  utilities = Object.assign(utilities, mod.utilities)
})
Object.values(appModules).forEach(mod => { mod.onLoad((modStore)=>store.getState()[modStore], services, utilities) })

ReactDOM.render(
  (
    <Provider store={store}>
      <Layout modules={appModules} services={services} utilities={utilities} />
    </Provider>
  ),document.getElementById("app")
)
