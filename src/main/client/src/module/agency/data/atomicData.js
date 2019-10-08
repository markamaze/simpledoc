export const id = id => {
  function validate(id) {
    return true
  }
  return { id: () => validate(id) ? id : "invalid" }
}

export const label = label => {
  function validate(label) {
    return true
  }
  return { label: () => validate(label) ? label : "invalid" }
}

export const securityCode = securityCode => {
  function validate(securityCode) {
    return true
  }
  return { securityCode: () => validate(securityCode) ? securityCode : "invalid" }
}

export const dataTags = dataTags => {
  function validate(dataTags) {
    return true
  }
  return { dataTags: () => validate(dataTags) ? dataTags : "invalid" }
}

export const username = username => {
  function validate(username) {
    return true
  }
  return { username: () => validate(username) ? username : "invalid" }
}

export const agentAssignments = agentAssignments => {
  function validate(agentAssignments) {
    return true
  }
  return { agentAssignments: () => validate(agentAssignments) ? agentAssignments : "invalid" }
}

export const dataStruct = dataStruct => {
  function validate(dataStruct) {
    return true
  }
  return { dataStruct: () => validate(dataStruct) ? dataStruct : "invalid" }
}
