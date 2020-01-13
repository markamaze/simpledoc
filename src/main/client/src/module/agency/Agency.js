import React from 'react'

import Overlay from '../../components/Overlay'
import DataTableWrapper from '../../components/DataTableWrapper'
import { user } from './moduleObjects/user'
import { dataTag } from './moduleObjects/dataTag'
import { structuralNode } from './moduleObjects/structuralNode'
import { agentTemplate } from './moduleObjects/agentTemplate'
import { agent } from './moduleObjects/agent'

/*
  purpose:
      controller for module view and tools
        - loads module tools for user to perform crud ops
        -
*/

export default class Agency extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      activeComponent: null,
      activeView: "agency",
      renderOverlay: false
    }
  }

  agencyTree(id, depth){
    if(!id) return <div className="empty-component">no node id identified</div>

    let _depth = ++depth
    let node = this.props.structuralNodes.find( node => node.id === id)

    let children = node.getChildren(node.id, this.props.structuralNodes)

    return  <div className="tree-node" style={{paddingLeft: `${depth/2}rem`}} key={`tree-node-${node.id}`}>
              <div className={`tree-node-header${this.state.activeComponent && this.state.activeComponent.id === node.id ? "-active" : ""}`} >

                <span className="tree-node-header-title" onClick={()=> this.openInOverlay(node, "card")} >
                  { node.structuralNode_label }
                </span>
                <span className="tree-node-header-action" onClick={() => this.openInOverlay(node, "builder")} >
                  build
                </span>
                <span className="tree-node-header-action" onClick={() => this.openInOverlay(node, "editor")}>
                  edit
                </span>

              </div>

              <div className="tree-node-children" style={{paddingLeft: `${depth/2 + 0.25}rem`}}>
                { children.map( child => this.agencyTree(child.id, _depth) )}
              </div>

            </div>
  }
  objectList(type){
    let columns, data, title

    switch(type){
      case "agentTemplate":
        title = "Agent Templates"
        data = this.props.agentTemplates
        columns = [{ name: "Templates", selector: "agentTemplate_label"}]
        break
      case "dataTag":
        title = "Agency Tags"
        data = this.props.dataTags
        columns = [{ name: "Tags", selector: "dataTag_label"}]
        break
      case "user":
        title = "Users"
        data = this.props.users
        columns = [{ name: "Users", selector: "username"}]
        break
    }


    const RowComponent = ({data}) =>{
      let displayComponent = data.display({card: true, ...this.props})
      return  <div>
                <div onClick={() => this.openInOverlay(data, "builder")}>open builder</div>
                { displayComponent }
              </div>}

    return  <DataTableWrapper
                className="object-list"
                title={title}
                actions={[<div onClick={() => this.newObject(type)}>+</div>]}
                fixedHeader noTableHead overflowY expandableRows
                expandableRowsComponent={<RowComponent />}
                columns={columns}
                data={data} />
  }


  newObject(type){

    let newObject

    if(type === "user") newObject = user({id: "new_object"})
    else if(type === "dataTag") newObject = dataTag({id: "new_object"})
    else if(type === "agentTemplate") newObject = agentTemplate({id: "new_object"})
    else if(type === "structuralNode") newObject = structuralNode({id: "new_object"})
    else if(type === "agent") newObject = agent({id: "new_object"})
    else throw "invalid object type"

    this.setState({
      activeComponent: newObject.display({builder: true, ...this.props}),
      renderOverlay: true
    })
  }
  openInOverlay(data, displayType){
    this.setState({
      activeComponent: data.display({[`${displayType}`]: true, ...this.props}),
      renderOverlay: true
    })
  }


  render() {
    const activeView = (type, rootId) => {
      switch(type){
        case "agency": return this.agencyTree(rootId, 0)
        case "agent": return this.chainOfCommand(rootId)
        case "agentTemplate":
        case "dataTag":
        case "user": return this.objectList(type)
      }
    }

    return  <div className="module">

              <div className="module-toolbar">
                <div className={`module-toolbar-item${this.state.activeView === "agency" ? "-active": ""}`}
                      onClick={() => this.setState({activeView: "agency"})}>Agency</div>
                <div className={`module-toolbar-item${this.state.activeView === "agentTemplate" ? "-active": ""}`}
                      onClick={() => this.setState({activeView: "agentTemplate"})}>Templates</div>
                <div className={`module-toolbar-item${this.state.activeView === "user" ? "-active": ""}`}
                      onClick={() => this.setState({activeView: "user"})}>Users</div>
                <div className={`module-toolbar-item${this.state.activeView === "dataTag" ? "-active": ""}`}
                      onClick={() => this.setState({activeView: "dataTag"})}>Tags</div>
              </div>

              <div className="module-viewport">{ activeView(this.state.activeView, this.props.rootNodeId) }</div>

              {
                !this.state.renderOverlay ? null :
                  <Overlay
                      header=""
                      content={this.state.activeComponent}
                      closeOverlay={() => this.setState({renderOverlay: false, activeComponent: null})}/>
              }

            </div>
  }
}
