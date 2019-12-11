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

      tempProps[key] = Object.assign(Object.create(propDefs), {value: testValue})
    })

    this.validate(tempProps)

    return Object.defineProperties(this, tempProps)
  },
  update: function(propertyUpdates) {
    let newState = Object.assign({}, Object.getOwnPropertyNames(this), propertyUpdates)
    let validationObject = this.validate(newState)

    return Object.defineProperties(this, validationObject.value)
  },
  validate: function(propertySet){
    for(let prop in propertySet){
      let value = propertySet[prop].value
      let valueExists = value ? true : false
      let valueRequired = !propertySet[prop].allowEmpty

      if(!valueExists && valueRequired) throw "missing required value"
      if(!valueExists && !valueRequired) {}
      else if(valueExists) {
        try{ propertySet[prop]["createFn"](value) }
        catch(err){
          throw `validation error: ${prop} -> ${err.toString()}`
        }

      }
      else throw `validation error: unknown -> ${prop}: ${value}`
    }
    return true
  } })



// const agentProperties = {
//   id: Object.create(propertyBase( false, id => data.id(id) )),
//   type: null,
//   structuralNode_link_id: Object.create(propertyBase(true, linkId => data.id(linkId) )),
//   agentTemplate_id: Object.create(propertyBase(true, templateId => data.id(templateId) )),
//   assigned_user_id: Object.create(propertyBase(true, userId => data.id(userId) )),
//   agent_is_active: Object.create(propertyBase(true, value => value)),
//   agent_dataTag_ids: Object.create(propertyBase(true, tagSet => tagSet.map(tag => data.dataTag(tag)) )) }
const agentProperties = {
  id: Object.create(propertyBase( false, id => data.id(id) )),
  label: Object.create(propertyBase(false, label => data.string(label, { noSpaces: false, maxLength: 40, minLength: 1 }) )),
  securityCode: Object.create(propertyBase(true, code => data.securityCode(code) )),
  dataTags: Object.create(propertyBase(true, tagSet => tagSet.map(tag => data.dataTag(tag)) )),
  agentLink: Object.create(propertyBase(true, linkId => data.id(linkId) )),
  templateId: Object.create(propertyBase(false, templateId => data.id(templateId) )),
  assignedUserId: Object.create(propertyBase(true, userId => data.id(userId) )) }
export const agent = () => Object.create(baseObj("agent", agentProperties))



// const agentTemplateProperties = {
//   id: Object.create(propertyBase( false, id => data.id(id) )),
//   type: ,
//   agentTemplate_label: Object.create(propertyBase( false, label => data.string(label, { noSpaces: false, maxLength: 40, minLength: 1}) )),
//   agentTemplate_security: Object.create(propertyBase(true, code => data.securityCode(code) )),
//   agentTemplate_dataTag_ids: Object.create(propertyBase(true, tagSet => tagSet.map(tag => data.dataTag(tag)) )) }
const agentTemplateProperties = {
  id: Object.create(propertyBase( false, id => data.id(id) )),
  label: Object.create(propertyBase( false, label => data.string(label, { noSpaces: false, maxLength: 40, minLength: 1}) )),
  securityCode: Object.create(propertyBase(true, code => data.securityCode(code) )),
  dataTags: Object.create(propertyBase(true, tagSet => tagSet.map(tag => data.dataTag(tag)) )) }
export const agentTemplate = () => Object.create(baseObj("agentTemplate", agentTemplateProperties))




// const structuralNodeProperties = {
//   id: Object.create(propertyBase( false, id => data.id(id) )),
//   type: ,
//   structuralNode_label: Object.create(propertyBase( false, label => data.string(label, { noSpaces: false, maxLength: 40, minLength: 1}) )),
//   structuralNode_parent_id: Object.create(propertyBase( false, parentId => data.id(parentId) )),
//   agent_assignments: Object.create(propertyBase( false, agentId => data.id(agentId) )),
//   structuralNode_dataTag_ids: Object.create(propertyBase(true, tagSet => tagSet.map(tag => data.dataTag(tag)) )) }
const structuralNodeProperties = {
  id: Object.create(propertyBase( false, id => data.id(id) )),
  label: Object.create(propertyBase( false, label => data.string(label, { noSpaces: false, maxLength: 40, minLength: 1}) )),
  dataTags: Object.create(propertyBase(true, tagSet => tagSet.map(tag => data.dataTag(tag)) )),
  parentId: Object.create(propertyBase( false, parentId => data.id(parentId) )),
  agentAssignments: Object.create(propertyBase( false, agentId => data.id(agentId) )) }
export const structuralNode = () => Object.create(baseObj("structuralNode", structuralNodeProperties))



// const dataTagProperties = {
//   id: Object.create(propertyBase( false, id => data.id(id) )),
//   type: ,
//   dataTag_label: Object.create(propertyBase( false, label => data.string(label, { noSpaces: false, maxLength: 40, minLength: 1}) )),
//   dataTag_for_agent: Object.create(propertyBase( false, tagType => data.tagType(tagType) )) }
const dataTagProperties = {
  id: Object.create(propertyBase( false, id => data.id(id) )),
  label: Object.create(propertyBase( false, label => data.string(label, { noSpaces: false, maxLength: 40, minLength: 1}) )),
  tagFor: Object.create(propertyBase( false, tagType => data.tagType(tagType) )) }
export const dataTag = () => Object.create(baseObj("dataTag", dataTagProperties))




// const userProperties = {
//   id: Object.create(propertyBase( false, id => data.id(id) )),
//   type: ,
//   username: Object.create(propertyBase( false, username => data.string(username, { noSpaces: true, maxLength: 16, minLength: 4}) )) }
const userProperties = {
  id: Object.create(propertyBase( false, id => data.id(id) )),
  username: Object.create(propertyBase( false, username => data.string(username, { noSpaces: true, maxLength: 16, minLength: 4}) )) }
export const user = () => Object.create(baseObj("user", userProperties))
