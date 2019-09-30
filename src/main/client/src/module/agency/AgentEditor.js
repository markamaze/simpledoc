import React from 'react'

import { EditorWrapper } from '../../styles/moduleStyles'


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
    return  <EditorWrapper>
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
            </EditorWrapper>
  }
}
