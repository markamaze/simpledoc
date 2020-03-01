import React from 'react'
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
    // property_value:{
    //   setValue: function(value){
    //     if(value === null || value === undefined) this.property_value = null
    //     else if(!this.properties.property_value.validate(value)) throw "invalid property: Agency.Property.property_value"
    //     else this.property_value = value
    //     return true
    //   },
    //   validate: () => {return true}
    // }
  },
  display: {
    card: property => {
      return  <div className="property container-item">{property.property_key}</div>
    },
    document: (property, value) => {
      return  <div className="property container-row">
                <div className="container-item">{property.property_key}:</div>
                <div className="container-item">{`${value ? value : ""}`}</div>
              </div>
    },
    // editor: (property, value, updateHandler) => {
    //   function Editor(props){
    //     const [tempValue, updateTempValue] = React.useState(props.value ? props.value : "")
    //
    //     const setValue = () => props.updateHandler({[`${props.property.id}`]:tempValue})
    //
    //     return  <div className="property container-row">
    //               <div className="container-item item-label">{props.property.property_key}</div>
    //               <input className="container-item"
    //                   type="text"
    //                   value={value}
    //                   onChange={() => updateHandler(event.target.value)} />
    //             </div>
    //   }
    //
    //   return <Editor property={property} value={value} updateHandler={updateHandler}/>
    // },
    builder: (property) => {
      function Builder(props){
        const [tempProperty, updateTempProperty] = React.useState(props.property)

        const updateHandler = newState => updateTempProperty(Object.assign(Object.create(Object.getPrototypeOf(tempProperty)), tempProperty, {...newState}))

        return  <div className="property document">
                  <header>Modify Property</header>
                  <div className="container-fill">
                    <div className="container-row border-bottom">
                      <div className="container-item item-label">Set Key</div>
                      <input className="container-item container-fill"
                          type="text"
                          onChange={()=> updateHandler({property_key: event.target.value})}
                          value={tempProperty.property_key} />
                    </div>

                    <div className="container-row border-bottom">
                      <div className="container-item item-label">Set Value Type</div>
                      <select className="container-item container-fill"
                          onChange={() => updateHandler({property_value_type: event.target.value})}
                          value={tempProperty.property_value_type}>
                        <option value=""></option>
                        <option value="string">String</option>
                        <option value="number">Number</option>
                        <option value="time">Time</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  { tempProperty.storage.handlers.call(tempProperty) }
                </div>
      }

      return <Builder property={property} />
    }
  }
})


const displayProps = agencyState => ({
  displayKey: "property_key",
  component: {
    list: {
      columns: [{selector: "display"}],
      tableData: Object.values(agencyState.property).map(property => ({data: property, display: property.display.document(property)})),
      listActions: [
        {label: "New Property", action: () => {
          let newProperty = agencyObject("property", {id: "new_object", }, err=>{throw err})
          return newProperty.display.builder(newProperty)
        }}
      ],
      overlayComponents: [
        {label: "modify", component: item => item.data.display.builder(item.data)}
      ]
    }
  }
})


export { prototype, displayProps }
