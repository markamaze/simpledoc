import React from 'react'
import { fromJS } from 'immutable'

import Form from '../form/Form'
import FormEditor from '../form/FormEditor'
import SectionEditor from '../form/SectionEditor'
import PairsEditor from '../form/PairsEditor'
import TableEditor from '../form/TableEditor'
import GridEditor from '../form/GridEditor'
import ElementEditor from '../form/ElementEditor'
import {FormBuilderStyle} from '../../styles/moduleStyles'
import { updateForm, deleteForm } from '../../store/agencyActions'
import { form } from  '../../store/formdata'


export default class FormBuilder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeobject: null,
      activeobjecttype: null,
      formcopy: this.props.form ? this.props.form : form(),
      currentEditor: null
    }
    this.displayName = "Form Builder"
  }

  //loads local copy of form being modified
  renderFormPreview() {
    let form = this.state.formcopy ? this.state.formcopy : null

    return  <Form form={form}
                    activeObject={this.state.activeobject}
                    headerClick={(object)=>this.setActiveObject(object)}/>
  }

  renderObjectEditor() {
    return this.state.currentEditor ?
      this.state.currentEditor : <div>Select form object header</div>
  }

  setActiveObject(selectedObject) {
    let objecttype = selectedObject.get('type')
    let loadeditor

    switch(objecttype){
      case "FORM":
        loadeditor = <FormEditor  formobject={selectedObject}
                                  setActive={(object)=>this.setActiveObject(object)}
                                  makeChanges={(updatedobject)=>this.updateFormCopy(updatedobject)} />
        break
      case "SECTION":
        loadeditor = <SectionEditor sectionobject={selectedObject}
                                    setActive={(object)=>this.setActiveObject(object)}
                                    makeChanges={(updatedobject)=>this.updateFormCopy(updatedobject)} />
        break
      case "PAIRS":
        loadeditor =  <PairsEditor  pairsobject={selectedObject}
                              makeChanges={(updatedobject)=>this.updateFormCopy(updatedobject)} />
        break
      case "TABLE":
        loadeditor =  <TableEditor  tableobject={selectedObject}
                              makeChanges={(updatedobject)=>this.updateFormCopy(updatedobject)} />
        break
      case "GRID":
        loadeditor =  <GridEditor gridobject={selectedObject}
                            makeChanges={(updatedobject)=>this.updateFormCopy(updatedobject)} />
        break
      case "ELEMENT":
        loadeditor =  <ElementEditor  elementobject={selectedObject}
                                makeChanges={(updatedobject)=>this.updateFormCopy(updatedobject)} />
        break
      default: loadeditor = null

    }

    this.setState({
      activeobject: selectedObject,
      activeobjecttype: objecttype,
      currentEditor: loadeditor
    })
  }

  //saves updated form objects to local state
  updateFormCopy(updatedObject) {
    let oldformcopy = this.state.formcopy
    let newformcopy, elementindex, layoutindex, sectionindex
    let objectid = updatedObject.get('id')
    let objecttype = updatedObject.get('type')


    switch(objecttype) {
      case 'FORM': {
        newformcopy = updatedObject
        break
      }
      case 'SECTION': {
        sectionindex = oldformcopy.get('sections').findIndex(section => section.get('id') == objectid)
        newformcopy = oldformcopy.setIn(['sections', sectionindex], updatedObject)
        break
      }
      case 'PAIRS': {}
      case 'TABLE': {}
      case 'GRID':  {
        sectionindex = oldformcopy.get('sections').findIndex(section => {
            layoutindex = section.get('layouts').findIndex(layout => layout.get('id') == objectid)
            return layoutindex > -1 ? true : false})
        newformcopy = oldformcopy.setIn(['sections', sectionindex, 'layouts', layoutindex], updatedObject)
        break
      }
      case 'ELEMENT': {
        sectionindex = oldformcopy.get('sections').findIndex(section => {
          layoutindex = section.get('layouts').findIndex(layout => {
            elementindex = layout.get('elements').findIndex(element => element.get('id') == objectid)
            return elementindex > -1 ? true: false})

          return layoutindex > -1 ? true : false})

        newformcopy = oldformcopy.setIn(['sections', sectionindex,
                                         'layouts', layoutindex,
                                         'elements', elementindex], updatedObject)
        break
      }
    }

    this.setActiveObject(updatedObject)
    this.setState({ formcopy: newformcopy})
  }



  submitButtons() {
    let localform = this.state.formcopy
    let close = this.props.closeInstance

    return  <div className='instancebuttons' >
              <button onClick={()=>this.reset()} >Reset Session</button>
              <button onClick={()=>close()} >Close Session</button>
              <button onClick={()=>{
                          updateForm(localform)
                          close()}}>Save Form</button>
              <button onClick={()=>{
                          deleteForm(localform)
                          close()}}>
                Delete Form</button>
            </div>
  }

  reset(){
    this.setState({
      formcopy: this.props.form ? this.props.form : form(),
      activeobject: null,
      activeobjecttype: null,
      currentEditor: null
    })
  }

  render() {
    return  <FormBuilderStyle className="formcreaterstyle">
              { this.submitButtons() }
              { this.renderFormPreview() }
              <div className='formcreatersidebar'>
              { this.renderObjectEditor() }
              </div>
            </FormBuilderStyle>
  }
}
