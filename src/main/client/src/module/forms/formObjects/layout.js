import React from 'react'
import * as validationTool from './validationTool'
import { formObject } from './formObject'



const prototype = getFormState => ({
  type: function() { return "layout"; },
  properties: {
    id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Forms.Layout.id"
        else if(!this.properties.id.validate(id)) throw "invalid property: Forms.Layout.id"
        else this.id = id
        return true
      },
      getObject: function(){ return this.id },
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
      getObject: function(){ return this.id },
      validate: id => { return true }
    },
    section_id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Forms.Layout.section_id"
        else if(!this.properties.section_id.validate(id)) throw "invalid property: Forms.Layout.section_id"
        else this.section_id = id
        return true
      },
      getObject: function(){ return this.id },
      validate: id => { return true }
    },
    element_ids: {
      setValue: function(ids){
        if(ids === null || ids === undefined) this.element_ids = []
        else if(!this.properties.layout_ids.validate(ids)) throw "invalid property: Forms.Layout.element_ids"
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
        if(displaySettings === null || displaySettings === undefined) this.display_settings = {}
        else if(!this.properties.display_settings.validate(displaySettings)) throw "invalid property: Forms.Layout.display_settings"
        else this.display_settings = displaySettings
        return true
      },
      validate: settings => { return true }
    }
  },
  display: {
    document: layout => {
      return  <div className="document">
                <div className="container-fill">
                  { element.element_ids.map(id => getFormState().element[id])
                      .map( element => <div className="container-row">{element.display.document(element)}</div>) }
                </div>
              </div>
    },
    editor: layout => {},
    builder: (layout, updater) => {
      function Creator(props){
        const [tempLayout, updateTempSection] = React.useState(props.layout)
        const updateHandler = newState =>  updateTempSection(Object.assign(Object.create(Object.getPrototypeOf(tempLayout)), tempLayout, {...newState}))

        const addElement = () => {
          let elementState = {
            id: "new_object",
            key: "new element",
            form_id: tempLayout.form_id,
            section_id: tempLayout.section_id,
            layout_id: tempLayout.id
          }
          let newElement = formObject("element", elementState, err => {throw err})

          updateHandler({
            element_ids: [...tempLayout.element_ids, newElement.id],
            new_object: tempLayout.new_object ? [...tempLayout.new_object, newElement] : [newElement]
          })
        }
        const removeElement = element_id => {
          updateHandler({
            element_ids: tempLayout.element_ids.filter( id => id !== element_id ),
            new_object: tempLayout.new_object ? tempLayout.new_object.filter( object => object.id !== element_id ) : []
          })
        }

        return  <div className="document">
                  <div className="container-row">
                    <div className="container-item item-label">Set Layout Type:</div>
                    <select value={tempLayout.layout_type}>
                      <option></option>
                    </select>
                    <button onClick={() => addElement()}>Add Element</button>}
                  </div>

                  <div className="container-fill">

                    {
                      tempLayout.element_ids.map( id =>
                        <div className="container-row border-bottom">
                          <div className="container-row">
                            <button onClick={() => removeElement(id)}>Remove Element</button>
                          </div>
                          { id.substring(0,2) === "n-" ?
                              tempLayout.new_object.find( obj => obj.id === id).display.builder(tempLayout.new_object.find(obj=>obj.id===id))
                              : getFormState().element[id].display.builder(getFormState().element[id]) }
                        </div>)
                    }

                  </div>
                </div>
      }

      return <Creator layout={layout} />
    }
  },
  typeFunctions: {}
})


const displayProps = getFormState => ({
  displayKey: "",
  component: {}
})


export { prototype, displayProps }
