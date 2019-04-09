import { fromJS } from 'immutable'

import objectIdGenerator from '../utility/objectIdGenerator'

//I'm not getting unique Id's when creating new elements

export const element = () => fromJS({
  id: objectIdGenerator(),
  parentid: null,
  type: 'ELEMENT',
  keyObject: [{
    keyType: 'string', /*could be an object, pattern, string*/
    keyDefinition: '', /* define keyType property:
                            */
    key: 'element key',
    isPrimary: true
  }],
  valueObject: {
    valueType: 'text', /*HTML input types, pattern, object, selector*/
    valueTypeDifinition: 'text', /* define valueType property:
                                set object ID paths, selector values, patterns, html input type*/
    value: 'element value' /* if object, set as object label;
                              if selecor, set as selected value;
                              if html input, set as sting representation of the value*/
  },
  objectproperties: {},
  businessProperties: {}
})

export const pairs = () => fromJS({
  id: objectIdGenerator(),
  parentid: null,
  type: 'PAIRS',
  label: 'new pairs layout',
  elements: [],
  objectproperties: {
    valueType: null,
    valueTypeDifinitions: [null],
    keyType: 'string',
    keyTypeDefinitions: [null],
    layoutStyle: 'fill'
  },
  buisnessProperties: {}
})

export const table = () => fromJS({
  id: objectIdGenerator(),
  parentid: null,
  type: 'TABLE',
  label: 'new table layout',
  elements: [],
  objectproperties: {
    valueType: null,
    valueTypeDifinitions: [null],
    keyType: 'string',
    keyTypeDefinitions: [null],
    layoutStyle: 'fill'
  },
  buisnessProperties: {}
})
export const grid = () => fromJS({
  id: objectIdGenerator(),
  parentid: null,
  type: 'GRID',
  label: 'new grid layout',
  elements: [],
  objectproperties: {
    valueType: null,
    valueTypeDifinitions: [null],
    keyType: 'string',
    keyTypeDefinitions: [null],
    layoutStyle: 'fill'
  },
  buisnessProperties: {}
})


export const section =  () => fromJS({
  id: objectIdGenerator(),
  parentid: null,
  type: 'SECTION',
  label: 'new section',
  layouts: [],
  objectproperties: {
    layoutStyle: 'stack'
  },
  buisnessProperties: {}
})

export const form = () => fromJS({
  id: objectIdGenerator(),
  type: 'FORM',
  label: 'new form',
  sections: [],
  objectproperties: {
    displayAsTree: false,
    lockInputs: false
  },
  buisnessProperties: {},
  ispublished: false
})
