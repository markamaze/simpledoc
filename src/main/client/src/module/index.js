import React from 'react'
import agency from './agency/index'
import forms from './forms/index'
import workspace from './workspace/index'



export default module = {
  home: {
    reducer: {home: {store: {} }},
    onLoad: ()=>console.log("Home loaded"),
    title: "Home",
    path: "/",
    component: state => <div>Hello Home</div>,
    services: [ ]
  }, agency, forms, workspace }
