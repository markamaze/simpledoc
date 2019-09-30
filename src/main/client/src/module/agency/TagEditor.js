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

  updateLabel(value){ this.setState({ label: value })}

  setTagForType(tagFor){
    this.setState({ tagFor: tagFor })
  }

  render() {
    return  <StyledWrapper>
              <div className="editor-item">
                <div className="editor-item-label">Id</div>
                <input type="text" value={this.state.id} disabled />
              </div>

              <div className="editor-item">
                <div className="editor-item-label">Label</div>
                <input type="text" value={this.state.label}
                    onChange={() => this.updateLabel(event.target.value)} />
              </div>

              <div className="editor-item">
                <div className="editor-item-label">Type</div>
                <select className="editor-selector" value={this.state.tagFor}
                    onChange={() => this.setTagForType(event.target.value)} >
                  <option value="">Set DataTag Type</option>
                  <option value="agent">Agent</option>
                  <option value="structural">Structural</option>
                </select>
              </div>

              {
                !this.props.buttons ? null :
                  <div className="editor-buttons">
                    { this.props.buttons.map(button =>
                        <button
                            onClick={() => button.handler(this.state)}
                            key={`dataTag_editor_button_${button.label}_${this.state.id}`} >
                        {button.label}</button>)
                    }
                  </div>
              }

            </StyledWrapper>
  }
}
