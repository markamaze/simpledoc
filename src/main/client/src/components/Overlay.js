import React from 'react'
import styled from 'styled-components'
import colors from '../colors'

const OverlayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgb(0, 0, 0, .6);
  height: 100%;
  max-height: 100%;
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  overflow-x: auto;

  .overlay-container {
    position:absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 1rem 0;
    margin: 0 auto;
    height: 100%;
    max-height: 100%;
    width: 300px;
    min-width: 300px;
    max-width: 300px;

    @media (min-width: 500px) {
      width: 500px;
      min-width: 500px;
      max-width: 500px;
    }

  }
  .header-container {
    display: flex;
    background: ${colors.two};
    color: ${colors.four};
    height: 5%;
  }
  .header {
    margin: 0 auto;
    padding: .5rem;
    font-size: 2.5vh;
  }
  .close-handler {
    padding: .1rem .5rem .9rem;
    font-weight: bold;
    font-size: 2vh;
  }

  .content-container {
    background: ${colors.four};
    color: ${colors.two};
    display: flex;
    max-height: 92%;
  }
  .content {
    margin: 0 auto;
    width: 100%;
    overflow: auto;
  }

  .footer-bar {
    display: flex;
    background: ${colors.two};
    height: 3%;
  }

`


export default class Overlay extends React.Component {

  render() {
    return  <OverlayWrapper >
              <div className="overlay-container">
                <div className="header-container">
                  <div className="header">{this.props.header}</div>
                  <div className="close-handler" onClick={() => this.props.closeOverlay()}>X</div>
                </div>
                <div className="content-container">
                  <div className="content">{this.props.content}</div>
                </div>
                <div className="footer-bar"></div>
              </div>
            </OverlayWrapper>
  }
}
