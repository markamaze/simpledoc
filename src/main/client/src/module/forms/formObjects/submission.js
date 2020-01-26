import React from 'react'
import * as validationTool from './validationTool'



const prototype = getFormState => ({
  type: function() { return "submission" },
  properties: {},
  typeFunctions: {}
})


const displayProps = getFormState => ({
  displayKey: "",
  component: {}
})


export { prototype, displayProps }
