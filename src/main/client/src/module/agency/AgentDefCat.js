import React from 'react'
import styled from 'styled-components'
import { Container, Table, Tabs, Tab, Row, Col, OverlayTrigger, Popover, Button, Modal } from 'react-bootstrap'
import colors from '../../colors'

import AgentCategoryEditor from './AgentCategoryEditor'
import AgentDefinitionEditor from './AgentDefinitionEditor'



const StyleWrapper = styled(Container)`
`

const PopoverWrapper = styled(Popover)`
  background: ${colors.one};


  button {
    background: ${colors.two};
    width: 2rem;
    height: 2rem;
    overflow: hidden;
    margin: .2rem;
  }
`

export default class AgentDefCat extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showDefinitionModal: false,
      showDefinition: null,
      showCategoryModal: false,
      showCategory: null
    }
  }

  renderCategoryData() {
    return this.props.agency_categories.map( category =>
        <tr onClick={() => null }>
          <td>{category.label}</td>
          <td>{category.behavior}</td>
          <td>{this.editCategory(category)}</td>
        </tr>
    )
  }

  editCategory(category) {
    return  <Row>
              <Button onClick={() => this.showCategoryModal(category)}>edit</Button>
              <Modal show={this.state.showCategoryModal} onHide={() => this.hideCategoryModal()}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <AgentCategoryEditor category={this.state.showCategory} />
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={()=> this.hideCategoryModal()}>Close</Button>
                </Modal.Footer>
              </Modal>
            </Row>
  }

  showCategoryModal(category) {
    this.setState({showCategoryModal: true, showCategory: category})
  }

  hideCategoryModal() { this.setState({showCategoryModal: false, showCategory: null}) }



  renderDefinitionData() {
    return this.props.agency_definitions.map( definition =>
        <tr>
          <td>{definition.label}</td>
          <td>{this.findCategory(definition.category_id).label}</td>
          <td>{this.editDefinition(definition)}</td>
        </tr>
    )
  }

  editDefinition(definition) {
    return  <Row>
              <Button onClick={() => this.showDefinitionModal(definition)}>edit</Button>

              <Modal show={this.state.showDefinitionModal} onHide={() => this.hideDefinitionModal()}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Definition</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <AgentDefinitionEditor definition={this.state.showDefinition} />
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={()=> this.hideDefinitionModal()}>Close</Button>
                </Modal.Footer>
              </Modal>
            </Row>
  }

  showDefinitionModal(definition) {
    this.setState({showDefinitionModal: true, showDefinition: definition})
  }

  hideDefinitionModal() { this.setState({showDefinitionModal: false, showDefinition: null}) }

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
                      <tr >
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
