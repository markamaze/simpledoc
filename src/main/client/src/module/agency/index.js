import React from 'react'

import AgencyModule from './AgencyModule'
import agency_reducer from './module_reducer'
import { loadAgencyStore } from './module_actions'



export default module = {
  reducer: {agency: agency_reducer},
  onLoad: loadAgencyStore,
  title: "Agency",
  path: "/Agency",
  component: <AgencyModule />
}


/*
  right now, within AgencyModule I am importing from outside the module:
    moduleStyles
    store
    DataTableWrapper
    Overlay
    ajax
    workspace actions


  I would like to figure out how to completly encapsulate the module w/o too much repitition of code
*/
