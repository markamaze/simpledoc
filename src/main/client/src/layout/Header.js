import React from 'react'
import styled from 'styled-components'
import { Container, Row, Col } from 'react-bootstrap'


const StyleWrapper = styled(Container)`

`

export default class Header extends React.Component {
  render() {
    return  <StyleWrapper className="header_wrapper text-center">
              <Row>
                <Col xl={12}><h2>Simpledoc: AI Clerk</h2></Col>
                <Col>{this.props.children}</Col>
              </Row>
            </StyleWrapper>
  }
}
