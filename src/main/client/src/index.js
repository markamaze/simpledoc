import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { loadAgencyData } from './modules/Agency/module_actions'
import { appStyle } from './root_styles'
import Layout from './layout/Layout'
import store from './store'

if (module.hot) {
  module.hot.accept()
}

for (let i in appStyle.body){
  document.body.style[i] = appStyle.body[i]
}

for (let i in appStyle.body){
  document.getElementById("app").style[i] = appStyle.body[i]
}

loadAgencyData()


ReactDOM.render(
  (
    <Provider store={store}>
      <Layout />
    </Provider>
  ),document.getElementById("app")
)
