export const agent = (state) => {
  return {
    id: state.id,
    label: state.label,
    securityCode: state.securityCode,
    dataTags: state.dataTags,
    agentLink: state.agentLink,
    type: "agent"
  }
}

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
