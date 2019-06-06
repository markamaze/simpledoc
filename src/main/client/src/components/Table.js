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
                highlightOnHover />




    // return  <TableWrapper width={this.props.width}>
    //           <TableTitle >{this.props.title}</TableTitle>
    //
    //           <ReactDataGrid
    //             columns={this.props.columns}
    //             rowGetter={i=> (this.props.data)[i]}
    //             rowsCount={this.props.data.length}
    //             toolbar={this.props.tableButtons}
    //             rowActionsCell={null} />
    //
    //         </TableWrapper>
  }
}
