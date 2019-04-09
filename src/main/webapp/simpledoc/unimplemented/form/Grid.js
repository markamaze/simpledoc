import React from 'react'
import { List } from 'immutable'

import Element from './Element'


const Grid = (props) => {
  const renderTable = (elements, layoutdata) => {
    let tablematrix = buildTableData(elements)

    return  <table style={{border: "thin solid black"}} >
              <tbody>{ buildHeader(tablematrix[0]) }
              { buildBody(tablematrix) }</tbody>
            </table>
  }

  const buildBody = tablematrix =>
    tablematrix.splice(1).map(row =>{
      let secondaryKey = row.shift()
      return <tr><th>{secondaryKey}</th>{row.map(item =>
        <td><Element element={item} activeObject={props.activeObject} elementClick={props.elementClick}/></td>)}</tr>})

  const buildHeader = tablematrixkeys =>
    <tr>{ tablematrixkeys.map(key => <th>{key}</th>) }</tr>

  //in progress, getting data to display first so I can work out details as needed
  //as is, I should have problems when I have different number of rows/columns
  const buildTableData = (elements) => {
    let tablematrix = []
    tablematrix = setPrimaryKeys(tablematrix, elements)
    tablematrix = setSecondaryKeys(tablematrix, elements)
    tablematrix = buildRows(tablematrix, elements)
    tablematrix = fillmatrix(tablematrix)
    tablematrix = transposematrix(tablematrix)
    // tablematrix = removetrailingzerocols(tablematrix)
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
    //take first array from matrix which contains keys
    //find index of last key
    //trim each array in the matrix at that index
    let index = matrix[0].findIndex(key => key == null)

    return matrix.map(row => row.splice(0, index))

  }

  //done
  const setPrimaryKeys = (tablematrix, elements) => {
    let keyset = ['']

    elements.forEach((element) =>
      keyset.includes(element.getIn(['key', 0])) ? null : keyset.push(element.getIn(['key', 0])))

    tablematrix = keyset.map(key => [key])

    return tablematrix
  }
  const setSecondaryKeys = (tablematrix, elements) => {
    let keyset = ['']

    elements.forEach((element) =>
      keyset.includes(element.getIn(['key', 1])) ? null : keyset.push(element.getIn(['key', 1])))

    tablematrix[0] = keyset

    return tablematrix
  }
  const buildRows = (tablematrix, elements) => {
    elements.forEach(element =>{
      let position = getCellPosition(element, tablematrix)
      tablematrix[position[0]][position[1]] = element
    })

    return tablematrix
  }
  const getCellPosition = (element, tablematrix) => {
    let primaryKey = element.getIn(['key', 0])
    let secondaryKey = element.getIn(['key', 1])

    let column = tablematrix.findIndex(column =>
      column[0] == primaryKey)

      let row = tablematrix[0].findIndex(key =>
        key == secondaryKey)

        return [column, row]
      }


  // is this unused?
  const getKeys = elements => {
    let keys = []
    elements.map(element =>
      keys.includes(element.get('key').toJS()) ?
        null : keys.push(element.get('key').toJS()))

    return keys
  }
  const getMatchingElements = (key, elements) =>
      elements.filter(element => element.get('key') == key)

  const getclass = () => null

  return  <div className={{getclass}}>
            { renderTable(props.layout.get('elements'), props.layoutdata) }
          </div>
}
export default Grid
