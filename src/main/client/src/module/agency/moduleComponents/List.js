import React, { useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: block;

  header {
    text-align: center;
    background: burlywood;
  }
  .list{
    display: flex;
    flex-direction: column;
  }

  .list-body{
    background: lightgray;
    font-size: small;
  }

  .list-row{
    display: flex;
    border-bottom: thin solid gray
  }

  .list-head-row{
    background: gray;
  }

  .list-head-item {
    font-weight: bold;
    font-style: italic;
    flex-grow: 1;
  }

  .list-cell{
    display: flex;
    flex-grow: 1;
    justify-content: left;
    width: ${props => 100/props.columnCount}%;
  }

  .action-cell{
    flex-direction: column;
    align-items: center;
  }

  .list-row-action {
    font-size: small;
    padding: 0 .3rem;
  }

  .action-cell :hover{
    font-size: normal;
    color: blue;
  }

  .list-row-component-wrapper{
    display: flex;
    flex-direction: column;
    max-height: 100%;
    min-height: 100%;
    max-width: 100%;
    min-width: 100%;
    overflow: auto;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .list-row-component-header{
    display: flex;
    background: lightgray;
  }
  .list-row-component-header .action-cell {
    flex-direction: row;
  }
  .list-row-component {
    background: white;
    box-sizing: border-box;
  }
`


/*
  todo:
      handle different options for selecting a row/cell
      finish treeRows
      build iconSet
      apply constraint on itemComponent display -> overlay or below row

*/
function List(props){

  const [buildAsTree, setBuildAsTree] = useState(checkType())
  const [activeItem, setActiveItem] = useState(null)
  const [overlayItem, setOverlayItem] = useState(null)

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

    props.itemActions.length > 0 ? columnTitleRow.push("") : null

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

              { props.itemActions.length > 0 ? addActionCell(dataItem) : null }
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
    return React.cloneElement(
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
    return props.itemActions.length > 0 ?
      props.columns.length + 1 :
      props.columns.length
  }




  function iconSet(){}



  function listRows(){
    return  <div className="list-body">
              {
                props.dataSet.map( dataItem =>
                  <div className="list-row-wrapper">
                    { addRow(dataItem) }
                    { dataItem === activeItem ? renderItemComponent(dataItem) : null }
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

      <div className="tree-body">
        <div className="tree-row-wrapper">
          <div className="tree-root">
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
    return  <Wrapper columnCount={getColumnCount()} >
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
            </Wrapper>
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
