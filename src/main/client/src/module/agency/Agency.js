import React from 'react'
import List from './moduleComponents/List'
import { useSelector, connect } from 'react-redux'
import { ModuleWrapper } from '../moduleStyles'
import ErrorBoundary from './agencyUtils/ErrorBoundary'


function AgencyPage(props){
  const structuralNodes = useSelector(state => (state.agency.structuralNodes))

  const dataSet = () =>
    <List className="page agency-page "
        treeRoot={structuralNodes.find( n=>n.id===n.structuralNode_parent_id)}
        rootIdKey="id"
        treeNodeKey="structuralNode_parent_id"
        dataSet={structuralNodes}
        columns={[{label: "", selector: "structuralNode_label"}]}
        itemComponent={ item => item.display.call(item, props, error=>{throw new Error(`${error}: handled by Agency`)}).card}
        itemActions={[
          {label: "+", action: item => this.newChildNode(item) },
          {label: "restructure", action: item => item.display.call(item, props, error=>{throw new Error(`${error}: handled by Agency`)}).builder},
          {label: "edit", action: item => item.display.call(item, props, error=>{throw new Error(`${error}: handled by Agency`)}).editor}
        ]}
        headerComponent={<div className="page-header">Agency Overview</div>} />

  try {

  return  <ModuleWrapper id="agency-module" className="module-wrapper">
            <ErrorBoundary displayName="AgencyPage" >{dataSet()}</ErrorBoundary>
            </ModuleWrapper>
  } catch(err){ throw new Error(`${err}: eror in AgencyPage`)}
}

function TemplatesManagerPage(props){
  const agentTemplates = useSelector(state => state.agency.agentTemplates)

  const dataList = () =>
    <List
        dataSet={agentTemplates}
        columns={[
          {label: "label", selector: "agentTemplate_label"},
          // {label: "Password", selector: "password"},
          {label: "Id", selector: "id"}
        ]}
        itemComponent={ item => item.display.call(item, props, error => { throw new Error(`${error}: handled by Agency`)}).card}
        itemActions={[
          {label: "modify", action: item => item.display.call(item, props, error => { throw new Error(`${error}@UsersManagerPage@Agency`)}).builder}
        ]}
        headerComponent={<div className="page-header">Manage Agency TemplatesManagerPage</div>} />

  return  <ModuleWrapper id="agency-module-page-templateManager" className="module-wrapper">
          <ErrorBoundary displayName="TemplatesManagerPage">{dataList()}</ErrorBoundary>
          </ModuleWrapper>
}

function DataTagsManagerPage(props){
  const dataTags = useSelector(state => state.agency.dataTags)

  const dataList = () =>
    <List
        dataSet={dataTags}
        columns={[{label: "label", selector: "dataTag_label"},{label: "Id", selector: "id"}]}
        itemComponent={ item => item.display.call(item, props, error => { throw new Error(`${error}: handled by Agency`)}).card}
        itemActions={[
          {label: "modify", action: item => item.display.call(item, props, error => { throw new Error(`${error}@DataTagsManagerPage@Agency`)}).builder}
        ]}
        headerComponent={<div className="page-header">Manage Agency DataTagsManagerPage</div>} />

  return  <ModuleWrapper id="agency-module-page-dataTagsManager" className="module-wrapper">
          <ErrorBoundary displayName="dataTagsManagerPage">{dataList()}</ErrorBoundary>
          </ModuleWrapper>
}

function UsersManagerPage(props){
  const users = useSelector(state => state.agency.users)

  const dataList = () =>
    <List
        dataSet={users}
        columns={[{label: "Username", selector: "username"},{label: "userId", selector: "id"}]}
        itemComponent={ item => item.display.call(item, props, error => { throw new Error(`${error}: handled by Agency`)}).card}
        itemActions={[
          {label: "modify", action: item => item.display.call(item, props, error => { throw new Error(`${error}@UsersManagerPage@Agency`)}).builder}
        ]}
        headerComponent={<div className="page-header">Manage Agency Users</div>} />

  return  <ModuleWrapper id="agency-module-page-UsersManagerPage" className="module-wrapper">
          <ErrorBoundary displayName="UsersManagerPage">{dataList()}</ErrorBoundary>
          </ModuleWrapper>

}

export { AgencyPage,
          UsersManagerPage,
          DataTagsManagerPage,
          TemplatesManagerPage }
