import React from 'react'

import * as Forms from './Forms'
import form_reducer from './reducer'
import { loadFormStore } from './actions'


export default module = {
  reducer: {forms: form_reducer},
  onLoad: loadFormStore,
  title: "Forms",
  path: "/forms",
  services: [],
  routes: {
    forms: {path: "/forms", default: true, title: "Forms", component: state => <Forms.FormsPage />},
    sets: {path: "/forms/sets", title: "Sets", component: state => <Forms.FormSetsPage />},
    submissions: {path: "/forms/submissions", title: "Submission Records", component: state => <Forms.SubmissionsPage historyState={state} />},
    monitoring: {path: "/forms/monitoring", title: "Check Store Status", component: state => <Forms.ComplianceCheckPage historyState={state} />}
  }
}
