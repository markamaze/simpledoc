import React from 'react'

import PropertyBuilder from '../moduleComponents/PropertyBuilder'
import AgencyObjectDataBuilder from '../moduleComponents/AgencyObjectDataBuilder'
import DataTagSetBuilder from '../moduleComponents/DataTagSetBuilder'
import AgentAssignmentBuilder from '../moduleComponents/AgentAssignmentBuilder'
import BuilderActions from '../moduleComponents/BuilderActions'
import AgentRoleBuilder from '../moduleComponents/AgentRoleBuilder'





export default class Builder extends React.Component {
  constructor(props){
    super(props)
    this.state = { dataItem: this.props.dataItem }
  }

  updateProperty(property, value){
    this.setState({
      dataItem: this.state.dataItem.update({[`${property}`]: value})
    })
  }

  getTypeSpecificComponent(){
    let item = this.state.dataItem

    switch(item.type()){
      case "dataTag":
        let type = this.state.dataItem.dataTag_tagType
        if(type === "agent")
          return <AgentRoleBuilder
              agentRole={this.props.typeSpecificBuilder(type).roleBuilder.agentRole(item)}
              updateRole={(prop, value) => this.updateProperty(prop, [value])}
              propertyName={this.props.typeSpecificBuilder(type).roleBuilder.propertyName} />

        else if(type === "structuralNode")
          return <AgentAssignmentBuilder {...this.props}
                      agentAssignments={this.props.typeSpecificBuilder(type).assignmentBuilder.agentAssignments(item)}
                      updateAssignments={this.updateProperty.bind(this)}
                      propertyName={this.props.typeSpecificBuilder(type).assignmentBuilder.propertyName} />
    }
  }

  render(){
    let propKeySet = Object.keys(this.props)
    return  <div>
              {
                !this.props.agencyObjectData ? null :
                  <AgencyObjectDataBuilder
                      sections={this.props.agencyObjectData.sections.call(this.state.dataItem)}
                      handleValueChange={(prop, value) => this.updateProperty(prop, value)} />
              }
              {
                !propKeySet.includes("propertyBuilder") ? null :
                  <PropertyBuilder
                      updatePropertiesSet={(prop, value) => this.updateProperty(prop, value)}
                      propertiesSet={this.props.propertyBuilder.propertiesSet(this.state.dataItem)}
                      inheritedProperties={this.props.propertyBuilder.inheritedProperties(this.state.dataItem, this.props.dataTags)}
                      propertyKey={this.props.propertyBuilder.propertyKey} />
              }
              {
                !propKeySet.includes("assignmentBuilder") ? null :
                  <AgentAssignmentBuilder {...this.props}
                      agentAssignments={this.props.assignmentBuilder.agentAssignments(this.state.dataItem)}
                      updateAssignments={(prop, value) => this.updateProperty(prop, value)}
                      inheritedAssignments={this.props.assignmentBuilder.inheritedAssignments(this.state.dataItem, this.props.dataTags)}
                      propertyName={this.props.assignmentBuilder.propertyName} />
              }
              {
                !propKeySet.includes("roleBuilder") ? null :
                  <AgentRoleBuilder
                      agentRole={this.props.roleBuilder.agentRole(this.state.dataItem)}
                      updateRole={(prop, value) => this.updateProperty(prop, value.security)}
                      inheritedRole={null} //TODO: this has not yet been build
                      propertyName={this.props.roleBuilder.propertyName} />
              }
              {
                !propKeySet.includes("dataTagSetBuilder") ? null :
                  <DataTagSetBuilder
                      availableTags={this.props.dataTagSetBuilder.availableTags(this.props.dataTags)}
                      activeTags={this.props.dataTagSetBuilder.activeTags(this.state.dataItem)}
                      updateTagSet={(prop, value) => this.updateProperty(prop, value)}
                      tagPropertyName={this.props.dataTagSetBuilder.tagPropertyName} />
              }
              {
                !propKeySet.includes("typeSpecificBuilder") ? null :
                  this.getTypeSpecificComponent()
              }

              <BuilderActions {...this.props}
                  object={this.state.dataItem}
                  type={this.state.dataItem.type()} />
            </div>
  }
}
