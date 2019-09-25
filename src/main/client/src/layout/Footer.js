import React from 'react'
import styled from 'styled-components'

import colors from '../colors'


const StyleWrapper = styled.div`
  background: ${colors.three};
  color: ${colors.four};
  display: flex;
  width: 100%;
  padding: .5rem 1rem 1rem;
`

export default class Footer extends React.Component {
  render() {
    return  <StyleWrapper className="footer_container">
              <h6>A learning project developed by: MARK A MAZE</h6>
            </StyleWrapper>
  }
}
