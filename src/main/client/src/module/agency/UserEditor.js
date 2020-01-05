import React from 'react'

import { EditorWrapper } from '../moduleStyles'
import AgencyObjectDataBuilder from './moduleComponents/AgencyObjectDataBuilder'
import EditorActions from './moduleComponents/EditorActions'



export default class UserEditor extends React.Component {
  constructor(props){
    super(props)
    this.state = { user: this.props.user }
  }

  updateProperty(property, value){
    this.setState({ user: this.state.user.update({[`${property}`]: value})})
  }

  render() {
    return  <EditorWrapper>

              <AgencyObjectDataBuilder
                  sections={[
                    {title: "User Id", inputType: "text-disabled", value: this.state.user.id, propertyName: "id"},
                    {title: "Username", inputType: "text", value: this.state.user.username, propertyName: "username"},
                    {title: "Password", inputType: "text", value: this.state.user.password, propertyName: "password"}
                  ]}
                  handleValueChange={this.updateProperty.bind(this)} />

              <EditorActions {...this.props}
                  object={this.state.user}
                  type="user" />

            </EditorWrapper>
  }
}
