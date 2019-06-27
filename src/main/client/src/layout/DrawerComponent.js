import React from 'react'
import { connect } from 'react-redux'

import { DrawerComponentWrapper } from '../components/component_styles'
import Toolbar from '../components/Toolbar'
import Button from '../components/atomic/Button'

import AgencyCategory from '../modules/Agency/AgencyCategory'
import AgencyDefinition from '../modules/Agency/AgencyDefinition'
import AgencyAgent from '../modules/Agency/AgencyAgent'




class DrawerComponent extends React.Component {

  renderActiveComponent() {
    let component_id = this.props.activeDrawerComponentKey === null ?
      this.props.drawerComponents[0].key : this.props.activeDrawerComponentKey

    let component = this.props.drawerComponents.find( component =>
      component.key === component_id)


      //should only be able to load one component of any specific data item
      //if the state of that data item is modified, it should be obvious
      //if there is a modified state saved, it should automatically load into
      //    drawer components and display a tab for that item


    switch(component.type){
      case "AgencyCategory":
        return <AgencyCategory {...component.props} {...this.props} />

      case "AgencyDefinition":
        return <AgencyDefinition {...component.props} {...this.props} />

      case "AgencyAgent":
        return <AgencyAgent {...component.props} {...this.props} />

    }
  }

  render() {
    return  this.props.drawerOpen ?
              <DrawerComponentWrapper >
                { this.renderActiveComponent() }
              </DrawerComponentWrapper>
              : null
  }



}

const mapStateToProps = (state, ownProps) => {
  return {
    drawerComponents: state.layout.drawerComponents,
    activeDrawerComponentKey: state.layout.activeDrawerComponentKey
  }
}

export default connect(mapStateToProps)(DrawerComponent)
