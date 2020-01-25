import React from 'react'
import { ListWrapper } from './styles'



export default function List(props){
  const [showOverlay, setOverlay] = React.useState(false)
  const [drawerComponent, setDrawerComponent] = React.useState(false)
  const [selectedItems, setSelectedItems] = React.useState([])

  const updateSelectedItems = item => {
    isItemSelected(item) ? setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item)) : setSelectedItems([...selectedItems, item])

  }
  const isItemSelected = item => selectedItems.find( selectedItem => selectedItem === item )

  const addRow = (item, loadingFn) =>
    <div className={`table-row${isItemSelected(item) ? "-active" : ""}`}>
      <div className="row">
        {
          props.columns[props.limited ? "limited" : "expanded"].map( column =>
            <div className="row-cell" onClick={()=> updateSelectedItems(item)}>{item[column.selector]}</div>)
        }
      </div>
      {
        isItemSelected(item) ? //load set of action creators that will set overlay with a component
          <div className="row-expanded">
            {
              props.overlayComponents.length > 0 ? <div className="list-overlay-options">{loadOverlayHandlers(item)}</div> : null
            }
          </div>
          : null
      }
      {
        isItemSelected(item) ? //load drawer as tabbed pages inside drawer when item is selectedItem
          props.drawerComponents.length > 0 ? <div className="row-drawer">{loadingFn(item)}</div> : null
          : null
      }
    </div>

  const addIcon = item =>
    <div className="icon" onClick={() => updateSelectedItems(item)}>
      { props.iconComponent(item) }
      {
        isItemSelected(item) ?
          props.overlayComponents.length > 0 ? <div className="list-overlay-options">{loadOverlayHandlers(item)}</div> : null
          : null
      }
      {
        isItemSelected(item) ?
          props.drawerComponents.length > 0 ? <div className="row-drawer">{loadTableDrawer(item)}</div> : null
          : null
      }
    </div>

  const loadOverlayHandlers = item => props.overlayComponents.map( overlayComponent =>
    <div className="action-handler" onClick={() => setOverlay(overlayComponent.component(item))}>{overlayComponent.label}</div>)

  const loadTableDrawer = (item) => {
    if(props.drawerComponents.length === 1) return props.drawerComponents[0].component(item)
    if(props.drawerComponents.length < 1) return null

    return  <div className="row-drawer">
              <div className="row-drawer-tabs">
                { props.drawerComponents.map( component =>
                    <div className="row-drawer-tab" onClick={() => setDrawerComponent(component.component(item))}>{component.label}</div>) }
              </div>
              { drawerComponent ? <div className="row-drawer-component">{ drawerComponent}</div> : null }
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
          <div className="table-header row">
            { props.columns[props.limited ? "limited" : "expanded"].map( column =>
                <div className="table-header-column row-cell">{column.label}</div>) }
          </div>
          <div className="table-body">
            { props.tableData.map( item => addRow(item, loadTableDrawer)) }
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
          <div className="action-handler" onClick={() => item.action()}>{item.label}</div> )
      }
    </div>


  try {
    return  <ListWrapper className="list" style={props.style}>
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
