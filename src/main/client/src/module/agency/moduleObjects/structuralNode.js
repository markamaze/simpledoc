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
      return  <div className="structuralNode container-fill">
                <div className="container-row btm-border">
                  {node.display.card(node)}
                </div>

                <div className="container">
                  <label>Agents</label>
                  {
                    Object.values(agencyState().agent).filter(agent => agent.structuralNode_id = node.id)
                      .map( agent => agent.display.document(agent))
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
        return  <div className="structuralNode container-fill">
                  <div className="container-row btm-border">{props.structuralNode.display.card(props.structuralNode)}</div>

                  <div className="container">
                    <label>Property Values</label>
                    {
                      Object.entries(props.structuralNode.property_values).map( ([propertyId, propertyValue]) => {
                        let property = agencyState().property[propertyId]
                        property.properties.property_value.setValue.call(property, propertyValue)
                        return property.display.editor(property)
                      })
                    }
                  </div>
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
            updateHandler({structuralNode_dataTag_ids: tempNode.structuralNode_dataTag_ids.filter(id => id === dataTag.id)})
            : updateHandler({structuralNode_dataTag_ids: [...tempNode.structuralNode_dataTag_ids, dataTag.id]})
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
