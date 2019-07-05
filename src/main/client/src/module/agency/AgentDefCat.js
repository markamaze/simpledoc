import React from 'react'
import styled from 'styled-components'
import { Container, Table, Tabs, Tab, Row, Col } from 'react-bootstrap'



const StyleWrapper = styled(Container)`

`

export default class AgentDefCat extends React.Component {

  renderCategoryData() {
    return this.props.agency_categories.map( category =>
      <tr>
        <td>{category.label}</td>
        <td>{category.behavior}</td>
      </tr>)
  }

  renderDefinitionData() {
    return this.props.agency_definitions.map( definition =>
      <tr>
        <td>{definition.label}</td>
        <td>{this.findCategory(definition.category_id).label}</td>
      </tr>)

  }

  findDefinition(def_id){
    return this.props.agency_definitions.find( definition => definition.id === def_id)
  }

  findCategory(cat_id){
    return this.props.agency_categories.find( category => category.id === cat_id)
  }

  render() {

    return  <StyleWrapper>
              <Row>
                <Col md={6} className="px-5">
                  <Table id="agency_category_table" className="table-responsive">
                    <thead>
                      <tr>
                        <th>Category Label</th>
                        <th>Behavior</th>
                      </tr>
                    </thead>
                    <tbody>{this.renderCategoryData()}</tbody>
                  </Table>
                </Col>
                <Col md={6} className="px-5">
                  <Table id="agency_definition_table" className="table-responsive">
                    <thead>
                      <tr>
                        <th>Definition Label</th>
                        <th>Extends Category</th>
                      </tr>
                    </thead>
                    <tbody>{this.renderDefinitionData()}</tbody>
                  </Table>
                </Col>
              </Row>
            </StyleWrapper>

  }
}
