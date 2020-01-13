import styled from 'styled-components'
// import colors from '../colors'
const colors = {
  one: '#C09F80',
  two: '#76323F',
  three: '#565656',
  four: '#D7CEC7'
}

export default colors


/*
    purpose:
        manage styles with modular style sheets
          root modulestyles should have control over physical tools and colors
          stylesheets for built modules will extend them to satisfy layouts
*/

export const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .editor-item {
    display: flex;
    width: 100%;
    flex-direction: row;
    border: none;
    height: 1.5rem;
    padding: .1rem;
    flex-wrap: wrap;
    height: auto;
  }

  .editor-item-input {
    display: inline-flex;
    width: 65%;
    font-size: smaller;
  }

  .editor-container {
    flex-direction: column;
    width: 95%;
    margin: .5rem auto;
    border: solid thin black;
  }

  input {
    display: flex;
    width: 65%;
    height: 100%;
  }

  .editor-item-label {
    display: inline-flex;
    width: 30%;
    font-size: smaller;
    height: 100%;
    padding: 0;
    margin: 0 .5rem 0 auto;
    /* border: 1px solid black; */
    justify-content: flex-end;
  }
  .tag-included {
    background: pink;
  }
  .editor-buttons {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    border-top: 1px solid ${colors.two};
    padding: .5rem 0;
    margin: 1rem auto 0;
  }
  button {
    background: ${colors.two};
    color: ${colors.one};
    margin: .3rem;
    padding: .2rem .8rem;
    border: none;
  }

`



export const ModuleWrapper  = styled.div`

  /* .module-wrapper { */
    display: block;
    height: 100%;
    width: 100%;
    padding: 0 .5rem;
  /* } */
  .module {
    display: flex;
    flex-direction: column;
    background: ${colors.four};
    color: ${colors.three};
  }

  .module-toolbar {
    display: flex;
    /* background: pink; */
    height: 2rem;
  }

  .module-toolbar-item {
    display: flex;
    margin: 0;
    flex-basis: 0;
    flex-grow: 1;
    justify-content: center;
    font-size: small;
    align-items: center;
  }
  >.module-toolbar-item-active {
    display: flex;
    margin: 0;
    flex-basis: 0;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    font-size: small;

    background: ${colors.three};
    color: ${colors.four};
  }

  .module-viewport {
    display: flex;
    width: auto;
    flex-direction: column;

    height: 100%;
    max-height: 100%;
    width: 100%;
    max-width: 100%;
    padding: 0;
    margin: 0;
    overflow: auto;

  }

  .tree-node-label {
    display: flex;
  }
  .tree-node-label-active {
    background: purple
  }
  .module-build-tools {

  }
  .view-container {

  }
  .object-list-container{
    header {
      display: flex;
      /* padding: 0 .5rem; */
      .header-title {
        font-size: .9rem;
        font-style: italic;
        display: block;
        padding: .5rem;
      }
      .header-btn {
        display: none;
      }
    }
  }
  .object-list-container-active{
    flex: 2;
    overflow: auto;
    header {
      display: flex;
      /* padding: 0 .5rem; */

      .header-title {
        font-size: 1.2rem;
        font-style: italic;
        font-weight: heavy;
        background: ${colors.one};
        color: ${colors.two};
        display: inline-flex;
        flex-grow: 2;
        padding-left: .5rem;
      }
      .header-btn {
        background: ${colors.one};
        color: ${colors.two};
        display: inline-flex;
        justify-content: center;
        font-size: 1.1rem;
        width: 2rem;
        border-left: solid ${colors.two} thin;
        padding: 0 .3rem
      }
    }
  }
  .object-list {
    background: ${colors.one};
    color: ${colors.two};

    .rdt_TableHead {
      background: purple
    }
  }
  .object-list-item-expanded {
    display: flex;
    width: 80%;
    background: green:
    margin: 0 auto;
  }




  .object-viewport {
    background: ${colors.two};
    color: ${colors.four};
    display: flex;
    flex-direction: column;
    min-height: 100%;
    width: auto;
    min-width: 100%;
    @media(min-width: 500px){min-width: 35%; max-width: 35%;}
    @media(min-width: 700px){min-width: 25%; max-width: 25%;}
    border-left: solid ${colors.two} thin;
  }

  .viewport-toggle{
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: block;
    background: ${colors.two};
    color: ${colors.one};
    width: 1.5rem;
    height: 1.5rem;
    padding: auto 0;
    margin: 0 auto;
    border-left: solid ${colors.one} thin
  }
  .dataTag-selected{
    background: ${colors.two};
    color: ${colors.one};
  }
  .dataTag{
    background: ${colors.one};
    color: ${colors.two};
  }
`
