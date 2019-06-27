import React from 'react'

import { DrawerWrapper } from './layout_styles'
import DrawerComponent from './DrawerComponent'
import DrawerToolbar from './DrawerToolbar'
import * as layoutActions from './layout_actions'



export default class Drawer extends React.Component {

  render() {

    return <DrawerWrapper drawerOpen={this.props.drawerOpen}>
              <DrawerToolbar {...layoutActions} {...this.props} />
              <DrawerComponent {...layoutActions} {...this.props} />
            </DrawerWrapper>
  }

}
