import store from '../store'



export function createDrawerComponent(component) {
  store.dispatch({
    type: "CREATE_DRAWER_COMPONENT",
    payload: component
  })
}

export function closeDrawerComponent(id) {
  store.dispatch({
    type: "CLOSE_DRAWER_COMPONENT",
    payload: { id: id }
  })
}

export function loadInDrawerView(key) {
  store.dispatch({
    type: 'LOAD_IN_DRAWER_VIEW',
    payload: key
  })
}

export function setComponentState(key, state) {
  store.dispatch({
    type: "SAVE_STATE",
    payload: { key: key, state: state }
  })
}

export function clearComponentState(key) {
  store.dispatch({
    type: "CLEAR_STATE",
    payload: { key: key }
  })
}
