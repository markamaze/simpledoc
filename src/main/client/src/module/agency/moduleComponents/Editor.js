import React from 'react'

import PropertyEditor from './PropertyEditor'
import AssignmentEditor from './AssignmentEditor'
import EditorActions from './EditorActions'


export default class Editor extends React.Component {
  constructor(props){
    super(props)
    this.state = { dataItem: this.props.dataItem }
  }

  static getDerivedStateFromProps(props, state){
    if( props.dataItem === state.dataItem ) return null
    else return { dataItem: props.dataItem }
  }

  updateValues(property, value) {
    this.setState({ dataItem: this.state.dataItem.update({[`${property}`]: value})})
  }

  render() {
    return  <div>
              {
                !this.props.dataItemInfo ? null :
                  this.props.dataItemInfo(this.state.dataItem).map( info =>
                      <div>
                        <span>{info.key}</span>
                        <span>{
                          typeof info.value === "string" ? info.value
                            : typeof info.value === "object" ? info.value.map(item=><span>{item}</span>)
                              : typeof info.value
                        }</span>
                      </div>)
              }
              {
                !this.props.propertyEditor ? null :
                  <PropertyEditor
                      updateValues={(property, value) => this.updateValues(property, value)}
                      propertyName={this.props.propertyEditor.propertyName}
                      propertiesSet={this.props.propertyEditor.propertiesSet(this.state.dataItem)}
                      inheritedProperties={this.props.propertyEditor.inheritedProperties(this.state.dataItem)} />
              }
              {
                  !this.props.assignmentEditor ? null :
                    <AssignmentEditor {...this.props}
                        updateValues={(property, value) => this.updateValues(property, value)}
                        propertyName={this.props.assignmentEditor.propertyName}
                        agentAssignments={this.props.assignmentEditor.agentAssignments(this.state.dataItem)}
                        inheritedAssignments={this.props.assignmentEditor.inheritedAssignments(this.state.dataItem)}
                        implementedAssignments={this.props.assignmentEditor.implementedAssignments(this.state.dataItem)} />
                }
                <EditorActions {...this.props}
                    object={this.state.dataItem}
                    type={this.state.dataItem.type()} />
              </div>
  }
}
