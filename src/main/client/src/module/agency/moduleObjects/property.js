import React from 'react'
import { agencyObject } from './agencyObject'
import List from '../../../components/List'


const prototype = (getStore, services, utilities) => ({
  type: () => "property",
  properties: {
    id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.Property.id"
        else if(!this.properties.id.validate(id)) throw "invalid property: Agency.Property.id"
        else this.id = id
        return true
      },
      validate: ()=>{ return true }
    },
    property_key: {
      setValue: function(key){
        if(key === null || key === undefined) this.property_key = ""
        // throw "missing required property: Agency.Property.property_key"
        else if(!this.properties.property_key.validate(key)) throw "invalid property: Agency.Property.property_key"
        else this.property_key = key
        return true
      },
      validate: ()=>{ return true }
    },
    property_value_type: {
      setValue: function(type){
        if(type === null || type === undefined) this.property_value_type = ""
        // throw "missing required property: Agency.Property.property_value_type"
        else if(!this.properties.property_value_type.validate(type)) throw "invalid property: Agency.Property.property_value_type"
        else this.property_value_type = type
        return true
      },
      validate: ()=>{ return true }
    }
  },
  display: {
    card: property => {
      return  <div className="container-item">{property.agencyTools.getDisplayLabel(property)}</div>
    },
    document: (property, value) => {
      return  <div className="container-row">
                <div className="container-item">{property.agencyTools.getDisplayLabel(property)}:</div>
                <div className="container-item">{`${value ? value : ""}`}</div>
              </div>
    },
    builder: (property, close, alert) => {
      function Builder(props){
        const [tempProperty, updateTempProperty] = React.useState(props.property)

        const updateHandler = newState =>
          updateTempProperty(tempProperty.moduleTools.updateObject(newState, tempProperty))

        return  <List className="container"
                    headerComponent={<div>Modify Property</div>}
                    tableData={[
                      tempProperty.components.setKey(tempProperty, updateHandler),
                      tempProperty.components.setValueType(tempProperty, updateHandler)
                    ]}
                    footerComponent={ tempProperty.storage.handlers.call(tempProperty, close, alert) }
                    iconComponent={ item => item } />
      }

      return <Builder property={property} />
    }
  },
  tools: {},
  components: {
    setKey: (property, updateHandler) => {

      return  <div className="container-row border-bottom">
                <div className="container-item item-label">Set Key</div>
                <input className="container-item container-fill"
                    type="text"
                    onChange={()=> updateHandler({property_key: event.target.value})}
                    value={property.property_key} />
              </div>
    },
    setValueType: (property, updateHandler) => {

      return  <div className="container-row border-bottom">
                <div className="container-item item-label">Set Value Type</div>
                <select className="container-item container-fill"
                    onChange={() => updateHandler({property_value_type: event.target.value})}
                    value={property.property_value_type}>
                  <option value=""></option>
                  <option value="string">String</option>
                  <option value="number">Number</option>
                  <option value="time">Time</option>
                  <option value="other">Other</option>
                </select>
              </div>
    }
  }
})

export { prototype }
