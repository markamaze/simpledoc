import React from 'react'
import List from '../../../components/List'
import { useSelector } from 'react-redux'

const validateUUID = id => true
const validateString = string => true


const prototype = (getStore, services, utilities) => ({
  type: () => "template",
  properties: {
    id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.Template.id"
        else if(!this.properties.id.validate(id)) throw "invalid property: Agency.Template.id"
        else this.id = id
        return true
      },
      validate: (id)=> validateUUID(id)
    },
    label: {
      setValue: function(label){
        if(label === null || label === undefined) throw "missing required property: Agency.Template.label"
        else if(!this.properties.label.validate(label)) throw "invalid property: Agency.Template.label"
        else this.label = label
        return true
      },
      validate: (label)=> validateString(label)
    },
    tag_ids: {
      setValue: function(ids){
        if(ids === null || ids === undefined) this.tag_ids = []
        else if(!this.properties.tag_ids.validate(ids)) throw "invalid required property: Agency.Template.tag_ids"
        else this.tag_ids = ids
        return true
      },
      validate: (ids)=>{
        if(!Array.isArray(ids)) return false
        return ids.reduce( (result, id) => {
          if(!result) return false
          else if(!validateUUID(id)) return false
          else if(!store.tag[id]) return false
          else return true
        })
      }
    }
  },
  display: {
    card: template => {
      return  <div className="container-item">{ template.tools.displayLabel(template) }</div>
    },
    document: template => {
      return  <List className="container"
                  headerComponent={<header>{`Template: ${template.tools.displayLabel(template)}`}</header>}
                  tableData={[ 
                    template.components.displayTags(template), 
                    template.components.displayPropertyKeys(template) ]}
                  iconComponent={ item => item } />
    },
    builder: (template, close, alert) => {
      function Builder(props){
        const [tempTemplate, updateTempTemplate] = React.useState(props.template)
        const updateHandler = newState => updateTempTemplate(Object.assign(Object.create(Object.getPrototypeOf(tempTemplate)), tempTemplate, newState))

        return  <List className="container"
                    headerComponent={<header>Modify Template</header>}
                    tableData={[
                      tempTemplate.components.setLabel(tempTemplate, updateHandler),
                      tempTemplate.components.setTags(tempTemplate, updateHandler),
                    ]}
                    footerComponent={tempTemplate.storage.handlers.call(tempTemplate, close, alert)}
                    iconComponent={item => item} />
      }

      return <Builder template={template} />

    }
  },
  tools: {
    displayLabel: template => template.label,
    getTags: template => template.tag_ids.map( id => getStore().tag[id] ),
    getProperties: template => {
      let properties = []
      template.tools.getTags(template).forEach( tag => {
        tag.tools.getProperties(tag).forEach( property => {
          properties = [...properties, property]
        })
      })
      return properties
    }
  },
  components: {
    setLabel: (template, updateHandler) => {

      return  <div className="container-row border-bottom">
                <div className="container-item item-label">Update Label</div>
                <input className="container-item  container-fill"
                    value={template.label}
                    onChange={() => updateHandler({label: event.target.value})} />
              </div>
    },
    setTags: (template, updateHandler) => {
      const addTag = tag_id => updateHandler({tag_ids: [...template.tag_ids, tag_id]})
  
      const removeTag = tag_id => updateHandler({tag_ids: template.tag_ids.filter(id => id !== tag_id)})
  
      return  <List className="container-row"
                  headerComponent={<div className="container-item item-label">Modify Tags</div>}
                  tableData={[
                    {
                      selectable: false, 
                      label: "Add Tag" , 
                      input: <select className="container-row" value="" onChange={() => addTag(event.target.value)}>
                                <option value=""></option>
                                {
                                  Object.values(getStore().tag).map( tag => <option value={tag.id}>{tag.label}</option>)
                                }
                              </select>},
                    ...Object.values(template.tools.getTags).map(tag => ({
                      data: tag, 
                      selectable: false, 
                      input: <button onClick={()=> removeTag(tag.id)}>X</button>, 
                      label: tag.display.card(tag) }))]}
                  columns={[{selector: "label"}, {selector: "input"}]} />
    },
    displayPropertyKeys: (template, updateHandler) => {
        return  <List className="container"
                    headerComponent={<div>Properties:</div>}
                    tableData={template.tools.getProperties(template)}
                    iconComponent={property => property.display.document(property)} />
    },
    displayTags: (template, updateHandler) => {

    }
  }
})

export { prototype }

