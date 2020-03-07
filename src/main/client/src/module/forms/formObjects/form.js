import React from 'react'
import * as validationTool from './validationTool'
import { formObject } from './formObject'
import List from '../../../components/List'


const prototype = getFormState => ({
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
        if(section_ids === null || section_ids === undefined) this.section_ids = []
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
      return  <div className="document">
                <div className="header">{form.label}</div>
                <div className="container-fill">
                  { form.section_ids.map(id => getFormState().section[id])
                      .map( section => <div className="container-row">{section.display.document(section)}</div>) }
                </div>
              </div>
    },
    editor: (form, updateHandler) => {
      return  <div className="container-fill">
                form editor
              </div>
    },
    builder: (form, close, alert) => {
      function Creator(props){
        const [tempForm, updateTempForm] = React.useState(props.form)
        const updateHandler = newState => updateTempForm(Object.assign(Object.create(Object.getPrototypeOf(tempForm)), tempForm, {...newState}))

        const addSection = () => {
          let sectionState = {
            id: "new_object",
            label: "new section",
            form_id: tempForm.id
          }
          let newSection = formObject("section", sectionState, err => {throw err})

          updateHandler({
            section_ids: [...tempForm.section_ids, newSection.id],
            new_object: tempForm.new_object ? [...tempForm.new_object, newSection] : [newSection]
          })
        }
        const removeSection = section_id => {
          updateHandler({
            section_ids: tempForm.section_ids.filter( id => id !== section_id ),
            new_object: tempForm.new_object ? tempForm.new_object.filter( object => object.id !== section_id ) : []
          })
        }
        const updateSection = section => {
          console.log("update section", section)
        }

        return  <List className="document"
                  headerComponent={<div className="">{tempForm.label}</div>}
                  columns={[{selector: "display"}]}
                  tableData={tempForm.typeFunctions.getSections(tempForm).map(section => ({display: section.display.builder(section), data: section}))}
                  listActions={[{label: "add section", action: () => addSection()}]}
                  drawerComponents={[
                    {label: "rename", component: () => {} },
                    {label: "delete section", component: () => {} }
                  ]} />

        // return  <div className="document">
        //           <header>Modify Form</header>
        //           <div className="container-row">
        //             <div className="container-item item-label">Update Title:</div>

        //             <button onClick={() => addSection()}>Add Section</button>}
        //           </div>
        //
        //           <div className="container-fill">
        //
        //             <header className="container-row border-bottom">{tempForm.label}</header>
        //
        //             {
        //               tempForm.section_ids.map( id =>
        //                 <div className="container-row border-bottom">
        //                   <div className="container-row">
        //                     <button onClick={() => removeSection(id)}>Remove Section</button>
        //                   </div>
        //                   { id.substring(0,2) === "n-" ?
        //                       tempForm.new_object.find( obj => obj.id === id).display.builder(tempForm.new_object.find(obj=>obj.id===id))
        //                       : getFormState().section[id].display.builder(getFormState().section[id], section => updateSection(section)) }
        //                 </div>)
        //             }
        //
        //           </div>
        //
        //           { tempForm.storage.handlers.call(tempForm) }
        //
        //         </div>
      }

      return <Creator form={form} />
    }
  },
  typeFunctions: {
    getSections: form => {
      let formStore = getFormState()
      let sections = []

      form.section_ids.forEach(id => {
        if(id.substring(0,2) === "n-") sections = [...sections, form.new_object.find(obj => obj.id === id)]
        else sections = [...sections, formStore.section[id]]
      })

      return sections
    }
  }
})


const displayProps = formState => ({
  displayKey: "label",
  component: {
    list: {
      columns: [{label: "Form Title", selector: "label"}],
      tableData: Object.values(formState.form),
      listActions: [
        { label: "create form", action: () => {
            let newForm = formObject("form", {id: "new_object", label: "new form"}, error => console.log(error))
            return newForm.display.builder(newForm)
        }}
      ],
      overlayComponents: [
        {label: "show form", component: item => item.display.document(item)},
        {label: "modify", component: item => item.display.builder(item)}
      ]
    }
  }
})


export { prototype, displayProps }
