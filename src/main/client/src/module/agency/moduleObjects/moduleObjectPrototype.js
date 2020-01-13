import React from 'react'
import Builder from '../moduleComponents/Builder'
import Editor from '../moduleComponents/Editor'
import DisplayCard from '../moduleComponents/DisplayCard'


export const moduleObjectPrototype = (type, objectPrototype) => ({
  ...objectPrototype.typeFunctions,

  type: function(){ return type },

  init: function(state) {
    let success = true, index = 0
    let propObjects = Object.entries(objectPrototype.properties)

    if(state === null || state === undefined) success = false

    while(success && index < propObjects.length){
      let property = propObjects[index]
      let key = property[0]

      if(!property[1].setValue.call(this, state[key])) success = false
      ++index
    }


    return success ? this : false
  },

  update: function(newState){
    let success = true

    //check that each property is valid
    Object.entries(newState).map( property => {
      let key = property[0]
      let value = property[1]
      if(!objectPrototype.properties[key].validate.call(this, value)) success = false
    })

    //if all valid, set values
    if(success)
      Object.entries(newState).map( property => {
        let key = property[0]
        let value = property[1]
        if(!objectPrototype.properties[key].setValue.call(this, value)) success = false
      })

    return success ? this : false
  },

  //todo: need to set type dynamically
  toJSON: function(){
    let type = this.type()
    if(type === "agent") type = "AGENCY.USER"
    else if(type === "agentTemplate") type = "AGENCY.AGENTTEMPLATE"
    else if(type === "structuralNode") type = "AGENCY.STRUCTURALNODE"
    else if(type === "dataTag") type = "AGENCY.DATATAG"
    else if(type === "user") type = "AGENCY.USER"

    let objectData = Object.entries(this).filter(entry => entry[0] !== "id")
    return `{
      \"id\":\"${this.id.toString()}\",
      \"type\":\"${type}\",
      \"object_data\": ${JSON.stringify(Object.fromEntries(objectData))}
    }`
  },

  display: function(props){
      if(props.builder)
        return <Builder {...props} {...objectPrototype.displayProps.builder} dataItem={this} />
      else if(props.editor)
        return <Editor {...props} {...objectPrototype.displayProps.editor} dataItem={this} />
      else if(props.card)
        return <DisplayCard {...props} {...objectPrototype.displayProps.card} dataItem={this} />
      else
        return <div style={{border: "solid black thin"}}>Error</div>
  }
})
