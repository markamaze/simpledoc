import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import Layout from './layout/Layout'
import store from './store'

if (module.hot) {
  module.hot.accept()
}




ReactDOM.render(
  (
    <Provider store={store}>
      <Layout />
    </Provider>
  ),document.getElementById("app")
)
