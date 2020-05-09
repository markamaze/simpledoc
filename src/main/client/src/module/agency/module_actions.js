import store from '../../store'
import { put, get, post, remove } from './agencyUtils/ajax'



export function loadAgencyStore(getStore, services, utilities){
  get(`/agency`, function(request){
    store.dispatch({
      type: "LOAD_AGENCY_OBJECTS",
      payload: JSON.parse(request.response).data,
      getStore: () => getStore("agency"),
      getServices: () => services,
      getUtilities: () => utilities,
      failure: (err) => { throw new Error(err) }
    })
  }, err => err.printStackTrace())
}

export function createAgencyObjects(objectSet, success, failure){
  post(`/agency`, objectSet, function(request){
    let result = JSON.parse(request.response)
    if(result.error) failure(`create object unsuccessful: ${result.error}`)
    else store.dispatch({
      type: "WRITE_AGENCY_OBJECTS",
      payload: objectSet,
      success: success,
      failure: failure
    })
  }, failure)
}

export function updateAgencyObjects(objectSet, success, failure){
  put(`/agency`, objectSet, function(request){
    let result = JSON.parse(request.response)

    if(result.error) failure(`update unsuccessful: ${result.error}`)
    else store.dispatch({
      type: "WRITE_AGENCY_OBJECTS",
      payload: objectSet,
      success: success,
      failure: failure
    })
  }, failure)
}

export function removeAgencyObjects(objectSet, success, failure){
  !confirm("are you sure you want to permanently delete this?") ? null
    : remove(`/agency`, objectSet, function(request){
        let result = JSON.parse(request.response)

        if(result.error) failure(`could not delete object: ${result.error}`)
        else store.dispatch({
          type: "DELETE_AGENCY_OBJECTS",
          payload: objectSet,
          success: success,
          failure: failure
        })
      }, failure)
}
