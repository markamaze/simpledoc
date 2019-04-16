import { fromJS } from 'immutable'


const emptyForm = fromJS({
  id: null, parentid: null,
  label: null,
  type: 'FORM',
  sections: [],
  displayProperties: {},
  businessProperties: {}
})
const emptySection = fromJS({
  id: null, parentid: null,
  label: null,
  type: 'SECTION',
  layouts: [],
  displayProperties: {},
  businessProperties: {}
})
const emptyLayout = fromJS({
  id: null, parentid: null,
  label: null,
  type: 'LAYOUT',
  type: null,
  elements: [],
  displayProperties: {},
  businessProperties: {}
})
const emptyElement = fromJS({
  id: null, parentid: null,
  type: 'ELEMENT',
  key: null,
  value: null,
  valueType: null,
  selectorValues: null,
  displayProperties: {},
  businessProperties: {}
})

//create more sample forms and build a sample store
// with both published and unpublished forms
export const sampleForm = fromJS({
  id: "here", parentid: 'root',
  label: "sample form 1",
  type: "FORM",
  sections: [
    {
      id: 'is', parentid: 'here',
      label: "section 1",
      type: 'SECTION',
      layouts: [
        {
          id: 'my', parentid: 'is',
          label: "section 1, layout 1",
          type: "PAIRS",
          elements: [
            {
              id: 'element', parentid: 'my',
              type: 'ELEMENT',
              key: "element 1 key",
              value: "element 1 value",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: "element 2 key",
              value: "element 2 value",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: "element 3 key",
              value: "element 3 value",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            }
          ],
          displayProperties: {},
          businessProperties: {}
        },
        {
          id: null, parentid: null,
          label: "section 1, layout 2",
          type: "TABLE",
          elements: [
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: "key 1",
              value: "value 1",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: "key 1",
              value: "value 2",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: "key 1",
              value: "value 3",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: "key 1",
              value: "value 4",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: "key 2",
              value: "value 1",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: "key 2",
              value: "value 2",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: "key 2",
              value: "value 3",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            }
          ],
          displayProperties: {},
          businessProperties: {}
        },
        {
          id: null, parentid: null,
          label: "section 1, layout 3",
          type: "PAIRS",
          elements: [
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: "element 1 key",
              value: "element 1 value",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: "element 2 key",
              value: "element 2 value",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: "element 3 key",
              value: "element 3 value",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            }
          ],
          displayProperties: {},
          businessProperties: {}
        },
        {
          id: null, parentid: null,
          label: "section 1, layout 4",
          type: "PAIRS",
          elements: [
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: "element 1 key",
              value: "element 1 value",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: "element 2 key",
              value: "element 2 value",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: "element 3 key",
              value: "element 3 value",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            }
          ],
          displayProperties: {},
          businessProperties: {}
        }
      ],
      displayProperties: {},
      businessProperties: {}
    },
    {
      id: null, parentid: null,
      label: "section 2",
      type: 'SECTION',
      layouts: [
        {
          id: null, parentid: null,
          label: "section 2, grid layout",
          type: "GRID",
          elements: [
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: ["primary key 1", "secondary key 1"],
              value: "value 1/1",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: ["primary key 1", "secondary key 2"],
              value: "value 1/2",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: ["primary key 1", "secondary key 3"],
              value: "value 1/3",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: ["primary key 2", "secondary key 1"],
              value: "value 2/1",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: ["primary key 2", "secondary key 2"],
              value: "value 2/2",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: ["primary key 2", "secondary key 3"],
              value: "value 2/3",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: ["primary key 3", "secondary key 1"],
              value: "value 3/1",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: ["primary key 3", "secondary key 2"],
              value: "value 3/2",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: ["primary key 3", "secondary key 3"],
              value: "value 3/3",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            }
          ],
          displayProperties: {},
          businessProperties: {}
        }
      ],
      displayProperties: {},
      businessProperties: {}
    }
  ],
  displayProperties: {},
  businessProperties: {}
})
export const sampleForm2 = fromJS({
  id: 'here', parentid: null,
  label: "sample form 2",
  type: "FORM",
  sections: [
    {
      id: 'is', parentid: null,
      label: "section 1",
      type: 'SECTION',
      layouts: [
        {
          id: 'my', parentid: null,
          label: "section 1, layout 1",
          type: "PAIRS",
          elements: [
            {
              id: 'element', parentid: null,
              type: 'ELEMENT',
              key: "element 1 key",
              value: "element 1 value",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: "element 2 key",
              value: "element 2 value",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: "element 3 key",
              value: "element 3 value",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            }
          ],
          displayProperties: {},
          businessProperties: {}
        },
        {
          id: null, parentid: null,
          label: "section 1, layout 2",
          type: "TABLE",
          elements: [
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: "key 1",
              value: "value 1",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: "key 1",
              value: "value 2",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: "key 1",
              value: "value 3",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: "key 1",
              value: "value 4",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: "key 2",
              value: "value 1",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: "key 2",
              value: "value 2",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: "key 2",
              value: "value 3",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: "key 3",
              value: "value 3",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            }
          ],
          displayProperties: {},
          businessProperties: {}
        }
      ],
      displayProperties: {},
      businessProperties: {}
    },
    {
      id: null, parentid: null,
      label: "section 2",
      type: 'SECTION',
      layouts: [
        {
          id: null, parentid: null,
          label: "section 2, layout 1",
          type: "GRID",
          elements: [
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: ["primary key 1", "secondary key 1"],
              value: "value 1/1",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: ["primary key 1", "secondary key 2"],
              value: "value 1/2",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: ["primary key 1", "secondary key 3"],
              value: "value 1/3",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: ["primary key 2", "secondary key 1"],
              value: "value 2/1",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: ["primary key 2", "secondary key 2"],
              value: "value 2/2",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: ["primary key 2", "secondary key 3"],
              value: "value 2/3",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: ["primary key 3", "secondary key 1"],
              value: "value 3/1",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: ["primary key 3", "secondary key 2"],
              value: "value 3/2",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: ["primary key 3", "secondary key 3"],
              value: "value 3/3",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            }
          ],
          displayProperties: {},
          businessProperties: {}
        },
        {
          id: null, parentid: null,
          label: "section 2, layout 2",
          type: "TABLE",
          elements: [
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: "key 1",
              value: "value 1",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: "key 1",
              value: "value 2",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: "key 1",
              value: "value 3",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: "key 1",
              value: "value 4",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: "key 2",
              value: "value 1",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: "key 2",
              value: "value 2",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              type: 'ELEMENT',
              key: "key 2",
              value: "value 3",
              valueType: "text",
              selectorValues: null,
              displayProperties: {},
              businessProperties: {}
            }
          ],
          displayProperties: {},
          businessProperties: {}
        }
      ],
      displayProperties: {},
      businessProperties: {}
    }
  ],
  displayProperties: {},
  businessProperties: {}
})



