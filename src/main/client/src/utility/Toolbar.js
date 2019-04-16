  import React from 'react'
import {ToolbarStyle} from '../styles/utilityStyles'

export default class Toolbar extends React.Component {
  render() {
    return  <ToolbarStyle column={this.props.column}
                          className={this.props.className}>
              {React.Children.map(this.props.children, child =>
                <div className='toolbaritem' >{child}</div>)}
            </ToolbarStyle>
  }
}
