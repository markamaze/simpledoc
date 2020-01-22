import styled from 'styled-components'
import colors from '../colors'



//used in: Layout
export const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: stretch;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0 auto;

  @media (min-width: 500px) {
    width: 500px;
  }
  @media (min-width: 700px) {
    width: 700px;
  }
  @media (min-width: 950px) {
    width: 950px;
  }
  @media (min-width: 1200px) {
    width: 1200px;
  }
`
export const BodyViewport = styled.div`
  display: flex;
  background: ${colors.four};
  height: 100%;
  width: 100%;
  max-height: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 1rem;
  overflow: auto;
  box-sizing: border-box;
`


//used in: Header
export const HeaderWrapper = styled.div`
  .header {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    font-size: large;
    background: ${colors.three};
    color: ${colors.four};
  }

  .subheader {
    display: flex;
    justify-content: space-around;
    background ${colors.three};
    color: ${colors.four};
  }
  .subheader-item{

  }

  .module-menu {
    position: absolute;
    right: 0;
    top: 0;
    background: ${colors.two};
    color: ${colors.one};
    width: 85%;
    height: 85%;
  }
  .module-menu-item {

  }
  .selected-module {
  }
`


export const FooterWrapper = styled.div`
  background: ${colors.three};
  color: ${colors.four};
  display: flex;
  width: 100%;
  padding: .5rem 1rem 1rem;
  height: 1rem;
  p {
    font-size: .7rem;
  }

  @media (min-width: 500px){
    height: 2rem;
  }
`
