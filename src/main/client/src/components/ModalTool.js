import React from 'react'
import { Modal } from 'react-bootstrap'


export default class ModalTool extends React.Component {


  render() {

    return  <Modal
                show={this.props.showModal}
                onHide={() => this.props.hideModal()} >
              <Modal.Header closeButton>
                <Modal.Title>{this.props.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{this.props.body}</Modal.Body>
              <Modal.Footer>{this.props.footer ? this.props.footer.map( item => item ) : null}</Modal.Footer>
            </Modal>
  }


}
