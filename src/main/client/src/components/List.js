import React from 'react'



export default function List(props){
  const [showOverlay, setOverlay] = React.useState(false)
  const [drawerComponent, setDrawerComponent] = React.useState(false)
  const [selectedItem, setSelectedItem] = React.useState(null)
  const [showbody, togglebody] = React.useState(props.collapsable ? false : true)

  const updateSelectedItem = item => {
    if(selectedItem === item) setSelectedItem(null)
    else {
      setDrawerComponent(false)
      setSelectedItem(item)
    }
  }

  const isItemSelected = item => selectedItem === item

  const addRow = (item, loadingFn) =>
    <div className={`table-row${isItemSelected(item) ? "-active" : ""} flex-column`}>
      <div className="d-flex flex-row">
      { item.selectable === false ? null : <div className="expand-row-icon px-2">{`${isItemSelected(item) ? '<' : '>'}`}</div> }
      {
        props.iconComponent ?
          <div className="icon-cell flex-grow-1" onClick={() => updateSelectedItem(item)}>{ props.iconComponent(item) }</div>
          : props.columns.map( column =>
              <div className="table-cell flex-grow-1 border-bottom" onClick={()=> item.selectable === false ? null : updateSelectedItem(item)}>
                {column.selectorIsFunction ? item[column.selector]() : item[column.selector]}
              </div>)
      }


      {
        props.overlayComponents && isItemSelected(item) ? //load set of action creators that will set overlay with a component
        <div className="table-row-expanded">
        {
          props.overlayComponents.length > 0 ? <div className="list-overlay-options">{loadOverlayHandlers(item)}</div> : null
        }
        </div>
        : null
      }
      </div>
      {
        props.drawerComponents && isItemSelected(item) ? //load drawer as tabbed pages inside drawer when item is selectedItem
          props.drawerComponents.length > 0 ? loadingFn(item) : null
          : null
      }

    </div>


  const loadOverlayHandlers = item => props.overlayComponents.map( overlayComponent =>
    <div className="action-handler" onClick={() => setOverlay(overlayComponent.component(item, ()=>setOverlay(false), (message) => window.alert(message)))}>{overlayComponent.label}</div>)

  const loadTableDrawer = (item) => {
    if(props.drawerComponents === null) return null
    else if(props.drawerComponents.length < 1) return null
    else if(props.drawerComponents.length === 1) return props.drawerComponents[0].component(item)
    else if(!drawerComponent) setDrawerComponent(props.drawerComponents[0].component(item))

    return  <div className="row-drawer position-absolute bg-primary">
              <div className="row-drawer-tabs">
                { props.drawerComponents.map( component =>
                    <div className="row-drawer-tab" onClick={() => setDrawerComponent(component.component(item))}>{component.label}</div>) }
              </div>
              { drawerComponent ?
                  <div className="row-drawer-component">{ drawerComponent }</div>
                  :  null }
            </div>
  }

  const buildTree = (node, depth) =>
    <div className="tree-node border-left border-top m-3 d-flex flex-column">
      { addRow(node, (item) => loadTableDrawer(item) ) }
      { props.nodeBranch(node).length > 0 ? <div className="tree-node-branch">{props.nodeBranch(node).map( child => buildTree(child))}</div> : null }
    </div>

  const buildList = () =>
    <div className="list">
      <div className="list-header">
        {
          props.iconComponent ? null
            : props.columns.filter(colObj => colObj.label === undefined ? false : true ).length > 0 ?
                props.columns.map( column => <div className="table-header-column">{column.label}</div> )
                : null
        }
      </div>

      <div className="list-body">
        { props.tableData && props.tableData.length > 0 ? props.tableData.map( item => addRow(item, loadTableDrawer)) : "no data"}
      </div>

    </div>


  const loadOverlay = () =>
    <div className="list-overlay fixed-top h-100 w-100 bg-light color-dark p-3 overflow-auto">
      <button type="button" className="btn-secondary btn-sm" onClick={() => setOverlay(false)} >close</button>
      <div className="list-overlay-body">{ showOverlay }</div>
    </div>

  const loadListActions = () =>
        props.listActions.map(item =>
          <div className="action-handler text-right" onClick={() => setOverlay(item.action(()=>setOverlay(false), message => window.alert(message)))}>{item.label}</div> )


  try {
    return  <div className={`list d-flex flex-column border border-dark p-2 m-2 bg-light text-dark flex-grow-1 ${props.className}`} style={props.style}>
              {
                props.headerComponent ?
                  <div className="list-header bg-dark text-light p-1 d-flex flex-row">
                    <div className="col-8" onClick={() => props.collapsable ? togglebody(!showbody) : null}>{props.headerComponent}</div>
                    { props.listActions && props.listActions.length > 0 ? <div className="col-4 font-italic font-weight-light text-right">{loadListActions()}</div> : null }
                  </div>
                  : null
              }
              <div className="list-body flex-grow-1">
              { showbody && props.tableData ?
                  buildList()
                  : showbody && props.root && props.nodeBranch ? buildTree(props.root, 0) : null
              }
              </div>
              { props.footerComponent ? <div className="">{props.footerComponent}</div> : null }
              { showOverlay ? loadOverlay() : null }
            </div>
  } catch(error) {
    console.trace(error)
    throw new Error(`${error}: Error building List`)}
}
