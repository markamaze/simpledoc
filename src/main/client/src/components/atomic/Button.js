import React from 'react'

import { ButtonWrapper } from '../component_styles'


export default class Button extends React.Component {

  render() {
    return <ButtonWrapper >{this.props.button}</ButtonWrapper>
  }
}
