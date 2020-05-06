import React from 'react'
import uuidv4 from 'uuid/v4'

import store from '../../store'
import moduleObjectPrototype from '../moduleObjectPrototype'
import moduleServices from '../moduleServices'
import moduleUtilities from '../moduleUtilities'
// import * as storageActions from './actions'

import * as thread from './thread'
import * as message from './message'


const commPrototypes = { thread, message }
const typeMap = {
  thread: "COMM.THREAD",
  message: "COMM.MESSAGE"
}
const commStorageHandlers = {
  create: () => console.log("create storage handler called"),
  update: () => console.log("update storage handler called"),
  remove: () => console.log("remove storage handler called")
}


const commObject = (type, data, failure) => {
  try {
    let _commObj = Object.create({
      ...commPrototypes[type].prototype(() => store.getState().comm, moduleServices, moduleUtilities),
      ...moduleObjectPrototype(typeMap, commStorageHandlers)
    })
    _commObj.init(data, failure)

    return _commObj
  } catch(error) { failure(new Error(`${error}: failure to create commObject`)) }
}

const commTypeData = type => commPrototypes[type].displayProps(() => store.getState().comm, moduleServices, moduleUtilities)

export { commObject, commTypeData }
