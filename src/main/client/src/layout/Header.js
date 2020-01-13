import React from 'react'
import styled from 'styled-components'

import colors from '../colors'


const StyleWrapper = styled.div`

  display: flex;
  flex-direction: row;
  background: ${colors.three};
  color: ${colors.four};

  @media (min-width: 500px){
    flex-direction: row;
  }
  header {
    display: inline-flex;
    font-size: 4vh + 4vw;
    flex-grow: 2;
    padding: 1rem;
    text-align: center;
  }

  nav {
    display: inline-flex;
  }
`

export default class Header extends React.Component {
  render() {
    return  <StyleWrapper>
              <header>Simpledoc: AI Clerk</header>
              {this.props.children}
            </StyleWrapper>
  }
}
