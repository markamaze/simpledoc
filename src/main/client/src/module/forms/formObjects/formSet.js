import React from 'react'
import * as validationTool from './validationTool'


const prototype = getFormState => ({
  type: function() { return "formSet" },
  properties: {
    id: {
      setValue: function(id){},
      validate: id => {}
    },
    label: {},
  },
  typeFunctions: {}
})


const displayProps = getFormState => ({
  displayKey: "",
  component: {}
})


export { prototype, displayProps }
