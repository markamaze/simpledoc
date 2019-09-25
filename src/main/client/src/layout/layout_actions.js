import store from '../store'


export function addToWorkspace(component_type, data) {
  store.dispatch({
    type: "ADD_COMPONENT_TO_WORKSPACE",
    payload: {type: component_type, data: data}
  })
}

export function updateTempState(id, state) {
  store.dispatch({
    type: "UPDATE_TEMP_STATE",
    payload: {id: id, tempState: state}
  })

}

export function clearTempState(id){
  store.dispatch({
    type: "CLEAR_TEMP_STATE",
    payload: {id: id}
  })
}
