import React from 'react'
import { fromJS } from 'immutable'

import {  createAgentType,
          updateAgentType,
          deleteAgentType } from './agency_actions'
import { TypeBuilderStyle, StyledContainer } from '../../styles/moduleStyles'
import { agentTypes } from './agency_data'
import { agents } from './agency_constants'



export default class AgentTypeBuilder extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      typecopy: this.props.data ? this.props.data : agentTypes()
    }

    this.displayName = "Type Builder"
  }

  setType() {
    return  <StyledContainer>
              <label >Agent Type: </label>
              <select onChange={this.changeType.bind(this)}>
                <option>select</option>
                {
                  Object.values(agents).map(value =>
                      value === 'AGENT_TYPE' ? null : <option>{value}</option>)
                }
              </select>
            </StyledContainer>
  }
  changeType(event) {
    this.setState({
      typecopy: this.state.typecopy.setIn(['agent_type'], event.target.value)})
  }


  setSubType() {
    return  <StyledContainer>
              <label>Type Name: </label>
              <input type='text' placeholder={this.state.typecopy.get('agent_type_label')} onChange={this.changeSubType.bind(this)}/>
            </StyledContainer>
  }
  changeSubType(event) {
    this.setState({
      typecopy: this.state.typecopy.setIn(['agent_type_label'], event.target.value)})
  }

  setAgentRole() {
    return  <StyledContainer>
              <label>Access Level Definitions</label>
              <div>
                <label>access level to connected programs</label>
                <input type='radio' name='access_level_program' value='read' onChange={this.changeAccessLevel.bind(this)} />read
                <input type='radio' name='access_level_program' value='write' onChange={this.changeAccessLevel.bind(this)} />write
                <input type='radio' name='access_level_program' value='hidden' onChange={this.changeAccessLevel.bind(this)} />hidden
                <label>access level to connected clients</label>
                <input type='radio' name='access_level_client' value='read' onChange={this.changeAccessLevel.bind(this)} />read
                <input type='radio' name='access_level_client' value='write' onChange={this.changeAccessLevel.bind(this)} />write
                <input type='radio' name='access_level_client' value='hidden' onChange={this.changeAccessLevel.bind(this)} />hidden
                <label>access level to connected positions</label>
                <input type='radio' name='access_level_position' value='read' onChange={this.changeAccessLevel.bind(this)} />read
                <input type='radio' name='access_level_position' value='write' onChange={this.changeAccessLevel.bind(this)} />write
                <input type='radio' name='access_level_position' value='hidden' onChange={this.changeAccessLevel.bind(this)} />hidden
                <label>access level to connected users</label>
                <input type='radio' name='access_level_user' value='read' onChange={this.changeAccessLevel.bind(this)} />read
                <input type='radio' name='access_level_user' value='write' onChange={this.changeAccessLevel.bind(this)} />write
                <input type='radio' name='access_level_user' value='hidden' onChange={this.changeAccessLevel.bind(this)} />hidden
              </div>
            </StyledContainer>
  }
  changeAccessLevel(event) {
    this.setState({
      typecopy: this.state.typecopy.setIn([event.target.name], event.target.value)
    })
  }

  buildProfileObject() {
    let property, propertyType

    return  <StyledContainer>
              <label for='' >Agent Profile Definition</label>
              <table >
                <thead><th>Property</th><th>Propety Type</th></thead>
                <tbody>
                  { this.state.typecopy.get('agent_profile_definitions').map(propertySet =>
                          propertySet.size == 0 ? null :
                            <tr>
                              <td>{propertySet.get(0)}</td>
                              <td>{propertySet.get(1)}</td>
                              <td onClick={() => this.removeProperty(propertySet)} >-</td>
                            </tr>)}
                  <tr>
                    <td><input type="text" onChange={ event => property = event.target.value }/></td>
                    <td>
                      <select onChange={ event => propertyType = event.target.value } >
                        <option>none</option>
                        <option>text field</option>
                        <option>text box</option>
                        <option>image</option>
                        <option>date</option>
                        <option>file</option>
                      </select>
                    </td>
                    <td onClick={() => this.addProperty(property, propertyType)}>+</td>
                  </tr>
                </tbody>
              </table>

            </StyledContainer>
  }
  addProperty(property, propertyType) {
    let propertypair = fromJS([property, propertyType])
    let isfirstproperty = this.state.typecopy.getIn(['agent_profile_definitions', 0]).size == 0 ? true : false
    let index

    isfirstproperty ? index = 0 : index = this.state.typecopy.get('agent_profile_definitions').size

    this.setState({
      typecopy: this.state.typecopy.setIn(['agent_profile_definitions', index], propertypair)
    })
  }
  removeProperty(propertySet) {
    let index = this.state.typecopy.get('agent_profile_definitions').findIndex(set => set.get(0) == propertySet.get(0))
    let updatedtypecopy = this.state.typecopy.deleteIn(['agent_profile_definitions', index])

    this.setState({
      typecopy: updatedtypecopy
    })
  }

  submitButtons() {
    let close = this.props.closeInstance
    let localtype = this.state.typecopy

    return  <div className='instancebuttons' >
              <button onClick={()=>this.reset()} >Reset Session</button>
              <button onClick={()=>close()} >Close Session</button>
              { this.props.data ?
                  <div>
                    <button onClick={()=>{
                          updateAgentType(localtype)
                          close()}}>Save Agent Type</button>
                    <button onClick={()=>{
                          deleteAgentType(this.props.data)
                          close()}}>Delete Agent Type</button>
                  </div>
                  : <div>
                      <button onClick={()=>{
                          createAgentType(localtype)
                          close()}}>Save New Agent Type</button>
                    </div>
              }

            </div>
  }
  reset() {
    this.setState({ typecopy: this.props.data ? this.props.data : agentTypes() })
  }


  render() {
    let type = this.state.typecopy.get('agent_type')
    let renderthis = [this.setType()]


    if(type && type !== 'select')
      renderthis.push([ this.setSubType(),
                        this.setAgentRole(),
                        this.buildProfileObject()
                      ])


    return  <TypeBuilderStyle>
              <div className="header">Build New Agent Object Type</div>
              { this.setType() }
              { this.setSubType() }
              { this.setAgentRole() }
              { this.buildProfileObject() }
              { this.submitButtons() }
            </TypeBuilderStyle>
  }
}
