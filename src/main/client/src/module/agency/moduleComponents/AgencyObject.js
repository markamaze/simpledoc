import React, { useState } from 'react'

import ObjectData from './ObjectData'
import Properties from './Properties'
import DataTags from './DataTags'
import Assignments from './Assignments'
import Roles from './Roles'
import { CardWrapper, EditorWrapper, BuilderWrapper } from '../agencyStyles'
import ErrorBoundary from '../agencyUtils/ErrorBoundary'



function Card(props){
  const propsValue = { dataItem: props.dataItem, ...props.displayProps }

  const cardTools = setProps => ({
    objectData: props.displayProps.objectData ? <ObjectData.ShowValues {...setProps} /> : null,
    properties: props.displayProps.properties ? <Properties.ShowValues {...setProps} /> : null,
    tags: props.displayProps.tags ? <DataTags.ShowTags {...setProps} /> : null,
    assignments: props.displayProps.assignments ? <Assignments.Links {...setProps} /> : null,
    roles: props.displayProps.roles ? <Roles.Links {...setProps} /> : null
  })


  let tools = Object.values(cardTools(propsValue)).filter( tool => tool !== null )
  try{
    return  <CardWrapper><div>in Card</div>{tools}</CardWrapper>
  } catch(error){ props.onError(new Error(`${error}: error rendering AgencyObject Card`))}
}


function Editor(props){
  const [dataItem, setDataItem] = useState(props.dataItem)
  const propsValue = {dataItem: dataItem, setDataItem: setDataItem, ...props.displayProps}

  const editorTools = setProps => ({
      objectData: props.displayProps.objectData ? <ObjectData.ShowValues {...setProps} /> : null,
      properties: props.displayProps.properties ? <Properties.ModifyValues {...setProps} /> : null,
      tags: props.displayProps.tags ? <DataTags.ShowTags {...setProps} /> : null,
      assignments: props.displayProps.assignments ? <Assignments.ImplementAssignment {...setProps} /> : null,
      roles: props.displayProps.roles ? <Roles.CreateRole {...setProps} /> : null
    })

  let tools = Object.values(editorTools(propsValue)).filter( tool => tool !== null )

  try {
  return  <EditorWrapper><div>in editor</div>{ tools }</EditorWrapper>
  } catch(error){ props.onError(new Error(`${error}: error rendering AgencyObject Editor`))}
}


function Builder(props){
  const [dataItem, setDataItem] = useState(props.dataItem)
  const propsValue = {dataItem: dataItem, setDataItem: setDataItem, ...props.displayProps}

  const builderTools = setProps => ({
    objectData: props.displayProps.objectData ? <ObjectData.Modify {...setProps} /> : null,
    properties: props.displayProps.properties ? <Properties.CreateProperties {...setProps} /> : null,
    tags: props.displayProps.tags ? <DataTags.SelectTags {...setProps} /> : null,
    assignments: props.displayProps.assignments ? <Assignments.CreateAssignment {...setProps} /> : null,
    roles: props.displayProps.roles ? <Roles.CreateRole {...setProps} /> : null
  })
  let tools = Object.values(builderTools(propsValue)).filter( tool => tool !== null )

  try{
    return  <BuilderWrapper><div>in builder</div>{ tools }</BuilderWrapper>
  } catch(error){ props.onError(new Error(`${error}: error rendering AgencyObject Builder`))}
}

export default { Builder, Editor, Card }
