import React from 'react'
import * as validationTool from './validationTool'



const prototype = getFormState => ({
  type: function() { return "form" },
  properties: { /*TODO: build form properties & validation*/
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
