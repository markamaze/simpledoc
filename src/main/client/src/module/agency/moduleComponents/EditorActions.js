import React from 'react'



export default class EditorActions extends React.Component {

  render(){
    return  <div className="editor-actions">
              {
                this.props.object.id === "new_object" ?
                <button onClick={() => this.props.agency_actions.createAgencyObject(this.props.type, this.props.object)}>Create</button>
                : <button onClick={() => this.props.agency_actions.updateAgencyObject(this.props.type, this.props.object)}>Update</button>
              }
              <button onClick={() => this.props.workspace_actions.clearTempState(this.props.object.id)}>Revert</button>
              <button onClick={() => this.props.agency_actions.deleteAgencyObject(this.props.type, this.props.object)}>Delete</button>
              <button onClick={() => this.props.workspace_actions.updateTempState(this.props.object.id, this.state.structuralNode)}>Save</button>
              <button onClick={() => this.props.workspace_actions.addToWorkspace(this.props.object.type, this.props.object)}>Workspace</button>
            </div>
  }
}
