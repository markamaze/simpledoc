import store from '../../store'
import { put, get, post, remove } from '../../utility/ajax'



export function loadAgencyData() {
  get('/Agency', function(request) {
    let agent_data = JSON.parse(JSON.parse(request.response).data)
    store.dispatch({
      type: "LOAD_AGENCY",
      payload: agent_data
    })
  }, function() { window.alert("error loading agent data")})}
