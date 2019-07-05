import React from 'react'
import styled from 'styled-components'
import { Container, Table } from 'react-bootstrap'


const StyleWrapper = styled(Container)`

`



export default class ImplementedAgents extends React.Component {

  renderTableData(type) {
    return this.props.agency_agents.map( agent =>
        <tr>
          <td>{agent.label}</td>
          <td>{this.findDefinition(agent.definition_id).label}</td>
          <td>{this.findCategory(this.findDefinition(agent.definition_id).category_id).label}</td>
          <td>{this.findCategory(this.findDefinition(agent.definition_id).category_id).behavior}</td>
        </tr>)
  }

  findDefinition(def_id){
    return this.props.agency_definitions.find( definition => definition.id === def_id)
  }

  findCategory(cat_id){
    return this.props.agency_categories.find( category => category.id === cat_id)
  }




  render() {

    return  <StyleWrapper className="p-1">
                  <Table id="agency_agents_table" className="table-responsive">
                    <thead>
                      <tr>
                        <th>Agent Label</th>
                        <th>Definition Label</th>
                        <th>Category Label</th>
                        <th>Category Behavior</th>
                      </tr>
                    </thead>
                    <tbody>{this.renderTableData()}</tbody>
                  </Table>
            </StyleWrapper>
  }
}
