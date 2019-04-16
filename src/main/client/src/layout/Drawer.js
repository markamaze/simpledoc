import React from 'react'
import { connect } from 'react-redux'

import TabbedViewport from '../utility/TabbedViewport'
import { LayoutDrawer } from '../styles/layoutStyles'




class Drawer extends React.Component {
  //need to adapt data for items prop of TabbedViewport
  //  currently it uses props.items.instanceid as a label
  //  and props.items.instance as the component to render
  //format data sent in items prop of TabbedViewport as such:
  //  items = [{label, component}, {label, component}, ...]
  render() {
    let tabbedviewportitems = () => {
      return this.props.instances.size > 0 ?
          this.props.instances.toSeq().map(instance => {
            return {  label: instance.instanceId,
                      component: instance.instance }})
          : [{ label: "empty", component: <div>empty set</div>}]
      }

    return  <LayoutDrawer >
              <TabbedViewport header="Active Instances"
                              items={tabbedviewportitems()} >
              </TabbedViewport>
            </LayoutDrawer>
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    instances: state.appState.get("openInstances")
  }
}

export default connect(mapStateToProps)(Drawer)
