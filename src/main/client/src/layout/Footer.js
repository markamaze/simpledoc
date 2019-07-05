import React from 'react'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'



const StyleWrapper = styled(Container)`

`

export default class Footer extends React.Component {
  render() {
    return  <StyleWrapper className="footer_container">
              <h6>A learning project developed by: MARK A MAZE</h6>
            </StyleWrapper>
  }
}
