import React from 'react'

import { EditorWrapper } from '../moduleStyles'
import PropertyBuilder from './moduleComponents/PropertyBuilder'
import AgencyObjectDataBuilder from './moduleComponents/AgencyObjectDataBuilder'
import DataTagSetBuilder from './moduleComponents/DataTagSetBuilder'
import AgentAssignmentBuilder from './moduleComponents/AgentAssignmentBuilder'
import EditorActions from './moduleComponents/EditorActions'



export default class StructuralNodeEditor extends React.Component {

  constructor(props){
    super(props)
    this.state = { structuralNode: this.props.structuralNode }
  }

  updateProperty(property, value){
    this.setState({ structuralNode: this.state.structuralNode.update({[`${property}`]: value})})
  }

  getParentOptions(){
    return this.props.structuralNodes.length === 0 ?
          [{key: "root", value: "root"}]
          : this.props.structuralNodes.map(node => ({key: node.structuralNode_label, value: node.id}))
  }

  getActiveTags(){
    return this.state.structuralNode.structuralNode_dataTag_ids === undefined ? [] : this.state.structuralNode.structuralNode_dataTag_ids
  }

  getAgentAssignments(){
    //combine local assignments with those from any active tags
    return this.state.structuralNode.agent_assignments
  }

  getProperties(){
    //combine local properties with those from any active tags
    return this.state.structuralNode.structuralNode_properties
  }

  getInheritedData(type){
    let inheritedData = [], propName, tags

    tags = this.getActiveTags().map( tagId => this.props.dataTags.find(tag => tag.id === tagId))

    if(type === "properties") propName = "dataTag_properties"
    else if(type === "assignments") propName = "dataTag_typeObjects"

    tags.forEach( tag => {
      inheritedData.push({ inheritedFrom: tag.dataTag_label, data: tag[propName] })
    })

    return inheritedData
  }

  render() {
    return  <EditorWrapper>

              <AgencyObjectDataBuilder
                  sections={[
                    {title: "StructuralNode Id", inputType: "text-disabled", value: this.state.structuralNode.id, propertyName: "id"},
                    {title: "Label", inputType: "text", value: this.state.structuralNode.structuralNode_label, propertyName: "structuralNode_label"},
                    {title: "Set Parent", inputType: "select", selectOptions: this.getParentOptions(), value: this.state.structuralNode.structuralNode_parent_id, propertyName: "structuralNode_parent_id"}
                  ]}
                  handleValueChange={this.updateProperty.bind(this)}
                  disableEditing={this.props.disableEditing} />

              <AgentAssignmentBuilder {...this.props}
                  agentAssignments={this.getAgentAssignments()}
                  updateAssignments={this.updateProperty.bind(this)}
                  propertyName="agent_assignments"
                  inheritedAssignments={this.getInheritedData("assignments")}
                  disableEditing={this.props.disableEditing} />

              <DataTagSetBuilder
                  availableTags={this.props.dataTags.filter(dataTag => dataTag.dataTag_tagType === "structuralNode")}
                  activeTags={this.getActiveTags()}
                  updateTagSet={this.updateProperty.bind(this)}
                  tagPropertyName="structuralNode_dataTag_ids"
                  disableEditing={this.props.disableEditing} />

              <PropertyBuilder
                  updatePropertiesSet={this.updateProperty.bind(this)}
                  propertiesSet={this.getProperties()}
                  propertyKey="structuralNode_properties"
                  inheritedProperties={this.getInheritedData("properties")}
                  disableEditing={this.props.disableEditing} />

              {
                this.props.disableEditing ? null :
                  <EditorActions {...this.props}
                      object={this.state.structuralNode}
                      type="structuralNode" />
              }
            </EditorWrapper>
  }
}
