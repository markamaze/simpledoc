import React from 'react'
import Workspace from './Workspace'

import workspace_reducer from './workspace_reducer'
// import {  } from './workspace_actions'


export default module = {
  reducer: {workspace: workspace_reducer},
  onLoad: () => console.log("workspace loading not build"),
  title: "Workspace",
  path: "/workspace",
  services: {},
  utilities: {
    sendToWorkspace: () => {window.alert("public service announcement: workspace-sendToWorkspace")}
  },
  component: state => <Workspace />

}
