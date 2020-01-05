import store from '../../store'
import { put, get, post, remove } from '../../utility/ajax'
import objectId from 'bson-objectid'
import sampleData from '../../sample_data'



export function loadAgencyStore() {
  let agents = [], agentTemplates = [], structuralNodes =[], dataTags=[], users=[]

  //I don't like this, but it's working for now
  get('/Agency/agents', function(request) {
      agents = JSON.parse(request.response).data
      get('/Agency/agentTemplates', function(request) {
          agentTemplates = JSON.parse(request.response).data
          get('/Agency/structuralNodes', function(request) {
              structuralNodes = JSON.parse(request.response).data
              get('/Agency/dataTags', function(request) {
                  dataTags = JSON.parse(request.response).data
                  get('/Agency/users', function(request) {
                      users = JSON.parse(request.response).data
                      store.dispatch({
                        type: "LOAD_AGENCY_STORE",
                        payload: {
                          agents: agents,
                          agentTemplates: agentTemplates,
                          structuralNodes: structuralNodes,
                          dataTags: dataTags,
                          users: users
                        }
                      })
                    }, function() { console.log("error loading agency users")})
                }, function() { console.log("error loading agency dataTags")})
            }, function() { console.log("error loading agency structuralNodes")})
        }, function() { console.log("error loading agency agentTemplates")})

    }, function() { console.log("error loading agency agents")})

}

export function createAgencyObject(type, data){
  let return_data

  post(`/Agency`, data, function(request) {
      return_data = JSON.parse(request.response).data
      store.dispatch({
        type: "CREATE_AGENCY_OBJECT",
        agencyObjectType: type,
        payload: Object.assign(data, { id: return_data[0] })
      })
    }, function() { window.alert("create new object failed")})
}

export function updateAgencyObject(type, data){
  let return_data

  put(`/Agency`, data, function(request){
    return_data = JSON.parse(request.response).data
    store.dispatch({
      type: "UPDATE_AGENCY_OBJECT",
      agencyObjectType: type,
      payload: Object.assign(data)
    })
  }, function() { window.alert("update object failed")})
}

export function deleteAgencyObject(type, data){
  let return_data

  remove(`/Agency`, data, function(request){
    return_data = JSON.parse(request.response).data
    store.dispatch({
      type: "DELETE_AGENCY_OBJECT",
      agencyObjectType: type,
      payload: Object.assign(data)
    })

  }, function(){window.alert("delete object failed")})
}
