import React from 'react'
import { EditorWrapper } from '../../styles/moduleStyles'


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
    return  <EditorWrapper>
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

            </EditorWrapper>
  }
}
