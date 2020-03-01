import React from 'react'
import { useSelector } from 'react-redux'
import { FormPageWrapper } from './styles'
import { formObject, formTypeData } from './formObjects/formObject'
import List from '../../components/List'
import ErrorBoundary from './formUtils/ErrorBoundary'

function FormsPage(props){
  const formsState = useSelector(state => state.forms)
  const displayProps = formTypeData("form", formsState).component.list

  return  <FormPageWrapper >
            <ErrorBoundary displayName="FormsPage" >
              <List className="document" {...displayProps} headerComponent={<div className="page-header">Forms Manager</div>}/>
            </ErrorBoundary>
          </FormPageWrapper>
}

function FormSetsPage(props){
  const formsState = useSelector(state => state.forms)
  const displayProps = formTypeData("formSet", formsState).component.list

  return  <FormPageWrapper >
            hello form sets
          </FormPageWrapper>
}

function SubmissionsPage(props){
  const formsState = useSelector(state => state.forms)
  const displayProps = formTypeData("submission", formsState).component.list

  return  <FormPageWrapper >
            hello form submissions
          </FormPageWrapper>
}

function ComplianceCheckPage(props){
  const formsState = useSelector(state => state.forms)

  return  <FormPageWrapper >
            controls for monitoring compliance of subscribscriptions?
          </FormPageWrapper>
}

export { FormsPage, FormSetsPage, SubmissionsPage, ComplianceCheckPage }
