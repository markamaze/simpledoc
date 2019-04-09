import React from 'react'

import { ElementStyle } from '../../styles/formStyles'
import ElementInput from './ElementInput'
import ElementSelector from './ElementSelector'

//props: element, elementdata
//element data structure: id, key, value, valuetype, selectorValues, displayProperties, businessProperties
//    different layouts require different display types
//    when form is built, displayProperties will be set to accomplish this
//    for Pair: will be set to display key & value with a seperator
//    for Table & Grid: will only display value, Layout will be responsible for key

//when user builds a form and chooses a custom selector it will be implemented...
//  ...by defining the selectorValues which will be part of the data structure
//      can be enumerated, predefined sets, or existing business objects
//      will be prompted by defining valueType as some type of selector

//when rendering the value
//    if displaying as a immutable document, just display as text
//    otherwise, check the type and load input component
//    any data needed for the input components will be passed in by props
export default class Element extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showkey: true,
      showvalue: true,
      showvalueastext: false,
      value: null
    }
  }

  buildElement(element){
    return  <ElementStyle className={`element ${this.props.activeObject === this.props.element ? 'active' : null}`} onClick={()=>this.props.elementClick(this.props.element)} >
              { this.state.showkey ? this.getKey(element) : null }
              { this.state.showvalue ? this.getValue(element) : null }
            </ElementStyle>
  }

  getKey(element){
    return <span>{element.get('key')}</span>
  }

  getValue(element){
    let value
    this.state.showvalueastext ?
      value = element.get('value')
      : value = this.buildInput(element)

    return <span>{value}</span>
  }

  buildInput(element){
    return element.get('valueType') == "SELECTOR" ?
      <ElementSelector  element={element}
                        value={null}
                        onchange={value=>this.updatevalue(value)} />
      : <input  type={element.get('valueType')}
                value={this.state.value}
                onchange={ value => this.updatevalue(value) } />

  }

  updatevalue(value) { this.setState({value: value}) }

  getclass(){}

  render() {
    return  this.buildElement(this.props.element)
  }
}
