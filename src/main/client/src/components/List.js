import React from 'react'
import { ListWrapper } from './styles'


/*
  todo:
      handle different options for selecting a row/cell
      finish treeRows
      build iconSet
      apply constraint on itemComponent display -> overlay or below row

*/


function List(props){

  const [buildAsTree, setBuildAsTree] = React.useState(checkType())
  const [activeItem, setActiveItem] = React.useState(null)
  const [overlayItem, setOverlayItem] = React.useState(null)

  function checkType(){
  	if(!props.heirarchyKey) return false

    else if(props.dataSet.reduce((flag, item) => {
      if(!flag) return false
      else if(props.heirarchyKey in item) return true
    })) return true

    else return false
  }



  function columnTitleRow(){
    let columnTitleRow = props.columns.map( column => column.label )

    props.itemActions && props.itemActions.length > 0 ? columnTitleRow.push("") : null

    return  <div className="list-head-row list-row">
              { columnTitleRow.map(columnTitle =>
                  <div className="list-head-item list-cell">{columnTitle}</div>) }
            </div>
  }
  function addRow(dataItem){
    return  <div className="list-row" >
              { props.columns.map(column =>
                  <div className="list-cell" onClick={() => setActiveItem(dataItem)}>
                    {dataItem[column.selector]}
                  </div>) }

              { props.itemActions && props.itemActions.length > 0 ? addActionCell(dataItem) : null }
            </div>
  }
  function addActionCell(dataItem){
    return  <div className="list-cell action-cell">
              {
                props.itemActions.map(itemAction =>
                  <div className="list-row-action" onClick={() => setOverlayItem(itemAction.action(dataItem))}>
                    {itemAction.label}
                  </div>)
              }
            </div>
  }
  function renderItemComponent(dataItem){
    return !props.itemComponent ? null :
      React.cloneElement(
        props.itemComponent(dataItem),
        [{className: `list-row-component-wrapper`, displayName: "ListItemComponent"}],
        [ <div className="list-row-component-header">
            <div className="list-row-component-close"
                  onClick={() => setActiveItem(null)}>X</div>  //where'd it go?
            { addActionCell(dataItem) }
          </div>,
          <div className={`${props.itemComponent(dataItem).props.className} list-row-component`}>
            {props.itemComponent(dataItem).props.children}
          </div>
        ])
  }
  function getColumnCount(){
    return props.itemActions && props.itemActions.length > 0 ?
      props.columns.length + 1 :
      props.columns.length
  }




  function iconSet(){}


function activeItemAction(item){
  if(props.onItemClick) return props.onItemClick(item)

  else return renderItemComponent(item)
}


  function listRows(){
    return  <div className="list-body">
              {
                props.dataSet.map( dataItem =>
                  <div className="list-row-wrapper" key={`list-row-${props.key}-${dataItem.id}`}>
                    { addRow(dataItem) }
                    { dataItem === activeItem ? activeItemAction(dataItem) : null }
                  </div>)
                }
              </div>
  }



  function treeRows(root, depth){
    let childrenSet = props.dataSet.filter( dataItem =>
            dataItem[props.treeNodeKey] === root[props.rootIdKey]
            && dataItem !== root )

    let _depth = ++depth

    return childrenSet && childrenSet.length > 0 ?

      <div className={`tree-body`} key={`tree-body-${root.id}`} >
        <div className="tree-row-wrapper" key={`tree-row-wrapper-${root.id}`}>
          <div className="tree-root" key={`tree-root-${root.id}`} >
            { addRow(root) }
            { root === activeItem ? renderItemComponent(root) : null }
            <div className="tree-root-children-list"
                  style={{paddingLeft: `${_depth}rem`}}>
              { childrenSet.map( dataItem => treeRows(dataItem, _depth)) }
            </div>

          </div>
        </div>
      </div>

      : <div className="tree-body">
          <div className="tree-row-wrapper">
            <div className="tree-leaf">{ addRow(root) }</div>
            { root === activeItem ? renderItemComponent(root) : null }
          </div>
        </div>
  }


  function buildList(){
      if(props.treeRoot && props.treeNodeKey)
        return  <div className="tree-body">
                  { columnTitleRow() }
                  { treeRows(props.treeRoot, 0) }
                </div>

      else if(props.icon && props.iconComponent)
        return  <div className="icon-set-body">
                  { iconSet() }
                </div>

      else
        return  <div className="list-body">
                  { columnTitleRow() }
                  { listRows() }
                </div>
    }

  try{
    return  <ListWrapper columnCount={getColumnCount()} style={props.style}>
              { !props.headerComponent ? null :
                  <header onClick={() => setActiveItem(null)}>{props.headerComponent}</header>
              }
              { buildList() }
              { overlayItem ?
                  <div style={{position: "absolute", background: "rgb(0,0,0,.5)", color:"lightgray",top:"0",width:"100%",height:"100%"}}>
                    <div onClick={()=> setOverlayItem(null)}>X</div>
                    { overlayItem }
                  </div>

              : null }
            </ListWrapper>
  }catch(error){ throw error}
}


// List.displayName = "List"
// List.propTypes = {
//   dataSet: undefined, //an array of objects
//   columns: undefined, //array of objects defining column display properties
//   treeRoot: undefined
//   treeNodeKey: undefined, //a key in each item of dataSet for building tree, if unset, will display as a list
//   headerComponent: undefined, //optional header element
//   footerComponent: undefined, //optional footer element
//   onClickAction: undefined, //function acting on the row element
//   itemActions: undefined //action handlers next to each item
//
//
// }
// List.defaultProps = {
//
// }

export default List
