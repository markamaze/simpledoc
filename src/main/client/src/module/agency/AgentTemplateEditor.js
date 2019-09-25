import React from 'react'
import { Container, Form, Button, Collapse, Row } from 'react-bootstrap'
import styled from 'styled-components'



const StyledWrapper = styled(Container)`

`



export default class AgentEditor extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: {
        id: this.props.agent.id,
        type: "agentTemplate",
        label: this.props.agent.label ? this.props.agent.label : "",
        dataTags: this.props.agent.dataTags ? this.props.agent.dataTags : []
      },
      openDataTagSetting: false
    }
  }

  updateLabel(event){ this.setState({ label: event.target.value })}

  toggleDataTags(id){
    let currentTags = Object.assign([], this.state.data.dataTags)

    this.setState({ data: Object.assign({}, this.state.data, {dataTags:
      currentTags.includes(id) ?
        currentTags.filter( tagId => tagId !== id )
        : Object.assign([], currentTags.concat(id))
    })})
  }

  render() {
    return  <Form>
              <Form.Group controlId="">
                <Form.Label>Agent Id</Form.Label>
                <Form.Control type="text" disabled value={this.state.data.id} />
              </Form.Group>

              <Form.Group controlId="agent-label">
                <Form.Label>Agent Label</Form.Label>
                <Form.Control
                    type="text"
                    onChange={() => this.updateLabel(event)}
                    value={this.state.data.label} />
              </Form.Group>

              <Form.Group controlId="agent-tag-setter" className="border p-1">
                <Form.Label
                    aria-controls="setDataTags"
                    className="p-0 m-1"
                    aria-expanded={this.state.openDataTagSetting}
                    onClick={() => this.setState({openDataTagSetting: this.state.openDataTagSetting ? false : true })} >
                  Set Tags  {this.state.openDataTagSetting ? "<<" : ">>"}</Form.Label>
                <Collapse in={this.state.openDataTagSetting} >
                  <Container id="setDataTags" className="p-1 flex-wrap" >
                    {
                      this.props.dataTags.filter(dataTag => dataTag.tagFor === "agent").map( dataTag =>
                        <Row
                            style={{background: this.state.data.dataTags.includes(dataTag.id) ? "lightGray" : null}}
                            className="px-3 mx-5"
                            key={`tag_item_${dataTag.id}`}
                            onClick={() => this.toggleDataTags(dataTag.id)} >
                          {dataTag.label}
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
                        key={`agent_template_editor_button_${button.label}_${this.state.data.id}`}
                        onClick={() => button.handler(this.state.data)}>
                      {button.label}
                    </Button>
                )}
              </Form.Group>
            </Form>
  }
}
