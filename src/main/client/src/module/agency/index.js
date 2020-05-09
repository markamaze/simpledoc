import React from 'react'

import * as Agency from './Agency'
import agency_reducer from './module_reducer'
import { loadAgencyStore } from './module_actions'



export default module = {
  reducer: {agency: agency_reducer},
  onLoad: (getStore, getServices, getUtilities) => loadAgencyStore(getStore, getServices, getUtilities),
  title: "Agency",
  path: "/agency",
  services: {
    testAddingServiceToAgency: () => <div style={{display: "block", height: "100%", width: "100%", position: "absolute"}}>hello test</div>
  },
  utilities: {
    searchAgency: () => {window.alert("public service announcement: Agency-searchAgency")}
  },
  routes: {
    agency: { path: "/agency", default: true, title: "Agency", component: (history) => <Agency.AgencyPage  history={history} />},
    users: { path: "/agency/users", title: "Users", component: (history) => <Agency.UsersManagerPage history={history} />},
    tags: { path: "/agency/tags", title: "Tags", component: history => <Agency.TagManagerPage history={history} />},
    roles: { path: "/agency/roles", title: "Roles", component: (history) => <Agency.RoleManagerPage history={history} />}
  }
}
