import React from 'react'
import moduleObjectPrototype from '../../moduleObjectPrototype'
import * as storageActions  from '../module_actions'
import * as user from './user'
import * as tag from './tag'
import * as node from './node'
import * as template from './template'
import * as agent from './agent'
import List from '../../../components/List'



const agencyPrototypes = { user, tag, node, template, agent }
const typeMap = {
  agent: "AGENCY.AGENT",
  template: "AGENCY.TEMPLATE",
  node: "AGENCY.NODE",
  tag: "AGENCY.TAG",
  user: "AGENCY.USER" 
}
const agencyStorageHandlers = {
  create: storageActions.createAgencyObjects,
  update: storageActions.updateAgencyObjects,
  remove: storageActions.removeAgencyObjects 
}

const agencyComponents = (getStore, getServices) => ({
  // assignmentsList: node => {
  //   return  <List className="container border-bottom"
  //               headerComponent={<div>Assignments:</div>}
  //               tableData={node.active_assignments}
  //               iconComponent={ ([assignment_id, agent_id]) =>
  //                 <div>
  //                   { getStore().assignment[assignment_id].agencyTools.getDisplayLabel(getStore().assignment[assignment_id]) }
  //                   { agent_id === "00000000-0000-0000-0000-000000000000" ?
  //                       "unassigned" : getStore().agent[agent_id].agencyTools.getDisplayLabel(getStore().agent[agent_id]) }
  //                 </div>} />
  // },
  // assignmentManager: (node, updateHandler) => {

  //   const addAssignment = assignment_id => {
  //     updateHandler({active_assignments: [...node.active_assignments, [assignment_id, null]]})
  //   }
  //   const removeAssignment = (assignment_id, agent_id) => {
  //     updateHandler({active_assignments: node.active_assignments.filter( ([assignmentId, agentId]) => {
  //       if(assignmentId !== assignment_id) return true
  //       else if(agentId !== agentId) return true
  //       else return false
  //     } )})
  //   }

  //   return  <List className="container-row border-bottom"
  //               headerComponent={<div className="container-item item-label">Manage Assignments</div>}
  //               tableData={[
  //                 {label: "Add Assignment", selectable: false, input:
  //                   <select className="container-row" value="" onChange={() => addAssignment(event.target.value)}>
  //                     <option value=""></option>
  //                     {
  //                       Object.values(getStore().assignment).map( assignment =>
  //                         <option value={assignment.id}>{assignment.agencyTools.getDisplayLabel(assignment)}</option>)
  //                       }
  //                   </select>
  //                 },
  //                 ...node.active_assignments.map( ([assignment_id, agent_id]) => ({label: getStore().assignment[assignment_id].agencyTools.getDisplayLabel(getStore().assignment[assignment_id]), selectable: false, input: <button onClick={() => removeAssignment(assignment_id, agent_id)}>X</button>}))
  //               ]}
  //               columns={[{selector: "label"},{selector: "input"}]} />
  // },
  // assignmentEditor: (node, updateHandler) => {
  //   const createAgent = (userId, assignmentId) => {
  //     let newAgent = agencyObject("agent", {id: "new_object", agent_user_id: userId, structuralNode_id: tempNode.id, assignment_id: assignmentId}, tempNode.services, tempNode.utilities, err=>{throw err})

  //     let updateActiveAssignment = [...tempNode.active_assignments]

  //     updateActiveAssignment = [[assignmentId, newAgent.id], ...updateActiveAssignment.filter( ([assignment_id, agent_id]) => {
  //       if(assignmentId !== assignment_id) return true
  //       else if(agent_id !== "00000000-0000-0000-0000-000000000000") return true
  //       else return false
  //     })]


  //     updateHandler({
  //       new_object: tempNode.new_object ? [...tempNode.new_object, newAgent] : [newAgent],
  //       active_assignments: updateActiveAssignment
  //     })
  //   }
  //   const deactivateAgent = (assignment_id, agent_id) => console.log("deactivate agent assignment")


  //   return  <List className="container-row"
  //               headerComponent={<div>Manage Agent Assignments</div>}
  //               tableData={node.active_assignments}
  //               iconComponent={ ([assignment_id, agent_id]) => {
  //                 let agent;
  //                 let assignment = getStore().assignment[assignment_id]

  //                 if(agent_id.substring(0,2) === 'n-') agent = node.new_object.find(obj => obj.id === agent_id)
  //                 else if(agent_id === "00000000-0000-0000-0000-000000000000") agent = null
  //                 else agent = getStore().agent[agent_id]


  //                 return  <div>
  //                           {assignment.agencyTools.getDisplayLabel(assignment)}
  //                           { agent === null ?
  //                               <select value={""} onChange={() => createAgent(event.target.value, assignment_id)}>
  //                                 <option value="">assign user</option>
  //                                 {
  //                                   Object.values(getStore().user).map( user => <option value={user.id}>{user.username}</option> )
  //                                 }
  //                               </select>
  //                               : <button onClick={() => deactivateAgent(assignment_id, agent_id)}>deactivate</button>
  //                           }
  //                         </div>}} />
  // },
  dataTagManager: (node, updateHandler) => {
    const addDataTag = dataTag_id => updateHandler({structuralNode_dataTag_ids: [...node.structuralNode_dataTag_ids, dataTag_id]})

    const removeDataTag = dataTag_id => updateHandler({structuralNode_dataTag_ids: node.structuralNode_dataTag_ids.filter(id => id !== dataTag_id)})

    return  <List className="container-row"
                headerComponent={<div className="container-item item-label">Manage DataTags</div>}
                tableData={[{selectable: false, label: "Add DataTag" , input: <select className="container-row" value="" onChange={() => addDataTag(event.target.value)}>
                  <option value=""></option>
                  {
                    Object.values(getStore().dataTag).map( tag => <option value={tag.id}>{tag.dataTag_label}</option>)
                  }
                </select>},...node.structuralNode_dataTag_ids
                  .map(tagId => getStore().dataTag[tagId])
                  .map(tag => ({data: tag, selectable: false, input: <button onClick={()=> removeDataTag(tag.id)}>X</button>, label: tag.display.card(tag) }))]}
                columns={[{selector: "label"}, {selector: "input"}]} />
  },
  dataTagList: () => {

  },
  propertiesList: item => {
    return  <List className="container"
                headerComponent={<div>Properties:</div>}
                tableData={item.agencyTools.getProperties(item)}
                iconComponent={property => property.display.document(property, item.property_values[property.id])} />
  },
  propertiesEditor: (item, updateHandler) => {

    return  <List className="container-row border-bottom"
                headerComponent={<div className="container-item item-label">Set Properties:</div>}
                tableData={item.agencyTools.getProperties(item).map(property => ({
                  property_editor:
                    <div className="property container-row">
                      <div className="container-item item-label">{property.property_key}</div>
                      <input className="container-item"
                          type="text"
                          value={item.property_values[property.id]}
                          onChange={() => updateHandler({property_values: Object.assign({}, item.property_values, { [`${property.id}`]: event.target.value })})} />
                    </div>,
                  selectable: false
                }))}
                columns={[{selector:"property_editor"}]} />
  },
  propertiesManager: (dataTag, updateHandler) => {

    const toggleProperty = property_id => tempDataTag.dataTag_property_ids.includes(property_id) ?
      updateHandler({dataTag_property_ids: tempDataTag.dataTag_property_ids.filter(id => id !== property_id)})
      : updateHandler({dataTag_property_ids: [...tempDataTag.dataTag_property_ids, property_id]})

    return  <div className="container-row border-bottom">
              <div className="container-item item-label">Set Properties:</div>
              <div className="container">
                {
                  Object.values(getStore().property).map( property =>
                    <div className={`container-item ${dataTag.dataTag_property_ids.includes(property.id) ? "selected" : ""}`}
                        onClick={()=> toggleProperty(property.id)}>
                      {property.display.card(property)}
                    </div>)
                }
              </div>
            </div>
  },
  subscriptionsList: item => {
    return  <List className=""
                tableData={item.agencyTools.getSubscriptions(item)}
                iconComponent={ item => item.display.card(item) }
                listActions={[]}
                drawerComponents={[]}
                overlayComponents={[]} />
  },
  availableServices: (item) => {
    function ServiceFunction(props) {
      let [serviceElement, setServiceElement] = React.useState(null)
      let services = getServices()
      let serviceResult = () => {
        //use updateHandler to update subscription info
      }

      return  <div>
                { Object.entries(services).map( ([label, serviceFn]) =>
                    <div onClick={() => setServiceElement(serviceFn(props.item, serviceResult))}>{label}</div>) }
                { serviceElement === null ? null : serviceElement }
              </div>
    }

    return <ServiceFunction item={item} />
  },
  agentsList: user => {

    return  <List className="col-md-6"
                headerComponent={<div>Active Agents:</div>}
                columns={[{selector:"display"}]}
                tableData={user.agencyTools.getUserAgents(user).map(agent => ({display: agent.agencyTools.getDisplayLabel(agent), data: agent}))}
                drawerComponents={[{component: item => item.data.display.document(item.data)}]} />
  }
})

