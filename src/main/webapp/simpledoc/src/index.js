import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import Layout from './layout/Layout'
import store from './store'
import { loadAllAgentTypes } from './component/agency/agency_actions'

if (module.hot) {
  module.hot.accept()
}

store.dispatch(loadAllAgentTypes)



ReactDOM.render(
  (
    <Provider store={store}>
      <Layout />
    </Provider>
  ),document.getElementById("app")
)
