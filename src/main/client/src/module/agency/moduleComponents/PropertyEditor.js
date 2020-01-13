import React from 'react'

import DataTableWrapper from '../../../components/DataTableWrapper'



export default class PropertyEditor extends React.Component {

  getProperties(ownProps, inheritedProps){
    let tempProps = [...ownProps]

    inheritedProps.forEach( prop => { prop.data.forEach( item => { tempProps.push(item) }) })

    return tempProps
  }

  columns(properties){
    return [
      {name:"key", selector: "key"},
      {name: "value", ignoreRowClick: true, cell: row => {
        switch(row.valueType){
          case "Text": return <input type="text" value={row.value} onChange={()=>console.log(event.target.value)} />
          case "Number": return <input type="text" value={row.value} onChange={()=> console.log(event.target.value)} />
        }
      }}]
  }

  render() {
    let propertiesSet = this.props.propertiesSet ? this.props.propertiesSet : []
    let inheritedProperties = this.props.inheritedProperties ? this.props.inheritedProperties : []
    let properties = this.getProperties(propertiesSet, inheritedProperties)

    return  <DataTableWrapper
                className="object-list"
                noHeader={true}
                columns={this.columns(properties)}
                data={properties} />
  }
}
