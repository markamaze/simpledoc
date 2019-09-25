import React from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import styled from 'styled-components'



const StyledWrapper = styled(Container)`

`



export default class AgentEditor extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      id: this.props.agent.id,
      type: "agent",
      label: this.props.agent.label ? this.props.agent.label : "",
      agentLink: this.props.agent.agentLink ? this.props.agentLink : ""
    }
  }

  updateLabel(event){ this.setState({ label: event.target.value })}

  updateAssignment(event){ this.setState({ agentLink: event.target.value })}

  render() {
    return  <Form>
              <Form.Group controlId="">
                <Form.Label>Agent Id</Form.Label>
                <Form.Control type="text" disabled value={this.state.id} />
              </Form.Group>

              {/*may want to remove this*/}
              <Form.Group controlId="agent-label">
                <Form.Label>Agent Label</Form.Label>
                <Form.Control
                    type="text"
                    onChange={() => this.updateLabel(event)}
                    value={this.state.label} />
              </Form.Group>

              <Form.Group controlId="agent-user-assignment" >
                <Form.Label>Assign User</Form.Label>
                <Form.Control
                    as="select"
                    onChange={() => console.log(event.target.value)}
                    value={this.state.userId} >
                  <option value="" key={`set_agent_user_id`}>Set user for this agent</option>
                  {
                    this.props.users.map( user =>
                      <option value={user.id} key={`set_agent_user_id_${user.id}`}>{user.username}</option>)
                  }
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="agent-of-template" >
                <Form.Label>Set Agent Type</Form.Label>
                <Form.Control
                    as="select"
                    onChange={() => console.log(event.target.value)}
                    value={this.state.templateId} >
                  <option value="" key={`set_agent_template_id`}>Set agent type</option>
                  {
                    this.props.agentTemplates.map( template =>
                      <option value={template.id} key={`set_agent_template_id_${template.id}`}>{template.label}</option>)
                  }
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="agent-link">
                <Form.Label>Agent Assignment</Form.Label>
                <Form.Control
                    as="select"
                    onChange={() => this.updateAssignment(event)}
                    value={this.state.agentLink} >
                  <option value="" key={`select_agent_assignment_link`}>Assign Agent to Node</option>
                  {
                    this.props.agencyStructures.map( structuralNode =>
                      <option value={structuralNode.id} key={`assign_agent_to_structuralNode_${structuralNode.id}`}>{structuralNode.label}</option> )
                  }
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="buttons" className="flex-row p-3">
                {
                  !this.props.buttons ? null : this.props.buttons.map( button =>
                    <Button
                        key={`agent_editor_button_${button.label}_${this.state.id}`}
                        onClick={() => button.handler(this.state)}>
                      {button.label}
                    </Button>
                )}
              </Form.Group>
            </Form>
  }
}
