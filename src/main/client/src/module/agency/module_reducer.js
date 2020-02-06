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

    case "UPDATE_AGENCY_OBJECTS": {
      let newState = Object.assign({}, state)
      action.payload.forEach( ([key, value]) => {
        newState = Object.assign({}, newState,
          { [`newState[${key}]`]:{
            [`newState[${key}][${value.id}]`] : agencyObject(key, value, action.failure)} }) })
      console.log(newState)

      return newState
    }

    case "DELETE_AGENCY_OBJECTS": {

    }
    default: return state

  }
}
