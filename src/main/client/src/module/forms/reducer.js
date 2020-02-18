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
      return newState
    }

    case "CREATE_FORM_OBJECTS": {
      console.log("createFormObject", action.payload)

      return state
    }

    case "UPDATE_FORM_OBJECTS": {
      console.log("updateFormObject", action.payload)

      return state
    }

    case "DELETE_FORM_OBJECTS": {
      console.log("deleteFormObject", action.payload)

      return state
    }
    default: return state

  }
}
