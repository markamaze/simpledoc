import React from 'react'

import { ButtonWrapper } from '../component_styles'


export default class Button extends React.Component {

  render() {
    return  <ButtonWrapper onClick={this.props.onClick}>
              {this.props.label}
              {this.props.children}
            </ButtonWrapper>
  }
}
