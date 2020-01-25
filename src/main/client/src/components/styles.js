import styled from 'styled-components'
import colors from '../colors'



export const ListWrapper = styled.div`
  display: block;

  .list-header {
    padding: 1rem 3rem;
    align-self: center;
    font-size: larger;
    font-weight: bolder;
    font-variant-caps: small-caps;
  }
  .list-header-container{
    display: flex;
    flex-direction: row;
    /* background: ${colors.three};
    color: ${colors.four}; */
    justify-content: space-between;
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
  }
    .list-overlay-close{}
    .list-overlay-body{}
    .list-overlay-options{
    }


  .table{
    display: flex;
    flex-direction: column;
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
      line-height: 1.2rem
    }
    .table-row-active{
      background: ${colors.three};
      color: ${colors.four};
      padding: 1rem 0;
      margin: .5rem 0;
    }

  .row{
    display: flex;
  }
    null.row-cell{
      display: flex;
      flex-grow: 1;
      flex-basis: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: small;
      justify-content: center;
      cursor: pointer;
    }
    .row-expanded{
      display: flex;
      flex-direction: row;
    }
    .row-drawer{
      background: white;
      color: black;
      margin: 0 .5rem .5rem;
    padding: .5rem;
    }
      .row-drawer-tabs{
        display: flex;
        justify-content: space-around;
      }
        .row-drawer-tab{}
      .row-drawer-component{}

  .icons{}
  .icon{
    display: flex;
    flex-direction: row;
    cursor: pointer;
    background: ${colors.one};
    padding: .25rem;
  }

  .tree{
    display: flex;
    max-width: 100%;
    flex-wrap: wrap;
    flex-direction: column;
  }
    .tree-node{
      display: flex;
      flex-direction: row;
      padding: .5rem;
      background: white;
    }
    .tree-branch{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
      padding: .25rem;
      width: 100%;
      box-sizing: border-box;
      border: solid thin ${colors.four};
    }





  .action-handler{
    font-size: x-small;
    font-style: italic;
    padding: .2rem;
    display: flex;
    align-self: center;
  }
`
