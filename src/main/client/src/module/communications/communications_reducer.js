const initialState = []

export default function communications_reducer (state=initialState, action) {

  switch(action.type) {
    case "TEST": return state
    default: return state
  }
}
