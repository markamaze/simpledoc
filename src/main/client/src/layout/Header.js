import React from 'react'
import styled from 'styled-components'

import colors from '../colors'


const StyleWrapper = styled.div`
  padding: 1rem 1rem 0;
  display: flex;
  flex-direction: column;
  background: ${colors.three};
  color: ${colors.four};

  header {
    font-size: 1.6rem;
  }
  nav {
    justify-content: center
  }

  nav a {
    flex-basis: 12%;
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
