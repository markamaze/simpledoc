import styled from 'styled-components'
import colors from '../../colors'

const ModuleStyles = styled.div`

  .dataTag{};

  .property-entry {
    display: flex;
    border-top: thin solid black;

    .property-key {
      min-width: 50%;
    }

    .property-value {
      min-width: 50%;
      padding: 0 .3rem 0 auto;
    }
  }
`

export const DisplayWrapper = styled(ModuleStyles)`
  background: orange;
  margin: 1rem auto;
  padding: .5rem;
  max-width: 300px;

  .display-card-item {
    font-size: smaller;
    padding: .2rem;
  }
  .display-card-header{}








`


export const AgencyPageWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  .dataTag {
    display: flex;
    max-width: max-content;
    font-size: small;
    background: ${colors.two};
    color: ${colors.one};
    padding: .4rem;
    margin: .4rem;
    border-radius: .5rem;
    justify-content: center;
  }
  .selected {
    background: ${colors.one};
    color: ${colors.two};
  }
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .module-component {
    width: 8rem;
    margin: 1.5rem;
  }
  .document {
    background: ${colors.three};
    color: ${colors.four};
    flex-grow: 1;
    padding: 1rem 2rem 1rem;
    overflow: auto;

    .storage-handler-item{
      background: ${colors.four};
      color: ${colors.three};
    }
  }

  .container {
    display: flex;
    flex-direction: column;
    padding: .5rem;
    overflow: auto;

    .selected {
      background: ${colors.two};
      color: ${colors.one};
    }
  }
  .container-item{
    display: flex;
    margin: .25rem;
    flex-grow: 1;
    white-space: pre-wrap;
    flex-basis: 0;
  }
  .item-label{
    font-style: italic;
    font-weight: bolder;
    align-self: flex-start;
    max-width: 30%;
    min-width: 30%;
  }
  .container-row {
    display: flex;
    flex-direction: column;
    padding: .25rem;
    align-items: center;
    flex-grow: 1;

    @media (min-width: 500px) {
      flex-direction: row;
    }
  }

  .border-bottom{
     border-bottom: solid thin lightgray;
  }

  .container-fill {
    display: flex;
    flex-direction: column;
    /* flex-grow: 2; */
    overflow: auto;
    background: white;
    color: black;
  }

  .storage-handlers{
    display: flex;
    flex-direction: row;
    margin: .5rem;
  }
  .storage-handler-item{
    display: flex;
    flex-grow: 1;
    justify-content: center;
    margin: .5rem;
    cursor: pointer;
  }

  .selected-property {
    background: green;
  }

  .structuralNode{
    .header{
      font-size: large;
      font-style: italic;
    }
    .subheader{
      font-size: smaller;
      font-weight: bolder;
    }
  }

  header {
    font-weight: bold;
    font-size: large;
    text-align: center;
  }

`

export const CardWrapper = styled.div`
.moduleObject-display-component {
  display: flex;
  flex-direction: column;
  border: thin solid black;
  margin: .5rem;
  padding; .5rem;
}
`

export const EditorWrapper = styled.div`
.moduleObject-display-component {
  display: flex;
  flex-direction: column;
  border: thin solid black;
  margin: .5rem;
  padding; .5rem;
}
`

export const BuilderWrapper = styled.div`
.moduleObject-display-component {
  display: flex;
  flex-direction: column;
  border: thin solid black;
  margin: .5rem;
  padding; .5rem;
}
`
