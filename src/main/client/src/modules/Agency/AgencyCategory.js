import React from 'react'

import { AgencyCategoryWrapper } from './module_styles'
import Button from '../../components/atomic/Button'
import Toolbar from '../../components/Toolbar'
import { createCategory,
          updateCategory,
          deleteCategory } from './module_actions'



export default class AgencyCategory extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      category_id: this.props.data.id,
      category_label: this.props.data.label,
      category_behavior: this.props.data.behavior,
      category_security: this.props.data.security,
      category_data: [["key1", "key2"], ["key2", "value2"], ["key3", "value3"]]
    }
  }

  renderFieldValues() {
    return  <table>
              <thead>
                <header>category fields</header>
              </thead>
              <tbody>
                <tr>
                  <td>Id</td>
                  <td>{this.state.category_id}</td>
                </tr>
                <tr>
                  <td>Label</td>
                  <td>{this.state.category_label}</td>
                </tr>
                <tr>
                  <td>Behavior</td>
                  <td>{this.state.category_behavior}</td>
                </tr>
                <tr>
                  <td>Security</td>
                  <td>{this.state.category_security}</td>
                </tr>
                <tr>
                  <td>Data</td>
                  <td>
                    <table>
                      <tbody>
                        { this.state.category_data.map( data_entry =>
                            <tr><td>{data_entry[0]}</td><td>{data_entry[1]}</td></tr>)
                        }
                        <tr><td>add row</td><td>+</td></tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
  }

  renderEditableFields() {
    return  <table>
              <thead>
                <header>category fields</header>
              </thead>
              <tbody>
                <tr>
                  <td>Id</td>
                  <td>{this.state.category_id}</td>
                </tr>
                <tr>
                  <td>Label</td>
                  <td><input type="text" onChange={this.updateLabel.bind(this)} value={this.state.category_label} /></td>
                </tr>
                <tr>
                  <td>Behavior</td>
                  <td>
                    <select value={this.state.category_behavior} onChange={this.updateBehavior.bind(this)} >
                      <option value="STRUCTUAL">Structural</option>
                      <option value="ACTOR">Actor</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Security</td>
                  <td><input type="text" onChange={this.updateSecurity.bind(this)} value={this.state.category_security} /></td>
                </tr>
                <tr>
                  <td>Data <Button label="add entry" onClick={()=> console.log("add entry") } /></td>
                  <td>

                        { this.state.category_data.map( data_entry =>
                            <tr>
                              <td><input type="text" value={data_entry[0]} /></td>
                              <td><input type="text" value={data_entry[1]} /></td>
                            </tr>)
                        }
                  </td>
                </tr>
              </tbody>
            </table>
  }

  updateLabel(event) {
    this.setState({
      category_label: event.target.value
    })
  }

  updateBehavior(event) {
    this.setState({
      category_behavior: event.target.value
    })
  }

  updateSecurity(event) {
    this.setState({
      category_security: event.target.value
    })
  }

  addDataItem() {createItem
    this.setState({
      category_data: this.state.category_data.concat(["key", "value"])
    })
  }

  revertChanges() {
    console.log("revert changes clicked")

    //set state to values in props.data
  }

  renderAsEditable() {
    return this.props.data === null ?
      <AgencyCategoryWrapper className="AgencyCategoryWrapper">
        <header>Create Agency Category</header>
        <Toolbar >
          <Button label="create new category" onClick={() => createCategory(this.props.key, this.state)} />
          <Button label="discard new category" onClick={() => deleteCategory(this.props.key)} />
          <Button label="revert changes" onClick={() => this.revertChanges() } />
          <Button label="save for later" onClick={() => this.props.setComponentState(this.props.key, this.state)} />
        </Toolbar>
        { this.renderEditableFields() }
      </AgencyCategoryWrapper>

      : <AgencyCategoryWrapper className="AgencyCategoryWrapper">
          <header>Modify Agency Category</header>
          <Toolbar >
            <Button label="update category" onClick={() => updateCategory(this.props.key, this.state)} />
            <Button label="discard changes" onClick={() => deleteCategory(this.props.key)} />
            <Button label="revert changes" onClick={() => this.revertChanges() } />
            <Button label="save for later" onClick={() => this.props.setComponentState(this.props.key, this.state)} />
          </Toolbar>
          { this.renderEditableFields() }
        </AgencyCategoryWrapper>
  }

  renderForDisplay() {
    return  <AgencyCategoryWrapper className="AgencyCategoryWrapper">
              <header>Agency Category</header>
              { this.renderFieldValues() }
            </AgencyCategoryWrapper>
  }

  render() {
    console.log(this)

    return this.props.editable ? this.renderAsEditable() : this.renderForDisplay()

  }
}
