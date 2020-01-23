import React from 'react'

import { AgencyPage, UsersManagerPage, TemplatesManagerPage, DataTagsManagerPage } from './Agency'
import agency_reducer from './module_reducer'
import { loadAgencyStore } from './module_actions'
import searchAgency from './services/searchAgency'


export default module = {
  reducer: {agency: agency_reducer},
  onLoad: loadAgencyStore,
  title: "Agency",
  path: "/agency",
  services: [ searchAgency ],
  routes: {
    agency: { path: "/agency", default: true, title: "Agency", component: state => <AgencyPage  />},
    users: { path: "/agency/users", title: "Users", component: state => <UsersManagerPage historyState={state} />},
    templates: { path: "/agency/templates", title: "Templates", component: state => <TemplatesManagerPage historyState={state} /> },
    tags: { path: "/agency/tags", title: "DataTags", component: state => <DataTagsManagerPage historyState={state}/> }
  }
}


/*
  right now, within agency module I am importing from outside the module:
    moduleStyles
    store
    DataTableWrapper
    Overlay
    workspace actions


  I would like to figure out how to completly encapsulate the module w/o too much repitition of code
*/
const externalActions = () => ({
  testAction: { label: "external action", action: function(){console.log("success!")}}
})
export { externalActions }
