import React from 'react'
import { useSelector } from 'react-redux'

import { formObject } from './formObjects/formObject'
import List from '../../components/List'

function FormsPage(props){

  return  <div className="container-sm" >
            <List className="d-block"
                headerComponent={<div>Forms</div>}
                tableData={Object.values(useSelector(state => state.forms.form))}
                columns={[{label: "Form Title", selector: "label"}]}
                listActions={[
                  { label: "create form", action: () => {
                      let newForm = formObject( "form",
                                                {id: "new_object", label: "new form"},
                                                () => useSelector(state => state),
                                                props.services,
                                                props.utilities,
                                                error => console.log(error))
                      return newForm.display.builder(newForm)
                  }},
                  { label: "send list to workspace", action: () => { props.utilities.sendToWorkspace(this) }}
                ]}
                overlayComponents={[
                  {label: "show form", component: item => item.display.document(item)},
                  {label: "modify", component: item => item.display.builder(item)},
                  {label: "subscriptions", component: item => item.component.subscriptions(item)}
                ]} />
          </div>
}

function FormSetsPage(props){
  const formSetData = useSelector(state => state.forms).formSet

  return  <div className="container-sm" >
            { formSetDisplays("formSet").component.list(formSetData, <div className="page-header">FormSet Manager</div>) }
          </div>
}

function SubmissionsPage(props){
  const formSubmissionData = useSelector(state => state.forms).submission

  return  <div className="container-sm" >
            { formSetDisplays("submission").component.list(formSubmissionData, <div className="page-header">Submissions</div>) }
          </div>
}

export { FormsPage, FormSetsPage, SubmissionsPage }
