import React from 'react'




export default class AgencyObjectDataBuilder extends React.Component {

  getInputElement(sectionData){
    if(sectionData.inputType === "text"){
      return <input type="text" className="editor-item-input" value={sectionData.value} onChange={() => this.props.handleValueChange(sectionData.propertyName, event.target.value)} />
    }
    else if(sectionData.inputType === "text-disabled"){
      return <input type="text" className="editor-item-input" disabled value={sectionData.value} onChange={() => this.props.handleValueChange(sectionData.propertyName, event.target.value)} />
    }
    else if(sectionData.inputType === "select"){
      return  <select className="editor-item-input" value={sectionData.value} onChange={() => this.props.handleValueChange(sectionData.propertyName, event.target.value)}>
              <option value="">select</option>
              {
                sectionData.selectOptions.map(option =>
                  <option value={option.value}>{option.key}</option>)
              }
            </select>
    }
  }

  getElementValues(sectionData){
    return <div className="editor-item-value">{sectionData.value}</div>
  }

  render(){
    return  <div className="editor-container">
              {
                this.props.sections.map( section =>
                  <div className="editor-item">
                    <div className="editor-item-label">{section.title}</div>
                    { this.props.disableEditing ? this.getElementValues(section) : this.getInputElement(section) }
                  </div>
                )
              }
            </div>
  }
}
