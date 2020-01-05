import React from 'react'
import DataTableWrapper from '../../../components/DataTableWrapper'


export default class PropertyBuilder extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      propertiesSet: this.props.propertiesSet ? this.props.propertiesSet : [],
      tempTagProperty: { key: "", valueType: "" } }
  }

  propertiesColumns(){
    return [
      { name: "key", cell: row => {
        if(row.newProperty)
          return <input className="" value={this.state.tempTagProperty.key} type="text" onChange={() => this.setTempProperty(event.target.value, "key")} />
        else return row.key }},
      { name: "type", cell: row => {
        if(row.newProperty)
          return <select className="" value={this.state.tempTagProperty.valueType} onChange={() => this.setTempProperty(event.target.value, "valueType")}>
            <option value="">Select Type</option>
            <option value="Text">Text</option>
            <option value="Number">Number</option>
          </select>
        else return row.valueType
      } },
      { name: "", ignoreRowClick: true, cell: row => {
        if(row.newProperty) return <div onClick={() => this.addProperty()}>add</div>
        else if(row.inheritedFrom) return <div>{`inherited from ${row.inheritedFrom}`}</div>
        else return row.required ? null : <div onClick={() => this.removeProperty(row)}>remove</div>}}
    ]
  }

  propertiesData(){
    let newPropertyTools = { newProperty: true }

    let combinedData = this.props.disableEditing ?
      this.state.propertiesSet
      : [newPropertyTools, ...this.state.propertiesSet]

    if(this.props.inheritedProperties && this.props.inheritedProperties.length > 0){
      this.props.inheritedProperties.forEach( prop => {
        prop.data.map(property => combinedData.push({key: property.key, valueType: property.valueType, inheritedFrom: prop.inheritedFrom}) )
      })
    }

    return combinedData
  }

  removeProperty(property){

    let updatedSet = this.props.propertiesSet.filter(prop => prop.key !== property.key)
    this.props.updatePropertiesSet(this.props.propertyKey, updatedSet)

    this.setState({
      propertiesSet: updatedSet,
      tempTagProperty: { key: "", valueType: ""} })
  }

  addProperty(){
    let propertiesSet = this.props.propertiesSet === undefined ? [] : this.props.propertiesSet
    let updatedSet = [...propertiesSet, this.state.tempTagProperty]
    this.props.updatePropertiesSet(this.props.propertyKey, updatedSet)

    this.setState({propertiesSet: updatedSet, tempTagProperty: { key: "", valueType: "" }})
  }

  setTempProperty(value, key){
    this.setState({
      tempTagProperty: Object.assign({}, this.state.tempTagProperty, { [`${key}`]: value })
    })
  }

  render(){
    return  <div className="editor-container">
              <header>Properties</header>
              <DataTableWrapper
                  className="editor-properties-table"
                  noHeader={true}
                  columns={this.propertiesColumns()}
                  data={this.propertiesData()} />
            </div>
  }
}
