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

export function createAgencyObjects(objectSet, failure){
  post(`/Agency`, objectSet, function(request){
    let result = JSON.parse(request.response)
    if(result.error) failure(result.error)
    else store.dispatch({
      type: "WRITE_AGENCY_OBJECTS",
      payload: objectSet
    })
  })
}

export function updateAgencyObjects(objectSet, failure){
  put(`/Agency`, objectSet, function(request){
    let result = JSON.parse(request.response)

    if(result.error) failure(result.error)
    else store.dispatch({
      type: "WRITE_AGENCY_OBJECTS",
      payload: objectSet,
      failure: failure
    })
  }, failure)
}

export function removeAgencyObjects(objectSet, failure){
  remove(`/Agency`, objectSet, function(request){
    let result = JSON.parse(request.response)

    if(result.error) failure(result.error)
    else store.dispatch({
      type: "DELETE_AGENCY_OBJECTS",
      payload: objectSet,
      failure: failure
    })
  }, )
}
