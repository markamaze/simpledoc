import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import WorkspaceNote from './WorkspaceNote'
import colors from '../../colors'


const StyleWrapper = styled.div`
  font-size: 1.5rem;

`



class Workspace extends React.Component {

  loadComponent(component){
    switch(component.componentType){
      case "AgencyCategory":
        return <AgentCategoryEditor
                  category={component.data}
                  savedState={component.workspaceState}
                  key={`category_editor_${component.key}`} />

      case "AgencyDefinition":
        return <div>Hello Definition Component</div>

    }
  }

  render() {

    return  <StyleWrapper className="p-5">
              This area is meant to be a place that Modules can send data creating or modifying components which are in progress and require the user to work on: such as a Form to be filled out or changes made to an Agent. For where I am now, it's not really too useful so just setting aside for future development.
            </StyleWrapper>

    // return  <Tabs className="">
    //             { this.props.workspaceComponents.map( component =>
    //                 <Tab
    //                   eventKey={component.key}
    //                   title={component.componentType}
    //                   key={`workspace_tab_${component.key}`}
    //                   className="d-flex flex-row"
    //                 >
    //                   {this.loadComponent(component)}
    //                 <WorkspaceNote data={component.workspaceNote} />
    //                 </Tab>)}
    //           </Tabs>

  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    workspaceComponents: state.layout.workspaceComponents
  }
}

export default connect(mapStateToProps)(Workspace)
