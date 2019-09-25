import React from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import styled from 'styled-components'



const StyledWrapper = styled(Container)`

`



export default class UserEditor extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      id: this.props.user.id,
      type: "user",
      username: this.props.user.username ? this.props.user.username : "",
      label: this.props.user.label ? this.props.user.label : ""
    }
  }

  updateUsername(event){
    this.setState({
      label: event.target.value,
      username: event.target.value
    })
  }

  render() {
    return  <Form>
              <Form.Group controlId="user-id">
                <Form.Label>User Id</Form.Label>
                <Form.Control type="text" disabled value={this.state.id} />
              </Form.Group>

              <Form.Group controlId="user-username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    onChange={() => this.updateUsername(event)}
                    value={this.state.username} />
              </Form.Group>

              <Form.Group controlId="buttons" className="flex-row p-3">
                {
                  !this.props.buttons ? null : this.props.buttons.map( button =>
                    <Button
                        key={`user_editor_button_${button.label}_${this.state.id}`}
                        onClick={() => button.handler(this.state)}>
                      {button.label}
                    </Button>
                )}
              </Form.Group>
            </Form>
  }
}
