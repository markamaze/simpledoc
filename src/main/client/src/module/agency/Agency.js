import React from 'react'
import styled from 'styled-components'
import AgencyView from './AgencyView'
import colors from '../../colors'
import DisplayCard from './DisplayCard'

const StyleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;


  #view-type-selector {
    display: flex;
    flex-direction: row;
    height: 2rem;
    width: 100%;
    background: ${colors.two};
    color: ${colors.one};

    .view-option {
      display: flex;
      flex-grow: 0;
      width: 8rem;
      background: ${colors.one};
      color: ${colors.two};
      border-right: thin solid black;
    }

  }
  .view-container {
    display: flex;
    flex-direction: column;

    @media( min-width: 500px){
      flex-direction: row;
    }
  }
  .mainview {
    background: ${colors.three};
    color: ${colors.four};
    display: flex;
    height: 100%;
    margin: .5rem auto;
    padding: .5rem;
  }
  .cardview {
    display: flex;
    margin: .5rem auto;
    padding: auto .5rem;
  }

  .tree-node-label-active {
    background: purple
  }
`


export default class Agency extends React.Component{
  constructor(props){
    super(props)
    this.state = { showView: "agencyTree", activeData: this.props.rootNode }
  }

  toggleView(){
    this.setState({ showView: this.state.showView === "agencyTree" ? "chainOfCommand" : "agencyTree" })
  }
  setActiveItem(item){
    this.setState({ activeData: item })
  }

  agencyTree(id, depth){
    let _depth = ++depth
    let node = this.props.structuralNodes.find( node => node.id === id)
    let children = this.props.structuralNodes.filter( node => node.structuralNode_parent_id === id && node.structuralNode_parent_id !== node.id )

    return  <div className="tree-node" style={{paddingLeft: `${depth/2}rem`}} >
              <div className={`tree-node-label${this.state.activeData.id === node.id ? "-active" : ""}`} onClick={()=>this.setActiveItem(node)}>{node.structuralNode_label}</div>
              <div className="tree-node-children" style={{paddingLeft: `${depth/2 + 0.25}rem`}}>{ children.map( child => this.agencyTree(child.id, _depth) )}</div>
            </div>
  }

  chainOfCommand(node_id, depth){
    return <div>setup creation of Agents based on assignments in structuralNodes. Once agents are working this can be built</div>
  }

  render(){
    return  <StyleWrapper>
              <div className="view-toggle" onClick={() => this.toggleView() }>Switch View</div>
              <div className="view-container">
                <div className="mainview">
                  { this.state.showView === "agencyTree" ? this.agencyTree(this.props.rootNode.id, 0) : null }
                  { this.state.showView === "chainOfCommand" ? this.chainOfCommand(this.props.rootNode.id, 0) : null }
                </div>

                <div className="cardview">
                  <DisplayCard data={this.state.activeData} {...this.props} />
                </div>
              </div>

            </StyleWrapper>
  }
}



//
// export default class Agency extends React.Component{
//   constructor(props){
//     super(props)
//     this.state = { viewTypeIndex: 1 }
//   }
//
//   setViewType(typeIndex){
//     this.setState({ viewTypeIndex: typeIndex })
//   }
//
//   getRootDisplayNode(){
//     return this.props.structuralNodes.find( node => node.id === node.structuralNode_parent_id)
//   }
//
//   getDisplay(){
//     let rootNode = this.getRootDisplayNode()
//
//     if(rootNode === undefined) return <div>Agency loading or not yet created</div>
//
//     switch(this.state.viewTypeIndex){
//       case 1:
//         return <AgencyView {...this.props} rootNode={rootNode} displayType="cards" />
//       case 2:
//         return <AgencyView {...this.props} rootNode={rootNode} displayType="list" />
//       case 3:
//         return <AgencyView {...this.props} rootNode={rootNode} displayType="chart" />
//     }
//   }
//
//   render() {
//     return  <StyleWrapper>
//               <div id="view-type-selector">
//                 <div className="view-option" onClick={ ()=> this.setViewType(1)}>Card View</div>
//                 <div className="view-option" onClick={ ()=> this.setViewType(2)}>List View</div>
//                 <div className="view-option" onClick={ ()=> this.setViewType(3)}>Chart View</div>
//               </div>
//
//               { this.getDisplay() }
//             </StyleWrapper>
//   }
// }
