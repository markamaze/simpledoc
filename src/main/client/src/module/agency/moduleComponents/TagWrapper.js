import React from 'react'
import styled from 'styled-components'


const Wrapper = styled.span`
  /* background: lightgreen; */
  font-size: x-small;
  border-radius: .3rem;
  margin: .3rem;
  padding: .3rem;
`

export default class TagWrapper extends React.Component{
  render() {
      return <Wrapper {...this.props}>
              {this.props.children}
            </Wrapper>
  }
}
