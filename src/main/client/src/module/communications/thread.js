import React from 'react'
import { commObject } from './commObject'



const prototype = (getStore, services, utilities) => ({
  type: function(){ return "thread" },
  properties: {
    id: {
      setValue: function(id){},
      validate: id => { return true }
    },
    label: {
      setValue: function(label){},
      validate: label => { return true }
    }
  },
  display: {
    card: thread => {
      return <div className="container-item">Thread Card</div>
    },
    document: thread => {
      return <div className="document">Thread Document</div>
    },
    builder: (thread, close, alert) => {
      function Builder(props){
        return <div>Thread Builder</div>
      }

      return <Builder thread={thread} />
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
