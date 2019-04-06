import { fromJS } from 'immutable'




const initialState = fromJS({
  currentUser: {
      id: null,
      positions: [],
      programs: [],
      clients: []
    },
  openInstances: [],
  loadedInstance: {}
})

export default function appstate_reducer (state=initialState, action) {
  switch(action.type) {
    case "OPEN_INSTANCE" : {
      let instanceIndex = state.get("openInstances").size
      return state.setIn(["openInstances", instanceIndex], action.payload)
    }

    case "CLOSE_INSTANCE" : {
      let instanceIndex = state.get('openInstances')
                                .findIndex(instance => instance.instanceId == action.payload.instanceId)
      let newState = state.deleteIn(['openInstances', instanceIndex])
      return newState
    }

    case "LOAD_INSTANCE": {
      console.log("LOAD_INSTANCE reducer functino called")
      return state
    }
    default: return state
  }
}
