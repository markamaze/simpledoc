const initialState = {
  agency_categories: [],
  agency_definitions: [],
  agency_agents: []
}



export default function agency_reducer (state=initialState, action) {
  switch(action.type) {
    case "LOAD_AGENCY": {
      let agency_data = Object.values(action.payload.agencyData)
      agency_data.forEach(item => {
        console.log("agency data item", item)
      })
    }
  }
}
