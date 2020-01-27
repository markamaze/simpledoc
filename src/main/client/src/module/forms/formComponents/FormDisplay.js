import React from 'react'

import { DocumentWrapper, EditorWrapper, CreatorWrapper } from '../styles'
import * as FormComponents from './FormComponents'

function Document(props){
  const propsValue = { dataItem: props.dataItem, ...props.displayProps }

  const cardTools = setProps => ({
    formInfo: setProps.formInfo ? <FormComponents.Form {...setProps} /> : null,




    sections: setProps.sections ? <Sections.Display {...setProps} /> : null,
    layouts: setProps.layouts ? <Layouts.Display {...setProps} /> : null,
    elements: setProps.elements ? <Elements.ShowValues {...setProps} /> : null,
    completionRules: setProps.completionRules ? <CompletionRules.ShowValues {...setProps} /> : null,
    securityRules: props.securityRules ? <Security.Enforce {...setProps} /> : null
  })

  let tools = Object.values(cardTools(propsValue)).filter( tool !== null )

  try{
    return <DocumentWrapper>{tools}</DocumentWrapper>
  } catch(err) {throw err}
}


function Editor(props){
  const propsValue = { form: props.form, ...props.displayProps }

  const editorTools = setProps => ({
//TODO: write component tools to display FormObject as Editor
// show form as: a document to be filled out and submitted
// display each formObject based on security_settings/display_settings
// assign to formSets

    formInfo: setProps.formInfo ? <Info.ShowValues {...setProps} /> : null,
    sections: setProps.sections ? <Sections.Display {...setProps} /> : null,
    layouts: setProps.layouts ? <Layouts.Display {...setProps} /> : null,
    elements: setProps.elements ? <Elements.Inputs {...setProps} /> : null,
    completionRules: setProps.completionRules ? <CompletionRules.ShowValues {...setProps} /> : null,
    securityRules: props.securityRules ? <Security.Enforce {...setProps} /> : null

  })

  let tools = Object.values(editorTools(propsValue)).filter( tool !== null )

  try{
    return <EditorWrapper>{tools}</EditorWrapper>
  }catch(err){throw err}
}


function Creator(props){
  const propsValue = { form: props.form, ...props.displayProps }

  const builderTools = setProps => ({
//TODO: write component tools to display FormObject as builder
// show form as: builder mode -> add/modify/delete the sections, layouts, and element definitions
// set properties for completion_rules and security_settings/display_settings

    formInfo: setProps.formInfo ? <Info.SetValues {...setProps} /> : null,
    sections: setProps.sections ? <Sections.Modify {...setProps} /> : null,
    layouts: setProps.layouts ? <Layouts.Modify {...setProps} /> : null,
    elements: setProps.elements ? <Elements.Define {...setProps} /> : null,
    completionRules: setProps.completionRules ? <CompletionRules.Define {...setProps} /> : null,
    securityRules: props.securityRules ? <Security.Define {...setProps} /> : null
  })

  let tools = Object.values(builderTools(propsValue)).filter( tool !== null )

  try{
    return <CreatorWrapper>{tools}</CreatorWrapper>
  }catch(err){throw err}
}


export default { Creator, Editor, Document }
