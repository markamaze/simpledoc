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
        if(ids === null || ids === undefined) this.layout_ids = []
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
    document: section => {
      return  <div className="document">
                <div className="header">{section.label}</div>
                <div className="container-fill">
                  { section.layout_ids.map(id => getFormState().layout[id])
                      .map( layout => <div className="container-row">{layout.display.document(layout)}</div>) }
                </div>
              </div>
    },
    editor: section => {},
    builder: (section, updateSection) => {
      function Creator(props){
        const [tempSection, updateTempSection] = React.useState(props.section)
        const updateHandler = newState => updateTempSection(Object.assign(Object.create(Object.getPrototypeOf(tempSection)), tempSection, {...newState}))

        const addLayout = () => {
          let sectionState = {
            id: "new_object",
            label: "new section",
            form_id: tempSection.form_id,
            section_id: tempSection.id
          }
          let newLayout = formObject("layout", sectionState, err => {throw err})

          updateHandler({
            layout_ids: [...tempSection.layout_ids, newLayout.id],
            new_object: tempSection.new_object ? [...tempSection.new_object, newLayout] : [newLayout]
          })
        }
        const removeLayout = layout_id => {
          updateHandler({
            layout_ids: tempSection.layout_ids.filter( id => id !== layout_id ),
            new_object: tempSection.new_object ? tempSection.new_object.filter( object => object.id !== layout_id ) : []
          })
        }
        const updateLayout = layout => {
          console.log("update layout", layout)
        }

        return  <List className="container document"
                  headerComponent={<div className="">{tempSection.label}</div>}
                  columns={[{selector: "display"}]}
                  tableData={tempSection.typeFunctions.getLayouts(tempSection).map(layout => ({display: layout.display.builder(layout), data: layout}))}
                  listActions={[{label: "add layout", action: () => addLayout() }]}
                  drawerComponents={[
                    {label: "rename", component: () => {} },
                    {label: "delete section", component: () => {} }
                  ]} />

        // return  <div className="document">
        //           <div className="container-row">
        //             <div className="container-item item-label">Update Title:</div>
        //             <input type="text" value={tempSection.label}
        //                     onChange={()=>updateHandler({label: event.target.value})} />
        //             <button onClick={() => addLayout()}>Add Layout</button>}
        //           </div>
        //
        //           <div className="container-fill">
        //
        //             <header className="container-row border-bottom">{tempSection.label}</header>
        //
        //             {
        //               tempSection.layout_ids.map( id =>
        //                 <div className="container-row border-bottom">
        //                   <div className="container-row">
        //                     <button onClick={() => removeLayout(id)}>Remove Layout</button>
        //                   </div>
        //                   { id.substring(0,2) === "n-" ?
        //                       tempSection.new_object.find( obj => obj.id === id).display.builder(tempSection.new_object.find(obj=>obj.id===id))
        //                       : getFormState().layout[id].display.builder(getFormState().layout[id], layout => updateLayout(layout)) }
        //                 </div>)
        //             }
        //
        //           </div>
        //
        //         </div>
      }

      return <Creator section={section} />
    }
  },
  typeFunctions: {
    getLayouts: section => {
      let store = getFormState()
      let layouts = []

      section.layout_ids.forEach( id => {
        if(id.substring(0,2) === "n-") layouts = [...layouts, section.new_object.find(obj => obj.id === id)]
        else layouts = [...layouts, store.layout[id] ]
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
