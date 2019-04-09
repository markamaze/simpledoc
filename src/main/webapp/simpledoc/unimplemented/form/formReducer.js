import { fromJS } from 'immutable'




const initialState = fromJS({
  forms: []
})

export default function formReducer (state=initialState, action) {
  switch(action.type) {
    case "UPDATE_FORM" : {
      let index = state.get('forms')
      .findIndex(form => form.get('id') === action.payload.form.get('id'))

      index == -1 ? index = state.get('forms').size : null

      let newState = state.setIn(['forms', index], action.payload.form )

      return newState
    }

    case "DELETE_FORM" : {
      let index = state.get('forms')
      .findIndex(form => form.get('id') == action.payload.form.get('id'))

      let newState
      index == -1 ?
      newState = state
      : newState = state.deleteIn(['forms', index])

      return newState
    }

    case "CREATE_FORM": {
      console.log("CREATE_FORM reducer function called")
      return state
    }

    case "GET_FORM": {
      console.log("GET_FORM reducer function called")
      return state
    }

  }
}