const agencyTools = (getStore) => ({
  getSubscriptions: () => { return [] },
  getProperties: item => {
    let store = getStore()

    switch(item.type()){
      case "structuralNode":
      case "user":
        return Object.keys(item.property_values).map( propertyId => store.property[propertyId] )
      case "agent":
      case "agentTemplate":
        return item.agencyTools.getDataTags(item).map( tag => {
          tag.dataTag_property_ids.map( propertyId => store.property[propertyId] )
        })
      case "dataTag":
        return item.dataTag_property_ids.map( propertyId => store.property[propertyId])
      default: return null
    }
  },
  getActiveAgents: item => {
    switch(item.type()){
      // case "assignment": //gets any active agents linked to this assignmentm
      default: return null
    }
  },
  getDataTags: () => { return [] },
  getUsers: () => { return [] },
  getAssignments: item => {
    switch(item.type()){
      // case "assignment": //returns the supervising assignment
      //   return store.assignment[item.supervising_assignment_id]
      default:
        return null
    }
  },
  getAgentTemplates: item => {
    switch(item.type()){
      // case "assignment": //returns the template linked to the assignment
      //   return store.agentTemplate[item.agentTemplate_id]
      default: return null
    }
  },
  getDisplayLabel: item => {
    switch(item.type()){
      case "agentTemplate": return item.agentTemplate_label
      // case "assignment": {

      // }
      case "user": return item.username
      case "agent": return item.agencyTools.getUsers(item).username
      case "property": return item.property_key
    }
  },
  getStructuralNode: () => {},
  getNodeBranch: () => {}
})

const agencyObject = (type, data, getStore, getServices, getUtilities, failure) => {
  try {
    let _agencyObj = Object.create(Object.assign({},
        {agencyComponents: agencyComponents(getStore, getServices, getUtilities)},
        {agencyTools: agencyTools(getStore, getServices, getUtilities)},
        agencyPrototypes[type].prototype(getStore, getServices, getUtilities),
        moduleObjectPrototype(typeMap, agencyStorageHandlers)
    ))
    _agencyObj.init(data, failure)

    return _agencyObj
  } catch(error){ failure(new Error(`${error}: failure to create agencyObject`)) }
}

export { agencyObject }
