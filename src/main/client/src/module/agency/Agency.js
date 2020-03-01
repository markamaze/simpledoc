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

function SupplementalDataManagerPage(props){
  const agencyState = useSelector(state => (state.agency))
  const dataTagProps = agencyTypeData("dataTag", agencyState).component.list
  const templateProps = agencyTypeData("agentTemplate", agencyState).component.list
  const assignmentProps = agencyTypeData("assignment", agencyState).component.list
  const propertyProps = agencyTypeData("property", agencyState).component.list

  return  <AgencyPageWrapper id="agency-module-page-dataTagsManager" className="module-wrapper">
          <ErrorBoundary displayName="dataTagsManagerPage">

            <List className="container-row border-bottom" {...dataTagProps} headerComponent={<div className="item-label page-header">DataTags</div>}/>


            <List className="container-row border-bottom" {...templateProps} headerComponent={<div className="item-label page-header">Agent Templates</div>} />


            <List className="container-row border-bottom" {...assignmentProps} headerComponent={<div className="item-label page-header">Agency Assignments</div>} />


            <List className="container-row" {...propertyProps} headerComponent={<div className="item-label page-header">Agency Properties</div>} />

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



export { AgencyPage,
          UsersManagerPage,
          SupplementalDataManagerPage }
