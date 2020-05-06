import React from 'react'
import * as validationTool from './validationTool'
import { formObject } from './formObject'



const prototype = (getStore, services, utilities) => ({
  type: function() { return "layout"; },
  properties: {
    id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Forms.Layout.id"
        else if(!this.properties.id.validate(id)) throw "invalid property: Forms.Layout.id"
        else this.id = id
        return true
      },
      validate: id => { return true }
    },
    label: {
      setValue: function(label){
        if(label === null || label === undefined) throw "missing required property: Forms.Layout.label"
        else if(!this.properties.label.validate(label)) throw "invalid property: Forms.Layout.label"
        else this.label = label
        return true
      },
      validate: label => { return true }
    },
    form_id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Forms.Layout.form_id"
        else if(!this.properties.form_id.validate(id)) throw "invalid property: Forms.Layout.form_id"
        else this.form_id = id
        return true
      },
      validate: id => { return true }
    },
    section_id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Forms.Layout.section_id"
        else if(!this.properties.section_id.validate(id)) throw "invalid property: Forms.Layout.section_id"
        else this.section_id = id
        return true
      },
      validate: id => { return true }
    },
    element_ids: {
      setValue: function(ids){
        if(ids === null || ids === undefined) this.element_ids = []
        else if(!this.properties.element_ids.validate(ids)) throw "invalid property: Forms.Layout.element_ids"
        else this.element_ids = ids
        return true
      },
      validate: ids => { return true }
    },
    completion_rules: {
      setValue: function(completionRules){
        if(completionRules === null || completionRules === undefined) this.completion_rules = {}
        else if(!this.properties.completion_rules.validate(completionRules)) throw "invalid property: Forms.Layout.completion_rules"
        else this.completion_rules = completionRules
        return true
      },
      validate: rules => { return true }
    },
    display_settings: {
      setValue: function(displaySettings){
        if(displaySettings === null || displaySettings === undefined) this.display_settings = { display_type: "pairs" }
        else if(!this.properties.display_settings.validate(displaySettings)) throw "invalid property: Forms.Layout.display_settings"
        else this.display_settings = displaySettings
        return true
      },
      validate: settings => { return true }
    }
  },
  display: {
    document: (layout, submissionId) => {
      switch(layout.display_settings.display_type){
        case "pairs": return  <Pairs
                                  elementDisplay={ element => element.display.document(element) }
                                  layout={layout}
                                  submissionId={submissionId} />

        case "grid": return <Grid
                                elementDisplay={ element => element.display.document(element) }
                                layout={layout}
                                submissionId={submissionId} />

        case "table": return  <Table
                                  elementDisplay={ element => element.display.document(element) }
                                  layout={layout}
                                  submissionId={submissionId} />
        default: return <div>404 error</div>
      }
    },
    editor: (layout, updater, submission) => {
      function Editor(props){
        const [displayEditorTools, toggleEditorTools] = React.useState(false)

        const layoutEditorTools = () => {
          return  <div className={`row m-0 p-2 justify-content-between bg-dark text-light d-flex flex-column`}
                      style={{position: "fixed", top: "0", left: "0", height: "100%",
                              width: "100%", opacity: ".9", overflow: "auto", zIndex: "5"}}>

                    <button className="align-self-start" onClick={() => toggleBuilderTools(false)}>&times;</button>
                    <div className="flex-grow-1 container m-5">
                      allows user to display rules and security settings here?
                    </div>
                  </div>
        }

        switch(tempLayout.display_settings.display_type){
          case "pairs": return  <Pairs
                                    elementDisplay={ element => element.display.editor(element, props.updateValue, props.submission) }
                                    layout={props.layout}
                                    openTools={() => toggleEditorTools(true)}
                                    tools={displayEditorTools? layoutEditorTools() : null} />

          case "grid": return <Grid
                                  elementDisplay={ element => element.display.editor(element, props.updateValue, props.submission) }
                                  layout={props.layout}
                                  openTools={() => toggleEditorTools(true)}
                                  tools={displayEditorTools ? layoutEditorTools() : null} />

          case "table": return  <Table
                                    elementDisplay={ element => element.display.editor(element, props.updateValue, props.submission) }
                                    layout={props.layout}
                                    openTools={() => toggleEditorTools(true)}
                                    tools={displayEditorTools ? layoutEditorTools() : null} />
          default: return <div>404 error</div>
        }
      }

      return <Editor layout={layout} updateValue={updater} submission={submission} />
    },
    builder: (layout, updater) => {
      function Builder(props){
        const [tempLayout, updateTempLayout] = React.useState(props.layout)
        const [displayBuilderTools, toggleBuilderTools] = React.useState(false)

        const updateHandler = newState =>  {
          updateTempLayout(Object.assign(Object.create(Object.getPrototypeOf(tempLayout)), tempLayout, {...newState}))
        }
        const updateLayoutType = (value) => {
          let updatedSettings = tempLayout.display_settings

          if(value === "pairs")
            updatedSettings = Object.assign({}, updatedSettings, {
              display_type: "pairs",
              keys: generateKeySet(0)
            })

          else if(value === "grid")
            updatedSettings = Object.assign({}, updatedSettings, {
              display_type: "grid",
              primary_keys: tempLayout.display_settings.primary_keys ? tempLayout.display_settings.primary_keys : generateKeySet(0),
              secondary_keys: tempLayout.display_settings.secondary_keys ? tempLayout.display_settings.secondary_keys : generateKeySet(1)
            })

          else if(value === "table")
            updatedSettings = Object.assign({}, updatedSettings, {
              display_type: "table",
              primary_keys: tempLayout.display_settings.primary_keys ? tempLayout.display_settings.primary_keys : generateKeySet(0),
              secondary_key_def: tempLayout.display_settings.secondary_key_def ? tempLayout.display_settings.secondary_key_def : "index"
            })

          updateHandler({display_settings: updatedSettings})
        }

        const generateLayoutElements = () => {
            switch(tempLayout.display_settings.display_type){
              case "pairs": {

                break
              }
              case "grid": {
                let elements = tempLayout.tools.getElements(tempLayout)
                let createElements = []
                let removeElements = []

                if(!tempLayout.display_settings.primary_keys ||
                    !tempLayout.display_settings.secondary_keys) return null

                props.layout.tools.orderedPropertySet(tempLayout.display_settings.primary_keys).forEach( ([pkpos, pk]) => {
                  props.layout.tools.orderedPropertySet(tempLayout.display_settings.secondary_keys).forEach( ([skpos, sk]) => {
                    let elementIndex = elements.findIndex( element => element.key[0] === pk && element.key[1] === sk )

                    if(elementIndex === -1) createElements.push((formObject("element", {
                      id: "new_object",
                      key: [pk, sk],
                      form_id: tempLayout.form_id,
                      section_id: tempLayout.section_id,
                      layout_id: tempLayout.id,
                    }, null, null, () => console.log("success"), err => {throw err})))
                    else elements.splice(elementIndex, 1)
                  })
                })

                if(elements.length > 0){
                  elements.forEach( element => {
                    removeElements.push(element)
                  })
                }

                let updatedElementSet = []
                let updatedElementIdSet = []


                if(createElements.length > 0 || removeElements.length > 0) {
                  updatedElementIdSet = [...tempLayout.element_ids.filter(id => !removeElements.find(element => element.id === id)),
                                        ...createElements.map(element => element.id)]

                  updatedElementSet = [...tempLayout.elements.filter( element => !removeElements.find( el => el.id === element.id)), ...createElements]


                  updateHandler({
                    element_ids: updatedElementIdSet,
                    elements: updatedElementSet
                  })
                }
                break
              }
              case "table": {
                break
              }
            }
          }
        const generateKeySet = (key_position) => {
          let elements = tempLayout.tools.getElements(tempLayout)
          let keys = []

          elements.forEach( element => {
            element.keys && element.keys.length > key_position ?
              keys = [ ...keys, element.keys[key_position] ] : keys
          })
          return keys
        }

        const layoutBuilderTools = type => {
          return  <div className={`row m-0 p-2 justify-content-between bg-dark text-light d-flex flex-column`}
                      style={{position: "fixed", top: "0", left: "0", height: "100%",
                              width: "100%", opacity: ".9", overflow: "auto", zIndex: "5"}}>

                    <button className="align-self-start" onClick={() => toggleBuilderTools(false)}>&times;</button>
                    <div className="flex-grow-1 container m-5">

                      <div className="row m-1 p-2 bg-light text-dark">
                        <label className="col-sm-6">Modify Layout Label</label>
                        <input
                            type="text"
                            className="col-sm-6"
                            onChange={() => updateHandler({label: event.target.value})}
                            placeholder="update layout label" />
                      </div>

                      <div className="row m-1 p-2 bg-light text-dark">
                        <label className="col-sm-6">Set Layout Type:</label>
                        <div className="col-sm-6 d-flex flex-row justify-content-around">
                          <div className={`flex-grow-1 text-center ${type === "pairs" ? "bg-dark text-light" : ""}`}
                              onClick={() => updateLayoutType("pairs")}>Pairs</div>
                          <div className={`flex-grow-1 text-center ${type === "grid" ? "bg-dark text-light" : ""}`}
                              onClick={() => updateLayoutType("grid")}>Grid</div>
                          <div className={`flex-grow-1 text-center ${type === "table" ? "bg-dark text-light" : ""}`}
                              onClick={() => updateLayoutType("table")}>Table</div>
                        </div>
                      </div>

                      { type === "pairs" ? pairsBuilderTools() : null }
                      { type === "grid" ? gridBuilderTools() : null }
                      { type === "table" ? tableBuilderTools() : null }


                    </div>
                    <button onClick={() => props.updateLayout(tempLayout)}>Continue</button>
                  </div>
        }
        const pairsBuilderTools = () => {
          return  <div>
                    <button className="btn-sm font-italic" onClick={() => tempLayout.settings.display.addToProperty("keys", "new key")}>add element</button>
                  </div>
        }
        const gridBuilderTools = () => {
          return  <div>
                    <div>
                      <button onClick={() => tempLayout.settings.display.addToProperty("primary_keys", "key")}>add primary key</button>
                      {
                        tempLayout.tools.orderedPropertySet(tempLayout.display_settings.primary_keys).map( ([pos, pk]) =>
                          <div>
                            <input type="text" value={pk} onChange={() => tempLayout.settings.display.replaceInProperty("primary_keys", pk, event.target.value)} />
                            <button onClick={() => tempLayout.settings.display.removeFromProperty("primary_keys", pk)}>x</button>
                            <button onClick={() => tempLayout.settings.display.shiftProperty("primary_keys", pos, "up")}>up</button>
                            <button onClick={() => tempLayout.settings.display.shiftProperty("primary_keys", pos, "down")}>down</button>
                            {
                              tempLayout.display_settings.gridInputVariable === "primary" ?
                                <select onChange={() => setKeyInputType(pk, event.target.value)}>
                                  <option value=""></option>
                                  <option value="text">Text</option>
                                  <option value="date">Date</option>
                                  <option value="time">Time</option>
                                  <option value="subscribed-group-a">Subscribed group A</option>
                                  <option value="subscribed-group-b">Subscribed group B</option>
                                </select> : null
                            }
                          </div>)
                      }
                    </div>
                    <div>
                      <button onClick={() => tempLayout.settings.display.addToProperty("secondary_keys", "key")}>add secondary key</button>
                      {
                        tempLayout.tools.orderedPropertySet(templayout.display_settings.secondary_keys).map( ([pos, sk]) =>
                          <div>
                            <input type="text" value={sk} onChange={() => tempLayout.settings.display.replaceInProperty("secondary_keys", sk, event.target.value)} />
                            <button onClick={() => tempLayout.settings.display.removeFromProperty("secondary_keys", sk)}>x</button>
                            <button onClick={() => tempLayout.settings.display.shiftProperty("secondary_keys", pos, "up")}>up</button>
                            <button onClick={() => tempLayout.settings.display.shiftProperty("secondary_keys", pos, "down")}>down</button>
                            {
                              tempLayout.display_settings.gridInputVariable === "secondary" ?
                                <select onChange={() => setKeyInputType(pk, event.target.value)}>
                                  <option value=""></option>
                                  <option value="text">Text</option>
                                  <option value="date">Date</option>
                                  <option value="time">Time</option>
                                  <option value="subscribed-group-a">Subscribed group A</option>
                                  <option value="subscribed-group-b">Subscribed group B</option>
                                </select> : null
                            }
                          </div>)
                      }
                    </div>
                  </div>
        }
        const tableBuilderTools = () => {
          let secondaryKeyDef = tempLayout.display_settings.secondary_key_def
          return  <div>
                    <div>
                      <button onClick={() => tempLayout.settings.display.addToProperty("primary_keys", "new column")}>add table column</button>
                      {
                        tempLayout.tools.orderedPropertySet(tempLayout.display_settings.primary_keys).map( ([pos, pk]) =>
                          <div>
                            <input type="text" value={pk} onChange={() => tempLayout.settings.display.replaceInProperty("primary_keys", event.target.value, pos)} />
                            <button onClick={() => tempLayout.settings.display.removeFromProperty("primary_keys", pos)}>x</button>
                            <button onClick={() => tempLayout.settings.display.shiftProperty("primary_keys", pos, "up")}>up</button>
                            <button onClick={() => tempLayout.settings.display.shiftProperty("primary_keys", pos, "down")}>down</button>
                          </div>)
                      }
                    </div>

                    <div>
                      <label>Set row definition</label>
                      <div>
                        <div onClick={() => replaceInProperty("secondary_key_def", "index")}
                            className={`${secondaryKeyDef === "index" ? "bg-light text-dark" : ""}`}>index</div>
                        <div onClick={() => replaceInProperty("secondary_key_def", "timestamp")}
                            className={`${secondaryKeyDef === "timestamp" ? "bg-light text-dark" : ""}`}>timestamp</div>
                      </div>
                    </div>

                  </div>
        }


        generateLayoutElements()

        switch(tempLayout.display_settings.display_type){
          case "pairs": return  <Pairs
                                    layout={tempLayout}
                                    updater={updateHandler}
                                    openTools={() => toggleBuilderTools(true)}
                                    tools={displayBuilderTools ? layoutBuilderTools("pairs") : null} />

          case "grid": return <Grid
                                  layout={tempLayout}
                                  updater={updateHandler}
                                  openTools={() => toggleBuilderTools(true)}
                                  tools={displayBuilderTools ? layoutBuilderTools("grid") : null} />

          case "table": return  <Table
                                    layout={tempLayout}
                                    updater={updateHandler}
                                    openTools={() => toggleBuilderTools(true)}
                                    tools={displayBuilderTools ? layoutBuilderTools("table") : null} />
          default: return <div>404 error</div>
        }
      }

      return <Builder layout={layout} updateLayout={updater} />
    }
  },
  tools: {
    buildTree: layout => {
      let elements = layout.tools.getElements(layout)
      return Object.assign(Object.create(Object.getPrototypeOf(layout)), layout, {elements: elements})
    },
    flatten: layout => {
      let _layout = Object.assign(Object.create(Object.getPrototypeOf(layout)), layout)
      let _elements = _layout.elements ? _layout.elements : []
      delete _layout.elements
      let flatMap = [ _layout ]

      _elements.forEach(element => {
        flatMap = [...flatMap, element]
      })

      return flatMap
    },
    getElements: layout => {
      let formStore = getStore()
      let elements = []

      layout.element_ids.forEach( id => {
        let foundElement = formStore.element[id] ? formStore.element[id] : layout.elements.find(obj => obj.id === id)

        elements = [...elements, foundElement ]
      })
      return elements
    },
    orderedPropertySet: obj => {
      //assumes obj structure is -> {position: value}
      //returns ordered pairs [[pos, val], ...]
      let ordered = []
      let size = Object.entries(obj).length
      let index = 1

      while(index <= size){
        ordered.push( [index, obj[index]] )
        ++index
      }

      return ordered
    },
    displaySettings: {
      addToProperty: (property, value) => {

        //Operations on display_settings properties with structure -> { position : value }
        // const addToProperty = (display_settings_property, value) => {
          //   let keyObj = { [`${Object.keys(tempLayout.display_settings[display_settings_property]).length}`] : value }
          //   let keySet = Object.assign({}, tempLayout.display_settings[display_settings_property], keyObj)
          //   let updatedSettings = Object.assign({}, tempLayout.display_settings, {[`${display_settings_property}`]: keySet})
          //
          //   updateHandler({display_settings: updatedSettings})
          // }
        },
      removeFromProperty: (property, position) => {},
      replaceInProperty: (property, value, position) => {},
      shiftProperty: (property, position, direction) => {}
    },
    completionSettings: {}
  },
  components: {
    pairs: function Pairs(props){

      const elementDisplay = element => {
        if(props.builder) return element.display.builder(element, props.updater)
        else if(props.editor) return element.display.editor(element, props.updater)
        else if(props.document) return element.display.document(element)
        else return element.display.card(element)
      }

      return  <div className="">
                <h7 style={{zIndex: "5"}}
                    onClick={() => props.openTools ? props.openTools() : null}>{props.layout.label}</h7>

                <div className="d-flex flex-column bg-light">
                  {
                    props.layout.tools.getElements(props.layout).map( element => {
                      return  <div className="d-flex flex-row">{elementDisplay(element)}</div>
                    })
                  }
                </div>
                { props.tools ? props.tools : null }
              </div>
    },
    grid: function Grid(props){


      let primaryKeys = props.layout.tools.orderedPropertySet(props.layout.display_settings.primary_keys)
      let secondaryKeys = props.layout.tools.orderedPropertySet(props.layout.display_settings.secondary_keys)
      let columnCount = primaryKeys.length + 1
      let elements = props.layout.tools.getElements(props.layout)

      return  <div className="container">
                <h7 className="row"
                    style={{zIndex: "5"}}
                    onClick={() => props.openTools ? props.openTools() : null}>{props.layout.label}</h7>

                <div className="row">
                  <div className={`col-xs flex-grow-1 border-right border-bottom`}></div>
                  { primaryKeys.map( ([pos, pk]) => <div className={`col-xs flex-grow-2 text-center border-bottom`}>{pk}</div>) }
                </div>
                { secondaryKeys.map( ([pos, sk]) =>
                    <div className="row">
                      <div className="col-xs flex-grow-1 text-center border-right">{sk}</div>
                      {
                        elements && elements.length > 0 ? primaryKeys.map( pk => <div className="col-xs flex-grow-2 text-center">{elements.find( element => element.key[0] === pk && element.key[1] === sk).value_type}</div>) : null
                      }
                    </div> )}

                { props.tools ? props.tools : null }
              </div>


    },
    table: function Table(props){

      return  <div>
              <h7 style={{zIndex: "5"}}
                  onClick={() => props.openTools ? props.openTools() : null}>{props.layout.label}</h7>
              <div className="">
                <div>_|</div>
                {
                  Object.entries(props.layout.display_settings.primary_keys).map( ([pos, pk]) =>
                    <div>{pk}</div>)
                }
              </div>
            </div>
    }
  }
})

export { prototype }
