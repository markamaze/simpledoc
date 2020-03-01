import store from '../../store'
import { put, get, post, remove } from './agencyUtils/ajax'



export function loadAgencyStore(){
  get(`/Agency`, function(request){
    store.dispatch({
      type: "LOAD_AGENCY_OBJECTS",
      payload: JSON.parse(request.response).data
    })
  }, err => err.printStackTrace())
}

export function createAgencyObjects(objectSet, success, failure){
  post(`/Agency`, objectSet, function(request){
    let result = JSON.parse(request.response)
    if(result.error) failure(`create object unsuccessful: ${result.error}`)
    else {
      store.dispatch({
        type: "WRITE_AGENCY_OBJECTS",
        payload: objectSet
      })
      success ? success() : null
    }

  }, failure)
}

export function updateAgencyObjects(objectSet, success, failure){
  put(`/Agency`, objectSet, function(request){
    let result = JSON.parse(request.response)

    if(result.error) failure(`update unsuccessful: ${result.error}`)
    else {
      store.dispatch({
        type: "WRITE_AGENCY_OBJECTS",
        payload: objectSet,
        failure: failure
      })
      success ? success() : null
    }
  }, failure)
}

export function removeAgencyObjects(objectSet, success, failure){
  !confirm("are you sure you want to permanently delete this?") ? null
    : remove(`/Agency`, objectSet, function(request){
        let result = JSON.parse(request.response)

        if(result.error) failure(`could not delete object: ${result.error}`)
        else {
          store.dispatch({
            type: "DELETE_AGENCY_OBJECTS",
            payload: objectSet
          })
          success()
        }
      }, failure)
}
