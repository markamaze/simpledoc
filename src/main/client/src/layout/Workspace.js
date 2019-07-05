import React from 'react'
import styled from 'styled-components'
import { Container, Modal, Tabs, Tab } from 'react-bootstrap'

import colors from '../colors'


const StyleWrapper = styled(Container)`
  background: rgb(0, 0, 0, .8);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`



export default class Workspace extends React.Component {


  render() {
    return  <StyleWrapper className="Workspace_Container d-flex flex-column align-content-stretch">
              <Modal.Dialog className="">
                <Modal.Header closeButton>
                  <Modal.Title>Workspace</Modal.Title>
                </Modal.Header>

                <Modal.Body className="flex-grow-1">
                  <p>Workspace Body</p>
                  <p>other stuff</p>
                </Modal.Body>

              </Modal.Dialog>
            </StyleWrapper>
  }
}
