import React from 'react'
import { connect } from 'react-redux'

// import * as workspace_actions from '../../workspace/workspace_actions'
import * as agency_actions from '../module_actions'


function BuilderActions(props){
  return  <div className="editor-actions">
            {
              props.object.id === "new_object" ?
              <button onClick={() => props.agency_actions.createAgencyObject(props.type, props.object)}>Create</button>
              : <button onClick={() => props.agency_actions.updateAgencyObject(props.type, props.object)}>Update</button>
            }
            <button onClick={() => props.agency_actions.deleteAgencyObject(props.type, props.object)}>Delete</button>
          {/*
            <button onClick={() => props.workspace_actions.clearTempState(props.object.id)}>Revert</button>
            <button onClick={() => props.workspace_actions.updateTempState(props.object.id, this.state.structuralNode)}>Save</button>
            <button onClick={() => props.workspace_actions.addToWorkspace(props.object.type, props.object)}>Workspace</button>
          */}
          </div>
}

const mapStateToProps = (state, ownProps) => ({
  // workspace_actions: workspace_actions,
  agency_actions: agency_actions,
  // temp_state: state.workspace.savedTempState //not sure this needs to be here, but don't want to forget about it
})


export default connect(mapStateToProps)(BuilderActions)
