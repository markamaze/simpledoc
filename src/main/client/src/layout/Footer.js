import React from 'react'
import styled from 'styled-components'

import colors from '../colors'


const StyleWrapper = styled.div`
  background: ${colors.three};
  color: ${colors.four};
  display: flex;
  width: 100%;
  padding: .5rem 1rem 1rem;
  height: 1rem;
  p {
    font-size: .7rem;
  }

  @media (min-width: 500px){
    height: 2rem;
  }
`

export default class Footer extends React.Component {
  render() {
    return  <StyleWrapper className="footer_container">
              <p>A learning project developed by: MARK A MAZE</p>
            </StyleWrapper>
  }
}
