import React from 'react'
import { agencyObject, agencyTypeData } from './agencyObject'
import List from '../../../components/List'


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
                <div className="container-item header">{node.structuralNode_label}</div>
                <div className="container-item subheader">-{node.typeFunctions.getParentNode(node).structuralNode_label}</div>
                { node.typeFunctions.getDataTags(node).map(tag => tag.display.card(tag)) }
              </div>
    },
    document: node => {
      let state = agencyState()
      return  <div className="structuralNode document">
                <header>Node Document</header>

                <div className="container-fill">

                  <div className="container-row border-bottom">
                    <div className="container-item item-label">Title & Parent:</div>
                    {node.display.card(node)}
                  </div>

                  <div className="container-row border-bottom">
                    <div className="container-item item-label">Branches:</div>
                    <div className="container-fill">
                      {
                        node.typeFunctions.getChildren(node).map( child => child.display.card(child))
                      }
                    </div>
                  </div>

                  <div className="container-row border-bottom">
                    <div className="container-item item-label">Assignments:</div>
                    <div className="container-fill">
                      {
                        node.typeFunctions.getActiveAgents(node).map(agent => {
                          <div className="container-item">{agent.display.card(agent)}</div>
                        })
                      }
                    </div>
                  </div>

                  <div className="container-row border-bottom">
                    <div className="container-item item-label">Properties:</div>
                    <div className="container-item container-fill">
                      {
                        node.typeFunctions.getProperties(node).length < 1 ?
                          "no properties"
                          : node.typeFunctions.getProperties(node).map( property =>
                          property.display.document(property, node.property_values[property.id]))
                      }
                    </div>
                  </div>
                </div>
              </div>
    },
    editor: node => {
      function Editor(props){
        let state = agencyState()

        const [tempNode, updateTempNode] = React.useState(props.structuralNode)
        const updateHandler = newState => updateTempNode(Object.assign(Object.create(Object.getPrototypeOf(tempNode)), tempNode, newState))

        const createAgent = (userId, assignmentId, assignmentObject) => {
          let newAgent = agencyObject("agent", {id: "new_object", agent_user_id: userId, structuralNode_id: tempNode.id, assignment_id: assignmentId}, err=>{throw err})

          updateHandler({
            new_object: tempNode.new_object ? [...tempNode.new_object, newAgent] : [newAgent],
            active_assignments: Object.assign({}, tempNode.active_assignments, { [`${assignmentId}`] : Object.assign({}, assignmentObject, {active_agents: [...assignmentObject.active_agents, newAgent.id]})})
          })
        }

        return  <div className="structuralNode document">
                  <header>Node Editor</header>
                  <div className="container-fill">

                    <div className="container-row">
                      <div className="container-item item-label">Set Values:</div>
                      <div className="container-item container-fill">
                        {
                          tempNode.typeFunctions.getProperties(tempNode).length < 1 ?
                            "no properties"
                            : tempNode.typeFunctions.getProperties(tempNode).map( property =>
                            property.display.editor(property, tempNode.property_values[property.id], newValue => updateHandler({property_values: Object.assign({}, tempNode.property_values, { [`${property.id}`]: newValue })})))
                        }
                      </div>
                    </div>

                    <div className="container-row">
                      <div className="container-item item-label">Assign Agents</div>
                      <div className="container-item container-fill">
                        {
                          tempNode.typeFunctions.getActiveAssignments(tempNode).map(assignment => {})
                        }
                      </div>
                    </div>

                  </div>

                  { tempNode.storage.handlers.call(tempNode) }

                </div>
      }

      return <Editor structuralNode={node} />
    },
    builder: node => {
      function Builder(props){
        const [tempNode, setTempNode] = React.useState(props.structuralNode)
        const updateHandler = newState => setTempNode(Object.assign(Object.create(Object.getPrototypeOf(tempNode)), tempNode, newState))


        const toggleDataTag = dataTag_id => {
          tempNode.structuralNode_dataTag_ids.includes(dataTag_id) ?
            updateHandler({structuralNode_dataTag_ids: tempNode.structuralNode_dataTag_ids.filter(id => id !== dataTag_id)})
            : updateHandler({structuralNode_dataTag_ids: [...tempNode.structuralNode_dataTag_ids, dataTag_id]})
        }

        // const addAssignment = assignment => {
        //   let assignmentData = { active_agents: [] }
        //   let newAssignmentSet = Object.assign({}, tempNode.active_assignments, {[`${assignment.id}`] : assignmentData })
        //   updateHandler({active_assignments: newAssignmentSet})
        // }
        // const removeAssignment = assignment => {
        //   let newAssignmentSet = Object.assign({}, tempNode.active_assignments)
        //   delete newAssignmentSet[assignment.id]
        //   updateHandler({active_assignments: newAssignmentSet})
        // }
        // const newDataTagBuilder = () => {
        //   let dataTag = agencyObject("dataTag", {id: "new_object", dataTag_label: "new dataTag", dataTag_tagType: "structural"}, err=>{console.log(err)})
        //
        //   return dataTag.display.builder(dataTag, newState => updateHandler(console.log("structural node handling of datatag updateHandler", dataTag, newState)))
        // }
        // const newAssignmentBuilder = () => {
        //   let assignment = agencyObject("assignment", {id: "new_object"}, err=>{console.log(err)})
        //
        //   return assignment.display.builder(assignment, newState => updateHandler(console.log("structural node handling of assignment updateHandler", assignment, newState)))
        // }

        return  <div className="structuralNode document ">
                  <header>Node Builder</header>

                  <div className="container-fill">

                    <div className="container-row border-bottom">
                      <div className="container-item item-label">Set Title:</div>
                      <div className="container-item container-fill">
                        <input type="text" value={tempNode.structuralNode_label} onChange={()=> updateHandler({structuralNode_label: event.target.value})}/>
                      </div>
                    </div>

                    <div className="container-row border-bottom">
                      <div className="container-item item-label">Set Branch of:</div>
                      <div className="container-item container-fill">
                      {
                        node.id === node.structuralNode_parent_id ?
                          <div className="container-item">Agency Root</div>
                          : <select value={tempNode.structuralNode_parent_id} onChange={() => updateHandler({structuralNode_parent_id: event.target.value})}>
                              <option value=""></option>
                              { Object.values(agencyState().structuralNode).map(node =>
                                  <option value={node.id} style={{background: `${node.id === tempNode.structuralNode_parent_id ? "yellow" : ""}`}}>
                                    {node.structuralNode_label}
                                  </option>) }
                            </select>
                      }
                      </div>
                    </div>

                    <div className="container-row border-bottom">
                      <div className="container-item item-label">Set Assignments</div>
                      <div className="container-item container-fill"></div>
                    </div>

                    <div className="container-row border-bottom">
                      <div className="container-item item-label">Set DataTags</div>
                      <div className="container-item container-fill">
                        {
                          Object.values(agencyState().dataTag).map( tag =>
                              <div onClick={() => toggleDataTag(tag.id)}
                                    className={tempNode.structuralNode_dataTag_ids.includes(tag.id) ? "container-item selected-tag" : "container-item"}>{tag.dataTag_label}</div>)
                        }
                      </div>
                    </div>
                  </div>

                  { tempNode.storage.handlers.call(tempNode) }

                </div>
      }

      return <Builder structuralNode={node} />
    }
  },
  typeFunctions: {
    getChildren: node => Object.values(agencyState().structuralNode).filter( n => n.structuralNode_parent_id === node.id && n.structuralNode_parent_id !== n.id ),
    getParentNode: node => agencyState().structuralNode[node.structuralNode_parent_id],
    branch: function(id, allNodes){},
    getNodeSupervisor: (id, allNodes) => {},
    getDataTags: node => node.structuralNode_dataTag_ids.map( id => agencyState().dataTag[id] ),
    getProperties: node => {
      let state = agencyState()
      let propertySet = []

      node.typeFunctions.getDataTags(node).map( tag => tag.dataTag_property_ids.forEach(propId => { propertySet = [...propertySet, state.property[propId]] }))

      return propertySet
    },
    getActiveAgents: node => {
      let state = agencyState()
      let activeAgents = []

      Object.values(node.active_assignments).forEach( assignmentObject => {
        // activeAgents = [...activeAgents, ...assignmentObject.active_agents]
      })

      return activeAgents.map(agent_id => state.agent[agent_id])
    },
    getActiveAssignments: node => {
      let state = agencyState()
      let activeAssignments = []



      Object.entries(node.active_assignments).forEach( ([assignment_id, assignment_data]) => {
        let assignment = agencyState().assignment[assignment_id]



      })
      return activeAssignments
    }
  }
})


const displayProps = agencyState => ({
  displayKey: "structuralNode_label",
  component: {
    list: {
      root: Object.values(agencyState["structuralNode"]).find(node => node.id === node.structuralNode_parent_id),
      nodeBranch: node => node.typeFunctions.getChildren(node),
      // columns: [{selector: "structuralNode_label"}],
      iconComponent: node => node.display.card(node),
      // drawerComponents: [{label: "card", component: item => item.display.card(item)}],
      overlayComponents: [
        {label: "document", component: item => item.display.document(item)},
        {label: "editor", component: item => item.display.editor(item)},
        {label: "builder", component: item => item.display.builder(item)},
      ]
    }
  }
})


export { prototype, displayProps }
