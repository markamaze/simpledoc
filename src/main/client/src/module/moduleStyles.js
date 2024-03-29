import styled from 'styled-components'
import colors from '../colors'


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


export const ManagerWrapper = styled.div`
  padding: 1rem;
  margin: 0 auto;
`
