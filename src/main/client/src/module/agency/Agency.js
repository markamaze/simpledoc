import React from 'react'
import List from '../../components/List'
import { useSelector } from 'react-redux'
import { AgencyPageWrapper } from './module_styles'
import { agencyObject } from './moduleObjects/agencyObject'

function AgencyPage(props){
  let rootNode = useSelector(state=>state.agency).getRootNode()

  window.addEventListener("beforeunload", function(event){
    event.preventDefault()
  })

  
  return  <AgencyPageWrapper className="module-wrapper" >
            <List className="d-block"
                headerComponent={<div className="page-header">Agency Overview</div>}
                root={rootNode}
                nodeBranch={node => node.tools.getChildren(node)}
                listActions={[
                  {
                    label: `${!rootNode ? "build agency" : ""}`,
                    action: (close, alert) => {
                      let newRootNode = agencyObject("node", {id: "new_object", parent_id: "root", label: "agency root"}, () => useSelector(state => state.agency), props.services, props.utilities, alert)
                      return newRootNode.display.builder(newRootNode, close, alert) }
                  }
                ]}
                iconComponent={node => node.tools.getDisplayName(node)}
                drawerComponents={[]}
                overlayComponents={[
                  {label: "document", component: (item) => item.display.document(item)},
                  {label: "editor", component: (item, close, alert) => item.display.editor(item, close, alert)},
                  {label: "builder", component: (item, close, alert) => item.display.builder(item, close, alert)}
                ]} />
          </AgencyPageWrapper>
}

function TagManagerPage(props){
  return  <AgencyPageWrapper className="module-wrapper">
            <List className="container"
                headerComponent={<div className="page-header">Agent Tags</div>}
                tableData={useSelector(state => state.agency).getTagsByType("agent")}
                iconComponent={item => <div>{item.label}</div>}
                listActions={[
                  {label: "+", action: (close, alert) => {
                    let newDataTag = agencyObject("tag", {id: "new_object", label: "new tag", tag_type: "agent"}, () => useSelector(state => state.agency), props.services, props.utilities, alert)
                    return newDataTag.display.builder(newDataTag, close, alert)
                  }}]}
                drawerComponents={[
                ]}
                overlayComponents={[
                  {label: "document", component: item => item.display.document(item)},
                  {label: "modify", component: (item, close, alert) => item.display.builder(item, close, alert)}
                ]} />

            <List className="container"
                headerComponent={<div className="page-header">Node Tags</div>}
                tableData={useSelector(state => state.agency).getTagsByType("structural")}
                iconComponent={item => <div>{item.label}</div>}
                listActions={[
                  {label: "+", action: (close, alert) => {
                    let newDataTag = agencyObject("tag", {id: "new_object", label: "new tag", tag_type: "structural"}, () => useSelector(state => state.agency), props.services, props.utilities, alert)
                    return newDataTag.display.builder(newDataTag, close, alert)
                  }}]}
                drawerComponents={[
                ]}
                overlayComponents={[
                  {label: "document", component: item => item.display.document(item)},
                  {label: "modify", component: (item, close, alert) => item.display.builder(item, close, alert)}
                ]} />   
          </AgencyPageWrapper>
}

function RoleManagerPage(props){
  return  <AgencyPageWrapper className="module-wrapper">
            <List className="container"
                headerComponent={<div className="page-header">Agent Roles</div>}
                tableData={Object.values(useSelector(state => state.agency.role))}
                iconComponent={ item => <div>{item.label}</div> }
                listActions={[{label: "+", action: (close, alert) => {
                  let newRole = agencyObject("role", {id: "new_object", label: "new role", role_type: "supervisor"}, () => useSelector(state => state.agency), props.services, props.utilities, alert)
                  return newRole.display.builder(newRole, close, alert)
                }}]}
                drawerComponents={[
                ]}
                overlayComponents={[
                  {label: "document", component: item => item.display.document(item)},
                  {label: "modify", component: (item, close, alert) => item.display.builder(item, close, alert)}
                ]} />
          </AgencyPageWrapper>
}

function UsersManagerPage(props){
  return  <AgencyPageWrapper className="module-wrapper">
            <List className="d-block"
                headerComponent={<div className="page-header">Manage Agency Users</div>}
                tableData={Object.values(useSelector(state => state.agency.user))}
                iconComponent={ item => item.tools.getDisplayName(item) }
                listActions={[
                  {label: "+", action: (close, alert) => {
                    let newUser = agencyObject("user", {id: "new_object", username:"new user", password: "password"}, () => useSelector(state => state.agency), props.services, props.utilities, alert )
                    return newUser.display.builder(newUser, close, alert)
                  }}
                ]}
                drawerComponents={[
                ]}
                overlayComponents={[
                  {label: "show document", component: item => item.display.document(item)},
                  {label: "edit properties", component: (item, close, alert) => item.display.editor(item, close, alert)},
                  {label: "modify user", component: (item, close, alert) => item.display.builder(item, close, alert)}
                ]} />
          </AgencyPageWrapper>

}


export { AgencyPage,
          UsersManagerPage,
          TagManagerPage,
          RoleManagerPage }
