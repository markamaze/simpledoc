import React from 'react'
import { connect } from 'react-redux'

import Toolbar from '../components/Toolbar'
import Button from '../components/atomic/Button'




class DrawerToolbar extends React.Component {

  

  renderOpen(){
    return  <Toolbar column={false} >
              <Button label=">>" onClick={()=> this.props.toggleDrawer()} />
              {
                this.props.drawerComponents.map( component =>
                  component.key === this.props.activeDrawerComponentKey ?
                    <Button label={component.key} >
                      <Button label="X"
                              onClick={ () => this.props.closeDrawerComponent(component.key)} />
                    </Button>
                    : <Button label={component.key}
                              onClick={() => this.props.loadInDrawerView(component.key)} />)
              }
            </Toolbar>
  }

  renderClosed() {
    return  <Toolbar column={true} >
              <Button label="<<" onClick={() => this.props.toggleDrawer()} />
              {
                this.props.drawerComponents.map( component =>
                  <Button label={component.key}
                          onClick={() => this.props.loadInDrawerView(component.key)} /> )
              }
            </Toolbar>
  }

  render() {
    return  this.props.drawerOpen ?
              this.renderOpen()
              : this.renderClosed()
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    drawerComponents: state.layout.drawerComponents,
    activeDrawerComponentKey: state.layout.activeDrawerComponentKey,
    savedComponentStates: state.layout.savedComponentStates
  }
}

export default connect(mapStateToProps)(DrawerToolbar)
