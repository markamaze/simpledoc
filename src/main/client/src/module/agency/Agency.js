import React from 'react'
import List from '../../components/List'
import { useSelector } from 'react-redux'
import { AgencyPageWrapper } from './agencyStyles'
import ErrorBoundary from './agencyUtils/ErrorBoundary'
import { agencyTypeData } from './moduleObjects/agencyObject'

function AgencyPage(props){

  const agencyState = useSelector(state => (state.agency))
  // const rootNode = structuralNodes.find( node => node.id === node.structuralNode_parent_id)

  // const addStructuralNode = () => {}
  const displayProps = agencyTypeData("structuralNode", agencyState).component.list


  return  <AgencyPageWrapper id="agency-module" className="module-wrapper">
            <ErrorBoundary displayName="AgencyPage" >
              <List {...displayProps} headerComponent={<div className="page-header">Agency Overview</div>}/>
            </ErrorBoundary>
            </AgencyPageWrapper>
}

function TemplatesManagerPage(props){
  const agencyState = useSelector(state => state.agency)
  const displayProps = agencyTypeData("agentTemplate", agencyState).component.list


  return  <AgencyPageWrapper id="agency-module-page-templateManager" className="module-wrapper">
          <ErrorBoundary displayName="TemplatesManagerPage">
            <List {...displayProps} headerComponent={<div className="page-header">Manage Templates</div>} />
          </ErrorBoundary>
          </AgencyPageWrapper>
}

function DataTagsManagerPage(props){
  const agencyState = useSelector(state => (state.agency))
  const displayProps = agencyTypeData("dataTag", agencyState).component.list


  return  <AgencyPageWrapper id="agency-module-page-dataTagsManager" className="module-wrapper">
          <ErrorBoundary displayName="dataTagsManagerPage">
            <List {...displayProps} headerComponent={<div className="page-header">DataTags</div>}/>
          </ErrorBoundary>
          </AgencyPageWrapper>
}

function UsersManagerPage(props){
  const agencyState = useSelector(state => (state.agency))
  const displayProps = agencyTypeData("user", agencyState).component.list


  return  <AgencyPageWrapper id="agency-module-page-UsersManagerPage" className="module-wrapper">
          <ErrorBoundary displayName="UsersManagerPage">
            <List {...displayProps} headerComponent={<div className="page-header">Manage Agency Users</div>} />
          </ErrorBoundary>
          </AgencyPageWrapper>

}

export { AgencyPage,
          UsersManagerPage,
          DataTagsManagerPage,
          TemplatesManagerPage }
