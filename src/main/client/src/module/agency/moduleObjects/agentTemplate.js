import React from 'react'
import { agencyObject } from './agencyObject'



const prototype = agencyState => ({
  type: () => "agentTemplate",
  properties: {
    id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.AgentTemplate.id"
        else if(!this.properties.id.validate(id)) throw "invalid property: Agency.AgentTemplate.id"
        else this.id = id
        return true
      },
      getObject: function(){ return this.id },
      validate: (id)=>{ return true }
    },
    agentTemplate_label: {
      setValue: function(label){
        if(label === null || label === undefined) throw "missing required property: Agency.AgentTemplate.agentTemplate_label"
        else if(!this.properties.agentTemplate_label.validate(label)) throw "invalid property: Agency.AgentTemplate.agentTemplate_label"
        else this.agentTemplate_label = label
        return true
      },
      getObject: function(){ return this.agentTemplate_label },
      validate: (label)=>{ return true }
    },
    agentTemplate_dataTag_ids: {
      setValue: function(ids){
        if(ids === null || ids === undefined) this.agentTemplate_dataTag_ids = []
        else if(!this.properties.agentTemplate_dataTag_ids.validate(ids)) throw "invalid required property: Agency.AgentTemplate.agentTemplate_dataTag_ids"
        else this.agentTemplate_dataTag_ids = ids
        return true
      },
      getObject: function(){ return this.agentTemplate_dataTag_ids.map(id => agencyState["dataTag"][id] ) },
      validate: (ids)=>{ return true }
    }
  },
  display: {
    card: template => {
      let store = agencyState()
      return  <div className="agentTemplate container-row">
                { template.agentTemplate_label }
                {
                  template.agentTemplate_dataTag_ids
                    .map(id => store.dataTag[id])
                    .map(tag => tag.display.card(tag))
                }
              </div>
    },
    document: template => {
      let store = agencyState()
      return  <div className="agentTemplate container-fill">
                { template.display.card(template) }

                <div className="container">
                  {
                    template.agentTemplate_dataTag_ids
                      .map(id => store.dataTag[id])
                      .map(tag => tag.display.document(tag))
                  }
                </div>
              </div>
    },
    builder: (template, updateHandler) => {
      function Builder(props){
        const [tempTemplate, updateTempTemplate] = React.useState(props.agentTemplate)
        const updateHandler = newState => props.updateHandler ? props.updateHandler(newState) :
          updateTempTemplate(Object.assign(Object.create(Object.getPrototypeOf(tempTemplate)), tempTemplate, newState))

        const toggleDataTag = dataTag => {
          tempTemplate.agentTemplate_dataTag_ids.includes(dataTag.id) ?
            updateHandler({agentTemplate_dataTag_ids: tempTemplate.agentTemplate_dataTag_ids.filter(id => id === dataTag.id)})
            : updateHandler({agentTemplate_dataTag_ids: [...tempTemplate.agentTemplate_dataTag_ids, dataTag.id]})
        }

        return  <div className="agentTemplate container-fill">

                  <div className="container-fill">
                    <div className="container-row">
                      <label>Set Template Label</label>
                      <input value={tempTemplate.agentTemplate_label}
                            onChange={() => updateHandler({agentTemplate_label: event.target.value})} />
                    </div>

                    <div className="container-row">
                      <label>Set DataTags</label>
                      {
                        Object.values(agencyState().dataTag).map( tag =>
                            <div onClick={() => toggleDataTag(tag)}
                                  className={tempTemplate.agentTemplate_dataTag_ids.includes(tag.id) ? "selected-tag" : "unselected-tag"}>{tag.display.card(tag)}</div>)
                      }
                    </div>

                  </div>

                  { props.updateHandler ? null : tempTemplate.storage.handlers.call(tempTemplate) }

                </div>
      }

      return <Builder agentTemplate={template} updateHandler={updateHandler} />

    }
  }
})



const displayProps = agencyState => ({
  displayKey: "agentTemplate_label",
  component: {
    list: {
      columns: {
        limited: [{label: "Template Name", selector: "agentTemplate_label"}],
        expanded: [{label: "Template Name", selector: "agentTemplate_label"}]
      },
      tableData: Object.values(agencyState.agentTemplate),
      listActions: [{label: "New Template", action: () => {
        let newTemplate = agencyObject("agentTemplate", {id: "new_object", agentTemplate_label: "new template"}, err=>{throw err})
        return newTemplate.display.builder(newTemplate)
      }}],
      drawerComponents: [
        {label: "card", component: item => item.display.card(item)}
      ],
      overlayComponents: [
        {label: "document", component: item => item.display.document(item)},
        {label: "builder", component: item => item.display.builder(item)}
      ]
    }
  }
})



export { prototype, displayProps }
