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

export function createFormObjects(objectSet, success, failure){
  post(`/Forms`, objectSet, function(request){
    let result = JSON.parse(request.response)

    if(result.error) failure(`create object unsuccessful: ${result.error}`)
    else store.dispatch({
      type: "WRITE_FORM_OBJECTS",
      payload: objectSet,
      success: success,
      failure: failure
    })
  }, failure)
}

export function updateFormObjects(objectSet, success, failure){
  put(`/Forms`, objectSet, function(request){
    let result = JSON.parse(request.response)

    if(result.error) failure(`update unsuccessful: ${result.error}`)
    else store.dispatch({
      type: "WRITE_FORM_OBJECTS",
      payload: objectSet,
      success: success,
      failure: failure
    })
  }, failure)
}
export function removeFormObjects(objectSet, success, failure){
  !confirm("are you sure you want to permanently delete this?") ? null
    : remove(`/Forms`, objectSet, function(request){
        let result = JSON.parse(request.response)

        if(result.error) failure(`could not delete object: ${result.error}`)
        else store.dispatch({
          type: "DELETE_FORM_OBJECTS",
          payload: objectSet,
          failure: failure
        })
      }, failure)
}
