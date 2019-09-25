import React from 'react'
import styled from 'styled-components'
import { Container, Row, Col } from 'react-bootstrap'

const ListWrapper = styled(Container)`

`

export default class List extends React.Component {

  renderList(data){
    let listKeys = []
    let listRows = []

    this.props.listHeaders ?
      listKeys = this.props.listHeaders
      : data.forEach(item => {
          Object.keys(item).forEach( key => {
            listKeys.includes(key) ? null : listKeys.push(key)
          })
        })

    listRows.push(<Row
                      key={`header_row_${Math.random(8)}`}
                      className="border-bottom font-weight-bold text-uppercase">{listKeys.map(key => <Col key={`header_item_${key}_${Math.random(8)}`}>{key}</Col>)}</Row>)

    data.forEach( item => {
      listRows.push(
        <Row
            className="border-bottom py-1"
            key={`list_item_${item.id}`}
            onClick={ this.props.onItemClick ? () => this.props.onItemClick(item) : null } >
          {
            listKeys.map( key => {
              let value = item[key] !== undefined ? item[key] : ""

              //handle if value is an object or an array
              //ideas?
              //  click to show a popup?
              //  turn into a list?
              //

              return  <Col key={`list_item_${item.id}_${key}`}>
                        {
                          typeof value !== "object" ?
                            value.toString()
                            : value
                        }
                      </Col>
            })
          }
        </Row>

    )})

    return listRows


  }

  render() {

    return  <ListWrapper >
              {this.props.listData.length > 0 ?
                this.renderList(this.props.listData)
                : this.props.emptySetMessage }
            </ListWrapper>
  }
}
