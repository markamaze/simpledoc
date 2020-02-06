import { formObject } from './formObjects/formObject'

const initialState = {
  form: {},
  section: {},
  layout: {},
  element: {},
  formSet: {},
  submissions: {}
}



export default function form_reducer(state=initialState, action) {
  switch(action.type) {
    case "LOAD_FORM_STORE": {
      let newState = Object.assign({}, state)
      action.payload.forEach( form_object => {
        let newformObject = formObject(form_object.type, {...form_object}, err=> {throw err})
        Object.assign(newState, {[`${form_object.type}`]: Object.assign(newState[form_object.type], {[`${form_object.id}`]:newformObject} )})
      })
      console.log(newState)

      return newState
    }

    case "UPDATE_FORM_OBJECTS": {
      let newState = Object.assign({}, state)
      action.payload.forEach( ([key, value]) => {
        newState = Object.assign({}, newState,
          { [`newState[${key}]`]:{
            [`newState[${key}][${value.id}]`] : formObject(key, value, action.failure)} }) })
      console.log(newState)

      return newState
    }

    case "DELETE_FORM_OBJECTS": {

    }
    default: return state

  }
}
