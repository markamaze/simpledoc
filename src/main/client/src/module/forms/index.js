import React from 'react'

import * as Forms from './Forms'
import form_reducer from './reducer'
import { loadFormStore } from './actions'

export default module = {
  reducer: {forms: form_reducer},
  onLoad: (getStore, getServices, getUtilities) => loadFormStore(getStore, getServices, getUtilities),
  title: "Forms",
  path: "/forms",
  services: {
    requireForm: () => {window.alert("public service announcement: Form-requireForm")},
    makeFormAvailable: () => {window.alert("public service announcement: Form-makeFormAvailable")},
    searchSubmissions: () => {window.alert("public service announcement: Form-searchSubmissions")},
    searchForms: () => {window.alert("public service announcement: Form-searchForms")},
    testTwo: (data) => {
      console.log("testTwo data", data)
      return <div>Test two</div>
    }
  },
  utilities: {},
  routes: {
    forms: {
      path: "/forms",
      default: true,
      title: "Forms",
      component: (history, services, utilities) => <Forms.FormsPage services={services} utilities={utilities}/>
    },
    sets: {
      path: "/forms/sets",
      title: "Sets",
      component: (history, services, utilities) => <Forms.FormSetsPage services={services} utilities={utilities}/>
    },
    submissions: {
      path: "/forms/submissions",
      title: "Submission Records",
      component: (history, services, utilities) => <Forms.SubmissionsPage services={services} utilities={utilities}/>
    }
  }
}
