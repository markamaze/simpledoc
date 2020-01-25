import React from 'react'

import * as Form from './Forms'
import reducer from './reducer'
import * as formAction from './actions'


export default module = {
  reducer: {forms: reducer},
  onLoad: () => console.log("forms store loading not setup yet"),
  title: "Forms",
  path: "/forms",
  services: [],
  routes: {
    forms: {path: "/forms", default: true, title: "Forms", component: state => <Form.Forms />},
    sets: {path: "/forms/sets", title: "Sets", component: state => <Form.FormSets />}
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