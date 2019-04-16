import styled from 'styled-components'

import colors from './colors'



export const FormBuilderStyle = styled.div `
  display: flex;
  max-height: 100%;
  background: rgb(50, 50, 50);
  padding: .5em;
  box-sizing: border-box;
  overflow: auto;
  .form {
    max-width: 75%;
    min-width: 50%;
    overflow-y: auto;
    overflow-x: none;
  }
  .formcreatersidebar {
    width: 25%;
    overflow: auto;
    margin: 0;
    padding: 0;
  }
  .instancebuttons button{
    display: block;
    width: 6em;
    padding: 0 .2em;
    margin: 0 .2em;
  }
`

export const ProgramStyle = styled.div `
  background: rgb(50,50,50);
  .programtypeform {}
  .objectpageheader {
    span.label {
      font-size: 1.5em;
      padding: .2em 1em .2em .2em;
    }
    span.type {
      font-size: .8em;
    }
    span.closeinstancetrigger {
      padding: .2em 1em .2em .2em;
    }
  }
`
export const TypeBuilderStyle = styled.div `
  display: flex;
  flex-direction: column;
  min-width: 100%;

  .header {
    text-align: center;
    font-size: 1.5em;
    padding-bottom: 1em;
  }

`

export const StyledContainer = styled.div `
  min-width: 100%;
  font-size: 1.2em;
  margin: 0 auto;
  padding: auto;
  label {
    display: inline-block;
    width: 50%;
    box-sizing: border-box;
    text-align: right;
    padding: .25em 1em .25em 0;
  }
  input {
    display: inline-block;
    max-width: 50%;
    box-sizing: border-box;

  }
  table {
    display: inline-block;
    max-width: 50%;
    box-sizing: border-box;
    tr {
      text-align: center;
    }
  }
`
