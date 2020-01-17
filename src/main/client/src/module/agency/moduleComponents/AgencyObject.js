import React, { useState } from 'react'

import ObjectData from './ObjectData'
import Properties from './Properties'
import DataTags from './DataTags'
import Assignments from './Assignments'
import Roles from './Roles'

import ErrorBoundary from '../agencyUtils/ErrorBoundary'

function ToggleView(props){
  return  <div>
            <span className={`${props.view === "card" ? "toggle" : "toggle active"}`}
                  onClick={() => props.setView("card")} >card</span>
            <span className={`${props.view === "editor" ? "toggle" : "toggle active"}`}
                  onClick={() => props.setView("editor")} >editor</span>
            <span className={`${props.view === "builder" ? "toggle" : "toggle active"}`}
                  onClick={() => props.setView("builder")} >builder</span>
          </div>
}
ToggleView.propTypes = {
  view: {},
  setView: {}
}
ToggleView.displayName = "ToggleView"

function Buttons(props){
  return  <div className="action-creator-panel">
          {
            Object.values(props.actionCreators).map(value =>
              <button onClick={() => value.action.call(props.dataItem, props, props.success, props.failure )}>
                {value.label}
                </button>)
          }
          </div>
}

function AgencyObject(props){

  const [view, setView] = useState(props.viewType)
  const [dataItem, setDataItem] = useState(props.dataItem)

  function updateDataItem(property, value){
    setDataItem(dataItem.update({[`${property}`]: value}, error => { throw error }))
  }

  return  <ErrorBoundary displayName={`AgencyObject: ${dataItem.id}`}>
            <ToggleView setView={setView} view={view} />

            {
              !props.displayProps.objectData ? null :
                  <ObjectData
                    dataItem={dataItem}
                    objectData={props.displayProps.objectData[`${view}`]}
                    viewType={view}
                    updateAgencyObject={(property, value) => updateDataItem(property, value)} />
            }
            {
              !props.displayProps.properties ? null :
                  <Properties
                      dataItem={dataItem}
                      properties={props.displayProps.properties[`${view}`]}
                      viewType={view}
                      updateAgencyObject={(property, value) => updateDataItem(property, value)} />
            }
            {
              !props.displayProps.tags ? null :
                  <DataTags
                      dataItem={dataItem}
                      tags={props.displayProps.tags[`${view}`]}
                      viewType={view}
                      updateAgencyObject={(property, value) => updateDataItem(property, value)} />
            }
            {
              !props.displayProps.assignments ? null :
                  <Assignments
                      dataItem={dataItem}
                      assignments={props.displayProps.assignments[`${view}`]}
                      viewType={view}
                      updateAgencyObject={(property, value) => updateDataItem(property, value)} />
            }
            {
              !props.displayProps.roles ? null :
                  <Roles
                      dataItem={dataItem}
                      roles={props.displayProps.roles[`${view}`]}
                      viewType={view}
                      updateAgencyObject={(property, value) => updateDataItem(property, value)} />
            }
            {
              !props.displayProps.actionCreators ? null :
                  <Buttons
                      success={ result => setOverLay(result) }
                      failure={ error => { throw error } }
                      viewType={view}
                      actionCreators={props.displayProps.actionCreators} />
            }

          </ErrorBoundary>
}
export default AgencyObject
