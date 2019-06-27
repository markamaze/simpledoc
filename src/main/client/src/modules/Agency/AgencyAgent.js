import React from 'react'

import Table from '../../components/Table'
import { TableWrapper, TableHeaderWrapper } from '../../components/component_styles'
import Button from '../../components/atomic/Button'


export default class AgencyAgent extends React.Component {

  render() {
    return  <div>
              <TableWrapper className="TableWrapper" column>
                <TableHeaderWrapper>
                  <header>{ this.props.editable ? "Modify Agent" : "Agent Information"}</header>
                    <Button label="create agent" onClick={() => this.props.createItem(null, "agent")} />
                    <Button label="update agent" onClick={() => this.props.updateItem(null, "agent")} />
                    <Button label="delete agent" onClick={() => this.props.deleteItem(null, "agent")} />
                </TableHeaderWrapper>

                <Table
                  noHeader
                  subHeader={false}
                  columns={[{selector:"data", name:"agent definition"}]}
                  data={[ {data: this.props.data.id},
                          {data: this.props.data.definition_id},
                          {data: this.props.data.agent_link_id},
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
