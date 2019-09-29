import React from 'react'
import styled from 'styled-components'

import colors from '../colors'


const StyleWrapper = styled.div`

  display: flex;
  flex-direction: row;
  background: ${colors.three};
  color: ${colors.four};
  max-height: 5%;

  header {
    display: inline-flex;
    font-size: 2vh + 4vw;
    flex-grow: 2;
    padding: 1rem;
    text-align: center;
  }

  nav {
    display: inline-flex;
  }

  /* nav a {
    flex-basis: 12%;
  } */

`

export default class Header extends React.Component {
  render() {
    return  <StyleWrapper>
              {this.props.children}
              <header>Simpledoc: AI Clerk</header>
            </StyleWrapper>
  }
}
