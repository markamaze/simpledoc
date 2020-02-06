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
  post(`/agency`, function(request){
    let result = JSON.parse(request.response)

    if(result.error) failure(result.error)
  })
}

export function updateAgencyObjects(objectSet, failure){
  put(`/agency`, function(request){
    let result = JSON.parse(request.response)

    if(result.error) failure(result.error)
    else store.dispatch({
      type: "UPDATE_AGENCY_OBJECTS",
      payload: objectSet,
      failure: failure
    })
  }, failure)
}

export function removeAgencyObjects(objectSet, failure){
  remove(`/agency`, function(request){
    let result = JSON.parse(request.response)

    if(result.error) failure(result.error)
    else store.dispatch({
      type: "DELETE_AGENCY_OBJECTS",
      payload: objectSet,
      failure: failure
    })
  }, )
}
