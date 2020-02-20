import React from 'react'
import uuidv4 from 'uuid/v4'
import { agencyObject } from './agencyObject'


const prototype = agencyState => ({
  type: () => "structuralNode",
  properties: {
    id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.StructualNode.id"
        else if(!this.properties.id.validate(id)) throw "invalid property: Agency.StructualNode.id"
        else this.id = id
        return true
      },
      getObject: function(){ return this.id},
      validate: ()=>{ return true }
    },
    structuralNode_label: {
      setValue: function(label){
        if(label === null || label === undefined) throw "missing required property: Agency.StructualNode.label"
        else if(!this.properties.structuralNode_label.validate(label)) throw "invalid property: Agency.StructualNode.label"
        else this.structuralNode_label = label
        return true
      },
      getObject: function(){ return this.structuralNode_label},
      validate: ()=>{ return true }
    },
    structuralNode_parent_id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.StructualNode.structuralNode_parent_id"
        else if(!this.properties.structuralNode_parent_id.validate(id)) throw "invalid property: Agency.StructualNode.structuralNode_parent_id"
        else this.structuralNode_parent_id = id
        return true
      },
      getObject: function(){ return agencyState()["structuralNode"][this.structuralNode_parent_id]},
      validate: ()=>{ return true }
    },
    structuralNode_dataTag_ids: {
      setValue: function(ids){
        if(ids === null || ids === undefined) this.structuralNode_dataTag_ids = []
        else if(!this.properties.structuralNode_dataTag_ids.validate(ids)) throw "invalid required property: Agency.StructualNode.structuralNode_dataTag_ids"
        else this.structuralNode_dataTag_ids = ids
        return true
      },
      getObject: function(){ return this.structuralNode_dataTag_ids.map(id => agencyState()["dataTag"][id] )},
      validate: ()=>{ return true }
    },
    property_values: {
      setValue: function(values){
        if(values === null || values === undefined) this.property_values = {}
        else if(!this.properties.property_values.validate(values)) throw "invalid property: Agency.StructuralNode.property_values"
        else this.property_values = values
        return true
      },
      getObject: function(){},
      validate: ()=>{ return true }
    },
    active_assignments: {
      setValue: function(assignments){
        if(assignments === null || assignments === undefined) this.active_assignments = {}
        else if(!this.properties.active_assignments.validate(assignments)) throw "invalid property: Agency.StructualNode.active_assignments"
        else this.active_assignments = assignments
        return true
      },
      getObject: function(){},
      validate: ()=>{ return true }
    }
  },
  display: {
    card: node => {
      return  <div className="structuralNode container-row">
                <div className="container">
                  <div className="header">{node.structuralNode_label}</div>
                  <div className="subheader">-{agencyState().structuralNode[node.structuralNode_parent_id].structuralNode_label}</div>
                </div>
                <div className="container">
                  {
                    node.structuralNode_dataTag_ids
                      .map(id => agencyState().dataTag[id])
                      .map(tag => tag.display.card(tag))
                  }
                </div>
              </div>
    },
    document: node => {
      let state = agencyState()
      return  <div className="structuralNode container-fill">
                <div className="container-row btm-border">
                  {node.display.card(node)}
                </div>

                <div className="container">
                  <label>Assigned Agents</label>
                  {
                    Object.entries(node.active_assignments).map( ([assignmentId, assignmentObject]) => {
                      let assignment = state.assignment[assignmentId]
                      let activeAgents = assignmentObject.active_agents ? assignmentObject.active_agents : []

                      return activeAgents.map( agentId => {
                        let agent = state.agent[agentId]

                        return agent.display.document(agent)
                      })
                    })
                  }
                </div>

                <div className="container">
                  <label>Property Values</label>
                  {
                    node.property_values === undefined || node.property_values === null ? null : Object.entries(node.property_values).map( ([propertyId, propertyValue]) => {
                      let property = agencyState().property[propertyId]
                      property.properties.property_value.setValue.call(property, propertyValue)

                      return property.display.document(property)
                    })
                  }
                </div>
              </div>
    },
    editor: (node, updateHandler) => {
      function Editor(props){
        let state = agencyState()

        const [tempNode, setTempNode] = React.useState(props.structuralNode)
        const updateHandler = newState => props.updateHandler ? props.updateHandler(newState)
          : setTempNode(Object.assign(tempNode, newState))

        const createAgent = (userId, assignmentId, assignmentObject) => {
          let newAgent = agencyObject("agent", {id: "new_object", agent_user_id: userId, structuralNode_id: tempNode.id, assignment_id: assignmentId}, err=>{throw err})

          updateHandler({
            new_object: tempNode.new_object ? [...tempNode.new_object, newAgent] : [newAgent],
            active_assignments: Object.assign({}, tempNode.active_assignments, { [`${assignmentId}`] : Object.assign({}, assignmentObject, {active_agents: [...assignmentObject.active_agents, newAgent.id]})})
          })
        }

        return  <div className="structuralNode container-fill">
                  <div className="container-fill">
                    <div className="container-row">{props.structuralNode.display.card(props.structuralNode)}</div>

                    <div className="container">
                      <label>Property Values</label>
                      {
                        Object.entries(props.structuralNode.property_values).map( ([propertyId, propertyValue]) => {
                          let property = state.property[propertyId]
                          property.properties.property_value.setValue.call(property, propertyValue)
                          return property.display.editor(property)
                        })
                      }
                    </div>

                    <div className="container">
                      <label>Assigned Agents</label>
                      {
                        Object.entries(props.structuralNode.active_assignments).map( ([assignmentId, assignmentObject]) => {
                          let assignment = state.assignment[assignmentId]
                          let activeAgents = assignmentObject.active_agents ? assignmentObject.active_agents : []

                          return activeAgents.map( agentId => {
                            let agent = agentId.substring(0,2) === 'n-' ?
                              tempNode.new_object.find(object => object.id === agentId)
                              : state.agent[agentId]

                            return agent.display.document(agent)
                          })
                        })
                      }
                    </div>

                    <div className="container">
                      <label>Manage Agents</label>
                      {
                        Object.entries(tempNode.active_assignments).map( ([assignmentId, assignmentObject]) =>
                          <div className="container-row">
                            <div>{state.agentTemplate[state.assignment[assignmentId].agentTemplate_id].agentTemplate_label}</div>
                            {
                              //<select onChange={()=>createAgent(event.target.value, assignmentId, assignmentObject)} value="">
                            //   <option value="">select user to implement agent assignment</option>
                            //   {
                            //     Object.values(state.user).map( user => <option value={user.id}>{user.username}</option>)
                            //   }
                            // </select>
                            }
                            <button onClick={()=>createAgent("562ef7bd-7a24-46ee-af70-94d4c3fee0a1", assignmentId, assignmentObject)}>create</button>
                          </div>)
                      }
                    </div>
                  </div>

                  { props.updateHandler ? null : tempNode.storage.handlers.call(tempNode) }

                </div>
      }

      return <Editor structuralNode={node} updateHandler={updateHandler} />
    },
    builder: (node, updateHandler) => {
      function Builder(props){
        const [tempNode, setTempNode] = React.useState(props.structuralNode)
        const updateHandler = newState => props.updateHandler ? props.updateHandler(newState)
          : setTempNode(Object.assign(Object.create(Object.getPrototypeOf(tempNode)), tempNode, newState))


        const toggleDataTag = dataTag => {
          tempNode.structuralNode_dataTag_ids.includes(dataTag.id) ?
            updateHandler({structuralNode_dataTag_ids: tempNode.structuralNode_dataTag_ids.filter(id => id !== dataTag.id)})
            : updateHandler({structuralNode_dataTag_ids: [...tempNode.structuralNode_dataTag_ids, dataTag.id]})
        }

        const addAssignment = assignment => {
          let assignmentData = { active_agents: [] }
          let newAssignmentSet = Object.assign({}, tempNode.active_assignments, {[`${assignment.id}`] : assignmentData })
          updateHandler({active_assignments: newAssignmentSet})
        }

        const removeAssignment = assignment => {
          let newAssignmentSet = Object.assign({}, tempNode.active_assignments)
          delete newAssignmentSet[assignment.id]
          updateHandler({active_assignments: newAssignmentSet})
        }

        return  <div className="structuralNode container-fill">
                  <div className="container-row btm-border">{ node.display.card(node) }</div>

                  <div className="container-row">
                    <label>Node Title:</label>
                    <input type="text" value={tempNode.structuralNode_label}
                          onChange={() => updateHandler({structuralNode_label: event.target.value})} />
                  </div>

                  <div className="container-row">
                    <label>Parent Node:</label>
                    <select onChange={()=> updateHandler({structuralNode_parent_id})} value={tempNode.structuralNode_parent_id}>
                      <option>select parent node</option>
                      {
                        Object.values(agencyState().structuralNode).map( node =>
                          <option value={node.id}>{node.structuralNode_label}</option>)
                      }
                    </select>
                  </div>

                  <div className="container-row">
                    <label>Set DataTags</label>
                    {
                      Object.values(agencyState().dataTag).map( tag =>
                          <div onClick={() => toggleDataTag(tag)}
                                className={tempNode.structuralNode_dataTag_ids.includes(tag.id) ? "selected-tag" : "unselected-tag"}>{tag.display.card(tag)}</div>)
                    }
                  </div>

                  <div className="container-row">
                    <label>Assignments</label>
                    {
                      Object.keys(tempNode.active_assignments).map( assignment_id => {
                        let state = agencyState()
                        let foundAssignment = state.assignment[assignment_id]

                        return <div>{foundAssignment.display.card(foundAssignment)}<div onClick={() => removeAssignment(foundAssignment)}>remove</div></div>
                      })
                    }
                  </div>

                  <div className="container-row">
                    <label>Set Assignments</label>
                    {
                      Object.values(agencyState().assignment).map( assignment =>
                        <div onClick={() => addAssignment(assignment)}
                              className={Object.keys(tempNode.active_assignments).includes(assignment.id) ? "selected-assignment": "unselected_assignment"}>{assignment.display.card(assignment)}</div>)
                    }
                  </div>

                  { props.updateHandler ? null : tempNode.storage.handlers.call(tempNode) }

                </div>
      }

      return <Builder structuralNode={node} updateHandler={updateHandler} />
    }
  },
  typeFunctions: {
    getChildren: function(){
      let stateStructuralNodes = agencyState().structuralNode
      return Object.entries(stateStructuralNodes).filter( ([id, value]) => value.structuralNode_parent_id === this.id && value.structuralNode_parent_id !== id ).map(([key, value]) => value)
    },
    branch: function(id, allNodes){},
    getNodeSupervisor: function(id, allNodes){},
    getProperties: function(){
      let state = agencyState()
      return this.structuralNode_dataTag_ids.map( id => state.dataTag[id])
        .map( tag => tag.dataTag_property_ids.map(propId => state.properties[propId]))
    }
  }
})


const displayProps = agencyState => ({
  displayKey: "structuralNode_label",
  component: {
    list: {
      root: Object.values(agencyState["structuralNode"]).find(node => node.id === node.structuralNode_parent_id),
      nodeBranch: node => node.typeFunctions.getChildren.call(node),
      columns: {
        limited: [{label: "", selector: "structuralNode_label"}],
        expanded: [{label: "", selector: "structuralNode_label"}]
      },
      listActions: [],
      drawerComponents: [{label: "card", component: item => item.display.card(item)}],
      overlayComponents: [
        {label: "Add Branch", component: item => {
          let newNode = agencyObject("structuralNode", {id:"new_object", structuralNode_label: "new node", structuralNode_parent_id: item.id}, err=>{throw err})
          return newNode.display.builder(newNode) }},
        {label: "document", component: item => item.display.document(item)},
        {label: "editor", component: item => item.display.editor(item)},
        {label: "builder", component: item => item.display.builder(item)},
      ]
    }
  }
})


export { prototype, displayProps }
