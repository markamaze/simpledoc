import React from 'react'
import { Container, Form, Button, Collapse, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

import DataTableWrapper from '../../components/DataTableWrapper'
import List from '../../components/List'
import TagWrapper from '../../components/TagWrapper'


const StyledWrapper = styled(Container)`

`



export default class StructuralNodeEditor extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: {
        id: this.props.structuralNode.id,
        type: "structuralNode",
        label: this.props.structuralNode.label ? this.props.structuralNode.label : "",
        parentId: this.props.structuralNode.parentId ? this.props.structuralNode.parentId : "",
        agentAssignments: this.props.structuralNode.agentAssignments ? this.props.structuralNode.agentAssignments : [],
        dataTags: this.props.structuralNode.dataTags ? this.props.structuralNode.dataTags : []
      },
      openAgentTemplateSetting: false,
      openDataTagSetting: false
    }
  }

  updateLabel(event){
    this.setState({
      data: Object.assign({}, this.state.data, {label: event.target.value })
    })
  }

  updateParent(event){
    this.setState({
      data: Object.assign({}, this.state.data, {parentId: event.target.value })
    })
  }

  updateTemplateCount(id, flag){
    let template = this.state.data.agentAssignments.find(template => template.id === id)
    let set = Object.assign([], this.state.data.agentAssignments.filter(template => template.id !== id))


    switch(flag){
      case "increment":
        if(template.limit < 1) template = Object.assign({}, template, {limit: 1})
        else template = Object.assign({}, template, {limit: template.limit + 1})
        break

      case "decrement":
        if(template.limit < 1) template = Object.assign({}, template, {limit: -1})
        else template = Object.assign({}, template, {limit: template.limit -1})


    }

    this.setState({ data: Object.assign({}, this.state.data, {agentAssignments: set.concat(template)} )})
  }

  addTemplate(templateId) {
    let alreadyIncluded = this.state.data.agentAssignments.find(template => template.id === templateId)

    if(!alreadyIncluded) {
      let newSet = Object.assign([], this.state.data.agentAssignments.concat({id: templateId, limit: 1}))
      this.setState({ data: Object.assign({}, this.state.data, {agentAssignments: newSet})})
    }
  }

  removeTemplate(templateId) {
    let newSet = Object.assign([], this.state.data.agentAssignments.filter(template => template.id !== templateId))

    this.setState({ data: Object.assign({}, this.state.data, {agentAssignments: newSet })})


  }

  getAgentTemplateListData() {
    let results = []

    this.state.data.agentAssignments.forEach( assignment => {
        let agentTemplate = this.props.agentTemplates.find( template => template.id === assignment.id)

        results = Object.assign([], results.concat({
                    agent: agentTemplate.label,
                    limit: assignment.limit,
                    id: assignment.id
                  }))
      })

    return results
  }

  toggleDataTags(id){
    let currentTags = Object.assign([], this.state.data.dataTags)

    this.setState({ data: Object.assign({}, this.state.data, {dataTags:
      currentTags.includes(id) ?
        currentTags.filter( tagId => tagId !== id )
        : Object.assign([], currentTags.concat(id))
    })})
  }

  render() {
    return  <Form className="p-3 ">
              <Form.Group controlId="structuralNode-id">
                <Form.Label className="font-weight-bold">Id</Form.Label>
                <Form.Control type="text" disabled value={this.state.data.id} />
              </Form.Group>

              <Form.Group controlId="structuralNode-label">
                <Form.Label className="font-weight-bold">Label</Form.Label>
                <Form.Control
                    type="text"
                    onChange={() => this.updateLabel(event)}
                    value={this.state.data.label} />
              </Form.Group>

              <Form.Group controlId="structuralNode-parentid">
                <Form.Label className="font-weight-bold">Parent Structure</Form.Label>
                <Form.Control
                    as="select"
                    onChange={(event) => this.updateParent(event) }
                    value={this.state.data.parentId} >
                  <option value="" key={`select_parent_structuralNode`}>Select Parent</option>
                  <option value="root" key={`select_parent_structuralNode_root`}>Root Structure</option>
                  {
                    this.props.agencyStructures.map( structuralNode =>
                      <option value={structuralNode.id} key={`structuralNode_${structuralNode.id}`}>{structuralNode.label}</option> )
                  }
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="structuralNode-agent-assgnments" className="p-1">
                <Row
                    className="p-1 m-1"
                    style={{background: this.state.openAgentTemplateSetting ? "gray" : "lightgray"}}
                    onClick={() => this.setState({openAgentTemplateSetting: this.state.openAgentTemplateSetting ? false : true })} >
                  <Form.Label
                      aria-controls="setAgentTemplates"
                      className="p-0 m-1 font-weight-bold"
                      aria-expanded={this.state.openAgentTemplateSetting} >
                    Agent Templates
                  </Form.Label>
                </Row>

                <Collapse in={this.state.openAgentTemplateSetting}>

                  <DataTableWrapper
                    noHeader={true}
                    subHeader={true}
                    subHeaderComponent={
                      <Form.Control
                          as="select"
                          onChange={(event)=> this.addTemplate(event.target.value)}
                          className="mt-3 mb-0 mx-0 p-0 " >
                        <option value="">select new template to add</option>
                        {
                          this.props.agentTemplates.map( template =>
                            <option value={template.id}>{template.label}</option>)
                        }
                      </Form.Control>
                    }
                    columns={[
                      {name: "Agent", selector: "agent", sortable: true, compact: true},
                      {name: "Max Active", selector: "limit", ignoreRowClick: true, maxWidth: "2rem",
                          cell: row =>  <div>
                                          <span className="px-3" onClick={()=> this.updateTemplateCount(row.id, "decrement")}>-</span>
                                          {row.limit < 1 ? "any" : row.limit}
                                          <span className="px-3" onClick={() => this.updateTemplateCount(row.id, "increment")}>+</span>
                                        </div> },
                      {name: "Remove", selector: "remove", compact: true, maxWidth: "1rem",
                          cell: row => <div onClick={() => this.removeTemplate(row.id)}>X</div>,
                          ignoreRowClick: true}
                    ]}
                    data={this.getAgentTemplateListData()}
                  />



                </Collapse>
              </Form.Group>

              {/*add group for defining heirarchy of included agents on the structure*/}

              <Form.Group controlId="structuralNode-tag-setter" className="p-1">
                <Row
                    style={{background: this.state.openDataTagSetting ? "gray" : "lightgray"}}
                    className="p-1 m-1"
                    onClick={() => this.setState({openDataTagSetting: this.state.openDataTagSetting ? false : true })} >
                  <Form.Label
                      aria-controls="setDataTags"
                      className="p-0 m-1 font-weight-bold"
                      aria-expanded={this.state.openDataTagSetting}
                       >
                    Set Tags
                  </Form.Label>
                </Row>

                <Collapse in={this.state.openDataTagSetting} >
                  <Container id="setDataTags" className="p-1 flex-wrap" >
                    {
                      this.props.dataTags.filter(dataTag => dataTag.tagFor === "structural").map( dataTag =>
                        <Row
                            style={{background: this.state.data.dataTags.includes(dataTag.id) ? "lightGray" : null}}
                            className="px-3 mx-5"
                            key={`tag_item_${dataTag.id}`}
                            onClick={() => this.toggleDataTags(dataTag.id)} >
                          <TagWrapper>{dataTag.label}</TagWrapper>
                        </Row>
                      )
                    }
                  </Container>
                </Collapse>

              </Form.Group>

              <Form.Group controlId="buttons" className="flex-row p-3">
                {
                  !this.props.buttons ? null : this.props.buttons.map( button =>
                    <Button
                        key={`structuralNode_editor_button_${button.label}_${this.state.data.id}`}
                        onClick={() => button.handler(this.state.data)}>
                      {button.label}
                    </Button>
                )}
              </Form.Group>
            </Form>
  }
}
