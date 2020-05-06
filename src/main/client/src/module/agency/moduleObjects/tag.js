import React from 'react'
import { agencyObject } from './agencyObject'
import List from '../../../components/List'


const validateId = idString => true
const validateString = string => true


const prototype = (getStore, services, utilities) => ({
  type: () => "tag",
  properties: {
    id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.DataTag.id"
        else if(!this.properties.id.validate(id)) throw "invalid property: Agency.DataTag.id"
        else this.id = id
        return true
      },
      validate: id => validateId(id)
    },
    label: {
      setValue: function(label){
        if(label === null || label === undefined) throw "missing required property: Agency.DataTag.label"
        else if(!this.properties.label.validate(label)) throw "invalid property: Agency.DataTag.label"
        else this.label = label
        return true
      },
      validate: label => validateString(label)
    },
    tagType: {
      setValue: function(tagType){
        if(tagType === null || tagType === undefined) throw "missing required property: Agency.DataTag.tagType"
        else if(!this.properties.tagType.validate(tagType)) throw "invalid property: Agency.DataTag.tagType"
        else this.tagType = tagType
        return true
      },
      validate: tagType => tagType === "agent" || tagType === "structural"
    },
    properties: {
      setValue: function(properties){
        if(properties === null || properties === undefined) this.properties = []
        else if(!this.properties.properties.validate(properties)) throw "invalid property: Agency.DataTag.properties"
        else this.properties = properties
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
          else if(!validateId(propertySet[0])) return false
          else if(!validateString(propertySet[1])) return false
          else if(!valid_property_types.includes(propertySet[2])) return false
          else {
            //validate structure of each property
          }
        })
      },

    }

  },
  display: {
    card: dataTag => {
      return  <div className="dataTag container-item">
                {dataTag.agencyTools.getDisplayLabel(dataTag)}
              </div>
    },
    document: dataTag => {

      return  <List className="container"
                  headerComponent={<div>DataTag Info</div>}
                  tableData={[
                    {label: "Tag Name", display: dataTag.agencyTools.getDisplayLabel(dataTag)},
                    {label: "Tag Type", display: dataTag.tagType},
                    // {label: "Tag Properties", display: dataTag.agencyComponents.propertiesList(dataTag)}
                  ]}
                  columns={[{selector: "label", selectable: false}, {selector: "display", selectable: false}]} />
    },
    builder: (dataTag, close, alert) => {
      function Builder(props){
        const [tempDataTag, updateTempDataTag] = React.useState(props.dataTag)
        const updateHandler = newState => updateTempDataTag(tempDataTag.moduleTools.updateObject(newState, tempDataTag))

        return  <List className="container"
                    headerComponent={<header>Modify DataTag</header>}
                    tableData={[
                      tempDataTag.components.setLabel(tempDataTag, updateHandler),
                      tempDataTag.components.setTagType(tempDataTag, updateHandler),
                      tempDataTag.components.setProperties(tempDataTag, updateHandler)
                    ]}
                    footerComponent={tempDataTag.storage.handlers.call(tempDataTag, close, alert)}
                    iconComponent={ item => item } />
      }

      return <Builder dataTag={dataTag} />
    }
  },
  tools: {
    getProperties: 
  },
  components: {
    setTagType: (dataTag, updateHandler) => {

      return  <div className="container-row border-bottom">
                <div className="container-item item-label">Set DataTag Type:</div>
                <div className="container-fill">
                  <div className="container-item">
                    <select value={dataTag.tagType}
                        onChange={() => updateHandler({tagType: event.target.value})} >
                      <option value=""></option>
                      <option value="agent">Agent</option>
                      <option value="structural">Structural</option>
                    </select>
                  </div>
                </div>
              </div>
    },
    setLabel: (dataTag, updateHandler) => {

      return  <div className="container-row border-bottom">
                <div className="container-item item-label">Set Label:</div>
                <div className="container-fill">
                  <input value={dataTag.label}
                      onChange={() => updateHandler({label: event.target.value})} />
                </div>
              </div>
    },
    setProperties: (dataTag, updateHandler) => {
      const toggleProperty = property_id => tempDataTag.dataTag_property_ids.includes(property_id) ?
      updateHandler({dataTag_property_ids: tempDataTag.dataTag_property_ids.filter(id => id !== property_id)})
      : updateHandler({dataTag_property_ids: [...tempDataTag.dataTag_property_ids, property_id]})

      return  <div className="container-row border-bottom">
                <div className="container-item item-label">Set Properties:</div>
                <div className="container">
                  {
                    Object.values(getStore().property).map( property =>
                      <div className={`container-item ${dataTag.dataTag_property_ids.includes(property.id) ? "selected" : ""}`}
                          onClick={()=> toggleProperty(property.id)}>
                        {property.display.card(property)}
                      </div>)
                  }
                </div>
              </div>
    }
  }
})

export { prototype }
