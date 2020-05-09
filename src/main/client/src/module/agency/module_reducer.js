import { agencyObject } from './moduleObjects/agencyObject'

//tools available from agency store for getting filtered data
let agencyToolsProto = {
  getById: function(id, type){
    let found = null;

    if(id === null || id === undefined) return null
    else if(Array.isArray(id) && length === 0) return []
    else if(Array.isArray(id) && length > 0){
      found = []
      id.forEach( _id => {
        if(type && Object.keys(initialState).includes(type)) found = [ ...found, this[type][_id] ]
        else Object.values(this).find( objType => {
          let foundItem = Object.values(objType).find( item => item.id === id )
          if(foundItem === undefined) return false
          
          found = [ ...found, foundItem ]
          return true
        })
      })
    }

    else {
      if(type && Object.keys(initialState).includes(type)) found = this[type][id]
      else Object.values(this).find( objType => {
        let foundItem = Object.values(objType).find( item => item.id === id )
        if(foundItem === undefined) return false
        
        found = foundItem
        return true
      })
    }

    return found
  },
  getRootNode: function(){
    return Object.values(this.node).find(node => node.id === node.parent_id)
  },
  getTagsByType: function(type){
    let foundTags = Object.values(this.tag).filter( tag => tag.tag_type === type)

    return foundTags ? foundTags : []
  }
}

const initialState = Object.assign(Object.create(agencyToolsProto), {
  node: {},
  role: {},
  agent: {},
  tag: {},
  user: {}
})



export default function agency_reducer(state=initialState, action) {
  switch(action.type) {
    case "LOAD_AGENCY_OBJECTS": {
      try{
        let newState = Object.assign(state)
        action.payload.forEach( agency_object => {
          let newAgencyObject = agencyObject(agency_object.type, {...agency_object}, action.getStore, action.getServices, action.getUtilities, action.failure)
          Object.assign(newState, {[`${agency_object.type}`]: Object.assign(newState[agency_object.type],  {[`${agency_object.id}`]:newAgencyObject} )})
        })
        console.log(newState)
        action.success ? action.success() : null

        return newState
      } catch(err) {
        console.log(err)
        return state
      }
    }

    case "WRITE_AGENCY_OBJECTS": {
      try{
        let newState = Object.assign(state)
        let newObjects = action.payload

        newObjects.forEach(agencyObject => {
          let newObject = { [`${agencyObject.id}`]: agencyObject }
          let newTypeSet = Object.assign({}, newState[agencyObject.type()], newObject)
          newState = Object.assign(newState, { [`${agencyObject.type()}`] : newTypeSet})
        })
        action.success ? action.success() : null
        return newState
      } catch(err){
        action.payload.failure(`error writing object to store: ${err}`)
        return state
      }
    }

    case "DELETE_AGENCY_OBJECTS": {
      try{
        let newState = Object.assign(state)
        let removeObjects = action.payload

        removeObjects.forEach(agencyObject => {
          delete newState[agencyObject.type()][agencyObject.id]
        })
        action.success ? action.success() : null
        return newState
      } catch(err) {
        action.payload.failure(`error deleting object from store: ${err}`)
        return state
      }
    }
    default: return state

  }
}
