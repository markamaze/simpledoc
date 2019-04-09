


export const elementobject = fromJS({
  id: new ObjectId().toHexString,
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

export const pairsobject = fromJS({
  id: new ObjectId().toHexString,
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

export const tableobject = fromJS({
  id: new ObjectId().toHexString,
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
export const gridobject = fromJS({
  id: new ObjectId().toHexString,
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


export const sectionobject = fromJS({
  id: new ObjectId().toHexString,
  parentid: null,
  type: 'SECTION',
  layouts: [],
  objectproperties: {
    layoutStyle: 'stack'
  },
  buisnessProperties: {}
})

export const formobject = fromJS({
  id: new ObjectId().toHexString,
  parentid: null,
  type: 'FORM',
  sections: [],
  objectproperties: {
    displayAsTree: false,
    lockInputs: false
  },
  buisnessProperties: {}
})
