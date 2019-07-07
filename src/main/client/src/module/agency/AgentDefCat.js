import React from 'react'
import styled from 'styled-components'
import { Container, Table, Row, Col } from 'react-bootstrap'
import colors from '../../colors'

import ModalTool from '../../components/ModalTool'

import AgentCategoryEditor from './AgentCategoryEditor'
import AgentDefinitionEditor from './AgentDefinitionEditor'



const StyleWrapper = styled(Container)`
`



export default class AgentDefCat extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showModal: false,
      definitionModal: null,
      categoryModal: null
    }
  }

  renderCategoryData() {
    return this.props.agency_categories.map( category =>
        <tr key={`category_list_${category.id}`}
            onClick={() => this.showCategoryModal(category) }>
          <td>{category.label}</td>
          <td>{category.behavior}</td>
        </tr>
    )
  }

  renderDefinitionData() {
    return this.props.agency_definitions.map( definition =>
        <tr key={`definition_list_${definition.id}`}
            onClick={() => this.showDefinitionModal(definition)}>
          <td>{definition.label}</td>
          <td>{this.findCategory(definition.category_id).label}</td>
        </tr>
    )
  }

  showCategoryModal(category) { this.setState({showModal: true, definitionModal: null, categoryModal: category}) }

  showDefinitionModal(definition) { this.setState({showModal: true, definitionModal: definition, categoryModal: null}) }

  hideModal() { this.setState({showModal: false, definitionModal: null, categoryModal: null}) }

  findDefinition(def_id){ return this.props.agency_definitions.find( definition => definition.id === def_id) }

  findCategory(cat_id){ return this.props.agency_categories.find( category => category.id === cat_id) }

  modalButtonHandler(type){
    switch(type){
      case "discard":
        this.hideModal()
        break
      case "revert":
        console.log("revert changes, keep modal open")
        break
      case "save":
        console.log("save changes, keep modal open")
        break
      case "workspace":
        console.log("send to workspace, close modal")
        this.hideModal()
        break
      case "delete":
        console.log("delete item, close modal")
        this.hideModal()
        break
    }
  }

  setModalBody(){
    return  this.state.categoryModal !== null ?
              <AgentCategoryEditor
                category={this.state.categoryModal} />
              : <AgentDefinitionEditor
                  definition={this.state.definitionModal}
                  agency_categories={this.props.agency_categories} />
  }

  setModalTitle(){
    return this.state.categoryModal !== null ?
              "Modify Category Properties"
              : "Modify Definition Properties"
  }

  render() {

    return  <StyleWrapper>
              <Row>
                <Col md={6} className="px-5">
                  <Table id="agency_category_table" className="table-responsive table-hover">
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
                  <Table id="agency_definition_table" className="table-responsive table-hover">
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

              {
                this.state.showModal ?
                  <ModalTool
                    showModal={this.state.showModal}
                    hideModal={this.hideModal.bind(this)}
                    title={this.setModalTitle()}
                    body={this.setModalBody()}
                    modalButtonHandler={this.modalButtonHandler.bind(this)}
                  />
                  : null
              }

            </StyleWrapper>

  }
}
