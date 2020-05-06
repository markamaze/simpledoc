import React from 'react'
import { commObject } from './commObject'



const prototype = (getStore, services, utilities) => ({
  type: function(){ return "message" },
  properties: {
    id: {
      setValue: function(id){},
      validate: id => { return true }
    }
  },
  display: {
    card: message => {
      return <div className="container-item">message Card</div>
    },
    document: message => {
      return <div className="document">message Document</div>
    },
    builder: (message, close, alert) => {
      function Editor(props){
        return <div>message editor</div>
      }

      return <Editor message={message} />
    },
    builder: (message, close, alert) => {
      function Builder(props){
        return <div>message Builder</div>
      }

      return <Builder message={message} />
    }
  },
  typeFunctions: {}
})



const displayProps = (getStore, services, utilities) => ({
  component: {
    list: {}
  },
  procedure: {}
})


export { prototype, displayProps }
