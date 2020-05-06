import React from 'react'
import * as validationTool from './validationTool'
import { formObject } from './formObject'



const prototype = (getStore, services, utilities) => ({
  type: function() { return "element"; },
  properties: {
    id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Forms.Element.id"
        else if(!this.properties.id.validate(id)) throw "invalid property: Forms.Element.id"
        else this.id = id
        return true
      },
      validate: id => { return true }
    },
    form_id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Forms.Element.form_id"
        else if(!this.properties.form_id.validate(id)) throw "invalid property: Forms.Element.form_id"
        else this.form_id = id
        return true
      },
      validate: id => { return true }
    },
    section_id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Forms.Element.section_id"
        else if(!this.properties.section_id.validate(id)) throw "invalid property: Forms.Element.section_id"
        else this.section_id = id
        return true
      },
      validate: id => { return true }
    },
    layout_id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Forms.Element.layout_id"
        else if(!this.properties.layout_id.validate(id)) throw "invalid property: Forms.Element.layout_id"
        else this.layout_id = id
        return true
      },
      validate: id => { return true }
    },
    key: {
      setValue: function(key){
        if(key === null || key === undefined) throw "missing required property: Forms.Element.key"
        else if(!this.properties.key.validate(key)) throw "invalid property: Forms.Element.key"
        else this.key = key
        return true
      },
      validate: key => { return true }
    },
    value_type: {
      setValue: function(type){
        if(type === null || type === undefined) this.value_type = "text"
        else if(!this.properties.value_type.validate(type)) throw "invalid property: Forms.Element.value_type"
        else this.value_type = value
        return true
      },
      validate: type => true
    },
    value_properties: {
      setValue: function(valueProperties){
        if(valueProperties === null || valueProperties === undefined) this.value_properties = {}
        // throw "missing required property: Forms.Element.value_properties"
        else if(!this.properties.value_properties.validate(valueProperties)) throw "invalid property: Forms.Element.value_properties"
        else this.value_properties = valueProperties
        return true
      },
      validate: props => { return true }
    },
    completion_rules: {
      setValue: function(completionRules){
        if(completionRules === null || completionRules === undefined) this.completion_rules = {}
        else if(!this.properties.completion_rules.validate(completionRules)) throw "invalid property: Forms.Element.completion_rules"
        else this.completion_rules = completionRules
        return true
      },
      validate: rules => { return true }
    },
    security_settings: {
      setValue: function(securitySettings){
        if(securitySettings === null || securitySettings === undefined) this.security_settings = {}
        else if(!this.properties.security_settings.validate(securitySettings)) throw "invalid property: Forms.Element.security_settings"
        else this.security_settings = securitySettings
        return true
      },
      validate: settings => { return true }
    }
  },
  display: {
    card: (element, submission) => {
      return <div>{submission.value}</div>
    },
    document: (element, submission) => {
      return <div className="container-item row p-0 m-0" style={{lineHeight: "1rem"}}>
                <label className="col-6">{element.key}</label>
                <div className="col-6">{submission.value}</div>
              </div>
    },
    editor: (element, updater, submission) => {
      function Editor(props){
        const [displayEditorTools, toggleEditorTools] = React.useState(false)

        const getInputElement = () => {
          switch(props.element.value_type){
            case "text":
              return <input type="text" value={props.submission.value} onChange={() => props.updateValue({value: event.target.value})} />

            default: <div>404 error: unknown element value type</div>
          }
        }

        return <div className="container-item row p-0 m-0" style={{lineHeight: "1rem"}}>
                  <label className="col-6">{element.key}</label>
                  <div className="col-6">{getInputElement()}</div>
                </div>
      }

      return <Editor element={element} updateValue={updater} submission={submission} />
    },
    builder: (element, updateElement) => {
      function Builder(props){
        const [tempElement, updateTempElement] = React.useState(props.element)
        const updateHandler = newState => {
          updateElement(Object.assign(Object.create(Object.getPrototypeOf(tempElement)), tempElement, {...newState}))
        }

        return  <div>
                  <div className="row p-0 m-0">
                    <input className="px-1 my-1" style={{lineHeight: "1"}} onChange={() => updateHandler({key: event.target.value})} placeholder="Set Key"/>

                    <select className="px-1 my-1" style={{lineHeight: "1"}}>
                      <option value="">Set Type</option>
                    </select>
                  </div>
                </div>
      }

      return <Builder element={element} />
    }
  },
  tools: {},
  settings: {},
  components: {}
})

export { prototype }
