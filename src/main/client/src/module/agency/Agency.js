import React from 'react'
import List from '../../components/List'
import { useSelector } from 'react-redux'
import { AgencyPageWrapper } from './module_styles'
import ErrorBoundary from './agencyUtils/ErrorBoundary'
import { agencyTypeData } from './moduleObjects/agencyObject'

function AgencyPage(props){

  const agencyState = useSelector(state => (state.agency))
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

function RoleManagerPage(props){
  const agencyState = useSelector(state => (state.agency))
  const displayProps = agencyTypeData("role", agencyState).component.list


  return  <AgencyPageWrapper id="agency-module-page-RoleManagerPage" className="module-wrapper">
          <ErrorBoundary displayName="RoleManagerPage">
            <List {...displayProps} headerComponent={<div className="page-header">Manage Agency Roles</div>} />
          </ErrorBoundary>
          </AgencyPageWrapper>

}

function AssignmentManagerPage(props){
  const agencyState = useSelector(state => (state.agency))
  const displayProps = agencyTypeData("assignment", agencyState).component.list


  return  <AgencyPageWrapper id="agency-module-page-AssignmentManagerPage" className="module-wrapper">
          <ErrorBoundary displayName="AssignmentManagerPage">
            <List {...displayProps} headerComponent={<div className="page-header">Manage Agency Assignments</div>} />
          </ErrorBoundary>
          </AgencyPageWrapper>

}

function PropertyManagerPage(props){
  const agencyState = useSelector(state => (state.agency))
  const displayProps = agencyTypeData("property", agencyState).component.list


  return  <AgencyPageWrapper id="agency-module-page-PropertyManagerPage" className="module-wrapper">
          <ErrorBoundary displayName="PropertyManagerPage">
            <List {...displayProps} headerComponent={<div className="page-header">Manage Agency Properties</div>} />
          </ErrorBoundary>
          </AgencyPageWrapper>

}

export { AgencyPage,
          UsersManagerPage,
          DataTagsManagerPage,
          TemplatesManagerPage,
          RoleManagerPage,
          AssignmentManagerPage,
          PropertyManagerPage }
