import React from 'react'
import uuidv4 from 'uuid/v4'

//tools available to any module object
const moduleObjectPrototype = (typeMap, storageFns) => ({
  init: function(state, onError) {
    try{
      let success = true, index = 0
      let propObjects = Object.entries(this.properties)

      if(state === null || state === undefined) success = false
      else if(state.id === "new_object") state.id = `n-${uuidv4()}`

      while(success && index < propObjects.length){
        let property = propObjects[index]
        let key = property[0]
        if(!property[1].setValue.call(this, state[key])) success = false
        ++index
      }

      return success ? this : false
    }catch(error){onError(`${error}: failure initializing module object with state: ${state}`)}
  },
  toJSON: function(){
    let type = typeMap[this.type()]

    if(typeof type !== "string") throw "cannot convert to JSON: unknown module object type"



    let objectData = Object.entries(this).filter(entry => entry[0] !== "id")
    return `{
      \"id\":\"${this.id.toString()}\",
      \"type\":\"${type}\",
      \"object_data\": ${JSON.stringify(Object.fromEntries(objectData))}
    }`
  },
  storage: {
    handlers: function(success, failure){
      return  <div className="storage-handlers d-flex flex-row justify-content-around btn-group" key={`storage-handlers-${this.id}`}>
                <div className="storage-handler-item btn-primary px-4"
                      key={this.storage.save.key.call(this)}
                      onClick={()=>this.storage.save.action.call(this, success, failure)}>{this.storage.save.label}</div>
                <div className="storage-handler-item btn-danger px-4"
                      key={this.storage.delete.key.call(this)}
                      onClick={()=>this.storage.delete.action.call(this, success, failure)}>{this.storage.delete.label}</div>
              </div>
    },
    save: {
      label: "Submit",
      key: function(){return `action-creater-save-${this.type()}-${this.id}`},
      action: function(success, failure){
                try{
                  let objectSet = this.new_object ? [this, ...this.new_object] : [this]
                  let isNew = this.id.substring(0,2) === 'n-'
                  if(this.new_object){
                    objectSet = [...this.new_object]
                    delete this.new_object
                    objectSet = [this, ...objectSet]
                  }
                  else objectSet = [this]

                  let result = isNew ? storageFns.create(objectSet, success, failure)
                    : storageFns.update(objectSet, success, failure)

                  // return result && result.error ? failure(result) : true

                } catch(err){ failure(err) }}
    },
    delete: {
      label: "Delete",
      key: function(){return `action-creater-delete-${this.type()}-${this.id}`},
      action: function(success, failure){
                let result
                try{
                  result  = storageFns.remove([this], success, failure)

                  return result && result.error ? failure(result) : true
                } catch(err){ failure(err) }}
    }
  },
  update: function(updatedData){
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this, updatedData)
  }

})

export default moduleObjectPrototype
