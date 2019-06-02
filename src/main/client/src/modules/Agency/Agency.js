import React from 'react'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import { loadAgencyData } from './module_actions'

import { ModulePageWrapper } from '../../root_styles'
// import { agents } from './agency_constants'
// import List from '../../utility/List'
// import TabbedViewport from '../../utility/TabbedViewport'
// import { ModuleWrapper } from '../../styles/layoutStyles'
// import { openInstance,
//           closeInstance } from '../appstate_actions'
// import objectIdGenerator from '../../utility/objectIdGenerator'
// import AgentFactory from './AgentFactory'
// import AgentTypeBuilder from './AgentTypeBuilder'


/*
    redesign notes:
        Agency is a representation of the company
        Programs are the building blocks which offer
          Positions and to serve Clients
        a program needs to define what positions it needs
        a program needs to define what type of clients it serves

        When I select the Agency module I should:


*/

export default class Agency extends React.Component {
  // loadAgencyAgents() {
  //   return <TabbedViewport  header="Agent Lists"
  //                           items={this.loadItems()} />
  // }
  //
  // loadItems(){
  //   return Object.entries(agents).map(([key, value]) => {
  //     return {
  //       label: value,
  //       component: <List  data={this.props[key]}
  //                         header={value}
  //                         itemclick={item=>this.handleListItemClick(key, item)} />}})}

  // listData() {
  //   return Object.entries(agents).map(([key, value]) => {
  //     return {
  //       data: this.props[key],
  //       header: value,
  //       itemclick: item => this.handleListItemClick(key, item)
  //     }})
  // }

  // handleListItemClick(key, item) {
  //   let newID = objectIdGenerator()
  //
  //   switch(key) {
  //     case "agentTypes":
  //       return openInstance(<AgentTypeBuilder data={item}
  //                                             closeInstance={() => closeInstance(newID)}/>, newID)
  //     case "programs":
  //       return  openInstance(<AgentFactory  data={item}
  //                                           objectTypes={this.props.agentTypes.filter(agentType =>
  //                                             agentType.get('agent_type') === 'PROGRAM')}
  //                                           closeInstance={() => closeInstance(newID)}/>, newID)
  //     case "positions":
  //       return  openInstance(<AgentFactory  data={item}
  //                                           objectTypes={this.props.agentTypes.filter(agentType =>
  //                                             agentType.get('agent_type') === 'POSITION')}
  //                                           closeInstance={() => closeInstance(newID)}/>, newID)
  //     case "clients":
  //       return  openInstance(<AgentFactory  data={item}
  //                                           objectTypes={this.props.agentTypes.filter(agentType =>
  //                                             agentType.get('agent_type') === 'CLIENT')}
  //                                           closeInstance={() => closeInstance(newID)}/>, newID)
  //     case "users":
  //       return  openInstance(<AgentFactory  data={item}
  //                                           objectTypes={this.props.agentTypes.filter(agentType =>
  //                                             agentType.get('agent_type') === 'USER')}
  //                                           closeInstance={() => closeInstance(newID)}/>, newID)
  //   }
  // }
  render() {
    loadAgencyData()

    return  <ModulePageWrapper>

              display a heirarchy of all structural agents, as well as a list of all Actor agents

              click on an agent to take a close look, which should display as a pop-up?

              </ModulePageWrapper>
  //   return  <ModuleWrapper>
  //             <div className="agentlists">{ this.loadAgencyAgents() }</div>
  //     		  </ModuleWrapper>
  }
}

//
// const mapStateToProps = (state, ownProps) => {
//   return state.agency.toKeyedSeq().toJS()
// }
//
//
// export default connect(mapStateToProps)(Agency)
