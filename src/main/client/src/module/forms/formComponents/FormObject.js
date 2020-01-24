import React from 'react'

import { CardWrapper, EditorWrapper, BuilderWrapper } from '../styles'
import Form from './Form'
import Section from './Section'
import Layout from './Layout'
import Element from './Layout'

function Card(props){
  const propsValue = { form: props.form, ...props.displayProps }

  const cardTools = setProps => ({
//TODO: write component tools to display FormObject as card
  })

  let tools = Object.values(cardTools(propsValue)).filter( tool !== null )

  try{
    return <CardWrapper>{tools}</CardWrapper>
  }
}


function Editor(props){
  const propsValue = { form: props.form, ...props.displayProps }

  const editorTools = setProps => ({
//TODO: write component tools to display FormObject as Editor
  })

  let tools = Object.values(editorTools(propsValue)).filter( tool !== null )

  try{
    return <EditorWrapper>{tools}</EditorWrapper>
  }
}


function Builder(props){
  const propsValue = { form: props.form, ...props.displayProps }

  const builderTools = setProps => ({
//TODO: write component tools to display FormObject as builder
  })

  let tools = Object.values(builderTools(propsValue)).filter( tool !== null )

  try{
    return <BuilderWrapper>{tools}</BuilderWrapper>
  }
}


export default { Builder, Editor, Card }
