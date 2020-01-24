import styled from 'styled-components'
import colors from '../colors'



export const ListWrapper = styled.div`
  display: block;

  .list-header {
    text-align: center;
    background: ${colors.two};
    color: ${colors.one};
  }
  .list{
    display: flex;
    flex-direction: column;
  }

  .list-body{
    background: lightgray;
    font-size: small;
  }

  .list-row{
    display: flex;
    border-bottom: thin solid gray
  }

  .list-head-row{
    background: gray;
  }

  .list-head-item {
    font-weight: bold;
    font-style: italic;
    flex-grow: 1;
  }

  .list-cell{
    display: flex;
    flex-grow: 1;
    justify-content: left;
    width: ${props => 100/props.columnCount}%;
  }

  .action-cell{
    flex-direction: column;
    align-items: center;
  }

  .list-row-action {
    font-size: small;
    padding: 0 .3rem;
  }

  .action-cell :hover{
    font-size: normal;
    color: blue;
  }

  .list-row-component-wrapper{
    display: flex;
    flex-direction: column;
    max-height: 100%;
    min-height: 100%;
    max-width: 100%;
    min-width: 100%;
    overflow: auto;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .list-row-component-header{
    display: flex;
    background: lightgray;
  }
  .list-row-component-header .action-cell {
    flex-direction: row;
  }
  .list-row-component {
    background: white;
    box-sizing: border-box;
  }
`
