import React from 'react'
import styled from 'styled-components'

import TagWrapper from '../../components/TagWrapper'
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
  .editor-selector {
    height: 1.5rem;
    width: 65%;
    background: white;
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

  .tag-included {
    background: pink;
  }

  .tag-excluded {
    background: yellow;
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
      data: {
        id: this.props.agent.id,
        type: "agentTemplate",
        label: this.props.agent.label ? this.props.agent.label : "",
        dataTags: this.props.agent.dataTags ? this.props.agent.dataTags : []
      },
      openDataTagSetting: false
    }
  }

  updateLabel(value){ this.setState({ data: Object.assign({}, this.state.data, {label: value}) }) }

  toggleDataTags(id){
    let currentTags = Object.assign([], this.state.data.dataTags)

    this.setState({ data: Object.assign({}, this.state.data, {dataTags:
      currentTags.includes(id) ?
        currentTags.filter( tagId => tagId !== id )
        : Object.assign([], currentTags.concat(id))
    })})
  }

  render() {
    return  <StyledWrapper>
              <div className="editor-item">
                <div className="editor-item-label">Agent Id</div>
                <input type="text" value={this.state.data.id} disabled />
              </div>

              <div className="editor-item">
                <div className="editor-item-label">Agent Label</div>
                <input type="text" value={this.state.data.label}
                    onChange={() => this.updateLabel(event.target.value)} />
              </div>

              <div className="editor-item">
                <div className="editor-item-label">Set Tags</div>
                <div className="editor-item-tags">
                  {
                    this.props.dataTags.filter(dataTag => dataTag.tagFor === "agent")
                                       .map( agentTag =>  <TagWrapper className={`tag${this.state.data.dataTags.includes(agentTag.id) ? "-included" : ""}`}
                                                              onClick={() => this.toggleDataTags(agentTag.id)}>
                                                            {agentTag.label}
                                                          </TagWrapper>)
                  }
                </div>
              </div>

              {
                !this.props.buttons ? null :
                  <div className="editor-buttons">
                    { this.props.buttons.map(button =>
                        <button
                            onClick={() => button.handler(this.state.data)}
                            key={`user_editor_button_${button.label}_${this.state.data.id}`} >
                        {button.label}</button>)
                    }
                  </div>
              }
            </StyledWrapper>
  }
}
