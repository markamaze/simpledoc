import React from 'react'


export default class AgentRoleBuilder extends React.Component {
  constructor(props){
    super(props)
    this.state = { agentRole: this.props.agentRole ? this.props.agentRole : {} }
  }

  rightsOptions(position){
    // let value = this.state.agentRole.security ? parseInt(this.state.agentRole.security.charAt(position)) : ""

    return  <select value={this.state.agentRole.security ? parseInt(this.state.agentRole.security.charAt(position)) : 0 } className="editor-item-input" onChange={() => this.updateSecurityValue(position, event.target.value)}>
              <option value={0}>Inaccessable</option>
              <option value={1}>Read</option>
              <option value={2}>Write, Read</option>
              <option value={3}>Update, Write, Read</option>
              <option value={4}>Delete, Update, Write, Read</option>
            </select>
  }

  updateSecurityValue(position, value){
    let newValue = this.state.agentRole.security === undefined ? ['0', '0', '0', '0'] : this.state.agentRole.security.split('')

    newValue[position] = value;
    newValue = newValue.join("");

    let result = Object.assign({}, this.state.agentRole, { security: newValue })


    this.props.updateRole(this.props.propertyName, result)

    this.setState({agentRole: result})
  }

  render(){
    return  <div className="editor-container">
              <div className="editor-item">
                <div className="editor-item-label">Public:</div>
                { this.rightsOptions(1)}
              </div>

              <div className="editor-item">
                <div className="editor-item-label">Protected:</div>
                { this.rightsOptions(2)}
              </div>

              <div className="editor-item">
                <div className="editor-item-label">Private:</div>
                { this.rightsOptions(3)}
              </div>
            </div>
  }
}
