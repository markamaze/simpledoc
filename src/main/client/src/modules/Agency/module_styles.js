import styled from 'styled-components'
import colors from '../../colors'
import { TableWrapper, TableHeaderWrapper } from '../../components/component_styles'
import { ModulePageWrapper } from '../../root_styles'




export const AgencyAdminWrapper = styled(ModulePageWrapper)`

`

export const AgencyCategoryWrapper = styled.div`
  margin: 0 auto;
  > header {
    font-weight: 900;
    font-size: 1.6em;
  }
  tbody {
    margin: 1em;
  }
  > table {
    > thead header {
        font-weight: bold;
        font-size: 1.2em;
    }
    background: ${colors.white};
    color: ${colors.darkgray};
  }
`
