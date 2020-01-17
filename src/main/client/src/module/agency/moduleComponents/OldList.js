import React from 'react'
import DataTableWrapper from '../../../components/DataTableWrapper'




function List(props){

  const RowComponent = ({data}) =>{
    return  <div>
            { props.rowActionCreators }
            { data.display({card: true, ...props}, err=>{throw new Error(`${err} <- Thrown from List`)}) }
    </div>}

  return  <DataTableWrapper
              className="object-list"
              title={props.title}
              actions={props.headerActionCreators}
              fixedHeader noTableHead overflowY expandableRows
              expandableRowsComponent={<RowComponent />}
              columns={props.columns}
              data={props.data} />

}
export default List






















///jsfiddle in progress


function checkType(key, data){
	if(!props.heirarchyKey) return false

  else if(props.dataSet.reduce((flag, item) => {
    if(!flag) return false
    if(props.heirarchyKey in item) return true
  })) return true

  else return false
}


function List(props){

  const [buildAsTree, setBuildAsTree] = React.useState(checkType(props.heirarchyKey, props.dataSet))
  const [activeItem, setActiveItem] = React.useState(null)


  function handleItemClick(item){
  	if(activeItem === item ) setActiveItem(null)
   	else setActiveItem(item)
  }
	function loadActiveItemDisplay(item){
  	if(item === activeItem)
    return props.itemComponent(item)
  }

  function buildList(){
		let rows = []
    let columnHeaders = props.columns.map( column => <div className="table-column-header-row">{column.label}</div>)


    //add a row for each dataItem
    props.dataSet.map( item => rows.push(Object.entries(item)) )

    if(props.itemActions.length > 0){
    	columnHeaders = columnHeaders.push("")
    	rows = rows.map( row => row.push(<div>actions</div>))

    }



    return  <div className="table">

              {
              	columnHeaders.map( header => <div className="table-column-header-row">{header}</div>)
              }
              {
              rows.map( row =>
              	<div className="table-row">
                  {columnHeaders.map( header => <div className="table-cell">{row[header]}</div>)
              		}
                </div>)
              }




              {
              	props.columns.map( column =>
                	<div className="table-column">
                	  <div className="table-column-header">{column.label}</div>
                    {
                    props.dataSet.map( item =>
                    	<div className={`table-cell ${item.key}${item === activeItem ? " active" : ""}`}
                            onClick={() => handleItemClick(item) } >
                        {item[column.selector]}
                        { loadActiveItemDisplay(item) }
                      </div>)
                    }
                	</div>
                )
              }
              <div className="table-column">
                <div className="table-column-header">actions</div>
                { props.dataSet.map( item => props.itemActions.map( action =>
              			<button className="table-cell button" onClick={()=> action.action(item)}>
                      {action.label}
                    </button>))
              }</div>

            </div>
  }

  function buildTree(){

  	return <div className="tree">
            <div>tree</div>
           </div>
  }



  try{
  return 	<div className="component">
          { props.headerComponent ? props.headerComponent : null }
          {	buildAsTree ? buildTree() : buildList() }
          { props.footerComponent ? props.footerComponent : null }
          </div>
  }catch(err){ return <div>{`Error: ${err}`}</div>}
}


const props = {
	test1: {
    heirarchyKey: "parentId",
    dataSet: [
    {key: "one", value: "1"},
    {key: "two", value: "2"}
    ],
    columns: [
    {label: "key", selector: "value"},
    {label: "value", selector: "value"}
    ],
    headerComponent: <div className="header">Header</div>,
    footerComponent: <div className="footer">Footer</div>,
    itemComponent: (item) => <div className="list-item-inline">{item.value}</div>,
    itemActions: [{label: "perform action", action: item=> window.alert(`action ${item.value}`)}]
	},
	test2: {
    heirarchyKey: "parentId",
    dataSet: [
    {key: "one", value: "1"},
    {key: "two", value: "2"}
    ],
    columns: [],
    itemComponent: (item) => <div className="list-item-overlay">{item.value}</div>,
    itemActions: [{label: "perform action", action: item=> window.alert(`action performed: ${item.key}`)}]
  }
}


ReactDOM.render(<List {...props.test1} />, document.getElementById("list1"))
