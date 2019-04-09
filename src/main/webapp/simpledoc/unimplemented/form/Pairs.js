import React from 'react'

import Element from './Element'



//props:layout, layoutdata
const Pairs = (props) => {

  const renderElements = (elements, layoutdata) =>
    elements.map(element => <Element  element={element}
                                      activeObject={props.activeObject}
                                      elementClick={props.elementClick} />)

  return  <div className={`pairs ${props.activeObject === props.layout ? 'active' : null}`} style={{border: "thin solid black"}}>
            { renderElements(props.layout.get('elements'), props.layoutdata) }
          </div>
}

export default Pairs
