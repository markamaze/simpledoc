import React from 'react'
import { connect } from 'react-redux'

// import TabbedViewport from '../utility/TabbedViewport'
import { DrawerWrapper } from './layout_styles'




export default class Drawer extends React.Component {

  render() {
		return <DrawerWrapper >Hello Drawer</DrawerWrapper>
	}


  // render() {
  //   let tabbedviewportitems = () => {
  //     return this.props.instances.size > 0 ?
  //         this.props.instances.toSeq().map(instance => {
  //           return {  label: instance.instanceId,
  //                     component: instance.instance }})
  //         : [{ label: "empty", component: <div>empty set</div>}]
  //     }
  //
  //   return  <DrawerWrapper >
  //             <TabbedViewport header="Active Instances"
  //                             items={tabbedviewportitems()} >
  //             </TabbedViewport>
  //           </DrawerWrapper>
  // }
}


// const mapStateToProps = (state, ownProps) => {
//   return {
//     instances: state.appState.get("openInstances")
//   }
// }

// export default connect(mapStateToProps)(Drawer)
