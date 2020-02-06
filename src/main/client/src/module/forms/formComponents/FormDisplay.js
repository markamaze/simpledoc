import React from 'react'

import { DocumentWrapper, EditorWrapper, CreatorWrapper } from '../styles'
import * as Form from './Form'
import * as Section from './Section'
import * as Layout from './Layout'
import * as Element from './Element'
import * as CompletionRules from './CompletionRules'
import * as SecuritySettings from './SecuritySettings'


function Document(props){
  const propsValue = { dataItem: props.dataItem, ...props.displayProps }

  const documentTools = setProps => ({
    formInfo: setProps.formInfo ? <Form.Display {...setProps} /> : null,
    sections: setProps.sections ? <Section.Display {...setProps} /> : null,
    layouts: setProps.layouts ? <Layout.Display {...setProps} /> : null,
    elements: setProps.elements ? <Element.ShowValues {...setProps} /> : null,
    completionRules: setProps.completionRules ? <CompletionRules.ShowValues {...setProps} /> : null,
    securityRules: props.securityRules ? <SecuritySettings.Enforce {...setProps} /> : null
  })

  let tools = Object.values(documentTools(propsValue)).filter( tool => tool !== null )

  try{
    return <DocumentWrapper>in document{tools}</DocumentWrapper>
  } catch(err) {throw err}
}


function Editor(props){
  const propsValue = { form: props.form, ...props.displayProps }

  const editorTools = setProps => ({
    formInfo: setProps.formInfo ? <Form.Display {...setProps} /> : null,
    sections: setProps.sections ? <Section.Display {...setProps} /> : null,
    layouts: setProps.layouts ? <Layout.Display {...setProps} /> : null,
    elements: setProps.elements ? <Element.EditValues {...setProps} /> : null,
    completionRules: setProps.completionRules ? <CompletionRules.ShowValues {...setProps} /> : null,
    securityRules: props.securityRules ? <Security.Enforce {...setProps} /> : null

  })

  let tools = Object.values(editorTools(propsValue)).filter( tool => tool !== null )

  try{
    return <EditorWrapper>in editor{tools}</EditorWrapper>
  }catch(err){throw err}
}


function Creator(props){
  const propsValue = { form: props.form, ...props.displayProps }

  const creatorTools = setProps => ({
//TODO: write component tools to display FormObject as builder
// show form as: builder mode -> add/modify/delete the sections, layouts, and element definitions
// set properties for completion_rules and security_settings/display_settings

    formInfo: setProps.formInfo ? <Form.Define {...setProps} /> : null,
    sections: setProps.sections ? <Section.Define {...setProps} /> : null,
    layouts: setProps.layouts ? <Layout.Define {...setProps} /> : null,
    elements: setProps.elements ? <Element.Define {...setProps} /> : null,
    completionRules: setProps.completionRules ? <CompletionRules.Define {...setProps} /> : null,
    securityRules: props.securityRules ? <Security.Define {...setProps} /> : null
  })

  let tools = Object.values(creatorTools(propsValue)).filter( tool => tool !== null )

  try{
    return <CreatorWrapper>in creator{tools}</CreatorWrapper>
  }catch(err){throw err}
}


export default { Creator, Editor, Document }
