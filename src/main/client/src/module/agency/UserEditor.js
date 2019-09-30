import React from 'react'
import { EditorWrapper } from '../moduleStyles'

import styled from 'styled-components'



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
    return  <EditorWrapper>
              <div className="editor-item">
                <div className="editor-item-label">UserId:</div>
                <input type="text" disabled value={this.state.id} />
              </div>

              <div className="editor-item">
                <div className="editor-item-label">Username:</div>
                <input type="text" value={this.state.username}
                        onChange={() => this.updateUsername(event)} />
              </div>

              <div className="editor-item">
                <div className="editor-item-label">First Name:</div>
                <input type="text" value="first name" />
                <div className="editor-item-label">Last Name:</div>
                <input type="text" value="last name" />
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
