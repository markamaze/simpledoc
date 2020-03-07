import React from 'react'
import List from '../../components/List'
import { useSelector } from 'react-redux'
import { AgencyPageWrapper } from './module_styles'
import ErrorBoundary from './agencyUtils/ErrorBoundary'
import { agencyTypeData } from './moduleObjects/agencyObject'

function AgencyPage(props){

  const agencyState = useSelector(state => (state.agency))
  const displayProps = agencyTypeData("structuralNode", agencyState).component.list

  return  <div className="">
            <ErrorBoundary displayName="AgencyPage" >
              <List {...displayProps}
                  className=""
                  headerComponent={<div className="page-header">Agency Overview</div>}/>
            </ErrorBoundary>
          </div>
}

function SupplementalDataManagerPage(props){
  const agencyState = useSelector(state => (state.agency))
  const dataTagProps = agencyTypeData("dataTag", agencyState).component.list
  const templateProps = agencyTypeData("agentTemplate", agencyState).component.list
  const assignmentProps = agencyTypeData("assignment", agencyState).component.list
  const propertyProps = agencyTypeData("property", agencyState).component.list

  return  <AgencyPageWrapper className="module-wrapper">
          <ErrorBoundary displayName="dataTagsManagerPage">
            <List className="container" {...dataTagProps} headerComponent={<div className="page-header">DataTags</div>}/>


            <List className="container" {...templateProps} headerComponent={<div className="page-header">Agent Templates</div>} />

            <List className="container" {...assignmentProps} headerComponent={<div className="page-header">Agency Assignments</div>} />


            <List className="container" {...propertyProps} headerComponent={<div className="page-header">Agency Properties</div>} />

          </ErrorBoundary>
          </AgencyPageWrapper>
}

function UsersManagerPage(props){
  const agencyState = useSelector(state => (state.agency))
  const displayProps = agencyTypeData("user", agencyState).component.list


  return  <AgencyPageWrapper id="agency-module-page-UsersManagerPage" className="module-wrapper">
          <ErrorBoundary displayName="UsersManagerPage">
            <List {...displayProps}
                className=""
                headerComponent={<div className="page-header">Manage Agency Users</div>} />
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
