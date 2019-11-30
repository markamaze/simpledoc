import sampleData from '../../sample_data'
import * as agencyObject from './data/agencyObjects'


const initialState = {
  structuralNodes: [],
  agentTemplates: [],
  agents: [],
  dataTags: [],
  users: []
}


export default function agency_reducer (state=initialState, action) {
  switch(action.type) {
    case "LOAD_AGENCY_STORE": {
      console.log("loading agency", action.payload)
      let agents = [], agentTemplates = [], structuralNodes = [], users = [], dataTags = []

      Object.entries(action.payload).forEach( entry => {
        switch(entry[0]){
          case "agents":

            agents = entry[1].reduce( (agents, agentdata) => {
              if(!agents) return false

              let newagent = Object.create(agencyObject.agent())
              newagent = newagent.init(agentdata)

              return !newagent ? false : [...agents, newagent]
            }, agents)
            break

          case "agentTemplates":

            agentTemplates = entry[1].reduce( (templates, templateData) => {
              if(!templates) return false

              let newtemplate = Object.create(agencyObject.agentTemplate())
              newtemplate = newtemplate.init(templateData)

              return !newtemplate ? false : [...templates, newtemplate]
            }, agentTemplates)
            break

          case "structuralNodes":

            structuralNodes = entry[1].reduce( (structures, structureData) => {
              if(!structures) return false

              let newstructure = Object.create(agencyObject.structuralNode())
              newstructure = newstructure.init(structureData)

              return !newstructure ? false : [...structures, newstructure]

            }, structuralNodes)
            break

          case "dataTags":

            dataTags = entry[1].reduce( (tags, tagData) => {
              if(!tags) return false

              let newtag = Object.create(agencyObject.dataTag())
              newtag = newtag.init(tagData)

              return !newtag ? false : [...tags, newtag]

            }, dataTags)
            break

          case "users":
            users = entry[1].reduce( (users, userData) => {
              if(!users) return false

              let newuser = Object.create(agencyObject.user())
              newuser = newuser.init(userData)

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
        let newObject = Object.create(agencyObject[`${type}`]())

        newObject = newObject.init(action.payload)

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
        let updatedObject = Object.create(agencyObject[`${type}`]())
        updatedObject = updatedObject.init(action.payload)
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
