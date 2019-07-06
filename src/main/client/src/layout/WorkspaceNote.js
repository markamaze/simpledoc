import React from 'react'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'



const StyledWrapper = styled(Container)`

`



export default class WorkspaceNote extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: this.props.data ? this.props.data : "use for notes on what you are working on"}
  }

  changeValue(e) {
    this.setState({
      data: e.target.value
    })
  }

  render() {

    return  <StyledWrapper className="p-4 ml-auto mr-auto">
              <textarea
                value={this.state.data}
                onChange={event => this.changeValue.bind(event)} />
            </StyledWrapper>
  }
}
