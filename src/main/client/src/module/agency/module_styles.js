import styled from 'styled-components'

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







  .tag {
    background: lightblue;
    border-radius: .2rem;
  }
`
