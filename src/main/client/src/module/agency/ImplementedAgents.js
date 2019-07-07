import React from 'react'
import styled from 'styled-components'
import { Container, Table } from 'react-bootstrap'

import ModalTool from '../../components/ModalTool'

const StyleWrapper = styled(Container)`

`



export default class ImplementedAgents extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showModal: false,
      modalAgent: null
    }
  }

  renderTableData(type) {
    return this.props.agency_agents.map( agent =>
        <tr key={`agent_list_${agent.id}`}
            onClick={() => this.showModal(agent)}>
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

  showModal(agent) { this.setState({showModal: true, modalAgent: agent}) }

  hideModal() { this.setState({showModal: false, modalAgent: null}) }

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

  render() {

    return  <StyleWrapper className="p-1">
                  <Table id="agency_agents_table" className="table-responsive table-hover">
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

                  {
                    this.state.showModal ?
                      <ModalTool
                        showModal={this.state.showModal}
                        hideModal={this.hideModal.bind(this)}
                        title="Edit Agent"
                        body={<div>Agent Label: {this.state.modalAgent.label}</div>}
                        modalButtonHandler={this.modalButtonHandler.bind(this)}
                      />
                      : null
                  }
            </StyleWrapper>
  }
}
