import React, { useState } from 'react'

import ObjectData from './ObjectData'
import Properties from './Properties'
import DataTags from './DataTags'
import Assignments from './Assignments'
import Roles from './Roles'

import ErrorBoundary from '../agencyUtils/ErrorBoundary'


function Card(props){
  const [dataItem, setDataItem] = useState(props.dataItem)
  const propValue = ()=> ({...props, ...{dataItem: dataItem, setDataItem: setDataItem}})

  const cardTools = displayProps => ({
    objectData: displayProps.objectData ? <ObjectData.ShowValues {...propValue} /> : null,
    properties: displayProps.properties ? <Properties.ShowValues {...propValue} /> : null,
    tags: displayProps.tags ? <DataTags.ShowTags {...propValue} /> : null,
    assignments: displayProps.assignments ? <Assignments.Links {...propValue} /> : null,
    roles: displayProps.roles ? <Roles.Links {...propValue} /> : null
  })
  let tools = Object.values(cardTools(props.displayProps)).filter( tool => tool !== null )
  return <div><div>in Card</div>{ tools }</div>
}


function Editor(props){
  const [dataItem, setDataItem] = useState(props.dataItem)
  const propValue = ()=> ({...props, ...{dataItem: dataItem, setDataItem: setDataItem}})

  const editorTools = displayProps => ({
      objectData: displayProps.objectData ? <ObjectData.ShowValues fullSet {...propValue} /> : null,
      properties: displayProps.properties ? <Properties.ModifyValues {...propValue} /> : null,
      tags: displayProps.tags ? <DataTags.ShowTags {...propValue} /> : null,
      assignments: displayProps.assignments ? <Assignments.ImplementAssignment {...propValue} /> : null,
      roles: displayProps.roles ? <Roles.CreateRole {...propValue} /> : null
    })
  let tools = Object.values(editorTools(props.displayProps)).filter( tool => tool !== null )

  return  <div className="agencyObject-editor"><div>in editor</div>{ tools }</div>
}


function Builder(props){
  const [dataItem, setDataItem] = useState(props.dataItem)
  const propValue = ()=> ({...props, ...{dataItem: dataItem, setDataItem: setDataItem}})

  const builderTools = displayProps => ({
    objectData: displayProps.objectData ? <ObjectData.Modify {...propValue} /> : null,
    properties: displayProps.properties ? <Properties.CreateProperties {...propValue} /> : null,
    tags: displayProps.tags ? <DataTags.SelectTags {...propValue} /> : null,
    assignments: displayProps.assignments ? <Assignments.CreateAssignment {...propValue} /> : null,
    roles: displayProps.roles ? <Roles.CreateRole {...propValue} /> : null
  })
  let tools = Object.values(builderTools(props.displayProps)).filter( tool => tool !== null )

  return  <div className="agencyObject-builder"><div>in builder</div>{ tools }</div>
}
