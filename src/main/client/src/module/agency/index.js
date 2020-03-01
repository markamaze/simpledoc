import React from 'react'

import * as Agency from './Agency'
import agency_reducer from './module_reducer'
import { loadAgencyStore } from './module_actions'


export default module = {
  reducer: {agency: agency_reducer},
  onLoad: loadAgencyStore,
  title: "Agency",
  path: "/agency",
  routes: {
    agency: { path: "/agency", default: true, title: "Agency", component: state => <Agency.AgencyPage  />},
    users: { path: "/agency/users", title: "Users", component: state => <Agency.UsersManagerPage historyState={state} />},
    supplemental: { path: "/agency/supplemental", title: "Other", component: state => <Agency.SupplementalDataManagerPage historyState={state} />}



    // templates: { path: "/agency/templates", title: "Templates", component: state => <Agency.TemplatesManagerPage historyState={state} /> },
    // tags: { path: "/agency/tags", title: "DataTags", component: state => <Agency.DataTagsManagerPage historyState={state}/> },
    // assignments: { path: "/agency/assignments", title: "Assignments", component: state => <Agency.AssignmentManagerPage historyState={state} />},
    // properties: { path: "/agency/properties", title: "Properties", component: state => <Agency.PropertyManagerPage historyState={state} />}
  }
}
