import React from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import styled from 'styled-components'



const StyledWrapper = styled(Container)`

`



export default class DataTagEditor extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      id: this.props.dataTag.id,
      type: "dataTag",
      label: this.props.dataTag.label ? this.props.dataTag.label : "",
      tagFor: this.props.dataTag.tagFor ? this.props.dataTag.tagFor : ""
    }
  }

  updateLabel(event){ this.setState({ label: event.target.value })}

  setTagForType(tagFor){
    this.setState({ tagFor: tagFor })
  }

  render() {
    return  <Form>
              <Form.Group controlId="dataTag-id">
                <Form.Label>Data Tag Id</Form.Label>
                <Form.Control type="text" disabled value={this.state.id} />
              </Form.Group>

              <Form.Group controlId="dataTag-label">
                <Form.Label>Data Tag Label</Form.Label>
                <Form.Control
                    type="text"
                    onChange={() => this.updateLabel(event)}
                    value={this.state.label} />
              </Form.Group>

              <Form.Group controlId="dataTag-tagFor">
                <Form.Label>Set if tag for Structure or Agent</Form.Label>
                <Form.Control
                    as="select"
                    onChange={() => this.setTagForType(event.target.value)}
                    value={this.state.tagFor} >
                  <option value="">Set what tag is for</option>
                  <option value="agent">Agent</option>
                  <option value="structural">Structural</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="buttons" className="flex-row p-3">
                {
                  !this.props.buttons ? null : this.props.buttons.map( button =>
                    <Button
                        key={`dataTag_editor_button_${button.label}_${this.state.id}`}
                        onClick={() => button.handler(this.state)}>
                      {button.label}
                    </Button>
                )}
              </Form.Group>
            </Form>
  }
}
