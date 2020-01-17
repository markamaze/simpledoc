import React from 'react'






function TreeDisplay(props){

  const buildTree = (item, depth) =>
    <div className="tree-item" style={{paddingLeft: `${depth/2}rem`}} key={`tree-item-${item.id}`}>

      <div className={`tree-item-header${props.isActive ? "-active" : ""}`} >

        <div className="tree-item-header-title" onClick={()=> props.itemClickAction(item)} >{ item.displayProps.displayName.call(item) }</div>




      </div>

      <div className="tree-item-children" style={{paddingLeft: `${depth/2 + 0.25}rem`}}>
        { props.getChildren(item).map( child => buildTree(child, ++depth) )}
      </div>

    </div>

  try{ return buildTree(props.rootItem, 0) } catch(err){ throw new Error(`${err} <- Thrown from TreeDisplay`) }
}


export default TreeDisplay
