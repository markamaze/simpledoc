import React from 'react'
import List from '../../components/List'
import { useSelector } from 'react-redux'
import { AgencyPageWrapper } from './module_styles'
import { agencyObject } from './moduleObjects/agencyObject'

function AgencyPage(props){
  let allNodes = Object.values(useSelector(state => state.agency.node))
  return  <AgencyPageWrapper className="module-wrapper">
            <List className="d-block"
                headerComponent={<div className="page-header">Agency Overview</div>}
                root={allNodes.find(node => node.id === node.parent_id)}
                nodeBranch={node => node.tools.getChildren(node)}
                listActions={[
                  {
                    label: `${allNodes.length === 0 ? "build agency" : ""}`,
                    action: (close, alert) => {
                      let newRootNode = agencyObject("node", {id: "new_object", parent_id: "root", label: "agency root"}, () => useSelector(state => state.agency), props.services, props.utilities, alert)
                      return allNOdes.length === 0 ? null : newRootNode.display.builder(newRootNode, close, alert) }
                  }
                ]}
                iconComponent={node => node.display.card(node)}
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
                tableData={useSelector(state => Object.values(state.agency.tag).filter( tag => tag.tagType === "agent"))}
                iconComponent={item => <div>{item.label}</div>}
                listActions={[
                  {label: "+", action: (close, alert) => {
                    let newDataTag = agencyObject("tag", {id: "new_object", label: "new tag", tagType: "agent"}, () => useSelector(state => state.agency), props.services, props.utilities, alert)
                    return newDataTag.display.builder(newDataTag, close, alert)
                  }}]}
                drawerComponents={[
                  {label: "document", component: item => item.display.document(item)},
                ]}
                overlayComponents={[
                  {label: "modify", component: (item, close, alert) => item.display.builder(item, close, alert)}
                ]} />

            <List className="container"
                headerComponent={<div className="page-header">Node Tags</div>}
                tableData={useSelector(state => Object.values(state.agency.tag).filter(tag => tag.tagType === "structural"))}
                iconComponent={item => <div>{item.label}</div>}
                listActions={[
                  {label: "+", action: (close, alert) => {
                    let newDataTag = agencyObject("tag", {id: "new_object", label: "new tag", tagType: "structural"}, () => useSelector(state => state.agency), props.services, props.utilities, alert)
                    return newDataTag.display.builder(newDataTag, close, alert)
                  }}]}
                drawerComponents={[
                  {label: "document", component: item => item.display.document(item)},
                ]}
                overlayComponents={[
                  {label: "modify", component: (item, close, alert) => item.display.builder(item, close, alert)}
                ]} />   
          </AgencyPageWrapper>
}

function TemplateManagerPage(props){
  return  <AgencyPageWrapper className="module-wrapper">
            <List className="container"
                headerComponent={<div className="page-header">Agent Templates</div>}
                tableData={Object.values(useSelector(state => state.agency.template))}
                iconComponent={ item => <div>{item.label}</div> }
                listActions={[{label: "+", action: (close, alert) => {
                  let newTemplate = agencyObject("template", {id: "new_object", label: "new template"}, () => useSelector(state => state.agency), props.services, props.utilities, alert)
                  return newTemplate.display.builder(newTemplate, close, alert)
                }}]}
                drawerComponents={[
                  {label: "document", component: item => item.display.document(item.data)},
                ]}
                overlayComponents={[
                  {label: "modify", component: (item, close, alert) => item.display.builder(item, close, alert)},
                  {label: "subscriptions", component: (item, close, alert) => item.agencyComponents.subscriptions(item, close, alert)}
                ]} />
          </AgencyPageWrapper>
}

function UsersManagerPage(props){
  return  <AgencyPageWrapper className="module-wrapper">
            <List className="d-block"
                headerComponent={<div className="page-header">Manage Agency Users</div>}
                tableData={Object.values(useSelector(state => state.agency.user))}
                iconComponent={ item => item.display.card(item) }
                listActions={[
                  {label: "+", action: (close, alert) => {
                    let newUser = agencyObject("user", {id: "new_object", username:"new user", password: "password"}, () => useSelector(state => state.agency), props.services, props.utilities, alert )
                    return newUser.display.builder(newUser, close, alert)
                  }}
                ]}
                drawerComponents={[
                  {label: "show document", component: item => item.display.document(item)},
                ]}
                overlayComponents={[
                  {label: "edit properties", component: (item, close, alert) => item.display.editor(item, close, alert)},
                  {label: "modify user", component: (item, close, alert) => item.display.builder(item, close, alert)},
                  {label: "subscriptions", component: (item, close, alert) => item.agencyComponents.subscriptionsList(item, null)}
                ]} />
          </AgencyPageWrapper>

}


export { AgencyPage,
          UsersManagerPage,
          TagManagerPage,
          TemplateManagerPage }
