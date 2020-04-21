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
      try{
        let newState = Object.assign({}, state)
        action.payload.forEach( form_object => {
          let newformObject = formObject(form_object.type, {...form_object}, err=> {throw err})
          Object.assign(newState, {[`${form_object.type}`]: Object.assign(newState[form_object.type], {[`${form_object.id}`]:newformObject} )})
        })
        console.log(newState)
        action.success ? action.success() : null

        return newState
      } catch(err) {
        console.log(err)
        return state
      }
    }

    case "WRITE_FORM_OBJECTS": {
      try{
        let newState = Object.assign({}, state)
        let updatedObjects = action.payload

        updatedObjects.forEach(formObject => {
          let updatedObject = { [`${formObject.id}`]: formObject }
          let newTypeSet = Object.assign({}, newState[formObject.type()], updatedObject)
          newState = Object.assign({}, newState, { [`${formObject.type()}`] : newTypeSet})
        })
        action.success ? action.success() : null
        return newState
      } catch(err){
        action.payload.failure(`error writing to store: ${err}`)
        return state
      }
    }

    case "DELETE_FORM_OBJECTS": {
      try {
        let newState = Object.assign({}, state)
        let removeObjects = action.payload

        removeObjects.forEach(formObject => {
          delete newState[formObject.type()][formObject.id]
        })
        action.success ? action.success() : null
        return newState
      } catch(err){
        action.payload.failure(`error deleting form object: ${err}`)
        return state
      }
    }
    default: return state

  }
}
