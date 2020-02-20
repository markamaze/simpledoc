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
      let newState = Object.assign({}, state)
      let newObjects = action.payload

      newObjects.forEach(formObject => {
        let newObject = { [`${formObject.id}`]: formObject }
        let newTypeSet = Object.assign({}, newState[formObject.type()], newObject)
        newState = Object.assign({}, newState, { [`${formObject.type()}`] : newTypeSet})
      })

      return newState
    }

    case "UPDATE_FORM_OBJECTS": {
      let newState = Object.assign({}, state)
      let updatedObjects = action.payload

      updatedObjects.forEach(formObject => {
        let updatedObject = { [`${formObject.id}`]: formObject }
        let newTypeSet = Object.assign({}, newState[formObject.type()], updatedObject)
        newState = Object.assign({}, newState, { [`${formObject.type()}`] : newTypeSet})
      })

      return newState
    }

    case "DELETE_FORM_OBJECTS": {
      let newState = Object.assign({}, state)
      let removeObjects = action.payload

      removeObjects.forEach(formObject => {
        let newTypeSet = Object.assign({}, newState[formObject.type()])
        delete newTypeSet[`${formObject.id}`]
        newState = Object.assign({}, newState, { [`${formObject.type()}`] : newTypeSet})
      })

      return newState
    }
    default: return state

  }
}
