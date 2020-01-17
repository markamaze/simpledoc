import React, { useState } from 'react'



function ObjectData(props){

  console.log(props)
  return  <div>{`component in ${props.viewType} mode`}</div>
}
export default ObjectData
