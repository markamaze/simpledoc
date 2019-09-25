import React from 'react'
import DataTable from 'react-data-table-component'
import styled from 'styled-components'


const Wrapper = styled.div`
  .rdt_TableCell {
      min-height: 2rem;
  }
  .rdt_Table {
    margin: 0;
    padding: 0;

  }

`

export default class DataTableWrapper extends React.Component{
  render() {
      return <Wrapper>
              <DataTable {...this.props} />
            </Wrapper>
  }
}
