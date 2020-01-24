import React from 'react'
import Workspace from './Workspace'

import workspace_reducer from './workspace_reducer'
// import {  } from './workspace_actions'


export default module = {
  reducer: {workspace: workspace_reducer},
  onLoad: () => console.log("workspace loading not build"),
  title: "Workspace",
  path: "/workspace",
  services: [  ],
  component: state => <Workspace />

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
