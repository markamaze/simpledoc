import React from 'react'
import { ListWrapper } from './styles'



function List(props){
  const [showOverlay, toggleOverlay] = React.useState(false)
  const [selectedItem, setSelectedItem] = React.useState(null)

  const columnCount = () => {}
  const loadOverlay = () => {}

  const addTreeNode = item => {}
  const addIcon = item => {}
  const addTableRow = item => {

    return  <div className=""
  }

  const buildTree = node => {
    const children = props.listData.filter( item => node[props.nodeKey.parent] === item[props.nodeKey.node])
    return  <div className="list-tree">
                {addTreeNode(node)}
                { children ? children.map( child => buildTree(child)) : null }
            </div>
  }
  const buildIcons = () => {
    return  <div className="list-icons">{ props.listData.map( item => addIcon(item)) }</div>
  }
  const buildTable = () => {
    return  <div className="list-table">
              <div className="list-table-head-row">{}</div>
              { props.listData.map( item => addTableRow(item)) }
            </div>
  }
  const build = () => {
    if(props.treeRoot && props.treeKey) return buildTree(props.treeRoot)
    else if(props.icons) return buildIcons()
    else return buildTable()
  }


  try {
    return  <ListWrapper columnCount={columnCount()} className="list" style={props.style}>
              { props.headerComponent ? <div className="list-header">{props.headerComponent}</div> : null }
              { props.listActions ? <div className="list-actions">{props.listActions}</div> : null }
              <div className="list-body">{build(props.listData)}</div>
              { props.footerComponent ? <div className="list-footer">{props.headerComponent}</div> : null }
              { showOverlay ? <div className="list-overlay">{loadOverlay()}</div> : null }
            </ListWrapper>
  } catch(error) { throw new Error("Error building List")}
}
export default List

// List.propTypes = {
//   listData: [],
//   listActions: {},
//   itemActions: {},
//   itemInlineComponent: {},
//   itemOverlayComponent: {},
//   headerComponent: {},
//   footerComponent: {},
//
//   tree: false, root: nodeKey: {parent: "", node: ""},
//   icons: false, displayKey: "",
//   columns: [{label: "", selector: ""}]
// }
