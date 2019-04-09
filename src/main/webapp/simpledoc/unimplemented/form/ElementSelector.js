import React from 'react'



export default class ElementSelector extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      type: this.props.type, /* dropdown, list,  */
      multiplevalues: this.props.allowmultiple, /* true, false */
      valueOptions: this.getValueOptions()
    }
  }

  getValueOptions(){
    //if selectorValues is a list of strings, just return that
    // if it is an object with a key to set of business objects,
    //    will need to get the set from the store and return label from it's data form

  }

  buildSelector(element) {
    switch(element.getIn(['displayProperties', 'selectorType'])) {
      case "dropdown": {
        <select multiple={props.elementproperties.get('multipleselections')} >
          { this.state.valueOptionsmap( value =>
            <option value={value} onClick={this.props.onchange(value)}>{value}</option>) }
        </select>
      }
      case "list": {
        <fieldset>
          <legend>{element.get('key')}</legend>
          { element.getIn(['displayProperties', 'selectorValues']).map(value=>
              <div onClick={this.props.onchange(value)}>{value}</div>) }
        </fieldset>
      }
    }
  }

  render() {
    return this.buildSelector(this.props.element)
  }
}
