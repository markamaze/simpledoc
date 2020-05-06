import React from 'react'
import * as validationTool from './validationTool'
import { formObject } from './formObject'
import List from '../../../components/List'


const prototype = (getStore, services, utilities) => ({
  type: function () { return "subscription" },
  properties: {
    id: {},
    state: {},
  },
  display: {
    card: subscription => {},
    document: subscription => {},
    editor: subscription => {},
    builder: subscription => {}
  },
  tools: {},
  component: {}
})


export { prototype }
