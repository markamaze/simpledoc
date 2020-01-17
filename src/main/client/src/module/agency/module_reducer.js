import { user } from './moduleObjects/user'
import { agencyObject } from './moduleObjects/agencyObject'

const initialState = {
  structuralNodes: [],
  agentTemplates: [],
  agents: [],
  dataTags: [],
  users: []
}


export default function agency_reducer(state=initialState, action) {
  switch(action.type) {
    case "LOAD_AGENCY_STORE": {
      console.log("loading agency", action.payload)
      let agents = [], agentTemplates = [], structuralNodes = [], users = [], dataTags = []

      Object.entries(action.payload).forEach( entry => {
        switch(entry[0]){
          case "agents":

            agents = entry[1].reduce( (agents, agentdata) => {
              if(!agents) return false

              let newagent = agencyObject("agent", agentData, e => {throw `${e} <- create agent from reducer`})

              return !newagent ? false : [...agents, newagent]
            }, agents)
            break

          case "agentTemplates":

            agentTemplates = entry[1].reduce( (templates, templateData) => {
              if(!templates) return false

              let newtemplate = agencyObject("agentTemplate", templateData, e => {throw `${e} <- create agentTemplate from reducer`})

              return !newtemplate ? false : [...templates, newtemplate]
            }, agentTemplates)
            break

          case "structuralNodes":

            structuralNodes = entry[1].reduce( (structures, structureData) => {
              if(!structures) return false

              let newstructure = agencyObject("structuralNode", structureData, e => {throw `${e} <- create structuralNode from reducer`})

              return !newstructure ? false : [...structures, newstructure]

            }, structuralNodes)
            break

          case "dataTags":

            dataTags = entry[1].reduce( (tags, tagData) => {
              if(!tags) return false

              let newtag = agencyObject("dataTag", tagData, e => {throw `${e} <- create dataTag from reducer`})

              return !newtag ? false : [...tags, newtag]

            }, dataTags)
            break

          case "users":
            users = entry[1].reduce( (users, userData) => {
              if(!users) return false

              let newuser = agencyObject("user",userData, e => {throw `${e} <- create user from reducer`})

              return !newuser ? false : [...users, newuser]

            }, users)
            break
        }
      })

      let newState = Object.assign({}, state, { structuralNodes: structuralNodes,
                                        agents: agents,
                                        agentTemplates: agentTemplates,
                                        dataTags: dataTags,
                                        users: users
                                      })
      return newState
    }


    case "CREATE_AGENCY_OBJECT": {
      try {
        let type = action.agencyObjectType
        let agencyObject = agencyObject(type, action.payload, error => {throw `${error}: failed to create agencyObject`})
        return Object.assign({}, state, { [`${type}s`]: [...state[`${type}s`], agencyObject] })
      }

      catch(err) {
        window.alert(`Could not create agencyObject in reducer: ${err}`)
        return state
      }
    }


    case "UPDATE_AGENCY_OBJECT": {
      try {
        let type = action.agencyObjectType
        let agencyObject = agencyObject(type, action.payload, error => {throw `${error}: failed to create agencyObject`})
        let updatedSet = [...state[`${type}s`] ].filter(item => updatedObject.id != item.id)

        return Object.assign({}, state, { [`${type}s`]: [...updatedSet, updatedObject] })
      }
      catch(err) {
        window.alert(`Could not create agencyObject in reducer: ${err}`)
        return state
      }
    }


    case "DELETE_AGENCY_OBJECT": {
      try {
        let type = action.agencyObjectType
        let updatedSet = state[`${type}s`].filter( item => item.id != action.payload.id)

        return Object.assign({}, state, { [`${type}s`]: [...updatedSet] })
      }
      catch(err) {
        window.alert(`Could not create agencyObject in reducer: ${err}`)
        return state
      }
    }

    default: return state
  }
}
