import store from './store'
import { put, get, post, delete } from '../utility/ajax'



export function updateForm(form) {
  //need to add async connection to server
  //url -> PUT:/forms/:form.id
  post(`/update/Form/:${form.get('id')}`, form, function(request) {
    console.log(request, 'request data')
    store.dispatch({
      type: "UPDATE_FORM",
      payload: { form: form }
    })
  }, function() { window.alert("error updating form") })
}

export function deleteForm(form) {
  store.dispatch({
    type: "DELETE_FORM",
    payload: { form: form }
  })
}

export function createForm(form) {
  console.log("createForm action called")
}

export function getForm(form) {
  console.log("getForm action called")
}
