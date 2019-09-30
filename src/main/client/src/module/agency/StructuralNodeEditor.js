import React from 'react'

import DataTableWrapper from '../../components/DataTableWrapper'
import { EditorWrapper } from '../../styles/moduleStyles'
import TagWrapper from '../../components/TagWrapper'




export default class StructuralNodeEditor extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: {
        id: this.props.structuralNode.id,
        type: "structuralNode",
        label: this.props.structuralNode.label ? this.props.structuralNode.label : "",
        parentId: this.props.structuralNode.parentId ? this.props.structuralNode.parentId : "",
        agentAssignments: this.props.structuralNode.agentAssignments ? this.props.structuralNode.agentAssignments : [],
        dataTags: this.props.structuralNode.dataTags ? this.props.structuralNode.dataTags : []
      },
      openAgentTemplateSetting: false,
      openDataTagSetting: false
    }
  }

  updateLabel(value){
    this.setState({
      data: Object.assign({}, this.state.data, {label: value })
    })
  }

  updateParent(value){
    this.setState({
      data: Object.assign({}, this.state.data, {parentId: value })
    })
  }

  updateTemplateCount(id, flag){
    let template = this.state.data.agentAssignments.find(template => template.id === id)
    let set = Object.assign([], this.state.data.agentAssignments.filter(template => template.id !== id))


    switch(flag){
      case "increment":
        if(template.limit < 1) template = Object.assign({}, template, {limit: 1})
        else template = Object.assign({}, template, {limit: template.limit + 1})
        break

      case "decrement":
        if(template.limit < 1) template = Object.assign({}, template, {limit: -1})
        else template = Object.assign({}, template, {limit: template.limit -1})


    }

    this.setState({ data: Object.assign({}, this.state.data, {agentAssignments: set.concat(template)} )})
  }

  addTemplate(templateId) {
    let alreadyIncluded = this.state.data.agentAssignments.find(template => template.id === templateId)

    if(!alreadyIncluded) {
      let newSet = Object.assign([], this.state.data.agentAssignments.concat({id: templateId, limit: 1}))
      this.setState({ data: Object.assign({}, this.state.data, {agentAssignments: newSet})})
    }
  }

  removeTemplate(templateId) {
    let newSet = Object.assign([], this.state.data.agentAssignments.filter(template => template.id !== templateId))

    this.setState({ data: Object.assign({}, this.state.data, {agentAssignments: newSet })})


  }

  getAgentTemplateColumns() {
    return [
      {name: "Agent", selector: "agent", sortable: true, compact: true},
      {name: "Max Active", selector: "limit", ignoreRowClick: true, maxWidth: "2rem",
          cell: row =>  <div>
                          <span className="px-3" onClick={()=> this.updateTemplateCount(row.id, "decrement")}>-</span>
                          {row.limit < 1 ? "any" : row.limit}
                          <span className="px-3" onClick={() => this.updateTemplateCount(row.id, "increment")}>+</span>
                        </div> },
      {name: "Remove", selector: "remove", compact: true, maxWidth: "1rem",
          cell: row => <div onClick={() => this.removeTemplate(row.id)}>X</div>,
          ignoreRowClick: true}
    ]
  }

  getAgentTemplateListData() {
    let results = []

    this.state.data.agentAssignments.forEach( assignment => {
        let agentTemplate = this.props.agentTemplates.find( template => template.id === assignment.id)

        results = Object.assign([], results.concat({
                    agent: agentTemplate.label,
                    limit: assignment.limit,
                    id: assignment.id
                  }))
      })

    return results
  }

  toggleDataTags(id){
    let currentTags = Object.assign([], this.state.data.dataTags)

    this.setState({ data: Object.assign({}, this.state.data, {dataTags:
      currentTags.includes(id) ?
        currentTags.filter( tagId => tagId !== id )
        : Object.assign([], currentTags.concat(id))
    })})
  }

  render() {
    return  <EditorWrapper>
              <div className="editor-item">
                <div className="editor-item-label">Id</div>
                <input type="text" disabled value={this.state.data.id} />
              </div>

              <div className="editor-item">
                <div className="editor-item-label">Label</div>
                <input type="text" value={this.state.data.label}
                    onChange={() => this.updateLabel(event.target.value)}/>
              </div>

              <div className="editor-item">
                <div className="editor-item-label">Assign to Parent</div>
                <select className="editor-selector" value={this.state.data.parentId}
                    onChange={() => this.updateParent(event.target.value)}>
                  <option value="" key={`select_parent_structuralNode`}>Select Parent</option>
                  <option value="root" key={`select_parent_structuralNode_root`}>Root Structure</option>
                  {
                    this.props.agencyStructures.map( structuralNode =>
                      <option value={structuralNode.id} key={`structuralNode_${structuralNode.id}`}>{structuralNode.label}</option> )
                  }
                </select>
              </div>



              <div className="editor-item">
                <div className="editor-item-label">Agent Templates</div>

                <DataTableWrapper
                    noHeader={true}
                    subHeader={true}
                    subHeaderComponent={
                      <select className="editor-selector" value="" onChange={() => this.addTemplate(event.target.value)}>
                        <option value="">select new template to add</option>
                        {
                          this.props.agentTemplates.map( template =>
                            <option value={template.id}>{template.label}</option>)
                        }
                      </select>
                    }
                    columns={this.getAgentTemplateColumns()}
                    data={this.getAgentTemplateListData()}
                />
              </div>


              {/*add group for defining heirarchy of included agents on the structure*/}


              <div className="editor-item">
                <div className="editor-item-label">Set Tags</div>
                <div className="editor-item-tags">
                  {
                    this.props.dataTags.filter(dataTag => dataTag.tagFor === "structural")
                                       .map( structuralTag => <TagWrapper className={`tag${this.state.data.dataTags.includes(structuralTag.id) ? "-included" : ""}`}
                                                                  onClick={() => this.toggleDataTags(structuralTag.id)}>
                                                                {structuralTag.label}
                                                              </TagWrapper>)
                  }
                </div>
              </div>

              {
                !this.props.buttons ? null :
                  <div className="editor-buttons">
                    { this.props.buttons.map(button =>
                        <button
                            onClick={() => button.handler(this.state.data)}
                            key={`structural_editor_button_${button.label}_${this.state.data.id}`} >
                        {button.label}</button>)
                    }
                  </div>
              }
            </EditorWrapper>
  }
}
