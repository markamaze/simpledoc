import React, { useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: block;

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
    justify-content: center
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


function List(props){

  const [buildAsTree, setBuildAsTree] = React.useState(checkType())
  const [activeItem, setActiveItem] = React.useState(null)

  function checkType(){
  	if(!props.heirarchyKey) return false

    else if(props.dataSet.reduce((flag, item) => {
      if(!flag) return false
      else if(props.heirarchyKey in item) return true
    })) return true

    else return false
  }

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
  function treeRows(){}

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
                  <div className="list-row-action" onClick={() => itemAction.action(dataItem)}>
                    {itemAction.label}
                  </div>)
              }
            </div>
  }
  function renderItemComponent(dataItem){
    return React.cloneElement(
        props.itemComponent(dataItem),
        {className: `list-row-component-wrapper`, displayName: "ListItemComponent"},
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

  // try{
    return 	<Wrapper columnCount={getColumnCount()} >
              <div className="list">
                { props.headerComponent }
                <div className="list-body">
                  { columnTitleRow() }
                  { buildAsTree ? treeRows() : listRows() }
                </div>
                { props.footerComponent }
              </div>
            </Wrapper>
  // }catch(err){ return <div>{`Error: ${err}`}</div>}
}


// List.displayName = "List"
// List.propTypes = {
//   dataSet: undefined, //an array of objects
//   columns: undefined, //array of objects defining column display properties
//   heirarchyKey: undefined, //a key in each item of dataSet for building tree, if unset, will display as a list
//   headerComponent: undefined, //optional header element
//   footerComponent: undefined, //optional footer element
//   onClickAction: undefined, //function acting on the row element
//   itemActions: undefined //action handlers next to each item
//
// }
// List.defaultProps = {
//
// }

export default List
