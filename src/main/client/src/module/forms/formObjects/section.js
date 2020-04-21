import React from 'react'
import * as validationTool from './validationTool'
import { formObject } from './formObject'
import List from '../../../components/List'



const prototype = getFormState => ({
  type: function() { return "section"; },
  properties: {
    id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Forms.Section.id"
        else if(!this.properties.id.validate(id)) throw "invalid property: Forms.Section.id"
        else this.id = id
        return true
      },
      getObject: function(){ return this.id },
      validate: id => { return true }
    },
    label: {
      setValue: function(label){
        if(label === null || label === undefined) throw "missing required property: Forms.Section.label"
        else if(!this.properties.label.validate(label)) throw "invalid property: Forms.Section.label"
        else this.label = label
        return true
      },
      getObject: function(){ return this.label },
      validate: label => { return true }
    },
    form_id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Forms.Section.form_id"
        else if(!this.properties.form_id.validate(id)) throw "invalid property: Forms.Section.form_id"
        else this.form_id = id
        return true
      },
      getObject: function(){ return this.id },
      validate: id => { return true }
    },
    layout_ids: {
      setValue: function(ids){
        if(ids === null || ids === undefined) this.layout_ids = {}
        else if(!this.properties.layout_ids.validate(ids)) throw "invalid property: Forms.Section.layout_ids"
        else this.layout_ids = ids
        return true
      },
      getObject: function(){},
      validate: ids => { return true }
    },
    completion_rules: {
      setValue: function(completionRules){
        if(completionRules === null || completionRules === undefined) this.completion_rules = {}
        else if(!this.properties.completion_rules.validate(completionRules)) throw "invalid property: Forms.Section.completion_rules"
        else this.completion_rules = completionRules
        return true
      },
      validate: rules => { return true }
    },
    security_settings: {
      setValue: function(securitySettings){
        if(securitySettings === null || securitySettings === undefined) this.security_settings = {}
        else if(!this.properties.security_settings.validate(securitySettings)) throw "invalid property: Forms.Section.security_settings"
        else this.security_settings = securitySettings
        return true
      },
      validate: settings => { return true }
    }
  },
  display: {
    document: (section, submissionId) =>
      <div className="container">
        <h6 className="">{section.label}</h6>
        <div className="border">
        {
          section.tools.getLayouts(section).map( layout =>
            <div className="p-2">
              { layout.display.document(layout, submissionId) }
            </div>)
        }
        </div>
      </div>,
    editor: (section, updater, submission) => {
      function Editor(props){
        const [displayEditorTools, toggleEditorTools] = React.useState(false)

        const sectionEditorTools = () => {
          return  <div className={`row m-0 p-2 justify-content-between bg-dark text-light d-flex flex-column`}
                      style={{position: "fixed", top: "0", left: "0", height: "100%",
                              width: "100%", opacity: ".9", overflow: "auto", zIndex: "5"}}>

                    <button className="align-self-start" onClick={() => toggleEditorTools(false)}>&times;</button>
                    <div className="flex-grow-1 container m-5">
                      allows user to display rules and security settings here?
                    </div>
                  </div>
        }

        return  <div>
                  <h6 className="font-italic p-0 m-0" style={{zIndex: "3"}} onClick={() => toggleEditorTools(true)}>{props.section.label}</h6>

                  <div className="border-top">
                  {
                    props.section.tools.getLayouts(props.section).map( layout =>
                        <div className="d-flex flex-row p-2 border">
                          { layout.display.editor(layout, props.updateLayout, props.submission) }
                        </div> )
                  }
                  </div>
                  { displayEditorTools ? sectionEditorTools() : null }
                </div>
      }

      return <Editor section={section} updateLayout={updater} submission={submission} />
    },
    builder: (section, updater) => {
      function Builder(props) {
        const [tempSection, updateTempSection] = React.useState(props.section)
        const [displayTools, toggleTools] = React.useState(false)

        const updateHandler = newState => {
          updateTempSection(Object.assign(Object.create(Object.getPrototypeOf(tempSection)), tempSection, {...newState}))
        }
        const addLayout = () => {
          let sectionState = {
            id: "new_object",
            label: "new layout",
            form_id: tempSection.form_id,
            section_id: tempSection.id
          }
          let newLayout = formObject("layout", sectionState, err => {throw err})
          newLayout = newLayout.tools.buildTree(newLayout)

          updateHandler({
            layout_ids: Object.assign({}, tempSection.layout_ids, {[`${Object.entries(tempSection.layout_ids).length}`]: newLayout.id}),
            layouts: [...tempSection.layouts, newLayout]
          })
        }
        const removeLayout = layout_id => {
          let ids = getOrderedLayouts(tempSection.layout_ids)
          let newIds = {}
          let removePosition = ids.reduce( (result, current) => current[1] === layout_id ? current[0] : false)

          let index = 0
          while(index < ids.length){
            let currentPosition = Object.keys(ids[index])[0]
            if(currentPosition < removePosition) newIds[currentPosition] = ids[index]
            else if(currentPosition > removePosition) newIds[currentPosition-1] - ids[index]
          }


          updateHandler({
            layout_ids: newIds,
            layouts: tempSection.layouts.filter( object => object.id !== layout_id )
          })
        }
        const updateLayout = layout => {
          props.updateSection(Object.assign(Object.create(Object.getPrototypeOf(tempSection)), tempSection, { layouts: [...tempSection.layouts.filter(item => item.id !== layout.id), layout]}))
        }


        const displaySection = () =>
          <div>
            <h6 className="font-italic p-0 m-0" style={{zIndex: "3"}} onClick={() => toggleTools(true)}>{tempSection.label}</h6>

            <div className="border-top">
            {
              Object.values(tempSection.layout_ids).map( layout_id => {
                let layout = tempSection.layouts.find( layout => layout.id === layout_id)

                return  <div className="d-flex flex-row p-2 border">
                          { layout.display.builder(layout, updateLayout) }
                        </div> })
            }
            </div>
          </div>

        const displayEditor = () => !displayTools ? null :
          <div className={`row m-0 p-2 justify-content-between bg-dark text-light d-flex flex-column`}
              style={{position: "fixed",
                      top: "0",
                      left: "0",
                      height: "100%",
                      width: "100%",
                      opacity: ".9",
                      overflow: "auto",
                      zIndex: "5" }}>
            <button className="align-self-start" onClick={() => toggleTools(false)}>&times;</button>
            <div className="flex-grow-1 container m-5">

              <div className="row m-1 p-2 bg-light text-dark">
                <label className="col-sm-6">Update Section Title</label>
                <input
                    className={`col-sm-6`}
                    onChange={() => updateHandler({label: event.target.value})}
                    value={tempSection.label} />
              </div>

              <div className="row m-1 p-2 bg-light text-dark">

                <button className="col-12 btn-sm" onClick={() => addLayout()}>add layout</button>

                <div className="d-flex flex-column">
                  {
                    Object.values(tempSection.layout_ids).map( id =>
                      <div className="d-flex flex-grow-1">
                        <button className="flex-grow-1" onClick={() => moveLayout(id, "up")}>up</button>
                        <button className="flex-grow-1" onClick={() => moveLayout(id, "down")}>down</button>
                        <button className="flex-grow-1" onClick={() => removeLayout(id)}>delete</button>
                        <div className="flex-grow-3">{tempSection.layouts.find(layout => layout.id === id).label}</div>
                      </div>)
                  }
                </div>
              </div>

            </div>
            <button onClick={() => props.updateSection(tempSection)}>Continue</button>
          </div>

        return  <div className="form-section d-flex flex-column flex-grow-1 p-2">
                  {displaySection()}
                  {displayEditor()}
                </div>

      }
      return <Builder section={section} updateSection={updater}/>
    }
  },
  tools: {
    buildTree: section => {
      let layouts = section.tools.getLayouts(section).map( layout => layout.tools.buildTree(layout) )
      return Object.assign(Object.create(Object.getPrototypeOf(section)), section, {layouts: layouts})
    },
    flatten: section => {
      let _section = Object.assign(Object.create(Object.getPrototypeOf(section)), section)
      let _layouts = _section.layouts ? _section.layouts : []
      delete _section.layouts
      let flatMap = [ _section ]

      _layouts.forEach(layout => {
        flatMap = [...flatMap, ...layout.tools.flatten(layout)]
      })

      return flatMap
    },
    getLayouts: section => {
      let formStore = getFormState()
      let layouts = []

      Object.values(section.layout_ids).forEach( id => {
        let foundLayout = formStore.layout[id] ? formStore.layout[id] : section.layouts.find(obj => obj.id === id)

        layouts = [...layouts, foundLayout ]
      })

      return layouts
    }
  }
})


const displayProps = getFormState => ({
  displayKey: "",
  component: {}
})


export { prototype, displayProps }
