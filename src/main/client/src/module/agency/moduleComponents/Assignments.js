import React, { useState } from 'react'



function Assignments(props){

  console.log(props)
  return  <div>{`assignment component in ${props.viewType} mode`}</div>
}
export default Assignments
