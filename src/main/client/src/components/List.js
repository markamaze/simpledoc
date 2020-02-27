import React from 'react'
import { ListWrapper } from './styles'



export default function List(props){
  const [showOverlay, setOverlay] = React.useState(false)
  const [drawerComponent, setDrawerComponent] = React.useState(false)
  const [selectedItem, setSelectedItem] = React.useState(null)

  const updateSelectedItem = item => {
    if(selectedItem === item) setSelectedItem(null)
    else {
      setDrawerComponent(false)
      setSelectedItem(item)
    }
  }

  const isItemSelected = item => selectedItem === item

  const addRow = (item, loadingFn) =>
    <div className={`table-row${isItemSelected(item) ? "-active" : ""}`}>
      <div className="row">
        { item.selectable === false ? null : <div className="expand-row-icon">{`${isItemSelected(item) ? '<' : '>'}`}</div> }
        {
          props.columns.map( column =>
            <div className="row-cell" onClick={()=> item.selectable === false ? null : updateSelectedItem(item)}>
              {column.selectorIsFunction ? item[column.selector]() : item[column.selector]}
            </div>)
        }
      </div>
      {
        props.overlayComponents && isItemSelected(item) ? //load set of action creators that will set overlay with a component
          <div className="row-expanded">
            {
              props.overlayComponents.length > 0 ? <div className="list-overlay-options">{loadOverlayHandlers(item)}</div> : null
            }
          </div>
          : null
      }
      {
        props.drawerComponents && isItemSelected(item) ? //load drawer as tabbed pages inside drawer when item is selectedItem
          props.drawerComponents.length > 0 ? loadingFn(item) : null
          : null
      }

    </div>

  const addIcon = item =>
    <div className="icon">
      <div className="icon-wrapper" onClick={() => updateSelectedItem(item)}>{ props.iconComponent(item) }</div>
      {
        props.overlayComponents && isItemSelected(item) ?
          props.overlayComponents.length > 0 ? <div className="list-overlay-options">{loadOverlayHandlers(item)}</div> : null
          : null
      }
      {
        props.drawerComponents && isItemSelected(item) ?
          props.drawerComponents.length > 0 ? <div className="row-drawer">{loadTableDrawer(item)}</div> : null
          : null
      }
    </div>

  const loadOverlayHandlers = item => props.overlayComponents.map( overlayComponent =>
    <div className="action-handler" onClick={() => setOverlay(overlayComponent.component(item))}>{overlayComponent.label}</div>)

  const loadTableDrawer = (item) => {
    if(props.drawerComponents === null) return null
    else if(props.drawerComponents.length < 1) return null
    else if(props.drawerComponents.length === 1) return props.drawerComponents[0].component(item)
    else if(!drawerComponent) setDrawerComponent(props.drawerComponents[0].component(item))

    return  <div className="row-drawer">
              <div className="row-drawer-tabs">
                { props.drawerComponents.map( component =>
                    <div className="row-drawer-tab" onClick={() => setDrawerComponent(component.component(item))}>{component.label}</div>) }
              </div>
              { drawerComponent ?
                  <div className="row-drawer-component">{ drawerComponent }</div>
                  :  null }
            </div>
  }

// props.nodeBranch(item).map(child => buildTree(child))
  const buildTree = (node, depth) =>
    <div className="tree-node">
      {props.iconComponent ? addIcon(node) : addRow(node, (item) => loadTableDrawer(item) )}
      {props.nodeBranch(node).length > 0 ? <div className="tree-branch">{props.nodeBranch(node, ++depth).map( child => buildTree(child))}</div> : null}
    </div>

  const buildList = () =>
    props.iconComponent ?
      <div className="icons">{ props.tableData.map(item=>addIcon(item))}</div>
      : <div className="table">
          {
            props.columns.filter(colObj => colObj.label === undefined ? false : true ).length > 0 ?
              <div className="table-header row">
                { props.columns.map( column =>
                    <div className="table-header-column row-cell">{column.label}</div>) }
              </div>
              : null
          }
          <div className="table-body">
            { props.tableData && props.tableData.length > 0 ? props.tableData.map( item => addRow(item, loadTableDrawer)) : "no data"}
          </div>
        </div>


  const loadOverlay = () =>
    <div className="list-overlay">
      <div className="list-overlay-close" onClick={() => setOverlay(false)} >x</div>
      <div className="list-overlay-body">{ showOverlay }</div>
    </div>

  const loadListActions = () =>
    <div className="list-actions">
      {
        props.listActions.map(item =>
          <div className="action-handler" onClick={() => setOverlay(item.action())}>{item.label}</div> )
      }
    </div>


  try {
    return  <ListWrapper className={`list ${props.className}`} style={props.style}>
              <div className="list-header-container">
                { props.headerComponent ? <div className="list-header">{props.headerComponent}</div> : null }
                { props.listActions && props.listActions.length > 0 ? loadListActions() : null }
              </div>
              { props.tableData ? buildList() : null }
              { props.root && props.nodeBranch ? <div className="tree">{buildTree(props.root, 0)}</div> : null }
              { props.footerComponent ? <div className="list-footer">{props.footerComponent}</div> : null }
              { showOverlay ? loadOverlay() : null }
            </ListWrapper>
  } catch(error) {
    console.trace(error)
    throw new Error(`${error}: Error building List`)}
}

/*List.propTypes = {
  root: {},
  nodeBranch: ()=>{} ,

  columns: {
    limited: [],
    expanded: []
  },
  limited: boolean,
  iconComponent: {},
  tableData: [],

  listActions: [],
  drawerComponents: [],
  overlayComponents: [],
  headerComponent: {},
  footerComponent: {}
}*/
