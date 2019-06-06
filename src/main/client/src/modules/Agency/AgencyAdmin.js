import React from 'react'
import { connect } from 'react-redux'

import { ModulePageWrapper } from '../../root_styles'
import { TableWrapper } from '../../components/component_styles'
import Table from '../../components/Table'
import { TableHeaderWrapper } from '../../components/component_styles'
import Button from '../../components/atomic/Button'
import Toolbar from '../../components/Toolbar'



class AgencyAdmin extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      selectedListItem: null,
      selectedListItemType: null
    }
  }

  rowButtons(type, item) {
    return  <Toolbar column={false}>
              <Button label="edit item" onClick={()=>this.loadToDrawer(type, item)} />
            </Toolbar>
  }


  tableButtons(type) {
    return  <Toolbar column={true} className="toolbar_agencyAdmin" >
              <Button label="new item" onClick={()=>this.loadToDrawer(type, null)} />
              <Button label="show all" onClick={()=>this.setState({selectedListItem: null, selectedListItemType: null})} />
            </Toolbar>
  }


  tableColumns(type) {
    switch(type){
      case "category":
        return [{selector:"id", name:"ID"},
                  {selector:"label", name: "Label"},
                  {selector:"behavior", name:"Behavior"},
                  {selector:"security", name:"Security"},
                  {name: "", ignoreRowClick: true, cell: row=> this.rowButtons("category", row) }]
      case "definition":
        return [{selector:"id", name:"ID"},
                  {selector:"label", name: "Label"},
                  {selector:"category_id", name:"CategoryID"},
                  {selector:"security", name:"Security"},
                  {name: "", ignoreRowClick: true, cell: row=> this.rowButtons("definition", row) }]
      case "agent":
        return [{selector:"id", name:"ID"},
                  {selector:"definition_id", name: "DefinitionID"},
                  {selector:"agent_link_id", name:"Linked To AgentID"},
                  {selector:"security", name:"Security"},
                  {name: "", ignoreRowClick: true, cell: row=> this.rowButtons("agent", row) }]
    }
  }



  // comment out filtering data until I can build a properly related set of agency objects
  tableData(type) {
    // let selectedType = this.state.selectedListItem
    // selectedType === null ?
      switch(type){
        case "category": return this.props.agency_categories
        case "definition": return this.props.agency_definitions
        case "agent": return this.props.agency_agents
      }
      // : switch(selectedType){
      //   // probably a more efficient way of doing this
      //   case "category" :
      //     let category_item = this.props.agency_categories.find( cat_item => this.state.selectedListItem.id === cat_item.id )
      //     let definition_items = this.props.agency_definitions.filter( def_item => this.state.selectedListItem.id === def_item.category_id )
      //     let agent_items = definition_items.map( found_def => this.props.agency_agents.filter( agnt_item => agnt_item.definition_id === found_def.id)) //may return an array of arrays?
      //
      //     if(type === "category") return category_item
      //     if(type === "definition") return definition_items
      //     if(type === "agent") return category_items
      //
      //   case "definition":
      //     let category_item = this.props.agency_categories.find( cat_item => this.state.selectedListItem.category_id === cat_item.id)
      //     let definition_item = this.props.agency_definitions.find( def_item => this.state.selectedListItem.id === def_item.id)
      //     let agent_items = this.props.agency_agents.filter( agnt_item => this.state.selectedListItem.id === agnt_item.definition_id)
      //
      //     if(type === "category") return category_item
      //     if(type === "definition") return definition_item
      //     if(type === "agent") return agent_items
      //
      //   case "agent"
      //     let agent_item = this.props.agency_agents.find( agnt_item => this.state.selectedListItem.id === agnt_item.id)
      //     let definition_item = this.props.agency_definitions.find( def_item => this.state.selectedListItem.definition_id === def_item.id)
      //     let category_item = this.props.agency_categories.find( cat_item => definition_item.category_id === cat_item.id)
      //
      //     if(type === "category") return category_item
      //     if(type === "definition") return definition_item
      //     if(type === "agent") return agent_item
      //
      // }

  }


  listItemClicked(type, item) {
    this.setState({ selectedListItem: item, selectedListItemType: type })
  }


  //TODO: load component instance into drawer for creating, editing, deleting object
  //        if item is null, should create new object
  loadToDrawer(type, item) {
    console.log("load in drawer", type, item)
  }


  render() {

    return  <ModulePageWrapper column>

              <TableWrapper className="TableWrapper" height="30%" >
                <TableHeaderWrapper>
                  <header>Agent Categories</header>
                  {this.tableButtons("category")}
                </TableHeaderWrapper>
                <Table  noHeader={true}
                        subHeader={false}
                        columns={this.tableColumns("category")}
                        data={this.tableData("category")}
                        rowClick={row=>this.listItemClicked("category", row)} />
              </TableWrapper>

              <TableWrapper className="TableWrapper" height="30%" >
                <TableHeaderWrapper>
                  <header>Agent Definitions</header>
                  {this.tableButtons("definition")}
                </TableHeaderWrapper>
                <Table  noHeader={true}
                        subHeader={false}
                        columns={this.tableColumns("definition")}
                        data={this.tableData("definition")}
                        rowClick={row=>this.listItemClicked("definition", row)} />
              </TableWrapper>

              <TableWrapper className="TableWrapper" height="30%" >
                <TableHeaderWrapper>
                  <header>Agents</header>
                  {this.tableButtons("agent")}
                </TableHeaderWrapper>
                <Table  noHeader={true}
                        subHeader={false}
                        columns={this.tableColumns("agent")}
                        data={this.tableData("agent")}
                        rowClick={row=>this.listItemClicked("agent", row)} />
              </TableWrapper>

            </ModulePageWrapper>
  }

}


const mapStateToProps = (state, ownProps) => {
  return state.agency
}

export default connect(mapStateToProps)(AgencyAdmin)
