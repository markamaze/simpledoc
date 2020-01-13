import React from 'react'
import { connect } from 'react-redux'

import { ModuleWrapper } from '../moduleStyles'
import Agency from './Agency'


/*
  purpose:
      connect module data from redux store
      load module main view controller
      wrap module with stylesheets
*/

function AgencyModule(props) {
  let agencyRootNode = props.structuralNodes.find( node =>
        node.id === node.structuralNode_parent_id)

  return  <ModuleWrapper id="agency-module" className="module-wrapper">
            <Agency {...props} rootNodeId={ agencyRootNode ? agencyRootNode.id : null } />
          </ModuleWrapper>
}


const mapStateToProps = (state, ownProps) => {
  return {
    agents: state.agency.agents,
    structuralNodes: state.agency.structuralNodes,
    agentTemplates: state.agency.agentTemplates,
    dataTags: state.agency.dataTags,
    users: state.agency.users
  }
}

export default connect(mapStateToProps)(AgencyModule)
