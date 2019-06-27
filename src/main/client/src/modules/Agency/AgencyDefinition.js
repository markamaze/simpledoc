import React from 'react'

import Table from '../../components/Table'
import { TableWrapper, TableHeaderWrapper } from '../../components/component_styles'
import Button from '../../components/atomic/Button'



export default class AgencyDefinition extends React.Component {

  render() {
    return  <div>
              <TableWrapper className="TableWrapper" column>
                <TableHeaderWrapper>
                <header>{ this.props.editable ? "Modify Definition" : "Definition Information"}</header>
                    <Button label="create definition" onClick={() => this.props.createItem(null, "definition")} />
                    <Button label="update definition" onClick={() => this.props.updateItem(null, "definition")} />
                    <Button label="delete definition" onClick={() => this.props.deleteItem(null, "definition")} />
                </TableHeaderWrapper>

                <Table
                  noHeader
                  subHeader={false}
                  columns={[{selector:"data", name:"definition definition"}]}
                  data={[ {data: this.props.data.id},
                          {data: this.props.data.label},
                          {data: this.props.data.behavior},
                          {data: this.props.data.security} ]} />

                <Table
                  noHeader={true}
                  subHeader={false}
                  columns={[{selector: "1", name: "key"}, {selector: "2", name: "value type"}]}
                  data={[ {1: "name", 2: "string"}, {1: "other", 2: "string"}]} />
              </TableWrapper>
            </div>
  }
}
