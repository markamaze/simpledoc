import styled from 'styled-components'

import colors from './colors'


export const FormStyle = styled.div `
  max-width: 500px;
  max-height: 100%;
  min-height: 50%;
  background-color: ${colors.three}
  color: black;
  padding: 1em;
  margin: 0 auto;
  z-index: 3;
  > .header {
    font-size: 1.3em;
    text-align: center;
    font-weight: bolder;
  }
  box-sizing: border-box;
  overflow: auto;
    > .container {
    display: flex;
    flex-direction: column;
    min-width: 100%
  }
  .active {
    background-color: ${colors.active};

  }
`

export const FormHeaderStyle = styled.h2 `
  grid-column: ${props => props.col};
  align-items: flex-start;
  color: black;
  margin: auto;
  padding: 0;
`

export const SectionStyle = styled.div `
  display: flex;
  flex-direction: column;
  border: thin solid black;
  background: ${colors.two};
  padding: 1rem;
  margin: 1rem;
  min-height: 100px;
  overflow: auto;
  > h3 {
    margin: 0;
    padding-left: .25rem;
    padding-bottom: .5rem;
  }
        > .container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0;
    min-width: 100%
  }

`

export const LayoutStyle = styled.div `
  display: flex;
  flex-direction: column;
  padding: 1em;
  box-sizing: border-box;
  align-items: center;
  > h4 {
    justify-content: center;
    margin: 0;
    padding-left: 2rem;
  }

        > .container {
    display: flex;
    flex-direction: column;
    background: pink;  }

    > .pairs {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

    }

`

export const ElementStyle = styled.div `
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: .25rem;
  max-width: 15em;
  box-sizing: border-box;
  > span input {
      max-width: 5em;
    }

`

export const EditorStyle = styled.ul `
  display: block;
  margin: 0.5em;
  padding: 0;
  listStyle: none;
  fontSize: smaller;
  li {
    min-height: 1.75em;
  }

  li.propertyItem {
    display: flex;
    border: thin solid black;
    box-sizing: border-box;
  }

  li.propertyAction {
    display: flex;
    border: inherit;
    listStyle: none;
    width: 100%;
    padding: 0;
    margin: 0 auto;

    button {
      width: 100%;
      height: 2em;
      background: orange
    }
  }

  li.propertyTag {
    display: inline-flex;
    max-width: 30%;
  }

  li.propertyValue {
    display: inline-flex;
    background-color: rgb(255, 255, 255);
    border: thin solid black;
    padding: 0 0 0 0.5em;
    width: 65%;
  }

  .propertyTextInput {
    display: inline-flex;

  }
`
