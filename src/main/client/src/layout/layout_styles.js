import styled from 'styled-components'
import colors from '../colors'
import { Container } from '../root_styles'



export const LayoutWrapper = styled(Container)`
  display: grid;
  min-width: 100%;
  min-height: 100%;
  grid-template-columns: 6em auto;
  grid-template-rows: 3em auto 2em;
`

export const HeaderWrapper = styled(Container)`
  background: ${colors.three};
  justify-content: center;
  grid-column: 1/3;
  grid-row: 1;
  font-size: 1.5em;
`

export const SidebarWrapper = styled(Container)`
  background: ${colors.three};
  grid-column: 1;
  grid-row: 2;
`

export const DrawerWrapper = styled(Container)`
  margin: 0 0 0 auto;
  grid-column: 2;
  grid-row: 2;
  background: ${colors.two};
  justify-content: center;
  width: 5%;
  min-width: 3em;
  :hover {
    width: 85%;
  }
  color: white;
  z-index: 3;

`

export const BodyWrapper = styled(Container)`
  background: ${colors.four};
  width: 95%;
  justify-content: center;
  grid-column: 2;
  grid-row: 2;
`

export const FooterWrapper = styled(Container)`
  background: ${colors.three};
  justify-content: flex-end;
  font-size: .7em;
  grid-column: 1/3;
  grid-row: 3;
`
