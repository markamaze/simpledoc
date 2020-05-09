import React from 'react'
import { agencyObject } from './agencyObject'
import List from '../../../components/List'


//TODO: move and import
const utility = {
  validateId: id => true, //handle flags
  validateString: (string, params) => true,

}


const prototype = (getStore, services, utilities) => ({
  type: () => "node",
  properties: {
    id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.Node.id"
        else if(!this.properties.id.validate(id)) throw "invalid property: Agency.Node.id"
        else this.id = id
        return true
      },
      validate: ()=>{ return true }
    },
    label: {
      setValue: function(label){
        if(label === null || label === undefined) throw "missing required property: Agency.Node.label"
        else if(!this.properties.label.validate(label)) throw "invalid property: Agency.Node.label"
        else this.label = label
        return true
      },
      validate: ()=>{ return true }
    },
    parent_id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.Node.parent_id"
        else if(id === "root") this.parent_id = this.id
        else if(!this.properties.parent_id.validate(id)) throw "invalid property: Agency.Node.parent_id"
        else this.parent_id = id
        return true
      },
      validate: ()=>{ return true }
    },
    tag_ids: {
      setValue: function(ids){
        if(ids === null || ids === undefined) this.tag_ids = []
        else if(!this.properties.tag_ids.validate(ids)) throw "invalid required property: Agency.Node.tag_ids"
        else this.tag_ids = ids
        return true
      },
      validate: ()=>{ return true }
    },
    property_values: {
      setValue: function(values){
        if(values === null || values === undefined) this.property_values = []
        else if(!this.properties.property_values.validate(values)) throw "invalid property: Agency.Node.property_values"
        else this.property_values = values
        return true
      },
      validate: kvSet =>{
        if(!Array.isArray(kvSet)) return false
        if(kvSet.length === 0) return true

        return kvSet.reduce( (result, kvpair) => {
          if(!result) return false

          let pair = kvpair.split("=")
          if(pair.length !== 2) return false
          else if(typeof pair[0] !== 'string' || typeof pair[1] !== 'string') return false
          else true
        })
      }
    },
    assignments: { //TODO: still need to rework this, along with AgencyValidator.assignment() in backend
      setValue: function(assignments){
        if(assignments === null || assignments === undefined) this.assignments = {}
        else if(!this.properties.assignments.validate(assignments)) 
          throw "Invalid property: AGENCY.NODE.assignments"
        else this.assignments = assignments
        return true
      },
      validate: assignments => Object.values(assignments).map( assignment => {
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
      return  <div className="container-item" style={{background: "white", color: "black", padding: "1rem"}}>
                <div className="container-item header">{node.tools.getDisplayName(node)}</div>
                <div className="container-item">{node.agencyComponents.showTags(node.tag_ids)}</div>
              </div>
    },
    document: node => {
      let parentNode = node.tools.getParentNode(node)

      return  <List className="container"
                  headerComponent={node.display.card(node)}
                  tableData={[
                    {label: "Node:", display: node.tools.getDisplayName(node), selectable: false},
                    {label: "Parent Node:", display: parentNode.display.card(parentNode), selectable: false},
                    {label: "Node Supervisor", selectable: false, display: <div>unknown at this time</div>},
                    {label: "Branches", selectable: false, display:
                      <div>
                        {
                          node.new_object ?
                            [ ...node.new_object
                                .filter(obj => obj.type() === "node" && obj.parent_id === node.id).map(child => child.display.card(child)),
                              ...node.tools.getChildren(node).map( child => child.display.card(child)) ]
                            : node.tools.getChildren(node).map( child => child.display.card(child))
                        }
                      </div>},
                    {label: "tags", display: node.agencyComponents.showTags(node.tools.getTags(node))},
                    {label: "assignments", display: node.agencyComponents.showAssignments(node.assignments)},
                    {label: "property keys", display: node.agencyComponents.showPropertyKeys(node.tools.getProperties(node))},
                    {label: "set properties", display: node.agencyComponents.showPropertyValues(node.tools.getProperties(node), node.property_values)},
                    {label: "subscriptions", display: node.agencyComponents.showSubscriptions(node.tools.getSubscriptions(node))}
                  ]}
                  columns={[{selector: "label", selectable: false}, {selector: "display", selectable: false}]} />
    },
    editor: (node, close, alert) => {
      function Editor(props){

        const [tempNode, updateTempNode] = React.useState(props.node)
        const updateHandler = newState => updateTempNode(tempNode.update(newState))

        return  <List className="container"
                    headerComponent={tempNode.display.card(tempNode)}
                    tableData={[
                      tempNode.display.card(tempNode),
                      tempNode.agencyComponents.setPropertyValues(tempNode, updateHandler),
                      tempNode.components.setAssignments(tempNode, updateHandler)
                    ]}
                    iconComponent={ item => item }
                    footerComponent={tempNode.storage.handlers.call(tempNode, close, alert)} />
      }

      return <Editor node={node} />
    },
    builder: (node, close, alert) => {
      function Builder(props){
        const [tempNode, setTempNode] = React.useState(props.node)

        const updateHandler = newState => setTempNode(tempNode.update(newState))
        console.log(tempNode.label)

        return  <List className="container"
                    headerComponent={tempNode.display.card(tempNode)}
                    tableData={[
                      tempNode.agencyComponents.setLabel(tempNode, updateHandler),
                      tempNode.components.setNodeParent(tempNode, updateHandler),
                      tempNode.components.setNodeSupervisor(tempNode, updateHandler),
                      tempNode.components.manageNodeBranches(tempNode, updateHandler),
                      tempNode.components.buildAssignments(tempNode, updateHandler),
                      tempNode.agencyComponents.setTags(tempNode, updateHandler),
                      tempNode.agencyComponents.manageSubscriptions(tempNode, updateHandler)
                    ]}
                    iconComponent={ item => item }
                    footerComponent={tempNode.storage.handlers.call(tempNode, close, alert)} />
      }

      return <Builder node={node} />
    }
  },
  //components/tools available to agency objects of this type
  tools: {
    getChildren: node => Object.values(getStore().node).filter( n => n.parent_id === node.id && n.parent_id !== n.id ),
    getParentNode: node => getStore().node[node.parent_id],
    branch: function(id, allNodes){ return [] },
    getNodeSupervisor: (id, allNodes) => {},
    getTags: node => { return [] },
    getDisplayName: node => node.label,
    getSubscriptions: node => [],
    getProperties: node => []
  },
  components: {
    setNodeSupervisor: (node, updateHandler) => {
      return  <div>set node supervisor component</div>
    },
    setNodeParent: (node, updateHandler) => {

      if(node.id === node.parent_id) return <div className="container-row">Cannot reassign root</div>

      return  <div>
                <select className="container-item"
                      value={node.parent_id}
                      onChange={() => updateHandler({parent_id: event.target.value})}>
                    <option value=""></option>
                    { Object.values(getStore().node).map(node =>
                        <option value={node.id} style={{background: `${node.id === node.parent_id ? "yellow" : ""}`}}>
                          {node.label}
                        </option>) }
                </select>
              </div>

    },   
    manageNodeBranches: (node, updateHandler) => {
      function ManageBranches(props) {
        const [tempNewNodeLabel, updateTempNewNodeLabel] = React.useState("new node")

        const addBranch = () => {
          let newNode = agencyObject("node", {id:"new_object", parent_id: node.id, label: tempNewNodeLabel}, getStore, node.services, node.utilities, alert)

          updateHandler({
            new_object: node.new_object ? [...node.new_object, newNode] : [newNode]
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
    },
    setAssignments: (node, updateHandler) => {
      return  <div>set assignments component</div>
    },
    buildAssignments: (node, updateHandler) => {
      return  <div>build assignments component</div>
    }
  }
})

export { prototype }
