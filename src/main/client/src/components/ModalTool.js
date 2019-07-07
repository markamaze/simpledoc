import React from 'react'
import { Modal, Button } from 'react-bootstrap'



export default class ModalTool extends React.Component {


  render() {

    return  <Modal show={this.props.showModal} onHide={() => this.props.hideModal()}>
              <Modal.Header closeButton>
                <Modal.Title>{this.props.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{this.props.body}</Modal.Body>
              <Modal.Footer>
                <Button onClick={()=> this.props.modalButtonHandler("discard")}>Close & Discard</Button>
                <Button onClick={()=> this.props.modalButtonHandler("revert")}>Clear Changes</Button>
                <Button onClick={()=> this.props.modalButtonHandler("save")}>Save Changes</Button>
                <Button onClick={()=> this.props.modalButtonHandler("workspace")}>Send to Workspace</Button>
                <Button onClick={()=> this.props.modalButtonHandler("delete")}>Delete</Button>
              </Modal.Footer>
            </Modal>
  }


}
