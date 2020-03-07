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
        if(assignments === null || assignments === undefined) this.active_assignments = []
        else if(!this.properties.active_assignments.validate(assignments)) throw "invalid property: Agency.StructualNode.active_assignments"
        else this.active_assignments = assignments.map(assignment => ([assignment.split("=")[0], assignment.split("=")[1] ]))
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
                { node.typeFunctions.getDataTags(node).map(tag => tag.display.card(tag)) }
              </div>
    },
    document: node => {
      let state = agencyState()
      return  <div className="structuralNode document">
                <div className="container-fill">

                  <List className="container border-bottom"
                      headerComponent={<div>Node Info:</div>}
                      tableData={[
                        {label: "Node:", data: node, display: node.display.card(node), selectable: false},
                        {label: "Parent Node:", data: node.typeFunctions.getParentNode(node), display: node.typeFunctions.getParentNode(node).display.card(node.typeFunctions.getParentNode(node)), selectable: false},
                        {label: "Node Supervisor", selectable: false, data: <div>unknown at this time</div>}
                      ]}
                      columns={[{selector: "label"},{selector: "display"}]} />

                  <List className="container border-bottom"
                      headerComponent={<div>Branches:</div>}
                      tableData={node.new_object ? [...node.new_object.filter(obj => obj.type() === "structuralNode" && obj.structuralNode_parent_id === node.id).map(child => ({data: child, display: child.display.card(child)})), ...node.typeFunctions.getChildren(node).map( child => ({data: child, display: child.display.card(child)}))] : node.typeFunctions.getChildren(node).map( child => ({data: child, display: child.display.card(child)}))}
                      columns={[{selector: "display"}]}
                      overlayComponents={[{label: "show document", component: item => item.data.display.document(item.data)}]} />

                  <List className="container border-bottom"
                      headerComponent={<div>Assignments:</div>}
                      tableData={node.active_assignments.map( ([assignment_id, agent_id]) => ({
                        assignment_display: agencyState().assignment[assignment_id].typeFunctions.getDisplayLabel(agencyState().assignment[assignment_id]),
                        agent_display: agent_id === "00000000-0000-0000-0000-000000000000" ? "unassigned"
                                          : agencyState().agent[agent_id].typeFunctions.getDisplayLabel(agencyState().agent[agent_id]),
                        selectable: false}))}
                      columns={[{selector: "assignment_display"},{selector: "agent_display"}]} />

                  <List className="container"
                      headerComponent={<div>Properties:</div>}
                      tableData={node.typeFunctions.getProperties(node).map(property => ({display: property.display.document(property, node.property_values[property.id])}))}
                      columns={[{selector: "display"}]} />
                </div>
              </div>
    },
    editor: (node, close, alert) => {
      function Editor(props){
        let state = agencyState()

        const [tempNode, updateTempNode] = React.useState(props.structuralNode)
        const updateHandler = newState => updateTempNode(Object.assign(Object.create(Object.getPrototypeOf(tempNode)), tempNode, newState))

        const createAgent = (userId, assignmentId) => {
          let newAgent = agencyObject("agent", {id: "new_object", agent_user_id: userId, structuralNode_id: tempNode.id, assignment_id: assignmentId}, err=>{throw err})

          let updateActiveAssignment = [...tempNode.active_assignments]

          updateActiveAssignment = [[assignmentId, newAgent.id], ...updateActiveAssignment.filter( ([assignment_id, agent_id]) => {
            if(assignmentId !== assignment_id) return true
            else if(agent_id !== "00000000-0000-0000-0000-000000000000") return true
            else return false
          })]


          updateHandler({
            new_object: tempNode.new_object ? [...tempNode.new_object, newAgent] : [newAgent],
            active_assignments: updateActiveAssignment
          })
        }

        const deactivateAgent = (assignment_id, agent_id) => console.log("deactivate agent assignment")

        return  <div className="structuralNode document">
                  <header>Node Editor</header>
                  <div className="container-fill">

                    <List className="container-row border-bottom"
                        headerComponent={<div className="container-item item-label">Set Properties:</div>}
                        tableData={tempNode.typeFunctions.getProperties(tempNode).map(property => ({
                          property_editor:
                            <div className="property container-row">
                              <div className="container-item item-label">{property.property_key}</div>
                              <input className="container-item"
                                  type="text"
                                  value={tempNode.property_values[property.id]}
                                  onChange={() => updateHandler({property_values: Object.assign({}, tempNode.property_values, { [`${property.id}`]: event.target.value })})} />
                            </div>,
                          selectable: false
                        }))}
                        columns={[{selector:"property_editor"}]} />

                    <List className="container-row border-bottom"
                        headerComponent={<div className="container-item item-label">Assign Agents</div>}
                        tableData={tempNode.active_assignments.map( ([assignment_id, agent_id]) => {
                          let assignment = state.assignment[assignment_id]
                          let agent = agent_id === "00000000-0000-0000-0000-000000000000" ? null : state.agent[agent_id]

                          return {
                            assignment_display: assignment.typeFunctions.getDisplayLabel(assignment),
                            agent_display: agent === null ? Object.values(state.user).map(user => <div className="container-item" onClick={() => createAgent(user.id, assignment_id)}>{user.username}</div>) : <div className="container-row">filled</div>

                            // agent_display: agent === null ?
                            //   <div className="container-row">
                            //     <div className="container-item">Assign User</div>
                            //     <select className="container-item" value="" onChange={() => createAgent(event.target.value, assignment_id)}>
                            //       <option value=""></option>
                            //       {
                            //         Object.values(state.user).map( user => <option value={user.id}>{user.typeFunctions.getDisplayLabel(user)}</option>)
                            //       }
                            //     </select>
                            //   </div> : <div className="container-row">filled</div>
                          }
                        })}
                        columns={[{selector: "assignment_display"}, {selector: "agent_display"}]} />

                    <List className="container-row"
                        headerComponent={<div className="container-item item-label">Assigned Agents</div>}
                        tableData={tempNode.active_assignments
                                      .filter( ([assignment_id, agent_id]) => agent_id !== "00000000-0000-0000-0000-000000000000")
                                      .map( ([assignment_id, agent_id]) => {
                                          let item;
                                          if(agent_id.substring(0,2) === "n-") item = tempNode.new_object.find(obj => obj.id === agent_id)
                                          else item = agencyState().agent[agent_id]
                                          return {
                                            display: item.display.card(item),
                                            action: <button className="container-item" onClick={() => deactivateAgent(assignment_id, agent_id)}>deactivate</button>,
                                            selectable: false
                                          }
                                        })}
                        columns={[{selector: "display"},{selector: "action"}]} />


                  </div>

                  { tempNode.storage.handlers.call(tempNode, close, alert) }

                </div>
      }

      return <Editor structuralNode={node} />
    },
    builder: (node, close, alert) => {
      function Builder(props){
        const [tempNode, setTempNode] = React.useState(props.structuralNode)
        const [tempNewNodeLabel, updateTempNewNodeLabel] = React.useState("new node")
        const updateHandler = newState => setTempNode(Object.assign(Object.create(Object.getPrototypeOf(tempNode)), tempNode, newState))

        const addBranch = () => {
          let newNode = agencyObject("structuralNode", {id:"new_object", structuralNode_parent_id: node.id, structuralNode_label: tempNewNodeLabel}, alert)

          updateHandler({
            new_object: tempNode.new_object ? [...tempNode.new_object, newNode] : [newNode]
          })
        }

        const addDataTag = dataTag_id => updateHandler({structuralNode_dataTag_ids: [...tempNode.structuralNode_dataTag_ids, dataTag_id]})

        const removeDataTag = dataTag_id => updateHandler({structuralNode_dataTag_ids: tempNode.structuralNode_dataTag_ids.filter(id => id !== dataTag_id)})

        const addAssignment = assignment_id => {
          updateHandler({active_assignments: [...tempNode.active_assignments, [assignment_id, null]]})
        }
        const removeAssignment = (assignment_id, agent_id) => {

          updateHandler({active_assignments: tempNode.active_assignments.filter( ([assignmentId, agentId]) => {
            if(assignmentId !== assignment_id) return true
            else if(agentId !== agentId) return true
            else return false
          } )})
        }

        return  <div className="structuralNode document ">
                  <header>Node Builder</header>

                  <div className="container-fill">

                    <List className="container-row border-bottom"
                        headerComponent={<div className="container-item item-label">Node Settings</div>}
                        tableData={[
                          {label: <div className="container-item item-label">Set Title</div>, selectable: false, input: <input className="container-item" type="text" value={tempNode.structuralNode_label} onChange={()=> updateHandler({structuralNode_label: event.target.value})}/>},
                          {label: <div className="container-item item-label">Set Parent</div>, selectable: false, input: props.structuralNode.id === props.structuralNode.structuralNode_parent_id ? <div className="container-row">Cannot reassign root</div> : <select className="container-item" value={tempNode.structuralNode_parent_id} onChange={() => updateHandler({structuralNode_parent_id: event.target.value})}>
                              <option value=""></option>
                              { Object.values(agencyState().structuralNode).map(node =>
                                  <option value={node.id} style={{background: `${node.id === tempNode.structuralNode_parent_id ? "yellow" : ""}`}}>
                                    {node.structuralNode_label}
                                  </option>) }
                            </select>},
                          {label: <div className="container-item item-label">Add Branch</div>, selectable: false, input: <div className="container">
                            <input className="container-item" type="text" value={tempNewNodeLabel} onChange={() => updateTempNewNodeLabel(event.target.value)} />
                            <button className="container-item" onClick={() => addBranch()}>Create</button>
                          </div>}
                        ]}
                        columns={[{selector: "label"}, {selector: "input"}]}
                        listActions={[{label: "show document", action: () => tempNode.display.document(tempNode)}]} />


                    <List className="container-row border-bottom"
                        headerComponent={<div className="container-item item-label">Manage Assignments</div>}
                        tableData={[
                          {label: "Add Assignment", selectable: false, input:
                            <select className="container-row" value="" onChange={() => addAssignment(event.target.value)}>
                              <option value=""></option>
                              {
                                Object.values(agencyState().assignment).map( assignment =>
                                  <option value={assignment.id}>{assignment.typeFunctions.getDisplayLabel(assignment)}</option>)
                                }
                            </select>},
                          ...tempNode.active_assignments.map( ([assignment_id, agent_id]) => ({label: agencyState().assignment[assignment_id].typeFunctions.getDisplayLabel(agencyState().assignment[assignment_id]), selectable: false, input: <button onClick={() => removeAssignment(assignment_id, agent_id)}>X</button>}))
                        ]}
                        columns={[{selector: "label"},{selector: "input"}]} />



                    <List className="container-row"
                        headerComponent={<div className="container-item item-label">Manage DataTags</div>}
                        tableData={[{selectable: false, label: "Add DataTag" , input: <select className="container-row" value="" onChange={() => addDataTag(event.target.value)}>
                          <option value=""></option>
                          {
                            Object.values(agencyState().dataTag).map( tag => <option value={tag.id}>{tag.dataTag_label}</option>)
                          }
                        </select>},...tempNode.structuralNode_dataTag_ids
                          .map(tagId => agencyState().dataTag[tagId])
                          .map(tag => ({data: tag, selectable: false, input: <button onClick={()=> removeDataTag(tag.id)}>X</button>, label: tag.display.card(tag) }))]}
                        columns={[{selector: "label"}, {selector: "input"}]} />
                  </div>

                  { tempNode.storage.handlers.call(tempNode, close, alert) }

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

      node.active_assignments.forEach( ([assignment_id, agent_id]) => {
        agent_id === null ? null : activeAgents = [...activeAgents, agent_id]
      })

      return activeAgents.map(agent_id => state.agent[agent_id])
    },
    getActiveAssignments: node => {
      let state = agencyState()
      let activeAssignments = []



      node.active_assignments.forEach( ([assignment_id, assignment_data]) => {
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
      iconComponent: node => node.display.card(node),
      // drawerComponents: [{label: "card", component: item => item.display.card(item)}],
      overlayComponents: [
        {label: "document", component: (item) => item.display.document(item)},
        {label: "editor", component: (item, close, alert) => item.display.editor(item, close, alert)},
        {label: "builder", component: (item, close, alert) => item.display.builder(item, close, alert)},
      ]
    }
  }
})


export { prototype, displayProps }
