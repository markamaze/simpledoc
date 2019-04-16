import styled from 'styled-components'



export const ListStyle = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border: solid thin black;
  box-shadow: 1px 1px;
  margin: 0 auto;
  margin-bottom: 2em;
  padding: 0;
  min-width: 30%;
  max-width: 100%;
  height: 40%;


  > .listitem {
    border-bottom: solid thin black;
    padding: 0;
    margin: 0;
    :hover { background: lightgray}
  }
  > .listheader {
    font-weight: bolder;
    width: 100%;
    height: 2em;
    background: lightgray;
    border-bottom: solid thin black
  }
`

export const ToolbarStyle = styled.div`
  display: flex;
  justify-items: center;
  flex-direction: ${props => props.column ? "column" : "row"}
  > .toolbaritem {
    padding: .5em .5em .3em .5em;
    text-size: .8em;
    > a {
      display: inline-block;
    }

    .editortoolbar {
      background-color: orange
    }
  }
`
