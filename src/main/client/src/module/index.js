import React from 'react'
import agency from './agency/index'
import workspace from './workspace/index'
import store from '../store'

export const moduleStore = store

export default module = [
  agency,
  {
    reducer: {home: {store: {} }},
    onLoad: ()=>console.log("Home loaded"),
    title: "Home",
    path: "/",
    component: state => <div>Hello Home</div>,
    services: [ ]
  }
]
