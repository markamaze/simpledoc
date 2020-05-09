import React from 'react'
import { agencyObject } from './agencyObject'
import List from '../../../components/List'


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

        properties.reduce((result, property) => {
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
      return  <div className="tag container-item">
                {tag.tools.getDisplayName(tag)}
              </div>
    },
    document: tag => {

      return  <List className="container"
                  headerComponent={<div>{tag.display.card(tag)}</div>}
                  tableData={[
                    {label: "Tag Name", display: tag.tools.getDisplayName(tag)},
                    {label: "Tag Type", display: tag.components.showTagType(tag)},
                    {label: "Tag Properties", display: tag.agencyComponents.showPropertyKeys(tag.tag_properties)}
                  ]}
                  columns={[{selector: "label", selectable: false}, {selector: "display", selectable: false}]} />
    },
    builder: (tag, close, alert) => {
      function Builder(props){
        const [tempTag, updateTempTag] = React.useState(props.tag)
        const updateHandler = newState => updateTempTag(tempTag.update(newState))

        return  <List className="container"
                    headerComponent={<header>{props.tag.display.card(props.tag)}</header>}
                    tableData={[
                      tempTag.agencyComponents.setLabel(tempTag, updateHandler),
                      tempTag.components.setTagType(tempTag, updateHandler),
                      tempTag.components.buildProperties(tempTag, updateHandler)
                    ]}
                    footerComponent={tempTag.storage.handlers.call(tempTag, close, alert)}
                    iconComponent={ item => item } />
      }

      return <Builder tag={tag} />
    }
  },
  tools: {
    getDisplayName: tag => tag.label
  },
  components: {
    showTagType: tag => <div>{tag.tag_type}</div>,
    setTagType: (tag, updateHandler) => {

      return  <div className="container-row border-bottom">
                <div className="container-item item-label">Set Tag Type:</div>
                <div className="container-fill">
                  <div className="container-item">
                    <select value={tag.tag_type}
                        onChange={() => updateHandler({tag_type: event.target.value})} >
                      <option value=""></option>
                      <option value="agent">Agent</option>
                      <option value="structural">Structural</option>
                    </select>
                  </div>
                </div>
              </div>
    },
    buildProperties: (tag, updateHandler) => {
      const toggleProperty = property_id => tag.property_ids.includes(property_id) ?
      updateHandler({property_ids: tag.property_ids.filter(id => id !== property_id)})
      : updateHandler({property_ids: [...tag.property_ids, property_id]})

      return  <div className="container-row border-bottom">
                <div className="container-item item-label">Build Properties:</div>
                <div className="container">
                  {
                    
                  }
                </div>
              </div>
    }
  }
})

export { prototype }
