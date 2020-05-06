import React from 'react'
import agency from './agency/index'
import forms from './forms/index'
import workspace from './workspace/index'
import communications from './communications/index'
import tasks from './tasks/index'
import training from './training/index'



export default module = {
  home: {
    reducer: {home: {store: {} }},
    onLoad: ()=>console.log("Home loaded"),
    title: "Home",
    path: "/",
    component: (state) => <div>Hello Home</div>,
    services: {
      addToHomeStream: () => {window.alert("public service announcement: Home-add to Home stream")},
      loadModuleSummary: () => {}
    },
    utilities: {}
  }, workspace, forms, agency, communications, tasks, training }
