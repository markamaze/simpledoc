import store from '../../store'
import { put, get, post, remove } from './formUtils/ajax'


export function loadFormStore(){
  get('/Forms', function(request) {
                      store.dispatch({
                        type: "LOAD_FORM_STORE",
                        payload: JSON.parse(request.response).data
                      })
                    }, function() { console.log("error loading agency users")})
}

export function loadForms(){
  get('/Forms/forms', function(request){
    let forms = JSON.parse(request.response).data
    store.dispatch({
      type: "LOAD_FORMS",
      payload: { forms: forms }
    })
  }, function(){console.log("error loading forms")})
}

export function loadFormSets(){
  get('/Forms/formsets', function(request){
    let formSets = JSON.parse(request.response).data
    store.dispatch({
      type: "LOAD_FORMSETS",
      payload: {formSets: formSets}
    })
  }, function(){ console.log("error loading form sets")})
}

export function loadSubmissions(){
  get('/Forms/submissions', function(request){
    let submissions = JSON.parse(request.response).data
    store.dispatch({
      type: "LOAD_SUBMISSIONS",
      payload: {submissions: submissions}
    })
  }, function() { console.log("error loading submissions")})
}

export function createFormObject(object, failure){
  console.log("createFormObject", object)
}
export function updateFormObject(object, failure){
  console.log("updateFormObject", object)
}
export function deleteFormObject(object, failure){
  console.log("deleteFormObject", object)
}
