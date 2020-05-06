import React from 'react'
import { agencyObject } from './agencyObject'
import List from '../../../components/List'


const prototype = (getStore, services, utilities) => ({
  type: () => "node",
  properties: {
    id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.StructualNode.id"
        else if(!this.properties.id.validate(id)) throw "invalid property: Agency.StructualNode.id"
        else this.id = id
        return true
      },
      validate: ()=>{ return true }
    },
    label: {
      setValue: function(label){
        if(label === null || label === undefined) throw "missing required property: Agency.StructualNode.label"
        else if(!this.properties.structuralNode_label.validate(label)) throw "invalid property: Agency.StructualNode.label"
        else this.structuralNode_label = label
        return true
      },
      validate: ()=>{ return true }
    },
    parent_id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.StructualNode.structuralNode_parent_id"
        else if(!this.properties.structuralNode_parent_id.validate(id)) throw "invalid property: Agency.StructualNode.structuralNode_parent_id"
        else this.structuralNode_parent_id = id
        return true
      },
      validate: ()=>{ return true }
    },
    dataTag_ids: {
      setValue: function(ids){
        if(ids === null || ids === undefined) this.structuralNode_dataTag_ids = []
        else if(!this.properties.structuralNode_dataTag_ids.validate(ids)) throw "invalid required property: Agency.StructualNode.structuralNode_dataTag_ids"
        else this.structuralNode_dataTag_ids = ids
        return true
      },
      validate: ()=>{ return true }
    },
    property_values: {
      setValue: function(values){
        if(values === null || values === undefined) this.property_values = []
        else if(!this.properties.property_values.validate(values)) throw "invalid property: Agency.StructuralNode.property_values"
        else this.property_values = values
        return true
      },
      validate: kvSet =>{
        if(!Array.isArray(kvSet)) return false

        return kvSet.reduce( (result, kvpair) => {
          if(!result) return false

          let pair = kvpair.split("=")
          if(pair.length !== 2) return false
          else if(typeof pair[0] !== 'string' || typeof pair[1] !== 'string') return false
          else true
        })
      }
    },
    assignments: {
      setValue: function(assignments){
        if(assignments === null || assignments === undefined) this.assignments = {}
        else if(!this.properties.assignments.validate(assignments)) 
          throw "Invalid property: AGENCY.STRUCTURALNODE.ASSIGNMENTS"
        else this.assignments = assignments
        return true
      },
      validate: assignments => assignments.map( assignment => {
        let expectedKeys = ["id","assignment_type","agentTemplate_id","active_agent_id","assignment_links"]
        let keys = Object.keys(assignment)
        
        if(keys === null || keys === undefined) return false
        else if(expectedKeys.length !== keys.length) return false
        
        let typeLinkKeys = {
          supervisor: ["assignment_for_their_boss_within_the_node", "node_id_for_which_this_assignment_oversees"],
          delegative: ["assignment_for_their_boss"],
          roleplayer: ["assignment_for_thier_boss", "assignment_of_those_with_delegative_authority"],
          consumer: ["assignments_of_those_serving_the_consumer"],
          provider: ["assignments_of_those_the_provider_is_working_with"]
        }

        let index = expectedKeys.length
        while(index >= 0){
          if(!keys.includes(expectedKeys[index])) return false

          let linkKeys = Object.keys(assignment.assignment_links)
          let expectedLinkKeys = typeLinkKeys[assignment.assignment_type]

          if(linkKeys === null || linkKeys === undefined) return false
          else if(expectedLinkKeys.length !== linkKeys.length) return false

          //validate the values of each of the expected keys as well
          let i = expectedLinkKeys.length
          while(i >= 0){
            if(!linkKeys.includes(expectedLinkKeys[index])) return false
            --i
          }

          --index
        }

        return true
      })
    }
  },
  display: {
    card: node => {
      return  <div className="container-item">
                <div className="container-item header">{node.structuralNode_label}</div>
                { node.agencyTools.getDataTags(node).map(tag => tag.display.card(tag)) }
              </div>
    },
    document: node => {
      return  <List className="container"
                  headerComponent={<header>StructuralNode Document</header>}
                  tableData={[
                    {label: "Node:", data: node, display: node.display.card(node), selectable: false},
                    {label: "Parent Node:", data: node.tools.getParentNode(node), display: node.tools.getParentNode(node).display.card(node.tools.getParentNode(node)), selectable: false},
                    {label: "Node Supervisor", selectable: false, data: <div>unknown at this time</div>},
                    {label: "Branches", selectable: false, data:
                      <div>
                        {
                          node.new_object ?
                            [ ...node.new_object
                                .filter(obj => obj.type() === "structuralNode" && obj.structuralNode_parent_id === node.id).map(child => child.display.card(child)),
                              ...node.tools.getChildren(node).map( child => child.display.card(child)) ]
                            : node.tools.getChildren(node).map( child => child.display.card(child))
                        }
                      </div>},
                    {label: "dataTags", display: node.agencyComponents.dataTagList(node)},
                    
                    //TODO: refactored assignment/node structure
                    {label: "assignments", display: node.agencyComponents.assignmentsList(node)},
                    {label: "properties", display: node.agencyComponents.propertiesList(node)}
                  ]}
                  columns={[{selector: "label", selectable: false}, {selector: "display", selectable: false}]} />
    },
    editor: (node, close, alert) => {
      function Editor(props){

        const [tempNode, updateTempNode] = React.useState(props.structuralNode)
        const updateHandler = newState => updateTempNode(tempNode.moduleTools.updateObject(newState, tempNode))

        return  <List className="container"
                    headerComponent={<header>Node Editor</header>}
                    tableData={[
                      tempNode.agencyComponents.propertiesEditor(tempNode, updateHandler),
                      tempNode.agencyComponents.assignmentEditor(tempNode, updateHandler)
                    ]}
                    iconComponent={ item => item }
                    footerComponent={tempNode.storage.handlers.call(tempNode, close, alert)} />
      }

      return <Editor structuralNode={node} />
    },
    builder: (node, close, alert) => {
      function Builder(props){
        const [tempNode, setTempNode] = React.useState(props.structuralNode)

        const updateHandler = newState => setTempNode(tempNode.moduleTools.updateObject(newState, tempNode))


        return  <List className="container"
                    headerComponent={<header>Node Builder</header>}
                    tableData={[
                      tempNode.components.setNodeLabel(node, updateHandler),
                      tempNode.components.setNodeParent(node, updateHandler),
                      tempNode.components.setNodeSupervisor(node, updateHandler),
                      tempNode.components.manageNodeBranches(node, updateHandler),
                      tempNode.agencyComponents.assignmentManager(tempNode, updateHandler),
                      tempNode.agencyComponents.dataTagManager(tempNode, updateHandler),
                      tempNode.agencyComponents.availableServices(tempNode, updateHandler),
                      tempNode.agencyComponents.subscriptionsList(tempNode, updateHandler)
                    ]}
                    iconComponent={ item => item }
                    footerComponent={tempNode.storage.handlers.call(tempNode, close, alert)} />
      }

      return <Builder structuralNode={node} />
    }
  },
  tools: {
    getChildren: node => Object.values(getStore().structuralNode).filter( n => n.structuralNode_parent_id === node.id && n.structuralNode_parent_id !== n.id ),
    getParentNode: node => getStore().structuralNode[node.structuralNode_parent_id],
    branch: function(id, allNodes){},
    getNodeSupervisor: (id, allNodes) => {}
  },
  components: {
    setNodeSupervisor: (node, updateHandler) => {},
    setNodeParent: (node, updateHandler) => {

      if(node.id === node.structuralNode_parent_id) return <div className="container-row">Cannot reassign root</div>

      return  <div>
                <select className="container-item"
                      value={node.structuralNode_parent_id}
                      onChange={() => updateHandler({structuralNode_parent_id: event.target.value})}>
                    <option value=""></option>
                    { Object.values(getStore().structuralNode).map(node =>
                        <option value={node.id} style={{background: `${node.id === node.structuralNode_parent_id ? "yellow" : ""}`}}>
                          {node.structuralNode_label}
                        </option>) }
                </select>
              </div>

    },
    setNodeLabel: (node, updateHandler) => {
      return  <div>
                <div className="container-item item-label">Set Title</div>
                <input className="container-item"
                    type="text"
                    value={node.structuralNode_label}
                    onChange={()=> updateHandler({structuralNode_label: event.target.value})}/>
              </div>
    },
    manageNodeBranches: (node, updateHandler) => {
      function ManageBranches(props) {
        const [tempNewNodeLabel, updateTempNewNodeLabel] = React.useState("new node")

        const addBranch = () => {
          let newNode = agencyObject("structuralNode", {id:"new_object", structuralNode_parent_id: node.id, structuralNode_label: tempNewNodeLabel}, tempNode.services, tempNode.utilities, alert)

          updateHandler({
            new_object: tempNode.new_object ? [...tempNode.new_object, newNode] : [newNode]
          })
        }

        return  <div className="container">
                  <input className="container-item"
                      type="text"
                      value={tempNewNodeLabel}
                      onChange={() => updateTempNewNodeLabel(event.target.value)} />
                  <button className="container-item" onClick={() => addBranch()}>Create</button>
                </div>
      }
      return <ManageBranches node={node}/>
    }
  }
})

export { prototype }
