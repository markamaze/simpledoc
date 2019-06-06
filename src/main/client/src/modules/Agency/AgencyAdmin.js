import React from 'react'
import { connect } from 'react-redux'

import { ModulePageWrapper } from '../../root_styles'
import { TableWrapper } from '../../components/component_styles'
import Table from '../../components/Table'
import { TableHeaderWrapper } from '../../components/component_styles'
import Button from '../../components/atomic/Button'
import Toolbar from '../../components/Toolbar'



class AgencyAdmin extends React.Component {


//click on category item -> show all defs and agents of that category
//click on def item -> show its category item and all agents of that def
//click on agent item -> show its category and def items
//double click any item -> opens that item for editing in drawer
//have a "show all" button to show all objects of each type
//each list should have a button to create new item, which will open in drawer

  rowButtons(item) {
    //return buttons to either edit or delete the selected item
    //the buttons will have handlers attached
    return  <Toolbar column={false}>
              <Button label="edit" onClick={()=>console.log("edit item", item)} />
              <Button label="delete" onClick={()=>console.log("delete item", item)} />
            </Toolbar>
  }

  tableButtons(type) {
    //return a button to create a new item of given type
    switch(type){
      case "category":
        return  <Toolbar column={false} className="toolbar_agencyAdmin" >
                  <Button label="new category" onClick={()=>console.log("new category")} />
                </Toolbar>
      case "definition":
        return  <Toolbar column={false} className="toolbar_agencyAdmin" >
                  <Button label="new definition" onClick={()=>console.log("new definition")} />
                </Toolbar>
      case "agent":
        return  <Toolbar column={false} className="toolbar_agencyAdmin" >
                  <Button label="new agent" onClick={()=>console.log("new agent")} />
                </Toolbar>
    }
  }

  tableData(type) {
    switch(type){
      case "categories": return this.props.agency_categories
      case "definitions": return this.props.agency_definitions
      case "agents": return this.props.agency_agents
    }
    //if local state has no selected item, then all data objects of given type returned
    //if local state has a selected item:
    //  switch on selected item type:
    //      if selected item type is category:
    //        for param type category -> only return that item
    //        for param type definition -> only return defs with categoryid matching selected item
    //        for param type agent -> only return agents with defs with categoryid matching selected item
    //      if selected item type is definition:
    //        for param type category -> only return category item of the selected item
    //        for param type definition -> only return selected item
    //        for param type agent -> only return agents with defs matching selected item item
    //      if selected item type is agent:
    //        for param type category -> return category item of the def of the agent
    //        for param type definition -> return definition item of the agent
    //        for param type agent -> only return selected agent
  }

  listItemClicked(item) {
    //the list item recieved will be set in local state
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
                        columns={[{selector:"id", name:"ID"},
                                  {selector:"label", name: "Label"},
                                  {selector:"behavior", name:"Behavior"},
                                  {selector:"security", name:"Security"},
                                  {name: "", ignoreRowClick: true, cell: row=> this.rowButtons(row) }]}
                        data={this.tableData("categories")}
                        rowClick={row=>console.log("row clicked", row)} />
              </TableWrapper>
              <TableWrapper className="TableWrapper" height="30%" >
                <TableHeaderWrapper>
                  <header>Agent Definitions</header>
                  {this.tableButtons("definition")}
                </TableHeaderWrapper>
                <Table  noHeader={true}
                        subHeader={false}
                        columns={[{selector:"id", name:"ID"},
                                  {selector:"label", name: "Label"},
                                  {selector:"category_id", name:"CategoryID"},
                                  {selector:"security", name:"Security"},
                                  {name: "", ignoreRowClick: true, cell: row=> this.rowButtons(row) }]}
                        data={this.tableData("definitions")}
                        rowClick={row=>console.log("row clicked", row)} />
              </TableWrapper>
              <TableWrapper className="TableWrapper" height="30%" >
                <TableHeaderWrapper>
                  <header>Agents</header>
                  {this.tableButtons("agent")}
                </TableHeaderWrapper>
                <Table  noHeader={true}
                        subHeader={false}
                        columns={[{selector:"id", name:"ID"},
                                  {selector:"definition_id", name: "DefinitionID"},
                                  {selector:"agent_link_id", name:"Linked To AgentID"},
                                  {selector:"security", name:"Security"},
                                  {name: "", ignoreRowClick: true, cell: row=> this.rowButtons(row) }]}
                        data={this.tableData("agents")}
                        rowClick={row=>console.log("row clicked", row)} />
              </TableWrapper>
            </ModulePageWrapper>
  }

}


const mapStateToProps = (state, ownProps) => {
  return state.agency
}

export default connect(mapStateToProps)(AgencyAdmin)
