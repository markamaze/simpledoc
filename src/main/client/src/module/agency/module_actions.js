import store from '../../store'
import { put, get, post, remove } from '../../utility/ajax'
import objectId from 'bson-objectid'



export function loadAgencyStore() {
  let agents, agencyTemplates, structuralNodes, dataTags, users


  // get('/Agency/agents', function(request) {
  //     agents = JSON.parse(request.response).data
  //   }, function() { console.log("error loading agency agents")})
  //
  //   .then(
  //     console.log("get agentTemplates next")
  //   )
  //   .then(
  //     console.log("get structuralNodes next")
  //   )
  //   .then(
  //     console.log("get tags next")
  //   )
  //   .then(
  //     console.log("get tagdataset next")
  //   )
  //   .finally(

      store.dispatch({
        type: "LOAD_AGENCY_STORE",
        payload: {
          agents: agents,
          agencyTemplates: agencyTemplates,
          structuralNodes: structuralNodes,
          dataTags: dataTags,
          users: users
        }
      })
    // )
}

export function createAgentTemplate(agentTemplate) {
  store.dispatch({
    type: "CREATE_AGENT_TEMPLATE",
    payload: Object.assign({}, agentTemplate, {id: new objectId().toString()})
  })
}
export function updateAgentTemplate(agentTemplate) {
  store.dispatch({
    type: "UPDATE_AGENT_TEMPLATE",
    payload: agentTemplate
  })
}
export function deleteAgentTemplate(agentTemplate) {
  store.dispatch({
    type: "DELETE_AGENT_TEMPLATE",
    payload: agentTemplate
  })
}

export function createAgent(agent) {

  store.dispatch({
    type: "CREATE_AGENT",
    payload: Object.assign({}, agent, {id: new objectId().toString()})
  })
}
export function updateAgent(agent) {
  store.dispatch({
    type: "UPDATE_AGENT",
    payload: agent
  })
}
export function deleteAgent(agent) {
  store.dispatch({
    type: "DELETE_AGENT",
    payload: agent
  })
}

export function createStructuralNode(structuralNode) {
  store.dispatch({
    type: "CREATE_STRUCTURAL_NODE",
    payload: Object.assign({}, structuralNode, {id: new objectId().toString()})
  })
}
export function updateStructuralNode(structuralNode) {
  store.dispatch({
    type: "UPDATE_STRUCTURAL_NODE",
    payload: structuralNode
  })
}
export function deleteStructuralNode(structuralNode) {
  store.dispatch({
    type: "DELETE_STRUCTURAL_NODE",
    payload: structuralNode
  })
}

export function createDataTag(dataTag) {
  store.dispatch({
    type: "CREATE_DATA_TAG",
    payload: Object.assign({}, dataTag, {id: new objectId().toString()})
  })
}
export function updateDataTag(dataTag) {
  store.dispatch({
    type: "UPDATE_DATA_TAG",
    payload: dataTag
  })
}
export function deleteDataTag(dataTag) {
  store.dispatch({
    type: "DELETE_DATA_TAG",
    payload: dataTag
  })
}

export function createUser(user) {
  store.dispatch({
    type: "CREATE_USER",
    payload: Object.assign({}, user, {id: new objectId().toString()})
  })
}
export function updateUser(user) {
  store.dispatch({
    type: "UPDATE_USER",
    payload: user
  })
}
export function deleteUser(user) {
  store.dispatch({
    type: "DELETE_USER",
    payload: user
  })
}
