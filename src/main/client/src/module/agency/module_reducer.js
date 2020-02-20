// import { user } from './moduleObjects/user'
import { agencyObject } from './moduleObjects/agencyObject'

const initialState = {
  structuralNode: {},
  agentTemplate: {},
  agent: {},
  dataTag: {},
  user: {},
  assignment: {},
  role: {},
  property: {}
}



export default function agency_reducer(state=initialState, action) {
  switch(action.type) {
    case "LOAD_AGENCY_OBJECTS": {
      let newState = Object.assign({}, state)
      action.payload.forEach( agency_object => {
        let newAgencyObject = agencyObject(agency_object.type, {...agency_object}, err=> {throw err})
        Object.assign(newState, {[`${agency_object.type}`]: Object.assign(newState[agency_object.type], {[`${agency_object.id}`]:newAgencyObject} )})
      })
      console.log(newState)

      return newState
    }

    case "WRITE_AGENCY_OBJECTS": {
      let newState = Object.assign({}, state)
      let newObjects = action.payload

      newObjects.forEach(agencyObject => {
        let newObject = { [`${agencyObject.id}`]: agencyObject }
        let newTypeSet = Object.assign({}, newState[agencyObject.type()], newObject)
        newState = Object.assign({}, newState, { [`${agencyObject.type()}`] : newTypeSet})
      })


      return newState
    }

    case "DELETE_AGENCY_OBJECTS": {
      let type = action.payload.type()
      let newTypeSet = Object.assign({}, state[type])
      delete newTypeSet[`${action.payload.id}`]

      return Object.assign({}, state, { [`${type}`]: newTypeSet })
    }
    default: return state

  }
}
