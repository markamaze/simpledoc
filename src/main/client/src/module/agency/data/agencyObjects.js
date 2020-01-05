import * as data from "./atomicData"

const propertyBase = (allowEmpty, createFn) => ({ allowEmpty: allowEmpty, createFn: createFn })
const baseObj = (type, properties) => ({
  type: function(){ return type },
  defineProps: properties,
  init: function(state) {
    let tempProps = {}, valid

    Object.entries(properties).forEach( prop => {
      let key = prop[0]
      let testValue = state[`${prop[0]}`]
      let propDefs = prop[1]

      tempProps[key] = Object.assign(Object.create(propDefs), {value: testValue, writable: true})
    })

    this.validate(tempProps)

    return Object.defineProperties(this, tempProps)
  },
  update: function(propertyUpdates) {
    for(let prop in propertyUpdates){
      Object.defineProperty(this, prop, { value: propertyUpdates[prop], writable: true })
    }
    return this
  },
  //rewrite such that:
  //  following initialization or updating an object,
  //  call object.validate() and get a boolean back
  //  calling code will be responsible for handling an invalid object
  validate: function(propertySet){
    for(let prop in propertySet){
      let value = propertySet[prop].value
      let valueExists = value ? true : false
      let valueRequired = !propertySet[prop].allowEmpty

      if(!valueExists && valueRequired) return false
      if(!valueExists && !valueRequired) {}
      else if(valueExists) {
        try{ propertySet[prop]["createFn"](value) }
        catch(err){ return false }
      }
      else throw `validation error: unknown -> ${prop}: ${value}`
    }
    return true
  },
  toJSON: function(){

    let keys = Object.keys(properties)
    let data_map = {}, id, type

    for(let key in keys){
      if(keys[key] === "id") id = this[keys[key]]
      else if(keys[key] === "type") type = this[keys[key]]
      else data_map[keys[key]] = this[keys[key]]
    }

    let json_value = JSON.stringify(data_map)

    return `{\"id\":\"${id}\",\"type\":\"${type}\",\"object_data\":${json_value}}`

  } })



const agentProperties = {
  id: Object.create(propertyBase( false, id => data.id(id) )),
  type: Object.create(propertyBase( true, type => type )),
  structuralNode_link_id: Object.create(propertyBase(true, linkId => data.id(linkId) )),
  agentTemplate_id: Object.create(propertyBase(true, templateId => data.id(templateId) )),
  assigned_user_id: Object.create(propertyBase(true, userId => data.id(userId) )),
  agent_is_active: Object.create(propertyBase(true, value => value)),
  agent_dataTag_ids: Object.create(propertyBase(true, tagSet => tagSet.map(tag => data.dataTag(tag)) )) }
export const agent = () => Object.create(baseObj("agent", agentProperties))



const agentTemplateProperties = {
  id: Object.create(propertyBase( false, id => data.id(id) )),
  type: Object.create(propertyBase( true, type => type )),
  agentTemplate_label: Object.create(propertyBase( false, label => data.string(label, { noSpaces: false, maxLength: 40, minLength: 1}) )),
  agentTemplate_security: Object.create(propertyBase(true, code => data.securityCode(code) )),
  agentTemplate_dataTag_ids: Object.create(propertyBase(true, tagSet => tagSet && tagSet.length > 0 ? tagSet.map(tag => data.dataTag(tag)) : [])),
  agentTemplate_properties: Object.create(propertyBase(true, propSet => propSet && propSet.length > 0 ? propSet.map(prop => prop ) : [] )) }
export const agentTemplate = () => Object.create(baseObj("agentTemplate", agentTemplateProperties))



const structuralNodeProperties = {
  id: Object.create(propertyBase( false, id => data.id(id) )),
  type: Object.create(propertyBase( true, type => type )),
  structuralNode_label: Object.create(propertyBase( true, label => data.string(label, { noSpaces: false, maxLength: 40, minLength: 1}) )),
  structuralNode_parent_id: Object.create(propertyBase( true, parentId => data.id(parentId) )),
  agent_assignments: Object.create(propertyBase( true, assignmentSet => assignmentSet && assignmentSet.length > 0 ? assignmentSet.map( assignment => assignment ) : [] )),
  structuralNode_dataTag_ids: Object.create(propertyBase(true, tagSet => tagSet && tagSet.length > 0 ? tagSet.map(tag => data.dataTag(tag)) : [] )),
  structuralNode_properties: Object.create(propertyBase(true, propSet => propSet && propSet.length > 0 ? propSet.map(prop => prop ) : [] )) }
export const structuralNode = () => Object.create(baseObj("structuralNode", structuralNodeProperties))



const dataTagProperties = {
  id: Object.create(propertyBase( false, id => data.id(id) )),
  type: Object.create(propertyBase( true, type => type )),
  dataTag_label: Object.create(propertyBase( false, label => data.string(label, { noSpaces: false, maxLength: 40, minLength: 1}) )),
  dataTag_tagType: Object.create(propertyBase( true, type => data.tagType(type) )),
  dataTag_properties: Object.create(propertyBase( true, propSet => propSet && propSet.length > 0 ? propSet.map( prop => prop ) : [] )),
  dataTag_typeObjects: Object.create(propertyBase( true, typeObjects => typeObjects && typeObjects.length > 0 ? typeObjects.map( obj => obj) : [] )) }
export const dataTag = () => Object.create(baseObj("dataTag", dataTagProperties))



const userProperties = {
  id: Object.create(propertyBase( false, id => data.id(id) )),
  type: Object.create(propertyBase( true, type => type )),
  username: Object.create(propertyBase( false, username => data.string(username, { noSpaces: true, maxLength: 16, minLength: 4}) )),
  password: Object.create(propertyBase( false, password => data.string(password, { noSpaces: true, maxLength: 24, minLength: 8}))) }
export const user = () => Object.create(baseObj("user", userProperties))
