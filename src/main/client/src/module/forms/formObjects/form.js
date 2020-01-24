import React from 'react'
import * as validationTool from './validationTool'

const sectionPrototype = {
  properties: {
    id: {},
    form_id: {},
    label: {}
  },
  access: {}
}

const layoutPrototype = {
  properties: {
    id: {},
    section_id: {},
    label: {},
    display_type: {}
  },
  access: {}
}

const elementPrototype = {
  properties: {
    id: {},
    layout_id: {},
    key: {},
    value: {},
    valueType: {},
    selectorValues: {},
    displayProperties: {},
    buisinessProperties: {}
  },
  access: {}
}

const prototype = formState => ({
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


const displayProps = () => ({
  displayKey: "",
  component: {}
})


export { prototype, displayProps }
