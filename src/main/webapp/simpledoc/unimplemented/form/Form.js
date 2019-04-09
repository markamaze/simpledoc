import React from 'react'

import { FormStyle } from '../../styles/formStyles'
import Section from './Section'




export default class Form extends React.Component {

  buildForm(form, formdata) {
    return  <FormStyle  className={`form ${this.props.activeObject === this.props.form ? 'active' : null}`} >
                { this.buildHeader(form.get('label')) }
                { this.buildSections(form.get('sections'), formdata) }
                { this.renderButtons() }
              </FormStyle>
  }

  buildHeader(title) {
    return  <div className="header" >
              <span className='headertitle'
                    onClick={()=>this.props.headerClick(this.props.form)}>
                {title}
              </span>
              <span className='headertools'>
                { typeof this.props.injectEditor ? this.props.injectEditor : null }
              </span>
            </div>
  }

  buildSections(sections, formdata){
    let loadedsections
    formdata ?
      loadedsections = this.loadData(sections, formdata)
      : loadedsections = sections


    return <div className="container" >{sections.map(section =>
      <Section  section={section}
                activeObject={this.props.activeObject}
                headerClick={this.props.headerClick} />)}</div>
  }

  loadData(sections, formdata){
    // return formdata.forEach(dataelement =>
    //   sections.find(section => section.get('sectionid') == dataelement.get('sectionid'))
    //           .get('layouts')
    //           .find(layout => layout.get('layoutid') == dataelement.get('layoutid'))
    //           .get('elements')
    //           .find(element => element.get('elementid') == dataelement.get('elementid'))
    //           .set('dataelement', dataelement))
  }

  renderButtons() {
    return this.props.children ?
      <div className='formbuttons' >{this.props.children}</div>
      : null
  }

  render() {
    return this.buildForm(this.props.form, this.props.formdata)
  }
}
