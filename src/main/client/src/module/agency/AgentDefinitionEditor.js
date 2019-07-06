import React from 'react'
import { Container, Form} from 'react-bootstrap'
import styled from 'styled-components'



const StyledWrapper = styled(Container)`

`



export default class AgentDefinitionEditor extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      label: this.props.definition.label,
      category_id: this.props.definition.category_id
    }
  }

  render() {

    return  <Form>
              <Form.Group controlId="definition-id">
                <Form.Label>Definition Id</Form.Label>
                <Form.Control disabled value={this.props.definition.id} />
              </Form.Group>

              <Form.Group controlId="definition-label">
                <Form.Label>Definition Label</Form.Label>
                <Form.Control type="text" value={this.state.label} />
              </Form.Group>

            </Form>
            // <Form.Group controlId="definition-category-label">
            // <Form.Label>Definition of Category</Form.Label>
            // <Form.Control type="text" disabled value={this.props.category.label} />
            // </Form.Group>
  }
}
