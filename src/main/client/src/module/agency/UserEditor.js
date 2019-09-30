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
    return  <StyledWrapper>
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

            </StyledWrapper>
  }
}
