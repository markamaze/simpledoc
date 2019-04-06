import React from 'react'

import AgentTypeBuilder from './agency/AgentTypeBuilder'
import AgentFactory from './agency/AgentFactory'
import {  openInstance,
          closeInstance } from './appstate_actions'
import objectIdGenerator from '../utility/objectIdGenerator'


export default function instanceFactory(type, item, reqdata) {
  switch (type) {
    case 'agentTypes': {
      let newID = objectIdGenerator()
      openInstance(<AgentTypeBuilder data={item}
                                closeInstance={() => closeInstance(newID)}/>, newID)
      break
    }
    case 'programs': {
      let newID = objectIdGenerator()
      openInstance(<AgentFactory  data={item}
                                    objectTypes={reqdata.filter(item => item.get('type') === 'PROGRAM')}
                                    closeInstance={() => closeInstance(newID)}/>, newID)
      break
    }
    case 'clients':{
      let newID = objectIdGenerator()
      openInstance(<AgentFactory  data={item}
                                    objectTypes={reqdata.filter(item => item.get('type') === 'CLIENT')}
                                    closeInstance={() => closeInstance(newID)}/>, newID)
      break
    }
    case 'users': {
      let newID = objectIdGenerator()
      openInstance(<AgentFactory  data={item}
                                    objectTypes={reqdata.filter(item => item.get('type') === 'USER')}
                                    closeInstance={() => closeInstance(newID)}/>, newID)
      break
    }
    case 'positions': {
      let newID = objectIdGenerator()
      openInstance(<AgentFactory  data={item}
                                    objectTypes={reqdata.filter(item => item.get('type') === 'POSITION')}
                                    closeInstance={() => closeInstance(newID)}/>, newID)
      break
    }
    default:

  }
}
