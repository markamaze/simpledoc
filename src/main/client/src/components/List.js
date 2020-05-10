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
    <div key={`list-row-${item}`} className={`table-row${isItemSelected(item) ? "-active" : ""} d-flex flex-column`}>
      <div className="d-flex flex-row">
      { item.selectable === true  || (Array.isArray(props.drawerComponents) && props.drawerComponents.length > 0) ? <div className="expand-row-icon px-2">{`${isItemSelected(item) ? '<' : '>'}`}</div> : null }
      {
        props.iconComponent ?
          <div className="icon-cell flex-fill" onClick={() => updateSelectedItem(item)}>{ props.iconComponent(item) }</div>
          : props.columns.map( column =>
              <div key={`list-item-${item}`} className="table-cell flex-grow-1 border-bottom" onClick={()=> item.selectable === true ? updateSelectedItem(item) : null}>
                {column.selectorIsFunction ? item[column.selector]() : item[column.selector]}
              </div>)
      }


      {
        props.overlayComponents && isItemSelected(item) ? //load set of action creators that will set overlay with a component
        <div className="table-row-expanded">
        {
          props.overlayComponents.length > 0 ? <div onClick={() => setOverlay(props.overlayComponents[0].component(selectedItem, () => setOverlay(false), (message) => window.alert(message)))} className="list-overlay-options">{props.overlayComponents.length > 1 ? "open overlay components" : props.overlayComponents[0].label}</div> : null
        }
        </div>
        : null
      }
      </div>
      <div className="d-flex align-self-center" style={{width: "80%"}}>
      {
        props.drawerComponents && isItemSelected(item) ? //load drawer as tabbed pages inside drawer when item is selectedItem
          props.drawerComponents.length > 0 ? loadingFn(item) : null
          : null
      }
      </div>

    </div>


  // const loadOverlayHandlers = item => props.overlayComponents.map( overlayComponent =>
  //   <div className="action-handler" onClick={() => setOverlay(overlayComponent.component(item, ()=>setOverlay(false), (message) => window.alert(message)))}>{overlayComponent.label}</div>)

  const loadTableDrawer = (item) => {
    if(props.drawerComponents === null) return null
    else if(props.drawerComponents.length < 1) return null
    else if(props.drawerComponents.length === 1) return props.drawerComponents[0].component(item)
    else if(!drawerComponent) setDrawerComponent(props.drawerComponents[0].component(item))

    return  <div className="d-flex flex-column bg-dark p-1 text-light px-5 py-3 mb-2">
              <div className="d-flex flex-row">
                { props.drawerComponents.map( component =>
                    <div key={`list-item-drawer-component-${component}-${item}`} className={`px-3 py-1 m-1 bg-light text-dark`} onClick={() => setDrawerComponent(component.component(item, ()=>setDrawerComponent(false), (message) => window.alert(message)))}>{component.label}</div>) }
              </div>
              { drawerComponent ?
                  <div className="row-drawer-component">{ drawerComponent }</div>
                  :  null }
            </div>
  }

  const buildTree = (node, depth) =>
    <div key={`list-tree-node-${node}`} className="tree-node border-left border-top m-3 d-flex flex-column">
      { addRow(node, (item) => loadTableDrawer(item) ) }
      { props.nodeBranch(node).length > 0 ? <div className="tree-node-branch" key={`list-tree-branch-${node}`} >{props.nodeBranch(node).map( child => buildTree(child))}</div> : null }
    </div>

  const buildList = () =>
    <div className="list">
      <div className="list-header">
        {
          props.iconComponent ? null
            : props.columns.filter(colObj => colObj.label === undefined ? false : true ).length > 0 ?
                props.columns.map( column => <div key={`list-column-${column.label}`}className="table-header-column">{column.label}</div> )
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
      <div>
        {props.overlayComponents.length > 1 ? props.overlayComponents.map( componentObject =>
          <div key={`list-overlaycomponent-${componentObject.label}`} 
              onClick={()=> setOverlay(componentObject.component(selectedItem, ()=>setOverlay(false), (message) => window.alert(message)))}>{componentObject.label}</div>) : null}
      </div>
      <div className="list-overlay-body">{ showOverlay }</div>
    </div>

  const loadListActions = () =>
        props.listActions.map(item =>
          <div key={`list-action-${item}`} className="action-handler text-right" onClick={() => setOverlay(item.action(()=>setOverlay(false), message => window.alert(message)))}>{item.label}</div> )


  try {
    return  <div className={`d-flex flex-column bg-light text-dark flex-fill ${props.className}`} style={props.style}>
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
