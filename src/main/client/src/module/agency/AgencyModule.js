import React from 'react'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'


import Agency from './Agency'
import Overlay from '../../components/Overlay'
import DataTableWrapper from '../../components/DataTableWrapper'
import AgentEditor from './AgentEditor'
import AgentTemplateEditor from './AgentTemplateEditor'
import StructuralNodeEditor from './StructuralNodeEditor'
import DataTagEditor from './TagEditor'
import UserEditor from './UserEditor'
import * as workspace_actions from '../workspace/workspace_actions'
import * as agency_actions from './module_actions'
import * as agencyObjects from './data/agencyObjects'

import colors from '../../colors'



const StyleWrapper = styled.div`
  display: flex;
  height: 100%;
  max-height: 100%;
  width: 100%;
  max-width: 100%;
  padding: 0;
  margin: 0;
  flex-direction: row;

  .viewport {
    background: ${colors.four};
    height: 100%;
    max-height: 100%;
    overflow-y: auto;
    flex-grow: 2;
  }
  .agency-viewport {
    display: flex;
    flex-grow: 3;
    width: auto;
    overflow: auto;
  }
  .object-viewport {
    background: ${colors.two};
    color: ${colors.four};
    display: flex;
    flex-direction: column;
    min-height: 100%;
    width: auto;
    min-width: 100%;
    @media(min-width: 500px){min-width: 50%;}
    @media(min-width: 700px){min-width: 30%;}
    border-left: solid ${colors.two} thin;
  }
  .object-list {
    background: ${colors.one};
    color: ${colors.two};
  }
  .object-list-container{
    header {
      display: flex;
      /* padding: 0 .5rem; */
      .header-title {
        font-size: .9rem;
        font-style: italic;
        display: block;
        padding: .5rem;
      }
      .header-btn {
        display: none;
      }
    }
  }
  .object-list-container-active{
    flex: 2;
    overflow: auto;
    header {
      display: flex;
      /* padding: 0 .5rem; */

      .header-title {
        font-size: 1.2rem;
        font-style: italic;
        font-weight: heavy;
        background: ${colors.one};
        color: ${colors.two};
        display: inline-flex;
        flex-grow: 2;
        padding-left: .5rem;
      }
      .header-btn {
        background: ${colors.one};
        color: ${colors.two};
        display: inline-flex;
        justify-content: center;
        font-size: 1.1rem;
        width: 2rem;
        border-left: solid ${colors.two} thin;
        padding: 0 .3rem
      }
    }
  }
  .viewport-toggle{
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: block;
    background: ${colors.two};
    color: ${colors.one};
    width: 1.5rem;
    height: 1.5rem;
    padding: auto 0;
    margin: 0 auto;
    border-left: solid ${colors.one} thin
  }
  .dataTag-selected{
    background: ${colors.two};
    color: ${colors.one};
  }
  .dataTag{
    background: ${colors.one};
    color: ${colors.two};
  }
`


