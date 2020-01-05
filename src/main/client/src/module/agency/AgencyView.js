import React from 'react'
import styled from 'styled-components'

import TagWrapper from './moduleComponents/TagWrapper'
import StructuralNodeEditor from './StructuralNodeEditor'
import Overlay from '../../components/Overlay'


const StyleWrapper = styled.div`
  display: flex;
  width: 80%;
  background: white;
  margin: .5rem;
  padding: auto 0;

  .node-section {

    margin: .5rem;
    border: thin solid black;
    header {
      display: inline-flex;

      font-style: italic;
      font-size: .8rem;
    }
  }
`

//Agency View should load the page which will display the entire agency in the chosen form
//  this means: I should load each item to be displayed (StructuralNode, Agent) into a component
//   then AgencyView will set the props of the component to show what it needs
export default class AgencyView extends React.Component {
  constructor(props){
    super(props)
    this.state = { activeNode: props.rootNode, showOverlay: false }
  }

  getDisplay(){
    switch(this.props.displayType){
      case "cards": return this.loadCardsDisplay()
      case "list": return this.loadListDisplay(this.props.rootNode, 0)
      case "chart": return this.loadChartDisplay()
    }
  }

  loadListDisplay(node, depth){
    let childrenNodes = this.getNodeChildren(node.id)
    let depthIndex = ++depth
    return  <div className="node" style={{paddingLeft: `${depth}rem`}}>
              <div className="node-header" onClick={() => this.setState({ showOverlay: true })} style={{padding: ".5rem", margin: "0", zIndex: depth}}>{node.structuralNode_label}</div>
              { !this.state.showOverlay ? null :
                  <Overlay
                            closeOverlay={() => this.setState({ showOverlay: false })}
                            header="StructuralNode"
                            content={<StructuralNodeEditor {...this.props} structuralNode={node} disableEditing={true} />} />
              }
              {
                childrenNodes.length > 0 ? childrenNodes.map( child => this.loadListDisplay(child, depthIndex)) : null
              }
            </div>
  }

  getNodeChildren(id){
    return this.props.structuralNodes.filter(node => node.structuralNode_parent_id === id && node.id !== id)
  }

  loadChartDisplay(){}

  loadCardsDisplay(){
      return  <div className="node">
                <div >
                  <div onClick={() => this.upDateActiveNode(this.state.activeNode.structuralNode_parent_id)}>Parent</div>
                </div>
                {
                  this.state.activeNode ? <StructuralNodeEditor {...this.props} structuralNode={this.state.activeNode} disableEditing={true} /> : null
                }
                <div>
                  <div>Children:</div>
                  { this.getNodeChildren(this.state.activeNode.id).map( child => <div onClick={() => this.upDateActiveNode(child.id)}>{child.structuralNode_label}</div>)}
                </div>
              </div>
  }

  upDateActiveNode(id){
    let newActiveNode = this.props.structuralNodes.find(node => node.id === id)
    this.setState({ activeNode: newActiveNode})
  }

  getProperties(){
    let properties = []


    return properties
  }

  getAssignments(){
    return [{label: "assignment"}]
  }

  render() {
    return  <StyleWrapper>
              {
                this.state.activeNode === undefined ?
                  "build agency with tools in toolbar"
                  : this.getDisplay()
              }
            </StyleWrapper>
  }
}




// export default class AgencyView extends React.Component{
//   constructor(props){
//     super(props)
//     this.state = { showAgents: false }
//   }
//
//   buildAgency(rootNode){
//     let children = this.props.structuralNodes.filter( node => node.structuralNode_parent_id == rootNode.id )
//
//     return  <div>
//               <div>{ rootNode.structuralNode_label }</div>
//               { this.state.showAgents ? <div>{this.getAgents(rootNode.id).map( agent => <span>{agent.label}</span> )}</div> : null}
//               <div>{ children.map( child => this.buildAgency(child) )}</div>
//             </div>
//   }
//
//   getAgents(nodeId){
//     return [{label: "agent found"}]
//   }
//
//   render() {
//     return  <StyleWrapper>
//               {
//                 !this.props.structuralNodes.length > 0 ? "agency empty or loading" :
//                   this.buildAgency(this.props.structuralNodes.find( node => node.id === node.structuralNode_parent_id ))
//               }
//             </StyleWrapper>
//   }
// }
