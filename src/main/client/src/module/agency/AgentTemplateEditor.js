import React from 'react'

import { EditorWrapper } from '../../styles/moduleStyles'
import TagWrapper from '../../components/TagWrapper'





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
    return  <EditorWrapper>
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
            </EditorWrapper>
  }
}
