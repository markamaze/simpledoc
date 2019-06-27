const initialState = {
  drawerComponents: [],
  activeDrawerComponentKey: null
}

export default function layoutReducer (state=initialState, action) {

  switch(action.type) {

    case "CREATE_DRAWER_COMPONENT" : {
      let new_component = Object.assign({}, action.payload)
      let updated_component_set




      state.drawerComponents.forEach( component =>
        console.log(component.key === new_component.key ))
      state.drawerComponents.includes( component =>
        component.key === new_component.key )
        ? updated_component_set = Object.assign([], state.drawerComponents)
        : updated_component_set = Object.assign([], state.drawerComponents.concat(new_component))

      return Object.assign({}, state, { drawerComponents: updated_component_set })
    }


    case "CLOSE_DRAWER_COMPONENT" : {
      let filtered_components = state.drawerComponents.filter( component =>
        component.id !== action.payload.id )

      let drawer_open, active_component_id

      if(filtered_components.length > 0) {
        drawer_open = true
        active_component_id = filtered_components[0].id
      }
      else {
        drawer_open = false
        active_component_id = null
      }

      return Object.assign({}, state, { drawerComponents: filtered_components,
                                        activeDrawerComponentId: active_component_id,
                                        drawerOpen: drawer_open })
    }


    case "LOAD_IN_DRAWER_VIEW": {
      return Object.assign({}, state, { activeDrawerComponentKey: action.payload })
    }


    case "SAVE_STATE": {
      console.log("saving component state", action.payload)

      //find by key in store: if not found add payload, if found update existing state
      return state
    }


    case "CLEAR_STATE": {
      console.log("clearing component state")
    }


    default: return state
  }
}
