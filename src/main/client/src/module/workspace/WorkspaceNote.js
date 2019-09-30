import React from 'react'
import styled from 'styled-components'



const StyledWrapper = styled.div`

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
