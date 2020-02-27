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
                <div className="container-item item-label">Position:</div>
                <div className="container-item">{ template.agentTemplate_label }</div>
                <div className="container-item">
                {
                  template.agentTemplate_dataTag_ids
                    .map(id => store.dataTag[id])
                    .map(tag => tag.display.card(tag))
                }
                </div>
              </div>
    },
    document: template => {
      let store = agencyState()
      return  <div className="agentTemplate document">
                <header>{`AgentTemplate: ${template.agentTemplate_label}`}</header>

                <div className="container-fill">
                  <div className="container-row border-bottom">{ template.display.card(template) }</div>

                  <div className="container-row border-bottom">
                    <div className="container-item item-label">Properties: </div>
                    <div className="container-fill">
                      {
                        template.typeFunctions.getProperties(template).length < 1 ?
                          <div className="container-item">no properties</div>
                          : template.typeFunctions.getProperties(template).map(property =>
                          <div className="container-item">{property.display.card(property)}</div>)
                      }
                    </div>
                  </div>
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
            updateHandler({agentTemplate_dataTag_ids: tempTemplate.agentTemplate_dataTag_ids.filter(id => id !== dataTag.id)})
            : updateHandler({agentTemplate_dataTag_ids: [...tempTemplate.agentTemplate_dataTag_ids, dataTag.id]})
        }

        return  <div className="agentTemplate document">
                <header>Modify AgentTemplate</header>

                  <div className="container-fill">
                    <div className="container-row border-bottom">
                      <div className="container-item item-label">Set Template Label</div>
                      <input className="container-item  container-fill"
                          value={tempTemplate.agentTemplate_label}
                          onChange={() => updateHandler({agentTemplate_label: event.target.value})} />
                    </div>

                    <div className="container-row border-bottom">
                      <div className="container-item item-label">Set DataTags</div>
                      <div className="container-item container-fill">
                        {
                          Object.values(agencyState().dataTag).map( tag =>
                              <div onClick={() => toggleDataTag(tag)}
                                    className={tempTemplate.agentTemplate_dataTag_ids.includes(tag.id) ? "container-item selected-tag" : "container-item"}>{tag.dataTag_label}</div>)
                        }
                      </div>
                    </div>

                  </div>

                  { props.updateHandler ? null : tempTemplate.storage.handlers.call(tempTemplate) }

                </div>
      }

      return <Builder agentTemplate={template} updateHandler={updateHandler} />

    }
  },
  typeFunctions: {
    getDataTags: template => template.agentTemplate_dataTag_ids.map( id => agencyState().dataTag[id] ),
    getProperties: template => {
      let state = agencyState()
      let properties = []
      template.typeFunctions.getDataTags(template).forEach( tag => {
        tag.typeFunctions.getProperties(tag).forEach( property => {
          properties = [...properties, property]
        })
      })
      return properties
    }
  }
})



const displayProps = agencyState => ({
  displayKey: "agentTemplate_label",
  component: {
    list: {
      columns: [{selector: "display"}],
      tableData: Object.values(agencyState.agentTemplate).map(template => ({
        data: template,
        display: <div className="container-item">{template.agentTemplate_label}</div>
      })),
      listActions: [{label: "New Template", action: () => {
        let newTemplate = agencyObject("agentTemplate", {id: "new_object", agentTemplate_label: "new template"}, err=>{throw err})
        return newTemplate.display.builder(newTemplate)
      }}],
      drawerComponents: [
        {label: "document", component: item => item.data.display.document(item.data)},
      ],
      overlayComponents: [
        {label: "modify", component: item => item.data.display.builder(item.data)}
      ]
    }
  }
})



export { prototype, displayProps }
