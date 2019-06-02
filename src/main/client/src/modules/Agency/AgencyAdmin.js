import React from 'react'




export default AgencyAdmin extends React.Component {


//click on category item -> show all defs and agents of that category
//click on def item -> show its category item and all agents of that def
//click on agent item -> show its category and def items
//double click any item -> opens that item for editing in drawer
//have a "show all" button to show all objects of each type
//each list should have a button to create new item, which will open in drawer

  itemButtons() {
    //return buttons to either edit or delete the selected item
    //the buttons will have handlers attached
  }

  listButtons(type) {
    //return a button to create a new item of given type
  }

  listData(type) {
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
    return  <ModulePageWrapper>
              <List title="Categories"
                    data={this.listData("category")}
                    item_click={item => this.listItemClicked(item)}
                    item_buttons={this.itemButtons()}
                    list_buttons={this.listButtons("category")} />
              <List title="Definitions"
                    data={this.listData("definition")}
                    item_click={item => this.listItemClicked(item)}
                    item_buttons={this.itemButtons()}
                    list_buttons={this.listButtons("definition")} />
              <List title="Agents"
                    data={this.listData("agents")}
                    item_click={item => this.listItemClicked(item)}
                    item_buttons={this.itemButtons()}
                    list_buttons={this.listButtons("agents")} />
            </ModulePageWrapper>
  }


}