export const dummyStore = fromJS({
  appstate: {
    agencyState: {
      formBuilderState: {
        activeFormObject: null,
        activeForm: null,
        activeFormStore: null,
        modifiedActiveForm: null
      }
    },
    dataEntryState: {},
    fileCabinetState: {},
    reports:{},
    sessionState: {
      currentUser: {
        id: null, parentid: null,
        positions: [],
        programs: [],
        clients: []
      },
      uploadedElements: [],
      openInstances: []
    }
  },
  agency: {
    clients: null,
    forms: {
      published: [
        { id: null, parentid: null,
          label: "sample form 1",
          type: "FORM",
          sections: [
            {
              id: null, parentid: null,
              label: "section 1",
              type: 'SECTION',
              layouts: [
                {
                  id: null, parentid: null,
                  label: "section 1, layout 1",
                  type: "PAIRS",
                  elements: [
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "element 1 key",
                      value: "element 1 value",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "element 2 key",
                      value: "element 2 value",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "element 3 key",
                      value: "element 3 value",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    }
                  ],
                  displayProperties: {},
                  businessProperties: {}
                },
                {
                  id: null, parentid: null,
                  label: "section 1, layout 2",
                  type: "TABLE",
                  elements: [
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 1",
                      value: "value 1",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 1",
                      value: "value 2",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 1",
                      value: "value 3",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 1",
                      value: "value 4",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 2",
                      value: "value 1",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 2",
                      value: "value 2",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 2",
                      value: "value 3",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    }
                  ],
                  displayProperties: {},
                  businessProperties: {}
                },
                {
                  id: null, parentid: null,
                  label: "section 1, layout 3",
                  type: "PAIRS",
                  elements: [
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "element 1 key",
                      value: "element 1 value",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "element 2 key",
                      value: "element 2 value",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "element 3 key",
                      value: "element 3 value",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    }
                  ],
                  displayProperties: {},
                  businessProperties: {}
                },
                {
                  id: null, parentid: null,
                  label: "section 1, layout 4",
                  type: "PAIRS",
                  elements: [
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "element 1 key",
                      value: "element 1 value",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "element 2 key",
                      value: "element 2 value",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "element 3 key",
                      value: "element 3 value",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    }
                  ],
                  displayProperties: {},
                  businessProperties: {}
                }
              ],
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              label: "section 2",
              type: 'SECTION',
              layouts: [
                {
                  id: null, parentid: null,
                  label: "section 2, grid layout",
                  type: "GRID",
                  elements: [
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: ["primary key 1", "secondary key 1"],
                      value: "value 1/1",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: ["primary key 1", "secondary key 2"],
                      value: "value 1/2",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: ["primary key 1", "secondary key 3"],
                      value: "value 1/3",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: ["primary key 2", "secondary key 1"],
                      value: "value 2/1",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: ["primary key 2", "secondary key 2"],
                      value: "value 2/2",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: ["primary key 2", "secondary key 3"],
                      value: "value 2/3",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: ["primary key 3", "secondary key 1"],
                      value: "value 3/1",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: ["primary key 3", "secondary key 2"],
                      value: "value 3/2",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: ["primary key 3", "secondary key 3"],
                      value: "value 3/3",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    }
                  ],
                  displayProperties: {},
                  businessProperties: {}
                }
              ],
              displayProperties: {},
              businessProperties: {}
            }
          ],
          displayProperties: {},
          businessProperties: {}
        },
        { id: null, parentid: null,
          label: "sample form 2",
          type: "FORM",
          sections: [
            {
              id: null, parentid: null,
              label: "section 1",
              type: 'SECTION',
              layouts: [
                {
                  id: null, parentid: null,
                  label: "section 1, layout 1",
                  type: "PAIRS",
                  elements: [
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "element 1 key",
                      value: "element 1 value",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "element 2 key",
                      value: "element 2 value",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "element 3 key",
                      value: "element 3 value",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    }
                  ],
                  displayProperties: {},
                  businessProperties: {}
                },
                {
                  id: null, parentid: null,
                  label: "section 1, layout 2",
                  type: "TABLE",
                  elements: [
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 1",
                      value: "value 1",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 1",
                      value: "value 2",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 1",
                      value: "value 3",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 1",
                      value: "value 4",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 2",
                      value: "value 1",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 2",
                      value: "value 2",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 2",
                      value: "value 3",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 3",
                      value: "value 3",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    }
                  ],
                  displayProperties: {},
                  businessProperties: {}
                }
              ],
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              label: "section 2",
              type: 'SECTION',
              layouts: [
                {
                  id: null, parentid: null,
                  label: "section 2, layout 1",
                  type: "GRID",
                  elements: [
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: ["primary key 1", "secondary key 1"],
                      value: "value 1/1",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: ["primary key 1", "secondary key 2"],
                      value: "value 1/2",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: ["primary key 1", "secondary key 3"],
                      value: "value 1/3",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: ["primary key 2", "secondary key 1"],
                      value: "value 2/1",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: ["primary key 2", "secondary key 2"],
                      value: "value 2/2",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: ["primary key 2", "secondary key 3"],
                      value: "value 2/3",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: ["primary key 3", "secondary key 1"],
                      value: "value 3/1",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: ["primary key 3", "secondary key 2"],
                      value: "value 3/2",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: ["primary key 3", "secondary key 3"],
                      value: "value 3/3",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    }
                  ],
                  displayProperties: {},
                  businessProperties: {}
                },
                {
                  id: null, parentid: null,
                  label: "section 2, layout 2",
                  type: "TABLE",
                  elements: [
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 1",
                      value: "value 1",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 1",
                      value: "value 2",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 1",
                      value: "value 3",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 1",
                      value: "value 4",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 2",
                      value: "value 1",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 2",
                      value: "value 2",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 2",
                      value: "value 3",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    }
                  ],
                  displayProperties: {},
                  businessProperties: {}
                }
              ],
              displayProperties: {},
              businessProperties: {}
            }
          ],
          displayProperties: {},
          businessProperties: {}
        }
      ],
      unpublished: [
        { id: null, parentid: null,
          label: "sample form 2",
          type: "FORM",
          sections: [
            {
              id: null, parentid: null,
              label: "section 1",
              type: 'SECTION',
              layouts: [
                {
                  id: null, parentid: null,
                  label: "section 1, layout 1",
                  type: "PAIRS",
                  elements: [
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "element 1 key",
                      value: "element 1 value",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "element 2 key",
                      value: "element 2 value",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "element 3 key",
                      value: "element 3 value",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    }
                  ],
                  displayProperties: {},
                  businessProperties: {}
                },
                {
                  id: null, parentid: null,
                  label: "section 1, layout 2",
                  type: "TABLE",
                  elements: [
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 1",
                      value: "value 1",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 1",
                      value: "value 2",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 1",
                      value: "value 3",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 1",
                      value: "value 4",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 2",
                      value: "value 1",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 2",
                      value: "value 2",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 2",
                      value: "value 3",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 3",
                      value: "value 3",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    }
                  ],
                  displayProperties: {},
                  businessProperties: {}
                }
              ],
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              label: "section 2",
              type: 'SECTION',
              layouts: [
                {
                  id: null, parentid: null,
                  label: "section 2, layout 1",
                  type: "GRID",
                  elements: [
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: ["primary key 1", "secondary key 1"],
                      value: "value 1/1",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: ["primary key 1", "secondary key 2"],
                      value: "value 1/2",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: ["primary key 1", "secondary key 3"],
                      value: "value 1/3",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: ["primary key 2", "secondary key 1"],
                      value: "value 2/1",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: ["primary key 2", "secondary key 2"],
                      value: "value 2/2",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: ["primary key 2", "secondary key 3"],
                      value: "value 2/3",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: ["primary key 3", "secondary key 1"],
                      value: "value 3/1",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: ["primary key 3", "secondary key 2"],
                      value: "value 3/2",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: ["primary key 3", "secondary key 3"],
                      value: "value 3/3",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    }
                  ],
                  displayProperties: {},
                  businessProperties: {}
                },
                {
                  id: null, parentid: null,
                  label: "section 2, layout 2",
                  type: "TABLE",
                  elements: [
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 1",
                      value: "value 1",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 1",
                      value: "value 2",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 1",
                      value: "value 3",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 1",
                      value: "value 4",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 2",
                      value: "value 1",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 2",
                      value: "value 2",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 2",
                      value: "value 3",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    }
                  ],
                  displayProperties: {},
                  businessProperties: {}
                }
              ],
              displayProperties: {},
              businessProperties: {}
            }
          ],
          displayProperties: {},
          businessProperties: {}
        },
        {  id: null, parentid: null,
          label: "sample form 1",
          type: "FORM",
          sections: [
            {
              id: null, parentid: null,
              label: "section 1",
              type: 'SECTION',
              layouts: [
                {
                  id: null, parentid: null,
                  label: "section 1, layout 1",
                  type: "PAIRS",
                  elements: [
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "element 1 key",
                      value: "element 1 value",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "element 2 key",
                      value: "element 2 value",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "element 3 key",
                      value: "element 3 value",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    }
                  ],
                  displayProperties: {},
                  businessProperties: {}
                },
                {
                  id: null, parentid: null,
                  label: "section 1, layout 2",
                  type: "TABLE",
                  elements: [
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 1",
                      value: "value 1",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 1",
                      value: "value 2",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 1",
                      value: "value 3",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 1",
                      value: "value 4",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 2",
                      value: "value 1",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 2",
                      value: "value 2",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "key 2",
                      value: "value 3",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    }
                  ],
                  displayProperties: {},
                  businessProperties: {}
                },
                {
                  id: null, parentid: null,
                  label: "section 1, layout 3",
                  type: "PAIRS",
                  elements: [
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "element 1 key",
                      value: "element 1 value",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "element 2 key",
                      value: "element 2 value",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "element 3 key",
                      value: "element 3 value",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    }
                  ],
                  displayProperties: {},
                  businessProperties: {}
                },
                {
                  id: null, parentid: null,
                  label: "section 1, layout 4",
                  type: "PAIRS",
                  elements: [
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "element 1 key",
                      value: "element 1 value",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "element 2 key",
                      value: "element 2 value",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: "element 3 key",
                      value: "element 3 value",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    }
                  ],
                  displayProperties: {},
                  businessProperties: {}
                }
              ],
              displayProperties: {},
              businessProperties: {}
            },
            {
              id: null, parentid: null,
              label: "section 2",
              type: 'SECTION',
              layouts: [
                {
                  id: null, parentid: null,
                  label: "section 2, grid layout",
                  type: "GRID",
                  elements: [
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: ["primary key 1", "secondary key 1"],
                      value: "value 1/1",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: ["primary key 1", "secondary key 2"],
                      value: "value 1/2",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: ["primary key 1", "secondary key 3"],
                      value: "value 1/3",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: ["primary key 2", "secondary key 1"],
                      value: "value 2/1",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: ["primary key 2", "secondary key 2"],
                      value: "value 2/2",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: ["primary key 2", "secondary key 3"],
                      value: "value 2/3",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: ["primary key 3", "secondary key 1"],
                      value: "value 3/1",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: ["primary key 3", "secondary key 2"],
                      value: "value 3/2",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    },
                    {
                      id: null, parentid: null,
                      type: 'ELEMENT',
                      key: ["primary key 3", "secondary key 3"],
                      value: "value 3/3",
                      valueType: "text",
                      selectorValues: null,
                      displayProperties: {},
                      businessProperties: {}
                    }
                  ],
                  displayProperties: {},
                  businessProperties: {}
                }
              ],
              displayProperties: {},
              businessProperties: {}
            }
          ],
          displayProperties: {},
          businessProperties: {}
        }
      ],
      typeTemplates: []
    },
    positions: {
      positionTypes: [],
      positionInstances: []
    }, //should this be positions of the company, or positions created by programs?
    programs: null,
    users: null,
  }
})
