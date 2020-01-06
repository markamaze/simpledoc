import React from 'react'

import { EditorWrapper } from '../moduleStyles'


export default class Agent extends React.Component {
  constructor(props){
    super(props)
    this.state = { agent: this.props.agent }
  }
  updateProperty(property, value){
    this.setState({ agent: this.state.agent.update({[`${property}`]: value})})
  }

  render() {
    return  <EditorWrapper>



              <div className="editor-item">
                <div className="editor-item-label">Agent Id</div>
                <input type="text" disabled value={this.state.agent.id} />
              </div>

              <div className="editor-item">
                <div className="editor-item-label">Is Agent Active</div>

              </div>

              <div className="editor-item">
                <div className="editor-item-label">Assign User</div>
                <select className="editor-selector" value={this.state.agent.assigned_user_id}
                    onChange={() => this.updateProperty("assigned_user_id", event.target.value)} >
                  <option value="" key={`set_agent_user_id`}>Set user for this agent</option>
                  {
                    this.props.users.map( user =>
                      <option value={user.id} key={`set_agent_user_id_${user.id}`}>{user.username}</option>)
                  }
                </select>
              </div>

              <div className="editor-item">
                <div className="editor-item-label">Set Agent Type</div>
                <select className="editor-selector" value={this.state.agent.agentTemplate_id}
                    onChange={() => this.updateProperty("agentTemplate_id", event.target.value)} >
                  <option value="" key={`set_agent_template_id`}>Set agent type</option>
                  {
                    this.props.agentTemplates.map( template =>
                      <option value={template.id} key={`set_agent_template_id_${template.id}`}>{template.label}</option>)
                  }
                </select>
              </div>

              <div className="editor-item">
                <div className="editor-item-label">Agent Assignment</div>
                <select className="editor-selector" value={this.state.agent.structuralNode_link_id}
                    onChange={() => this.updateProperty("structuralNode_link_id", event.target.value)} >
                  <option value="" key={`select_agent_assignment_link`}>Assign Agent to Node</option>
                  {
                    this.props.agencyStructures.map( structuralNode =>
                      <option value={structuralNode.id} key={`assign_agent_to_structuralNode_${structuralNode.id}`}>{structuralNode.label}</option> )
                  }
                </select>
              </div>

              <div className="editor-item">
                <div className="editor-item-label">Set Agent Tags</div>

              </div>

              {
                !this.props.buttons ? null :
                  <div className="editor-buttons">
                    { this.props.buttons.map(button =>
                        <button
                            onClick={() => button.handler(this.state.agent)}
                            key={`user_editor_button_${button.label}_${this.state.agent.id}`} >
                        {button.label}</button>)
                    }
                  </div>
              }
            </EditorWrapper>
  }
}
