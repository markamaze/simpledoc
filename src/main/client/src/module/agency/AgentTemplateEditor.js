import React from 'react'

import { EditorWrapper } from '../moduleStyles'
import PropertyBuilder from './moduleComponents/PropertyBuilder'
import DataTagSetBuilder from './moduleComponents/DataTagSetBuilder'
import AgencyObjectDataBuilder from './moduleComponents/AgencyObjectDataBuilder'
import EditorActions from './moduleComponents/EditorActions'
import AgentRoleBuilder from './moduleComponents/AgentRoleBuilder'


export default class AgentTemplateEditor extends React.Component {
  constructor(props){
    super(props)
    this.state = { agentTemplate: props.agentTemplate }
  }

  updateProperty(property, value){
    this.setState({
      agentTemplate: this.state.agentTemplate.update({[`${property}`]: value})
    })
  }

  getProperties(){
    return this.state.agentTemplate.agentTemplate_properties === undefined ? [] : this.state.agentTemplate.agentTemplate_properties
  }

  getActiveTags(){
    return this.state.agentTemplate.agentTemplate_dataTag_ids === undefined ? [] : this.state.agentTemplate.agentTemplate_dataTag_ids
  }

  getTypeData(){ return {security: this.state.agentTemplate.agentTemplate_security} }

  getInheritedData(type){
    let inheritedData = [], propName, tags

    tags = this.getActiveTags().map( tagId => this.props.dataTags.find(tag => tag.id === tagId))

    if(type === "properties") propName = "dataTag_properties"
    else if(type === "roles") propName = "dataTag_typeObjects"

    tags.forEach( tag => {
      inheritedData.push({ inheritedFrom: tag.dataTag_label, data: tag[propName] })
    })

    return inheritedData
  }

  render() {
    return  <EditorWrapper>

              <AgencyObjectDataBuilder
                  sections={[{title: "AgentTemplate Id", inputType: "text-disabled", value: this.state.agentTemplate.id, propertyName: "id"},
                            {title: "AgentTemplate Label", inputType: "text", value: this.state.agentTemplate.agentTemplate_label, propertyName: "agentTemplate_label"}]}
                  handleValueChange={this.updateProperty.bind(this)} />

              <AgentRoleBuilder
                  agentRole={this.getTypeData()}
                  updateRole={(prop, value) => this.updateProperty(prop, value.security)} //agent role returns an object containing a security property, extract only the value to update
                  propertyName={"agentTemplate_security"}
                  inheritedRoles={this.getInheritedData("roles")} />

              <DataTagSetBuilder
                  availableTags={this.props.dataTags.filter(dataTag => dataTag.dataTag_tagType === "agent")}
                  activeTags={this.getActiveTags()}
                  updateTagSet={this.updateProperty.bind(this)}
                  tagPropertyName="agentTemplate_dataTag_ids" />

              <PropertyBuilder
                  updatePropertiesSet={this.updateProperty.bind(this)}
                  propertiesSet={this.getProperties()}
                  propertyKey="agentTemplate_properties"
                  inheritedProperties={this.getInheritedData("properties")} />

              <EditorActions {...this.props}
                  object={this.state.agentTemplate}
                  type="agentTemplate" />

            </EditorWrapper>
  }
}
