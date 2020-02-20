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
  overflow: auto;
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
  .selected-tag {
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

  .container {
    display: flex;
    flex-direction: column;
    padding: .25rem;
    overflow: auto;
  }
  .container-row {
    display: flex;
    flex-direction: row;
    padding: .25rem;
    max-height: 10rem;

    label {
      display: flex;
      flex-grow: 1;
      width: 50%;
    }
    input {
      display:flex;
      flex-grow: 1;
      width: 50%;
    }
    select {
      display: flex;
      flex-grow: 1;
      width: 50%;
    }
  }

  .container-fill {
    display: flex;
    flex-direction: column;
    background: white;
    color: black;
    flex-grow: 1;
    padding: .25rem;
    margin: .25rem;
    border: thin solid black;
    overflow: auto;
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
    background: lightgray;
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

  .btm-border {
    border-bottom: thin solid black;
    margin-bottom: 2rem;
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
