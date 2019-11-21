import store from '../../store'
import { put, get, post, remove } from '../../utility/ajax'
import objectId from 'bson-objectid'
import sampleData from '../../sample_data'



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
          agents: sampleData.agency.agents,
          agentTemplates: sampleData.agency.agentTemplates,
          structuralNodes: sampleData.agency.structuralNodes,
          dataTags: sampleData.agency.dataTags,
          users: sampleData.agency.users
        }
      })
    // )
}

export function createAgencyObject(type, data){
  store.dispatch({
    type: "CREATE_AGENCY_OBJECT",
    agencyObjectType: type,
    payload: Object.assign({}, data, { id: new objectId().toString()})
  })
}

export function updateAgencyObject(type, data){
  store.dispatch({
    type: "UPDATE_AGENCY_OBJECT",
    agencyObjectType: type,
    payload: Object.assign({}, data)
  })
}

export function deleteAgencyObject(type, data){
  store.dispatch({
    type: "DELETE_AGENCY_OBJECT",
    agencyObjectType: type,
    payload: Object.assign({}, data)
  })
}





export function createAgentTemplate(agentTemplate) {
  createAgencyObject("agentTemplate", agentTemplate)
}
export function createAgent(agent) {
  createAgencyObject("agent", agent)
}
export function createStructuralNode(structuralNode) {
  createAgencyObject("structuralNode", structuralNode)
}
export function createDataTag(dataTag) {
  createAgencyObject("dataTag", dataTag)
}
export function createUser(user) {
  createAgencyObject("user", user)
}



export function updateAgentTemplate(agentTemplate) {
  updateAgencyObject("agentTemplate", agentTemplate)
}
export function updateAgent(agent) {
  updateAgencyObject("agent", agent)
}
export function updateStructuralNode(structuralNode) {
  updateAgencyObject("structuralNode", structuralNode)
}
export function updateDataTag(dataTag) {
  updateAgencyObject("dataTag", dataTag)
}
export function updateUser(user) {
  updateAgencyObject("user", user)
}



export function deleteAgentTemplate(agentTemplate) {
  deleteAgencyObject("agentTemplate", agentTemplate)
}
export function deleteAgent(agent) {
  deleteAgencyObject("agent", agent)
}
export function deleteStructuralNode(structuralNode) {
  deleteAgencyObject("structuralNode", structuralNode)
}
export function deleteDataTag(dataTag) {
  deleteAgencyObject("dataTag", dataTag)
}
export function deleteUser(user) {
  deleteAgencyObject("user", user)
}
