import React from 'react'
import * as validationTool from './validationTool'
import { formObject } from './formObject'
import List from '../../../components/List'


const prototype = (getStore, services, utilities) => ({
  type: function() { return "form" },
  properties: {
    id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Forms.Form.id"
        else if(!this.properties.id.validate(id)) throw "invalid property: Forms.Form.id"
        else this.id = id
        return true
      },
      validate: id => { return true }
    },
    label: {
      setValue: function(label){
        if(label === null || label === undefined) throw "missing required property: Forms.Form.label"
        else if(!this.properties.label.validate(label)) throw "invalid property: Forms.Form.label"
        else this.label = label
        return true
      },
      validate: label => { return true }
    },
    section_ids: {
      setValue: function(section_ids){
        if(section_ids === null || section_ids === undefined) this.section_ids = {}
        else if(!this.properties.section_ids.validate(section_ids)) throw "invalid property: Forms.Form.section_ids"
        else this.section_ids = section_ids
        return true
      },
      validate: ids => { return true }
    },
    completion_rules: {
      setValue: function(completionRules){
        if(completionRules === null || completionRules === undefined) this.completion_rules = {}
        else if(!this.properties.completion_rules.validate(completionRules)) throw "invalid property: Forms.Form.completion_rules"
        else this.completion_rules = completionRules
        return true
      },
      validate: rules => { return true }
    },
    security_settings: {
      setValue: function(securitySettings){
        if(securitySettings === null || securitySettings === undefined) this.security_settings = {}
        else if(!this.properties.security_settings.validate(securitySettings)) throw "invalid property: Forms.Form.security_settings"
        else this.security_settings = securitySettings
        return true
      },
      validate: settings => { return true }
    }
  },
  display: {
    document: form => {
      return  <div className="container">
                <h4 className="text-center">{form.label}</h4>
                {
                  form.tools.getSections(form).map( section =>
                    <div className="p-2">
                      { section.display.document(section) }
                    </div>)
                }
              </div>
    },
    editor: (form, updateHandler) => {
      return  <List className="d-block"
                  headerComponent={<div className="">{form.label}</div>}
                  columns={[{selector: "display"}]}
                  tableData={form.tools.getSections(form).map(section => ({display: section.display.editor(section), data: section}))}
                  />},
    builder: (form, close, alert) => {
      function Creator(props){
        const [tempForm, updateTempForm] = React.useState(props.form)
        const [displayTools, toggleTools] = React.useState(false)

        const updateHandler = newState => {
          updateTempForm(Object.assign(Object.create(Object.getPrototypeOf(tempForm)), tempForm, {...newState}))
        }
        const addSection = () => {
          let sectionState = {
            id: "new_object",
            label: "new section",
            form_id: tempForm.id
          }
          let newSection = formObject("section", sectionState, null, null, err => {throw err})
          newSection = newSection.tools.buildTree(newSection)

          updateHandler({
            section_ids: Object.assign({}, tempForm.section_ids, {[`${Object.entries(tempForm.section_ids).length}`]: newSection.id}),
            sections: [...tempForm.sections, newSection]
          })
        }
        const removeSection = section_id => {


          let ids = getOrderedSections(tempForm.section_ids)
          let newIds = {}
          let removePosition = ids.reduce( (result, current) => current[1] === section_id ? current[0] : false)

          let index = 0
          while(index < ids.length){
            let currentPosition = Object.keys(ids[index])[0]
            if(currentPosition < removePosition) newIds[currentPosition] = ids[index]
            else if(currentPosition > removePosition) newIds[currentPosition-1] = ids[index]

          }
          updateHandler({
            section_ids: newIds,
            sections: tempForm.sections.filter( section => section.id !== section_id )
          })
        }
        const updateSection = (section) => {
          updateHandler({
            sections: [...tempForm.sections.filter( item => item.id !== section.id), section]
          })
        }
        const moveSection = (id, direction) => {

          let newPosition
          let sectionToMove = Object.entries(tempForm.section_ids).find( ([pos, section_id]) => section_id === id)
          let currentPosition = parseInt(sectionToMove[0])
          let sorted_ids = {}
          let size = Object.entries(tempForm.section_ids).length

          if(size < 2) return null
          else if(direction === "up" && currentPosition === 0) return null
          else if(direction === "down" && currentPosition === size - 1) return null
          else if(direction === "up") newPosition = currentPosition - 1
          else if(direction === "down") newPosition = currentPosition + 1

          Object.entries(tempForm.section_ids).map( ([pos, section_id]) => {
            if(pos == newPosition) sorted_ids[currentPosition] = section_id
            else if(pos == currentPosition) sorted_ids[newPosition] = section_id
            else sorted_ids[pos] = section_id
          })

          updateHandler({section_ids: sorted_ids})
        }
        const getOrderedSections = (ids) => {
          let orderedSet = []
          let index = 0

          while(index < Object.entries(ids).length){
            orderedSet[index] = ids[index]
            index++
          }

          return orderedSet
        }


        return  <div className="container">
                  <div className="">

                    <h4 className="text-center" style={{zIndex: "3"}} onClick={() => toggleTools(true)}>{tempForm.label}</h4>

                    <div className="d-flex flex-column bg-white">
                      {

                        getOrderedSections(tempForm.section_ids).map( section_id => {
                                  let section = tempForm.sections.find( section => section.id === section_id)
                                  return  <div className="d-flex flex-row p-2 border">
                                            { section.display.builder(section, updateSection) }
                                          </div>
                        })
                      }
                    </div>

                  </div>

                  <div className={`row m-0 p-2 justify-content-between bg-dark text-light ${displayTools ? "d-block" : "d-none"}`}
                      style={{position: "fixed",
                              top: "0",
                              left: "0",
                              height: "100%",
                              width: "100%",
                              opacity: ".9",
                              overflow: "auto",
                              zIndex: "5"}}>

                    <div className="d-flex flex-column m-5">
                      <button type="button"
                          className="align-self-start font-italic close"
                          aria-label="Close"
                          onClick={() => toggleTools(false)}>
                        <span aria-hidden="true">&times;</span>
                      </button>

                      <div className="d-flex">
                        <label>Update Form Title</label>
                        <input
                            className=""
                            onChange={() => updateHandler({label: event.target.value})} />
                      </div>

                      <div className="d-flex flex-column p-3">
                        <button className="btn-sm font-italic" onClick={() => addSection()}>add section</button>

                        {
                          getOrderedSections(tempForm.section_ids).map( id =>
                            <div className="d-flex">
                              <button onClick={() => moveSection(id, "up")}>up</button>
                              <button onClick={() => moveSection(id, "down")}>down</button>
                              <button onClick={() => removeSection(id)}>delete</button>
                              <div>{tempForm.sections.find(section => section.id === id).label}</div>
                            </div>)
                        }
                      </div>
                      <button onClick={() => toggleTools(false)}>Continue</button>
                    </div>
                  </div>
                  { tempForm.storage.handlers.call(tempForm, close, alert) }
                </div>
      }

      return <Creator form={form.tools.buildTree(form)} />
    }
  },
  tools: {
    buildTree: form => {
      let sections = form.tools.getSections(form).map( section => section.tools.buildTree(section) )
      return Object.assign(Object.create(Object.getPrototypeOf(form)), form, {sections: sections})
    },
    flatten: form => {
      let _form = Object.assign(Object.create(Object.getPrototypeOf(form)), form)
      let _sections = _form.sections ? _form.sections : []
      delete _form.sections
      let flatMap = [ _form ]

      _sections.forEach(section => {
        flatMap = [...flatMap, ...section.tools.flatten(section)]
      })

      return flatMap
    },
    getSections: form => {
      let formStore = getStore()
      let sections = []

      Object.values(form.section_ids).forEach(id => {
        let foundSection = formStore.section[id] ? formStore.section[id] : form.sections.find(obj => obj.id === id)

        sections = [...sections, foundSection]
      })

      return sections
    },
    display: {},
    completion: {}
  },
  component: {
    subscriptions: item => {
      return  <div>
                <div>Subscribe this module to a service</div>

                { Object.entries(services()).map( ([label, component]) =>
                  <div onClick={() => console.log(component(item))}
                      style={{fontSize: ".6rem"}}>{label}</div>) }


              </div>
    },
    serviceSettings: item => {},
    securitySettings: item => {},
    completionSettings: item => {},
    availableServices: item => {},
    submissions: item => {},
    searchBar: item => {}
  }
})

export { prototype }
