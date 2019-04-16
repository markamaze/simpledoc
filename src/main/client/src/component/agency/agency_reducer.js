import { fromJS } from 'immutable'




const initialState = fromJS({
  programs: [],
  users: [],
  positions: [],
  clients: [],
  agentTypes: []
})

export default function agency_reducer (state=initialState, action) {
  switch(action.type) {

    case "LOAD_ALL_AGENT_TYPES": {
      let newState = state
      let agentTypeSet = Object.values(action.payload.allAgentTypes)
      console.log(agentTypeSet, "agentset")
      agentTypeSet.forEach(item => {
        newState = newState.setIn(['agentTypes', newState.get('agentTypes').size], fromJS(item))
      })


      return newState
    }

    case "CREATE_AGENT_TYPE": {
      let new_id = action.payload.agentTypeId.agent_type_id
      let newAgentType = action.payload.agentType.setIn(['agent_type_object_id'], new_id)
      let newState = state.setIn(['agentTypes', state.get('agentTypes').size], newAgentType)
      return newState
    }

    case "GET_AGENT_TYPE": {
      console.log("GET_AGENT_TYPE reducer function called")
      return state
    }
    case "UPDATE_AGENT_TYPE" : {
      let index = state.get('objectTypes')
                      .findIndex(type => type.get('id') === action.payload.type.get('id'))

      index == -1 ? index = state.get('objectTypes').size : null

      let newState = state.setIn(['objectTypes', index], action.payload.type )

      return newState
    }

    case "DELETE_AGENT_TYPE" : {
      let index = state.get('objectTypes')
                      .findIndex(type => type.get('id') == action.payload.type.get('id'))

      let newState
      index == -1 ?
        newState = state
        : newState = state.deleteIn(['objectTypes', index])

      return newState
    }

    case "CREATE_AGENT": {
      console.log("CREATE_AGENT reducer function called")
      return state
    }
    case "GET_AGENT": {
      console.log("GET_AGENT reducer function called")
      return state
    }
    case "UPDATE_AGENT": {
      console.log("UPDATE_AGENT reducer function called")
      return state
    }
    case "DELETE_AGENT": {
      console.log("DELETE_AGENT reducer function called")
      return state
    }
    default: return state
  }
}
