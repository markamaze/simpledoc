import React from 'react'
import { useSelector } from 'react-redux'
import { formObject, formTypeData } from './formObjects/formObject'
import List from '../../components/List'
import ErrorBoundary from './formUtils/ErrorBoundary'

function FormsPage(props){
  const formsState = useSelector(state => state.forms)
  const displayProps = formTypeData("form", formsState).component.list

  return  <div className="container-sm" >
            <ErrorBoundary displayName="FormsPage" >
              <List className="document" {...displayProps} headerComponent={<div className="page-header">Forms Manager</div>}/>
            </ErrorBoundary>
          </div>
}

function FormSetsPage(props){
  const formsState = useSelector(state => state.forms)
  const displayProps = formTypeData("formSet", formsState).component.list

  return  <div className="container-sm" >
            hello form sets
          </div>
}

function SubmissionsPage(props){
  const formsState = useSelector(state => state.forms)
  const displayProps = formTypeData("submission", formsState).component.list

  return  <div className="container-sm" >
            hello form submissions
          </div>
}

function ComplianceCheckPage(props){
  const formsState = useSelector(state => state.forms)

  return  <div className="container-sm" >
            controls for monitoring compliance of subscribscriptions?
          </div>
}

export { FormsPage, FormSetsPage, SubmissionsPage, ComplianceCheckPage }
