import React from 'react'
import styled from 'styled-components'

import colors from '../../colors'

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* padding: 1rem 0; */

  .editor-item {
    display: flex;
    flex-direction: row;
    border: none;
    /* margin: .5rem; */
    height: 1.5rem;
    padding: 1rem;
    flex-wrap: wrap;
    height: auto;
  }

  .editor-selector {
    height: 1.5rem;
    width: 65%;
    background: white;
  }

  input {
    display: flex;
    width: 65%;
    height: 100%;
  }

  .editor-item-label {
    display: flex;
    width: 30%;
    height: 100%;
    padding: auto 0;
    margin: 0 .5rem 0 auto;
    /* border: 1px solid black; */
    justify-content: flex-end;
  }

  .editor-buttons {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    border-top: 1px solid ${colors.two};
    padding: .5rem 0;
    margin: 1rem auto 0;
  }
  button {
    background: ${colors.two};
    color: ${colors.one};
    margin: .3rem;
    padding: .2rem .8rem;
    border: none;
  }
`



export default class AgentEditor extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      id: this.props.agent.id,
      type: "agent",
      label: this.props.agent.label ? this.props.agent.label : "",
      agentLink: this.props.agent.agentLink ? this.props.agentLink : null,
      assignedUserId: this.props.agent.assignedUserId ? this.props.agent.assignedUserId : null,
      templateId: this.props.agent.templateId ? this.props.agent.templateId : null
    }
  }

  updateLabel(value) { this.setState({ label: value })}

  updateAssignment(value) { this.setState({ agentLink: value })}

  updateAssignedUser(value) { this.setState({ assignedUserId: value }) }

  updateAgentType(value) { this.setState({ templateId: value })}

  render() {
    return  <StyledWrapper>
              <div className="editor-item">
                <div className="editor-item-label">Agent Id</div>
                <input type="text" disabled value={this.state.id} />
              </div>

              {/*may want to remove this*/}
              <div className="editor-item">
                <div className="editor-item-label">Agent Label</div>
                <input type="text" value={this.state.label}
                    onChange={() => this.updateLabel(event.target.value)} />
              </div>

              <div className="editor-item">
                <div className="editor-item-label">Assign User</div>
                <select className="editor-selector" value={this.state.userId}
                    onChange={() => this.updateAssignedUser(event.target.value)} >
                  <option value="" key={`set_agent_user_id`}>Set user for this agent</option>
                  {
                    this.props.users.map( user =>
                      <option value={user.id} key={`set_agent_user_id_${user.id}`}>{user.username}</option>)
                  }
                </select>
              </div>

              <div className="editor-item">
                <div className="editor-item-label">Set Agent Type</div>
                <select className="editor-selector" value={this.state.templateId}
                    onChange={() => this.updateAgentType(event.target.value)} >
                  <option value="" key={`set_agent_template_id`}>Set agent type</option>
                  {
                    this.props.agentTemplates.map( template =>
                      <option value={template.id} key={`set_agent_template_id_${template.id}`}>{template.label}</option>)
                  }
                </select>
              </div>

              <div className="editor-item">
                <div className="editor-item-label">Agent Assignment</div>
                <select className="editor-selector" value={this.state.agentLink}
                    onChange={() => this.updateAssignment(event.target.value)} >
                  <option value="" key={`select_agent_assignment_link`}>Assign Agent to Node</option>
                  {
                    this.props.agencyStructures.map( structuralNode =>
                      <option value={structuralNode.id} key={`assign_agent_to_structuralNode_${structuralNode.id}`}>{structuralNode.label}</option> )
                  }
                </select>
              </div>


              {
                !this.props.buttons ? null :
                  <div className="editor-buttons">
                    { this.props.buttons.map(button =>
                        <button
                            onClick={() => button.handler(this.state)}
                            key={`user_editor_button_${button.label}_${this.state.id}`} >
                        {button.label}</button>)
                    }
                  </div>
              }
            </StyledWrapper>
  }
}
