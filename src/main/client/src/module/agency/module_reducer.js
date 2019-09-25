import sampleData from '../../sample_data'
import * as agencyObject from './agencyObjects'


// const initialState = {
//   structuralNodes: [],
//   agentTemplates: [],
//   agents: [],
//   dataTags: [],
//   users: []
// }

const initialState = sampleData.agency



export default function agency_reducer (state=initialState, action) {
  switch(action.type) {
    case "LOAD_AGENCY_STORE": {
      console.log("loading agency", action.payload)


      return Object.assign({}, state, { structuralNodes: action.payload.structuralNodes,
                                        agents: action.payload.agents,
                                        agentTemplates: action.payload.agentTemplates,
                                        dataTags: action.payload.dataTags,
                                        users: action.payload.users
                                      })
    }


    case "CREATE_AGENT_TEMPLATE": {
      let updatedSet = Object.assign([], state.agentTemplates.concat(action.payload))

      return Object.assign({}, state, {agentTemplates: updatedSet})
    }


    case "UPDATE_AGENT_TEMPLATE": {
      let updatedSet = Object.assign([],
        state.agentTemplates.filter( item =>
          item.id !== action.payload.id).concat(action.payload))

      return Object.assign({}, state, {agentTemplates: updatedSet})
    }


    case "DELETE_AGENT_TEMPLATE": {
      let updatedSet = Object.assign([],
        state.agentTemplates.filter( item =>
          item.id !== action.payload.id))

      return Object.assign({}, state, {agentTemplates: updatedSet})
    }


    case "CREATE_AGENT": {
      let updatedSet = Object.assign([], state.agents.concat(action.payload))

      return Object.assign({}, state, {agents: updatedSet})
    }


    case "UPDATE_AGENT": {
      let updatedSet = Object.assign([],
        state.agents.filter( item =>
          item.id !== action.payload.id).concat(action.payload))

      return Object.assign({}, state, {agents: updatedSet})
    }


    case "DELETE_AGENT": {
      let updatedSet = Object.assign([],
        state.agents.filter( item =>
          item.id !== action.payload.id))

      return Object.assign({}, state, {agents: updatedSet})
    }


    case "CREATE_STRUCTURAL_NODE": {
      let updatedSet = Object.assign([], state.structuralNodes.concat(action.payload))

      return Object.assign({}, state, {structuralNodes: updatedSet})
    }


    case "UPDATE_STRUCTURAL_NODE": {
      console.log(action)
      let updatedSet = Object.assign([],
        state.structuralNodes.filter( item =>
          item.id !== action.payload.id).concat(action.payload))

      return Object.assign({}, state, {structuralNodes: updatedSet})
    }


    case "DELETE_STRUCTURAL_NODE": {
      let updatedSet = Object.assign([],
        state.structuralNodes.filter( item =>
          item.id !== action.payload.id))

      return Object.assign({}, state, {structuralNodes: updatedSet})
    }


    case "CREATE_DATA_TAG": {
      let updatedSet = Object.assign([], state.dataTags.concat(action.payload))

      return Object.assign({}, state, {dataTags: updatedSet})
    }


    case "UPDATE_DATA_TAG": {
      let updatedSet = Object.assign([],
        state.dataTags.filter( item =>
          item.id !== action.payload.id).concat(action.payload))

      return Object.assign({}, state, {dataTags: updatedSet})
    }


    case "DELETE_DATA_TAG": {
      let updatedSet = Object.assign([],
        state.dataTags.filter( item =>
          item.id !== action.payload.id))

      return Object.assign({}, state, {dataTags: updatedSet})
    }


    case "CREATE_USER": {
      let updatedSet = Object.assign([], state.users.concat(action.payload))

      return Object.assign({}, state, {users: updatedSet})
    }


    case "UPDATE_USER": {
      let updatedSet = Object.assign([],
        state.users.filter( item =>
          item.id !== action.payload.id).concat(action.payload))

      return Object.assign({}, state, {users: updatedSet})
    }


    case "DELETE_USER": {
      let updatedSet = Object.assign([],
        state.users.filter( item =>
          item.id !== action.payload.id))

      return Object.assign({}, state, {users: updatedSet})
    }

    default: return state
  }
}
