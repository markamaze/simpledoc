import styled from 'styled-components'
import colors from '../colors'



export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-width: 100%;
  .list {
    max-width: 100%;
  }
  .list-header {
    align-self: center;
    font-size: larger;
    font-weight: bolder;
    font-variant-caps: small-caps;
    padding: .25rem .5rem;
  }
  .list-header-container{
    display: flex;
    flex-direction: column;
    min-width: 30%;
    background: ${colors.three};
    color: ${colors.four};
    justify-content: space-between;
    align-self: stretch;
  }
  .list-footer{}
  .list-actions{

    display: flex;
  }

  .list-overlay{
    position: absolute;
    top: 0;
    left: 0;
    padding: 1rem;
    background: rgb(0,0,0,.8);
    color: lightgray;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }
    .list-overlay-close{
      display: flex;
      flex-grow: 0;
    }
    .list-overlay-body{
      display: flex;
      flex-grow: 2;
      overflow: auto;
    }
    .list-overlay-options{
      display: flex;
      flex-direction: row;
    }


  .table{
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    background: ${colors.four};
    color: ${colors.three};
    border: solid thin ${colors.four};
    padding: 1rem 2rem;
    overflow: auto;
  }
    .table-header{
      padding: 1rem 0 .5rem;
      border-bottom: solid ${colors.three};
    }
    .table-header-column{
      font-weight: bolder;
      font-style: italic;

    }
    .table-body{
      display: flex;
      flex-direction: column;
    }
    .table-row{
      border-bottom: solid thin ${colors.three};
      /* line-height: 1.2rem */
    }
    .table-row-active{
      background: ${colors.three};
      color: ${colors.four};
      display: flex;
      flex-direction: column;
    }

  .row{
    display: flex;
  }
    .row-cell{
      display: flex;
      flex-grow: 1;
      flex-basis: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      justify-content: justified;
      cursor: pointer;
    }
    .row-expanded{
      display: flex;
      flex-direction: row;
      .list-overlay-options{
        display: flex;
        flex-direction: row;
      }
    }
    .row-drawer{
      background: white;
      color: black;
      padding-bottom: .25rem;
      display: flex;
      flex-direction: column;
      width: 100%;
    }
      .row-drawer-tabs{
        display: flex;
        justify-content: space-around;
      }
        .row-drawer-tab{}
      .row-drawer-component{
        display: flex;
        flex-grow: 1;
        max-width: 100%;
        align-self: center;
      }

  .icons{
    display: flex;
    flex-wrap: wrap;
  }
  .icon{
    display: flex;
    cursor: pointer;
    background: ${colors.four};
    border-top: ${colors.one};
    border-left: ${colors.one};
    color: ${colors.three};
    padding: .25rem;
    margin: 0 .25rem;
    align-items: center;

    .list-overlay-options {
      display: flex;
    }
    .icon-wrapper {
      display: flex;
      flex-grow: 1;
    }
  }

  .tree{
    display: flex;
    max-width: 100%;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: space-evenly;
  }
    .tree-node{
      display: flex;
      flex-direction: column;
      padding: 0;
      margin: .25rem;
      width: 100%;
      border-left: solid ${colors.one};
      border-top: solid thin ${colors.one};
    }
    .tree-branch{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
      padding: .25rem;
      width: 100%;
      box-sizing: border-box;
    }





  .action-handler{
    font-style: italic;
    padding: .2rem;
    display: flex;
    align-self: center;
  }
`
