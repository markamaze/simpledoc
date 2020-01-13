import React from 'react'
import { DisplayWrapper } from '../module_styles'


function DisplayCard(props) {
  return  <DisplayWrapper>
            <div className="display-card-header">
              {
                props.header.call(props.dataItem)
              }
            </div>
            <div className="display-card-component">
              {
                props.agencyObjectData.call(props.dataItem)
              }
            </div>
            <div className="display-card-component">
              {
                //props.tags
              }
            </div>
            <div className="display-card-component">
              {
                //props.assignments
              }
            </div>
            <div className="display-card-component">
              {
                //props.properties
              }
            </div>
            <div className="display-card-component">
              {
                //props.roles
              }
            </div>
          </DisplayWrapper>
}

export default DisplayCard
