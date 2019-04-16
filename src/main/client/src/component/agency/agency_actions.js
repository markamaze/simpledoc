import store from '../../store'
import { put, get, post, remove } from '../../utility/ajax'


export function loadAllAgentTypes() {
  get('/AgentType', function(request) {
    let allAgentTypes = JSON.parse(JSON.parse(request.response).data)
    store.dispatch({
      type: "LOAD_ALL_AGENT_TYPES",
      payload: { allAgentTypes: allAgentTypes }
    })
  }, function() { window.alert("error loading all agent types")})
}

export function createAgentType(type) {
  console.log("create agent type action called", type)

  post('/AgentType/newtype', type, function(request) {
    let agentTypeId = JSON.parse(JSON.parse(request.response).data)

    store.dispatch({
      type: "CREATE_AGENT_TYPE",
      payload: { agentType: type, agentTypeId: agentTypeId }
    })
  }, function() { window.alert("error creating new type")})
}

export function getAgentType() {
  console.log("get agent type action called", type)

  // get('/AgentType', function(request) {
  //   store.dispatch({
  //     type: "GET_AGENT_TYPE",
  //     payload: { type: request }
  //   })
  // }, function() { window.alert("error loading all types")})
}

export function updateAgentType(type) {
  console.log("update agent type action called", type)

  // put(`/AgentType/:${type.get('id')}`, type, function(request) {
  //   store.dispatch({
  //     type: "UPDATE_AGENT_TYPE",
  //     payload: { type: type }
  //   })
  // }, function() { window.alert("error updating type")})
}

export function deleteAgentType(type) {
  console.log("delete agent type action called", type)
  // delete('/AgentType/:${type.get('id')}'), type, function(request) {
  // store.dispatch({
  //   type: "DELETE_AGENT_TYPE",
  //   payload: { type: type }
  // })
  // }
}

export function createAgent(object) {
  console.log("createAgent action called")
  // post('/Agent/newAgent')
}

export function getAgent(object) {
  console.log("get agent action called", object)
  // get('/Agent/:${object.get('id')}')
}

export function updateAgent(object) {
  console.log("update agent action called", object)
  // post(`/Agent/:${object.get('id')}`, object, function(request) {
  //   store.dispatch({
  //     type: "UPDATE_AGENT",
  //     payload: { object: object }
  //   })
  // }, function() { window.alert("error updating object")})
}

export function deleteAgent(object) {
  console.log("delete agent action called", object)

  // delete('/Agent/:${object.get(id)}')
  // store.dispatch({
  //   type: "DELETE_AGENT",
  //   payload: { object: object }
  // })
}
