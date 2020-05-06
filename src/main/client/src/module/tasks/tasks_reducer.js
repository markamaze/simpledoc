const initialState = []

export default function tasks_reducer (state=initialState, action) {

  switch(action.type) {
    case "TEST": return state
    default: return state
  }
}
