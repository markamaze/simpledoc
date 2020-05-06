import React from 'react'
import uuidv4 from 'uuid/v4'

import moduleObjectPrototype from '../../moduleObjectPrototype'
import * as storageActions from '../actions'

import * as form from './form'
import * as section from './section'
import * as layout from './layout'
import * as element from './element'
import * as formSet from './formSet'
import * as submission from './submission'
import * as formSubscription from './formSubscription'


const formPrototypes = { form, section, layout, element, formSet, submission, formSubscription }
const typeMap = {
  form: "FORMS.FORM",
  formSet: "FORMS.FORMSET",
  submission: "FORMS.SUBMISSION",
  section: "FORMS.SECTION",
  layout: "FORMS.LAYOUT",
  element: "FORMS.ELEMENT",
  formSubscription: "FORMS.SUBSCRIPTION"
}
const formStorageHandlers = {
  create: storageActions.createFormObjects,
  update: storageActions.updateFormObjects,
  remote: storageActions.removeFormObjects
}


const formObject = (type, data, getStore, getServices, getUtilities, failure) => {
  try {
    let _formObj = Object.create({
      ...formPrototypes[type].prototype(getStore, getServices, getUtilities),
      ...moduleObjectPrototype(typeMap, formStorageHandlers)
    })
    _formObj.init(data, failure)

    return _formObj
  } catch(error){ failure(new Error(`${error}: failure to create formObject`)) }
}

export { formObject }
