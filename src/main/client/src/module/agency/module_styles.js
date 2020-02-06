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







  .tag {
    background: lightblue;
    border-radius: .2rem;
  }
`


export const AgencyPageWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  overflow: auto;
  .dataTag {
    display: flex;
    font-size: x-small;
    background: ${colors.two};
    color: ${colors.one};
    padding: .2rem;
    margin: .2rem;
    border-radius: .5rem;
    justify-content: center;
  }
`

export const CardWrapper = styled.div``

export const EditorWrapper = styled.div``

export const BuilderWrapper = styled.div``
