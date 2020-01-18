import React from 'react'

import Overlay from '../../components/Overlay'
import { agencyObject } from './moduleObjects/agencyObject'
import List from './moduleComponents/List'

/*
  purpose:
      controller for module view and tools
        - loads module tools for user to perform crud ops
        -
*/


class Agency extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      activeComponent: null,
      activeView: "agency",
      renderOverlay: false
    }
  }

  newChildNode(parentNode){
    let newNode = agencyObject("structuralNode", {id: "new_object", structuralNode_parent_id: parentNode.id}, this.handleError.bind(this))

    this.setState({
      activeComponent: newNode.display({builder: true, ...this.props}, this.handleError.bind(this)),
      renderOverlay: true
    })
  }

  openInOverlay(data, displayType){
    this.setState({
      activeComponent: data.display({[`${displayType}`]: true, ...this.props}, this.handleError.bind(this)),
      renderOverlay: true
    })
  }

  createObject(type){
    let obj = agencyObject(type, {id: "new_object"}, this.handleError.bind(this))
    this.setState({
      activeComponent: obj.display({builder: true, ...this.props}, this.handleError.bind(this)),
      renderOverlay: true
    })
  }

  handleError(error){
    throw new Error(`${error}`)
  }

  render() {
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

              <div className="module-viewport">
              {
                this.state.activeView !== "agency" ? null :
                  <List
                      treeRoot={this.props.structuralNodes.find( n=>n.id===n.structuralNode_parent_id)}
                      rootIdKey="id"
                      treeNodeKey="structuralNode_parent_id"
                      dataSet={this.props.structuralNodes}
                      columns={[
                        {label: "", selector: "structuralNode_label"}
                      ]}
                      itemComponent={ item => item.display(this.props, this.handleError.bind(this))}
                      itemActions={[
                        {label: "+", action: item => this.newChildNode(item) }
                      ]}
                      headerComponent={"Agency Structure"} />
              }

              {
                this.state.activeView !== "user" ? null :
                  <List
                      dataSet={this.props.users}
                      columns={[
                        {label: "Username", selector: "username"},
                        {label: "Password", selector: "password"},
                        {label: "userId", selector: "id"}
                      ]}
                      itemComponent={ item => item.display(this.props, this.handleError.bind(this))}
                      itemActions={[]}
                      headerComponent={"Manage Agency Users"} />
              }
              </div>
              {
                !this.state.renderOverlay ? null :
                  <Overlay
                      header=""
                      content={this.state.activeComponent}
                      closeOverlay={() => this.setState({renderOverlay: false, activeComponent: null})}
                      onError={error => this.handleError(error)} />
              }

            </div>
    }
}

// Agency.defaultProps = {
//   rootNode: agencyObject("structuralNode", {
//               id: "root",
//               structuralNode_parent_id: "root",
//               structuralNode_label: "Default Loaded"},
//               error => console.log(error))
// }
// Agency.propTypes = {
//   rootNode: {}
// }

export default Agency


// {
//   this.state.activeView !== "agency"? null :
//     !this.props.rootNode ?
//         <button onClick={() => this.createObject("structuralNode")} className="empty-component">
//             Build Agency
//         </button>
//     :   <TreeDisplay
//             rootItem={this.props.rootNode}
//             getChildren={item => item.typeFunctions.getChildren.call(item, this.props) }
//             itemClickAction={item => this.openInOverlay(item, "card")}
//             itemButtons={[
//               { onClick: item => this.openInOverlay(item, "builder"), label: "build"},
//               { onClick: item => this.openInOverlay(item, "editor"), label: "edit" }]} />
// }
// {
//   this.state.activeView !== "agent" ? null :
//     <TreeDisplay
//         rootItem={this.props.rootNode.getSupervisor.call(this.props.rootNode, this.props)}
//         getChildren={agent => {/*not sure yet*/}}
//         headerClickAction={agent => this.openInOverlay(agent, "card")}
//         headerButtons={[]} />
// }
// {
//   this.state.activeView !== "agentTemplate" ? null :
//     <List
//         title={"Agent Templates"}
//         columns={[{ name: "Templates", selector: "agentTemplate_label"}]}
//         data={this.props.agentTemplates}
//         headerActionCreators={[
//           <div onClick={() => this.createObject("agentTemplate")}>+</div>
//         ]}
//         rowActionCreators={[]}
//         onError={error => this.handleError(error)} />
// }
// {
//   this.state.activeView !== "dataTag" ? null :
//     <List
//         title={"Agency Tags"}
//         columns={[{ name: "Tags", selector: "dataTag_label"}]}
//         data={this.props.dataTags}
//         headerActionCreators={[
//           <div onClick={() => this.createObject("dataTag")}>+</div>
//         ]}
//         rowActionCreators={[]}
//         onError={error => this.handleError(error)} />
// }
