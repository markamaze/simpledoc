import React from 'react'
import * as validationTool from './validationTool'


const prototype = formState => ({
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


const displayProps = () => ({
  displayKey: "",
  component: {}
})


export { prototype, displayProps }
