import React from 'react'

import { EditorWrapper } from '../moduleStyles'
import PropertyBuilder from './moduleComponents/PropertyBuilder'
import AgencyObjectDataBuilder from './moduleComponents/AgencyObjectDataBuilder'
import EditorActions from './moduleComponents/EditorActions'
import AgentAssignmentBuilder from './moduleComponents/AgentAssignmentBuilder'
import AgentRoleBuilder from './moduleComponents/AgentRoleBuilder'


export default class DataDataTag extends React.Component {
  constructor(props){
    super(props)
    this.state = { dataTag: props.dataTag }
  }

  updateProperty(property, value){
    this.setState({ dataTag: this.state.dataTag.update({[`${property}`]: value})})
  }

  getTypeSpecificTools(){
    let type = this.state.dataTag.dataTag_tagType

    switch(type){
      case "agent":
        return  <AgentRoleBuilder
                    agentRole={this.state.dataTag.dataTag_typeObjects}
                    updateRole={(prop, value) => this.updateProperty(prop, [value])} //there should only be one role in a tag, but dataTag_typeObjects uses an array, so wrap the value as an array of size 1
                    propertyName={"dataTag_typeObjects"} />
        break
      case "structuralNode":
        return  <AgentAssignmentBuilder {...this.props}
                    agentAssignments={this.state.dataTag.dataTag_typeObjects}
                    updateAssignments={this.updateProperty.bind(this)}
                    propertyName="dataTag_typeObjects" />
        break
    }
  }

  render() {

    return  <EditorWrapper>

              <AgencyObjectDataBuilder
                  sections={[
                    {title: "DataTag Id", inputType: "text-disabled", value: this.state.dataTag.id, propertyName: "id"},
                    {title: "Label", inputType: "text", value: this.state.dataTag.dataTag_label, propertyName: "dataTag_label"},
                    {title: "DataTag Type", inputType: "select", selectOptions: [{key: "Agent", value: "agent"}, {key: "Structural", value: "structuralNode"}], value: this.state.dataTag.dataTag_tagType, propertyName: "dataTag_tagType"}
                  ]}
                  handleValueChange={this.updateProperty.bind(this)} />

              { this.getTypeSpecificTools() }

              <PropertyBuilder
                  updatePropertiesSet={this.updateProperty.bind(this)}
                  propertiesSet={this.state.dataTag.dataTag_properties}
                  propertyKey="dataTag_properties" />

              <EditorActions {...this.props}
                  object={this.state.dataTag}
                  type="dataTag" />

            </EditorWrapper>
  }
}
