import React from 'react'
import uuidv4 from 'uuid/v4'
import { agencyObject } from './agencyObject'



const prototype = agencyState => ({
  type: () => "property",
  properties: {
    id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.Property.id"
        else if(!this.properties.id.validate(id)) throw "invalid property: Agency.Property.id"
        else this.id = id
        return true
      },
      getObject: function(){ return this.id },
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
      getObject: function(){ return this.property_key },
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
      getObject: function(){ return this.property_value_type},
      validate: ()=>{ return true }
    },
    property_value:{
      setValue: function(value){
        if(value === null || value === undefined) this.property_value = null
        else if(!this.properties.property_value.validate(value)) throw "invalid property: Agency.Property.property_value"
        else this.property_value = value
        return true
      },
      validate: () => {return true}
    }
  },
  display: {
    card: property => {
      return  <div className="property container-row">{`Key: ${property.property_key}`}</div>
    },
    document: property => {
      return  <div className="property container-fill">{property.property_key}:{property.property_value ? property.property_value : `(${property.property_value_type})`}</div>
    },
    editor: (property, updateHandler) => {
      function Editor(props){
        const [tempProperty, updateTempProperty] = React.useState(props.property)
        const updateHandler = newState => props.updateHandler ?
          props.updateHandler(newState)
          : updateTempProperty(Object.assign(Object.create(Object.getPrototypeOf(props.property)), props.property, newState))

        return  <div className="property container-fill">
                  <div className="container-row">
                    {props.property.property_key}:
                    <input type="text"
                          value={props.property.property_value}
                          onChange={() => updateHandler({property_value: event.target.value})} />
                  </div>
                </div>
      }

      return <Editor property={property} updateHandler={updateHandler}/>
    },
    builder: (property, updateHandler) => {
      function Builder(props){
        const [tempProperty, updateTempProperty] = React.useState(props.property)
        const updateHandler = newState => props.updateHandler ?
          props.updateHandler(newState)
          : updateTempProperty(Object.assign(Object.create(Object.getPrototypeOf(tempProperty)), tempProperty, {...newState}))

        return  <div className="property container-fill">

                  <div className="container-row">
                    <label>property key:</label>
                    <input type="text"
                            onChange={()=> updateHandler({property_key: event.target.value})}
                            value={tempProperty.property_key} />
                  </div>

                  <div className="container-row">
                    <label>property value type:</label>
                    <select onChange={() => updateHandler({property_value_type: event.target.value})}
                            value={tempProperty.property_value_type}>
                      <option value=""></option>
                      <option value="string">String</option>
                      <option value="number">Number</option>
                      <option value="time">Time</option>
                    </select>
                  </div>

                  {
                    props.updateHandler ? null : tempProperty.storage.handlers.call(tempProperty)
                  }
                </div>
      }

      return <Builder property={property} updateHandler={updateHandler} />
    }
  }
})


const displayProps = agencyState => ({
  displayKey: "property_key",
  component: {
    list: {
      columns: {
        limited: [{label: "key", selector: "property_key"}],
        expanded: [{label: "key", selector: "property_key"},{label: "value type", selector:"property_value_type"}]
      },
      tableData: Object.values(agencyState.property),
      listActions: [
        {label: "New Property", action: () => {
          let newProperty = agencyObject("property", {id: "new_object", }, err=>{throw err})
          return newProperty.display.builder(newProperty)
        }}
      ],
      drawerComponents: [
        {label: "modify", component: item => item.display.builder(item)}

      ],
      overlayComponents: [
      ]
    }
  }
})


export { prototype, displayProps }
