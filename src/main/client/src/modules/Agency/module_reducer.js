const initialState = {
  agency_categories: [],
  agency_definitions: [],
  agency_agents: []
}





export default function agency_reducer (state=initialState, action) {
  switch(action.type) {
    case "LOAD_AGENCY_CATEGORIES": {
      let new_category_set = []
      action.payload.forEach( item => {
        let category = Object.assign({}, { id: item[0],
                                            label: item[1],
                                            behavior: item[2],
                                            security: item[3],
                                            data_struct: item[4] })
        new_category_set = [ ...new_category_set, category ]
      })

      return Object.assign({}, state, {agency_categories: new_category_set} )
    }


    case "LOAD_AGENCY_DEFINITIONS": {
      let new_definition_set = []
      action.payload.forEach( item => {
        let definition = Object.assign({}, { id: item[0],
                                        label: item[1],
                                        category_id: item[2],
                                        security: item[3],
                                        data_struct: item[4] })
        new_definition_set = [ ...new_definition_set, definition ]
      })

      return Object.assign({}, state, { agency_definitions: new_definition_set })
    }


    case "LOAD_AGENCY_AGENTS": {
      let new_agent_set = []
      action.payload.forEach( item => {
        let agent = Object.assign({}, { id: item[0],
                                        definition_id: item[1],
                                        agent_link_id: item[2],
                                        security: item[3],
                                        data_struct: item[4],
                                        agent_data: item[5] })
        new_agent_set = [ ...new_agent_set, agent ]
      })

      return Object.assign({}, state, { agency_agents: new_agent_set })
    }



    default: return state
  }
}
