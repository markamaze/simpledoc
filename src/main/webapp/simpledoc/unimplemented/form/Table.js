import React from 'react'
import { fromJS, List } from 'immutable'

import Element from './Element'

//props:layout, layoutdata

const Table = (props) => {
  const renderTable = (elements, layoutdata) => {
    let tablematrix = buildTableData(elements)

    return  <table style={{border: "thin solid black"}} >
              { buildHeader(tablematrix[0]) }
              <tbody>{ buildBody(tablematrix) }</tbody>
            </table>
  }

  const buildBody = tablematrix =>
    tablematrix.splice(1).map(row =>
      <tr>{ row.map(item => <td>{ item==null ? "" : <Element element={item} activeObject={props.activeObject} elementClick={props.elementClick}/>}</td>) }</tr>)

  const buildHeader = tablematrixkeys =>
    <tr>{ tablematrixkeys.map(key => <th>{key}</th>) }</tr>

  const buildTableData = (elements) => {
    let tablematrix = []
    tablematrix = setKeys(tablematrix, elements)
    tablematrix = buildRows(tablematrix, elements)
    tablematrix = fillmatrix(tablematrix)
    tablematrix = transposematrix(tablematrix)
    tablematrix = removetrailingzerocols(tablematrix)
    return tablematrix
  }

  const fillmatrix = matrix => {
    let maxlength = 0
    matrix.forEach(column =>
      maxlength < column.length ? maxlength = column.length : null)

    while(matrix.length < maxlength){ matrix.push([]) }

    matrix.forEach(column =>{
      while(column.length < maxlength) {
        column[column.length] = null
      }
    })

    return matrix
  }

  const transposematrix = matrix => {
    for (let i = 0; i < matrix.length; i++){
      for (let j = i; j < matrix.length; j++){
        let temp = matrix[i][j]
        matrix[i][j] = matrix[j][i]
        matrix[j][i] = temp
      }
    }
    return matrix
  }

  const removetrailingzerocols = matrix => {
    let index = matrix[0].findIndex(key => key == null)

    return matrix.map(row => row.splice(0, index))

  }

  const setKeys = (tablematrix, elements) => {
 		let i = -1
    return getKeys(elements).map((key) => {
      i++
      return tablematrix[i] = [key]
      })
 	}

  const getKeys = elements => {
    let keys = []
    elements.map(element =>
      keys.includes(element.get('key')) ?
        null : keys.push(element.get('key')))

    return keys
  }

  const buildRows = (tableArray, elements) => {
    tableArray.forEach(column =>
      getMatchingElements(column[0], elements).map(item =>
        column.push(item)))
        return tableArray
      }

  const getMatchingElements = (key, elements) =>
      elements.filter(element => element.get('key') == key)

  const getclass = () => null

  return  <div className={{getclass}}>
            { renderTable(props.layout.get('elements'), props.layoutdata) }
          </div>
}

export default Table
