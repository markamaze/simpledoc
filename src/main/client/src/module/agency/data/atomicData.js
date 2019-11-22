const validationObject = { isInvalid: false, value: undefined }

export const id = id => {
  // let regExp = /^[0-9a-f]{8}[0-9a-f]{4}[0-5][0-9a-f]{3}[089ab][0-9a-f]{3}[0-9a-f]{12}$/i
  //
  // let valid = regExp.test(id)
  // if(!valid) throw "invalid id"

  return true
}

export const string = (string, string_filter) => {
  let filterResult = Object.assign({}, validationObject)
  let validationTicket = Object.assign({}, validationObject)

  Object.entries(string_filter).forEach( ([key, value]) => {
    let testResult, filterChanges
    switch(key){
      case "noSpaces":
        let filterExp = /^\S*$/ //some expression
        filterExp.test(string) ?
          testResult = true
          : testResult = "string cannot contain spaces"

        break

      case "maxLength":
        string.length <= value ?
          testResult = true
          : testResult = "string exceeds maximum length of " + value
        break

      case "minLength":
        string.length >= value ?
          testResult = true
          : testResult = "string requires minimum length of " + value
        break

      default: {
        testResult = "unsupported string filter property: " + key
      }
    }

    if(testResult && !filterResult.isInvalid) filterChanges = { value: true }
    else if(testResult && filterResult.isInvalid) filterChanges = null
    else if(!testResult && !filterResult.isInvalid) filterChanges = { isInvalid: true, value: [testResult] }
    else if(!testResult && filterResult.isInvalid) filterChanges = { value: [...filterResult.value, testResult] }


    filterResult = Object.assign({}, filterResult, filterChanges)
  })


  validationTicket = Object.assign({}, filterResult, { value: filterResult.isInvalid ?
                                                    filterResult.value : string})

  return validationTicket
}

export const securityCode = securityCode => {
  let regExp = /^[0-9]{4}/i

  let valid = regExp.test(securityCode)
  if(!valid) throw "invalid securityCode"

  return true
}

export const username = username => {
  let regExp = /^[a-z]{24}/i

  let valid = regExp.test(username)
  if(!valid) throw "invalid username"

  return true
}

export const dataTag = tag => {

}

export const tagType = type => {

}