class AgencyModule extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showOverlay: false,
      overlayData: null,
      sidebarDisplayState: "none",
      sidebarToolOpenIndex: 0
    }
  }

  renderOverlay(){
    let component, header

    switch(this.state.overlayData.type){
      case "AGENCY.AGENT":
        header = "Modify Agent"
        component = <AgentEditor {...this.props} agent={this.state.overlayData} />
        break
      case "AGENCY.AGENTTEMPLATE":
        header = "Modify Agent Template"
        component = <AgentTemplateEditor {...this.props} agentTemplate={this.state.overlayData} />
        break
      case "AGENCY.STRUCTURALNODE":
        header = "Modify StructuralNode"
        component = <StructuralNodeEditor {...this.props} structuralNode={this.state.overlayData} />
        break
      case "AGENCY.DATATAG":
        header = "Modify DataTag"
        component = <DataTagEditor {...this.props} dataTag={this.state.overlayData} />
        break
      case "AGENCY.USER":
        header = "Modify User"
        component = <UserEditor {...this.props} user={this.state.overlayData} />
        break
    }
    return  <Overlay
              closeOverlay={() => this.closeOverlay()}
              header={header}
              content={component} />
  }

  closeOverlay(){
    this.setState({
      showOverlay: false,
      overlayData: null
    })
  }
  createAgencyObject(type){
    let data

    switch(type){
      case "structuralNode":
        data = Object.create(agencyObjects.structuralNode())
        data.init({ id: "new_object", type: "AGENCY.STRUCTURALNODE" })
        break
      case "agentTemplate":
        data = Object.create(agencyObjects.agentTemplate())
        data.init({ id: "new_object", type: "AGENCY.AGENTTEMPLATE" })
        break
      case "dataTag":
        data = Object.create(agencyObjects.dataTag())
        data.init({ id: "new_object", type: "AGENCY.DATATAG" })
        break
      case "user":
        data = Object.create(agencyObjects.user())
        data.init({ id: "new_object", type: "AGENCY.USER" })
        break
      case "agent":
        data = Object.create(agencyObjects.agent())
        data.init({ id: "new_object", type: "AGENCY.AGENT" })
        break
    }
    this.setState({
      showOverlay: true,
      overlayData: data
    })
  }
  handleRowClick(row){
    this.setState({
      showOverlay: true,
      overlayData: row
    })
  }
  columns(type){
    switch(type){
      case "structuralNode":
        return [{ name: "Nodes", selector: "structuralNode_label"}]
      case "agentTemplate":
        return [{ name: "Templates", selector: "agentTemplate_label"}]
      case "dataTag":
        return [{ name: "Tags", selector: "dataTag_label"}]
      case "user":
        return [{ name: "Users", selector: "username"}]
    }
  }

  openSidebarTool(index){
    let newIndex
    if(index == this.state.sidebarToolOpenIndex) newIndex = 0
    else newIndex = index

    this.setState({ sidebarToolOpenIndex: newIndex })
  }

  isToolActive(index){
    if(index == this.state.sidebarToolOpenIndex)
      return "-active"
    else return ""
  }

  toggleSidebar(){
    this.setState({ sidebarDisplayState: this.state.sidebarDisplayState === "flex" ? "none" : "flex" })
  }


  render(){
    return  <StyleWrapper>


              <div className="object-viewport" style={{display: `${this.state.sidebarDisplayState}`}}>

                <div className={`object-list-container${this.isToolActive(1)}`}>
                  <header onClick={()=> this.openSidebarTool(1)}>
                    <span className="header-title">Structural Nodes</span>
                    <span className="header-btn" onClick={() => this.createAgencyObject("structuralNode")}>+</span>
                    <span className="header-btn" onClick={() => console.log("send this to Workspace")}>^^</span>
                  </header>
                  {
                    this.state.sidebarToolOpenIndex === 1 ?
                      <DataTableWrapper
                          className="object-list"
                          noHeader={true}
                          onRowClicked={row => this.handleRowClick(row)}
                          columns={this.columns("structuralNode")}
                          data={this.props.structuralNodes} />
                      : null
                    }
                </div>


                <div className={`object-list-container${this.isToolActive(2)}`}>
                  <header onClick={()=> this.openSidebarTool(2)}>
                    <span className="header-title">Agent Templates</span>
                    <span className="header-btn" onClick={() => this.createAgencyObject("agentTemplate")}>+</span>
                    <span className="header-btn" onClick={() => console.log("send this to Workspace")}>^^</span>
                  </header>
                  {
                    this.state.sidebarToolOpenIndex === 2 ?
                      <DataTableWrapper
                          className="object-list"
                          noHeader={true}
                          onRowClicked={row => this.handleRowClick(row)}
                          columns={this.columns("agentTemplate")}
                          data={this.props.agentTemplates} />
                      : null
                  }
                </div>


                <div className={`object-list-container${this.isToolActive(3)}`}>
                  <header onClick={()=> this.openSidebarTool(3)}>
                    <span className="header-title">Users</span>
                    <span className="header-btn" onClick={() => this.createAgencyObject("user")}>+</span>
                    <span className="header-btn" onClick={() => console.log("send this to Workspace")}>^^</span>
                  </header>
                  {
                    this.state.sidebarToolOpenIndex === 3 ?
                      <DataTableWrapper
                          className="object-list"
                          noHeader={true}
                          onRowClicked={row => this.handleRowClick(row)}
                          columns={this.columns("user")}
                          data={this.props.users} />
                      : null
                  }
                </div>


                <div className={`object-list-container${this.isToolActive(4)}`}>
                  <header onClick={()=> this.openSidebarTool(4)}>
                    <span className="header-title" >Data Tags</span>
                    <span className="header-btn" onClick={() => this.createAgencyObject("dataTag")}>+</span>
                    <span className="header-btn" onClick={() => console.log("send this to Workspace")}>^^</span>
                  </header>
                  {
                    this.state.sidebarToolOpenIndex === 4 ?
                      <DataTableWrapper
                          className="object-list"
                          noHeader={true}
                          onRowClicked={row => this.handleRowClick(row)}
                          columns={this.columns("dataTag")}
                          data={this.props.dataTags} />
                      : null
                  }
                </div>


              </div>

              <div onClick={() => this.toggleSidebar()}
              className="viewport-toggle">{this.state.sidebarDisplayState === "none" ? "#" : "X"}</div>

              <div className="agency-viewport">
                <Agency {...this.props} rootNode={this.props.structuralNodes.find(node => node.id === node.structuralNode_parent_id)} />
              </div>


              <div className="editor-overlay">
                { !this.state.showOverlay ? null : this.renderOverlay() }
              </div>


            </StyleWrapper>
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    agents: state.agency.agents,
    structuralNodes: state.agency.structuralNodes,
    agentTemplates: state.agency.agentTemplates,
    dataTags: state.agency.dataTags,
    users: state.agency.users,
    temp_state: state.workspace.savedTempState,
    workspace_actions: workspace_actions,
    agency_actions: agency_actions
  }
}

export default connect(mapStateToProps)(AgencyModule)
