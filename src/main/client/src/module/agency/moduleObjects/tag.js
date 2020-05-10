import React from 'react'
import { agencyObject } from './agencyObject'
import List from '../../../components/List'
import uuidv4 from 'uuid/v4'


//TODO: move and import
const utility = {
  validateId: id => true, //handle flags
  validateString: (string, params) => true,

}

const prototype = (getStore, services, utilities) => ({
  type: () => "tag",
  properties: {
    id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.Tag.id"
        else if(!this.properties.id.validate(id)) throw "invalid property: Agency.Tag.id"
        else this.id = id
        return true
      },
      validate: id => utility.validateId(id)
    },
    label: {
      setValue: function(label){
        if(label === null || label === undefined) throw "missing required property: Agency.Tag.label"
        else if(!this.properties.label.validate(label)) throw "invalid property: Agency.Tag.label"
        else this.label = label
        return true
      },
      validate: label => utility.validateString(label, {min_len: 1, max_len: 40, allow_spaces: true, allow_special_chars: true})
    },
    tag_type: {
      setValue: function(tag_type){
        if(tag_type === null || tag_type === undefined) throw "missing required property: Agency.Tag.tag_type"
        else if(!this.properties.tag_type.validate(tag_type)) throw "invalid property: Agency.Tag.tag_type"
        else this.tag_type = tag_type
        return true
      },
      validate: tag_type => {
        let types = ["structural", "agent"]
        return types.includes(tag_type)
      }
    },
    tag_properties: {
      setValue: function(properties){
        if(properties === null || properties === undefined) this.tag_properties = []
        else if(!this.properties.tag_properties.validate(properties)) throw "invalid property: Agency.Tag.tag_properties"
        else this.tag_properties = properties
        return true
      },
      validate: properties => {
        if(!Array.isArray(properties)) return false
        if(properties.length === 0) return true
        
        let valid_property_types = ["string", "date"]

        return properties.reduce((result, property) => {
          let propertySet

          if(!result) return false
          else if(typeof property !== "string") return false
          
          propertySet = property.split("=");
          if(propertySet.length !== 3) return false
          else if(!utility.validateId(propertySet[0])) return false
          else if(!utility.validateString(propertySet[1], {min_len: 1, max_len:24, allow_spaces: true, allow_special_chars: true})) return false
          else if(!valid_property_types.includes(propertySet[2])) return false
          return true
        })
      },

    }

  },
  display: {
    card: tag => {
      return  <div className="d-inline-flex bg-secondary text-light p-1 m-1" style={{fontSize: "smaller", borderRadius: ".5rem"}}>
                {tag.tools.getDisplayName(tag)}
              </div>
    },
    document: tag => {

      return  <List className="container"
                  headerComponent={<div>Tag Info: {tag.tools.getDisplayName(tag)}</div>}
                  tableData={[
                    {label: <div>Tag</div>, display: tag.display.card(tag)},
                    {label: <div>Type</div>, display: tag.components.showTagType(tag)},
                    {label: <div>Properties</div>, display: tag.agencyComponents.showPropertyKeys(tag.tag_properties)}
                  ]}
                  columns={[{selector: "label"}, {selector: "display"}]} />
    },
    builder: (tag, close, alert) => {
      function Builder(props){
        const [tempTag, updateTempTag] = React.useState(props.tag)
        const updateHandler = newState => updateTempTag(tempTag.update(newState))

        return  <List className="container"
                    headerComponent={<div>{props.tag.tools.getDisplayName(props.tag)}</div>}
                    tableData={[
                      tempTag.agencyComponents.setLabel(tempTag, updateHandler),
                      tempTag.components.setTagType(tempTag, updateHandler),
                      tempTag.components.manageTagProperties(tempTag, updateHandler)
                    ]}
                    footerComponent={tempTag.storage.handlers.call(tempTag, close, alert)}
                    iconComponent={ item => item } />
      }

      return <Builder tag={tag} />
    }
  },
  tools: {
    getDisplayName: tag => tag.label,
    getProperties: tag => tag.tag_properties
  },
  components: {
    showTagType: tag => <div className="font-italic">{tag.tag_type}</div>,
    setTagType: (tag, updateHandler) => {

      return  <div className="d-flex flex-row">
                <label className="d-flex p-1 w-25">Set tag type</label>
                <select className="d-flex p-0 m-1 flex-fill"
                    value={tag.tag_type}
                    onChange={() => updateHandler({tag_type: event.target.value})} >
                  <option value=""></option>
                  <option value="agent">Agent</option>
                  <option value="structural">Structural</option>
                </select>
              </div>
    },
    manageTagProperties: (tag, updateHandler) => {
      let tagProperties = tag.tag_properties ? tag.tag_properties : []

      const addNewProperty = event => {
        event.preventDefault()
        let id = uuidv4()
        let key = event.target.children.propertyKey.value
        let valueType = event.target.children.valueType.value
        let propertyString = `${id}=${key}=${valueType}`

        tagProperties.push(propertyString)
        updateHandler({tag_properties: tagProperties})
      }

      const removeProperty = propertyString => {
        updateHandler({tag_properties: tagProperties.filter(property => property !== propertyString)})
      }

      const updateProperty = (id, key, valueType) => {
        updateHandler({tag_properties: [...tagProperties.filter(property => property.split("=")[0] !== id), `${id}=${key}=${valueType}`]})
      }


      return  <div className="d-flex flex-column flex-fill">
                <label className="d-flex pt-2 pb-0 align-self-center">Tag Properties</label>

                <div className="d-flex p-1 flex-column">
                { 
                  tag.tools.getProperties(tag).map( propertyString => {
                    let property = propertyString.split("=")
                    let id = property[0]
                    let key = property[1]
                    let valueType = property[2]

                    return  <div className="d-flex flex-row flex-fill mx-4 my-1 input-group input-group-sm">
                              <input className="input-group-text p-1" type="text" value={key} onChange={() => updateProperty(id, event.target.value, valueType)} />
                              <select className="input-group-select p-0" onChange={() => updateProperty(id, key, event.target.value)} value={valueType} >
                                <option value="string">string</option>
                                <option value="date">date</option>
                              </select>
                              <input className="mx-2 p-0" type="button" onClick={() => removeProperty(propertyString)} value="remove"/>
                            </div> 
                  })
                }
                </div>

                <form className="d-flex mx-4 my-1 flex-row flex-fill input-group input-group-sm" onSubmit={() => addNewProperty(event)}>
                  <input className="input-group-text" type="text" id="propertyKey" name="propertyKey" placeholder="set new key" />
                  <select className="p-0" id="valueType" name="valueType" >
                    <option value="">set new type</option>
                    <option value="string">string</option>
                    <option value="date">date</option>
                  </select>
                  <input className="input-group-text mx-2 p-0" type="submit" value="add property" />
                </form>
              </div>
    }
  }
})

export { prototype }
