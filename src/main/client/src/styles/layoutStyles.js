import styled from 'styled-components'

import colors from './colors'


export const appStyle = {
  body: {
    backgroundColor: "grey",
    position: "fixed",
    display: "flex",
    minWidth: "100%",
    maxWidth: "900px",
    maxHeight: "100%",
    top: "0",
    left: "0",
    minHeight: "100%",
    boxSizing: "borderBox",
  }
}

export const LayoutStyle = styled.div`
  display: grid;
  min-width: 100%;
  background-color: ${colors.darkgray};
  grid-template-columns: 10em auto;
  grid-template-rows: 5% 90% 5%;
  box-sizing: border-box;


`

export const LayoutHeader = styled.div`
  display: block;
  margin: auto;
  grid-column: 1/3;
  grid-row: 1;
  div {
    font-size: 1.7em;
  }
`

export const LayoutSidebar = styled.div`
  display: flex;
  padding: auto;
  box-sizing: border-box;
  grid-column: 1;
  grid-row: 2;

  }
`

export const LayoutDrawer = styled.div`
  display: flex;
  margin: 0 0 0 auto;
  grid-column: 2;
  grid-row: 2;
  background: rgb(20, 20, 20);
  max-width: 100%;
  min-width: 2em;
  color: white;
  height: 100%;
  overflow: none;
  z-index: 3;
  box-sizing: border-box;
  .tabbedview {
    display: flex;
    flex-direction: row-reverse;
    margin: 0;
    padding: auto;
    height: 100%;
    box-sizing: border-box;
    ul.tabset {
      list-style: none;
      margin: 0 auto 0 0;
      padding: 0.5em;
      display: block;
      width: 2em;
      :hover {
        width: auto;
      }
    }


  }
  .tabview {
    border: 1px solid rgb(150, 150, 150);
    box-shadow: 1px 1px rgb(100, 100, 100);
    border-radius: 8px 1px 8px 1px;
    overflow: auto;
    margin: 1em 5em;
    padding: .5em;
    width: 100%;
    height: 95%;
    box-sizing: border-box;

  }
`

export const LayoutBody = styled.div`
  display: flex;
  max-height: 100%;
  width: 95%;
  margin: 0 auto 0 0;
  overflow-x: auto;
  padding: 1em;
  grid-column: 2;
  grid-row: 2;
  border: 2px solid rgb(20, 20, 20);
  box-shadow: 2px 2px rgb(100, 100, 100);
  border-radius: 8px;
  justify-content: center;
`

export const LayoutFooter = styled.div`
  display: block;
  grid-column: 1/3;
  grid-row: 3;
`

export const ModuleWrapper = styled.div `
  display: flex;
  flex-wrap: wrap;
  padding: 1em auto;
  margin: 0rem;
  width: 100%;
  overflow: auto;
  box-sizing: border-box;
  max-height: 100%;
`

export const ModuleToolWrapper = styled.div `
  display: inline-flex;
  flex-direction: column;
  border: 2px solid rgb(20, 20, 20);
  box-shadow: 2px 2px rgb(100, 100, 100);
  border-radius: 8px 1px 8px 1px;
  padding: 1em auto;
  margin: 1rem auto;
  width: 30%;
  overflow: auto;
  box-sizing: border-box;
  max-height: 100
  .toolheader {
    display: block;
    font-size: 1.25em;
    padding: 0;
    margin: 0 auto;
  }
`
