import React from 'react'

import { ToolbarWrapper } from './component_styles'
import Button from './atomic/Button'

export default class Toolbar extends React.Component {
  render() {
    return  <ToolbarWrapper column={this.props.column}
                          className={this.props.className}>
              {this.props.children}
            </ToolbarWrapper>
  }
}
