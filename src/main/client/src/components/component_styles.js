import styled from 'styled-components'
import colors from '../colors'
import DataTable from 'react-data-table-component'
import Toolbar from './Toolbar'

export const ButtonWrapper = styled.div`
  display: flex;
  :active {
    background: ${colors.success};
  }
  min-width: 1.5em;
  max-width: 100%;
  min-height: 1.5em;
  height: auto;
  border: thin solid black;
  margin: .2em;
  background: ${colors.gray}
  color: ${colors.white}
  > div {
    font-size: .7em;
    max-width: 1em;
    max-height: 1em;
    min-width: 1em;
    min-height: 1em;
  }
`

export const ToolbarWrapper = styled.div`
  display: flex;
  justify-items: center;
  flex-direction: ${props => props.column ? "column" : "row"};
`

export const StyledDataTable = styled(DataTable)`
  display: flex;
  border: solid thin black;
  box-shadow: 1px 1px;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow-y: hidden;
  overflow-x: auto;
  /* > div {
    height: auto;
    width: 100%;
  }*/



  /* .rdt_Table {
    line-height: 1em;
    height: 10%;
    width: auto;

  } */

  .rdt_TableBody {
    margin: 0 auto;
    width: auto;
    height: 10em;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .rdt_TableHead {
    min-height: 1.3em;
    max-height: 1.3em;
    font-size: 1.3em;
    padding: .4em 0;
  }
  .rdt_TableHeadRow {
    min-height: 1.5em;
    max-height: 1.5em;
    width: auto;
    margin: 0 auto;
    flex-basis: 0;
    align-content: center;

    > .rdt_TableCol {
      padding: 0;
      margin: 0;

      > div {
        font-weight: bold;
      }
    }
  }
  .rdt_TableRow {
    > div { max_height: 2em;}
    align-items: flex-start;
    width: auto;
  }
  .rdt_TableCell {

    border-top: solid thin lightblue;
    font-size: .7em;
    min-height: 1em;
    max-height: 1.6em;
    max-width: 2em;
    display: flex;


    > .react-data-table--cell-content div{
      display: flex;
      flex-direction: row;
      padding: .1em;
      border-radius: .2em;
      > div {
        display: flex;
      }
    }
  }

`

export const TableHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  justify-content: flex-start;
  background: ${colors.darkgray};
  margin: 0 auto;
  color: ${colors.white};
  > header {
    font-size: 1.2em;
    padding: .5em 1.2em 5em 1.2em;
  }
  > .toolbar_agencyAdmin {
    font-size: .7em;
    margin: 0 auto;
    padding: auto 0 0 0;

  }
`

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: ${ props => props.column ? "column" : "row"};
  width: ${props=> props.width === undefined ? "auto" : props.width};
  height: ${ props => props.height === null ? "auto" : props.height };
  margin: .5em auto;
  padding: 0;
  background: ${colors.white}
  overflow-y: none;
`

export const DrawerComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`

export const DrawerToolsWrapper = styled(Toolbar)`

`