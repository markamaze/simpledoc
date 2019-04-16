import store from '../store'



export function openInstance(instance, instanceId) {
  store.dispatch({
    type: "OPEN_INSTANCE",
    payload: { instance: instance,
                instanceId: instanceId }
  })
}

export function closeInstance(instanceId) {
  store.dispatch({
    type: "CLOSE_INSTANCE",
    payload: { instanceId: instanceId }
  })
}

export function loadInstance(instanceId) {
  store.dispatch({
    type: 'LOAD_INSTANCE',
    payload: { instanceId: instanceId }
  })
}
