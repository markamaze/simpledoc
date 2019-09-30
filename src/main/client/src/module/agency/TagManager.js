import React from 'react'
import { connect } from 'react-redux'

import * as layout_actions from '../../layout/layout_actions'
import * as agency_actions from './module_actions'

import { ManagerWrapper } from '../moduleStyles'
import Overlay from '../../components/Overlay'
import TagEditor from './TagEditor'
import TagWrapper from '../../components/TagWrapper'



class TagManager extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      overlayData: null,
      showOverlay: false
    }
  }

  renderOverlay(){
    return  <Overlay
              closeOverlay={() => this.closeOverlay()}
              header="Data Tag Editor"
              content={
                <TagEditor {...this.props}
                                dataTag={this.state.overlayData}
                                buttons={this.overlayButtons()} /> } />
  }

  overlayButtons() {
    return [
      {label: "Submit", handler: (data)=> this.overlayButtonAction("submit", data)},
      {label: "Revert", handler: (data)=> this.overlayButtonAction("revert", data)},
      {label: "Delete", handler: (data)=> this.overlayButtonAction("delete", data)},
      {label: "Save", handler: (data)=> this.overlayButtonAction("save", data)},
      {label: "Workspace", handler: (data)=> this.overlayButtonAction("workspace", data)}
    ]
  }

  overlayButtonAction(buttonAction, data){
    switch(buttonAction){
      case "submit":
        if(!data.id || data.id === null) this.props.agency_actions.createDataTag(data)
        else this.props.agency_actions.updateDataTag(data)
        this.closeOverlay()
        break
      case "revert":
        this.props.layout_actions.clearTempState(data.id)
        break
      case "delete":
        this.props.agency_actions.deleteDataTag(data)
        this.closeOverlay()
        break
      case "save":
        this.props.layout_actions.updateTempState(data.id, data)
        this.closeOverlay()
        break
      case "workspace":
        this.props.layout_actions.addToWorkspace(data.type, data)
        this.closeOverlay()
        break
    }
  }

  closeOverlay(){ this.setState({showOverlay: false, overlayType: null}) }

  render() {
    return  <ManagerWrapper>
              <header>Manage Data Tags</header>
              <div
                  className="px-2 mr-0 ml-auto"
                  style={{background: "lightGray"}}
                  onClick={() => this.setState({showOverlay: true, overlayData: {type: "dataTag"}})} >+</div>
              <div className="">
                <div className="p-3 mx-3 border">
                  <header className="p-1">Structural Tags</header>
                  {
                    this.props.dataTags.filter(dataTag => dataTag.tagFor === 'structural').map( dataTag =>
                      <div
                          onClick={() => this.setState({showOverlay: true, overlayData: dataTag })}
                          key={`structural-tagmanager-${dataTag.id}`}>
                          <TagWrapper>{dataTag.label}</TagWrapper>
                      </div> )
                  }
                </div>
                <div className="p-3 mx-3 border">
                  <header className="p-1">Agent Tags</header>
                  {
                    this.props.dataTags.filter(dataTag => dataTag.tagFor === 'agent').map( dataTag =>
                      <div
                          onClick={() => this.setState({showOverlay: true, overlayData: dataTag })}
                          key={`agent-tagmanager-${dataTag.id}`}>
                        <TagWrapper>{dataTag.label}</TagWrapper>
                      </div> )
                  }
                </div>
              </div>

              { !this.state.showOverlay ? null : this.renderOverlay() }

            </ManagerWrapper>

  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    agents: state.agency.agents,
    agencyStructures: state.agency.structuralNodes,
    agentTemplates: state.agency.agentTemplates,
    dataTags: state.agency.dataTags,
    users: state.agency.users,
    temp_state: state.layout.savedTempState,
    layout_actions: layout_actions,
    agency_actions: agency_actions
  }
}

export default connect(mapStateToProps)(TagManager)
