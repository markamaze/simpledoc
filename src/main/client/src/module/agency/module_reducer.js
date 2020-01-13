import { user } from './moduleObjects/user'
import { dataTag } from './moduleObjects/dataTag'
import { structuralNode } from './moduleObjects/structuralNode'
import { agentTemplate } from './moduleObjects/agentTemplate'
import { agent } from './moduleObjects/agent'

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

              let newagent = agent(agentData)

              return !newagent ? false : [...agents, newagent]
            }, agents)
            break

          case "agentTemplates":

            agentTemplates = entry[1].reduce( (templates, templateData) => {
              if(!templates) return false

              let newtemplate = agentTemplate(templateData)

              return !newtemplate ? false : [...templates, newtemplate]
            }, agentTemplates)
            break

          case "structuralNodes":

            structuralNodes = entry[1].reduce( (structures, structureData) => {
              if(!structures) return false

              let newstructure = structuralNode(structureData)

              return !newstructure ? false : [...structures, newstructure]

            }, structuralNodes)
            break

          case "dataTags":

            dataTags = entry[1].reduce( (tags, tagData) => {
              if(!tags) return false

              let newtag = dataTag(tagData)

              return !newtag ? false : [...tags, newtag]

            }, dataTags)
            break

          case "users":
            users = entry[1].reduce( (users, userData) => {
              if(!users) return false

              let newuser = user(userData)

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
        let newObject
        if(type === "user") newObject = user(action.payload)
        else if(type === "dataTag") newObject = dataTag(action.payload)
        else if(type === "agentTemplate") newObject = agentTemplate(action.payload)
        else if(type === "structuralNode") newObject = structuralNode(action.payload)
        else if(type === "agent") newObject = agent(action.payload)
        else throw "invalid object type"


        return Object.assign({}, state, { [`${type}s`]: [...state[`${type}s`], newObject] })
      }

      catch(err) {
        window.alert(err.toString())
        return state
      }
    }


    case "UPDATE_AGENCY_OBJECT": {
      try {
        let type = action.agencyObjectType
        let updatedObject

        if(type === "user") updatedObject = user(action.payload)
        else if(type === "dataTag") updatedObject = dataTag(action.payload)
        else if(type === "agentTemplate") updatedObject = agentTemplate(action.payload)
        else if(type === "structuralNode") updatedObject = structuralNode(action.payload)
        else if(type === "agent") updatedObject = agent(action.payload)
        else throw "invalid object type"

        let updatedSet = [...state[`${type}s`] ]
        updatedSet = updatedSet.filter(item => updatedObject.id != item.id)

        return Object.assign({}, state, { [`${type}s`]: [...updatedSet, updatedObject] })
      }
      catch(err) {
        window.alert(err.toString())
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
        window.alert(err.toString())
        return state
      }
    }

    default: return state
  }
}
