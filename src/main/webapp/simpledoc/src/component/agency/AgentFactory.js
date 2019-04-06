import React from 'react'

import { ProgramStyle, StyledContainer } from '../../styles/moduleStyles'
import { agentTypes } from './agency_data'

//purpose:
//  object id assignement for linking Programs with Users, Positions, & Clients
//  the component should display:
//    the agency program tree, with loaded program highlighted
//    a list of all Clients of the Program
//    a list of all Positions of the Program, include the User filling the Position
//    link to create instance to parent or children programs
//    display profiledata of the object



export default class AgentFactory extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      objectcopy: this.props.data ? this.props.data : agentTypes(),
      objecttype: undefined
    }
  }


  objectHeader() {
    let data = this.state.objectcopy
    return  <div className='objectpageheader'>
              <span className='label'>object Builder: {data.get('type')}</span>
            </div>
  }


  selectobjectType() {
    let types = typeof this.props.objectTypes ? this.props.objectTypes : {}

    return types ?
      <StyledContainer>
        <label >Set object Type</label>
        <select onChange={this.changeType.bind(this)}>
          <option>select</option>
          { types.map(item => <option>{item.get('label')}</option>) }
        </select>
      </StyledContainer>
      : <div>No types set, use Type Builder to define Agency Types</div>
  }

  changeType(event) {
    let objecttype = event.target.value
    let objectcopy = this.buildobjectObject(objecttype)
    objectcopy = objectcopy.set('label', objecttype)

    this.setState({
      objectcopy: objectcopy })
  }
  buildobjectObject(type){
    //given the type object in args,
    // define the object object and return it
    //for now...
    return this.state.objectcopy
  }


  profile() {
    let profile = this.state.objectcopy.get('profile')

    return profile ?
          <div>
              <div>Profile:</div>
              <div>{
                profile.map(item =>
                  <div><span>{item.get(0)}</span><span>{item.get(1)}</span></div>)
              }</div>
            </div> : null
  }


  defineConnections() {
    return <div> define connections </div>
  }



  render() {
    let subtype = this.state.objectcopy.get('label')
    let renderthis = [this.selectobjectType()]

    if (subtype) {
      renderthis.push([
        this.profile(),
        // this.defineConnections()
      ])
    }


    return  <ProgramStyle className='object'>
              { this.objectHeader() }
              { renderthis }

            </ProgramStyle>
  }
}
/*
  get the program using the programID,
  load program into a component that will:
    identify the id
    display tools for setting the type (changing type will cause object form to change)
    display the included object form
    display tools for editing the parent of the program
    display tools for adding positionsoffered from the exisiting positions
    display tools for assigning clients to the program
    display tools for assigning users to positionsoffered
  if the program exists, data will be loaded with editing tools accessible
  if creating a new program, data entries will be empty, default, or otherwise
*/
