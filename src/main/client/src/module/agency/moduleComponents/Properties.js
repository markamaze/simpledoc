import React, { useState } from 'react'



function Properties(props){

  console.log(props)
  return  <div>{`properties component in ${props.viewType} mode`}</div>
}
export default Properties
