import * as data from "./atomicData"


export const agent = (state) =>
  Object.assign({},
    data.id(state.id),
    data.label(state.label),
    data.securityCode(state.securityCode),
    data.dataTags(state.dataTags),
    { agentLink: ...data.id(state.agentLink),
      type: "agent" })




export const user = (state) => {
  return {
    id: state.id,
    username: state.username,
    type: "user"
  }
}

export const structuralNode = (state) => {
  return {
    id: state.id,
    label: state.label,
    parentId: state.parentId,
    agentAssignments: state.agentAssignments,
    dataTags: state.dataTags,
    type: "structuralNode"
  }
}

export const dataTag = (state) =>  {
  return {
    id: state.id,
    label: state.label,
    dataStruct: state.dataStruct,
    type: "dataTag"
  }
}


const typeValidation = object => {
  //confirm structure of the object matches a type, return object type
}
