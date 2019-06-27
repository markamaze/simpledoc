import React from 'react'
import {StyledDataTable} from './component_styles'





export default class Table extends React.Component {


  render() {

    return  <StyledDataTable
                className="StyledDataTable"
                title={this.props.title}
                subHeader={this.props.subHeader}
                subHeaderComponent={this.props.subHeaderComponent}
                noHeader={this.props.noHeader}
                columns={this.props.columns}
                data={this.props.data}
                onRowClicked={this.props.rowClick}
                highlightOnHover
                width={this.props.width}
                editable={this.props.editable} >
                {this.props.children}
              </StyledDataTable>
  }
}
