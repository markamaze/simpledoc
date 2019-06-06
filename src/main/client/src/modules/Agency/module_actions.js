import store from '../../store'
import { put, get, post, remove } from '../../utility/ajax'



export function loadAgencyData() {
  loadAgencyCategories()
  loadAgencyDefinitions()
  loadAgencyAgents()
}

function loadAgencyCategories() {
  get('/Agency/categories', function(request) {
    let agency_categories = JSON.parse(request.response).data
    store.dispatch({
      type: "LOAD_AGENCY_CATEGORIES",
      payload: agency_categories
    })
  }, function() { window.alert("error loading agency categories")})
}

function loadAgencyDefinitions() {
  get('/Agency/definitions', function(request) {
    let agency_definitions = JSON.parse(request.response).data
    store.dispatch({
      type: "LOAD_AGENCY_DEFINITIONS",
      payload: agency_definitions
    })
  }, function() { window.alert("error loading agency definitions")})
}

function loadAgencyAgents() {
  get('/Agency/agents', function(request) {
    let agency_agents = JSON.parse(request.response).data
    store.dispatch({
      type: "LOAD_AGENCY_AGENTS",
      payload: agency_agents
    })
  }, function() { window.alert("error loading agency agents")})
}
