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
  }, function() { console.log("error loading agency categories")})
}

function loadAgencyDefinitions() {
  get('/Agency/definitions', function(request) {
    let agency_definitions = JSON.parse(request.response).data
    store.dispatch({
      type: "LOAD_AGENCY_DEFINITIONS",
      payload: agency_definitions
    })
  }, function() { console.log("error loading agency definitions")})
}

function loadAgencyAgents() {
  get('/Agency/agents', function(request) {
    let agency_agents = JSON.parse(request.response).data
    store.dispatch({
      type: "LOAD_AGENCY_AGENTS",
      payload: agency_agents
    })
  }, function() { console.log("error loading agency agents")})
}

export function createCategory(data){
  console.log("create category action")
}

export function updateCategory(data){
  console.log("update category action")
}

export function deleteCategory(data){
  console.log("delete category action")
}
