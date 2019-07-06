import React from 'react'
import { Container, Form} from 'react-bootstrap'
import styled from 'styled-components'



const StyledWrapper = styled(Container)`

`



export default class AgentCategoryEditor extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render() {
    console.log(this.props)
    return  <Form>
              <Form.Group controlId="">
                <Form.Label>Category Id</Form.Label>
                <Form.Control type="text" disabled value={this.props.category.id} />
              </Form.Group>

              <Form.Group controlId="category-label">
                <Form.Label>Category Label</Form.Label>
                <Form.Control type="text" value={this.props.category.label} />
              </Form.Group>

              <Form.Group controlId="category-behavior">
                <Form.Label>Category Behavior</Form.Label>
                <Form.Control as="select" value={this.props.category.behavior}>
                  <option value="STRUCTURAL">STRUCTURAL</option>
                  <option value="ACTOR">ACTOR</option>
                </Form.Control>
              </Form.Group>

            </Form>
  }
}
