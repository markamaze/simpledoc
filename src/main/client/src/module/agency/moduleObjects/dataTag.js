import React from 'react'
import { agencyObject } from './agencyObject'



const prototype = agencyState => ({
  type: function(){ return "dataTag" },
  properties: {
    id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.DataTag.id"
        else if(!this.properties.id.validate(id)) throw "invalid property: Agency.DataTag.id"
        else this.id = id
        return true
      },
      getObject: function(){ return this.id },
      validate: id => { return true }
    },
    dataTag_label: {
      setValue: function(label){
        if(label === null || label === undefined) throw "missing required property: Agency.DataTag.dataTag_label"
        else if(!this.properties.dataTag_label.validate(label)) throw "invalid property: Agency.DataTag.dataTag_label"
        else this.dataTag_label = label
        return true
      },
      getObject: function(){ return this.dataTag_label },
      validate: ()=>{ return true }
    },
    dataTag_tagType: {
      setValue: function(tagType){
        if(tagType === null || tagType === undefined) throw "missing required property: Agency.DataTag.dataTag_tagType"
        else if(!this.properties.dataTag_tagType.validate(tagType)) throw "invalid property: Agency.DataTag.dataTag_tagType"
        else this.dataTag_tagType = tagType
        return true
      },
      getObject: function(){ return this.datTag_tagType },
      validate: ()=>{ return true }
    },
    dataTag_property_ids: {
      setValue: function(ids){
        if(ids === null || ids === undefined) this.dataTag_property_ids = []
        else if(!this.properties.dataTag_property_ids.validate(ids)) throw "invalid property: Agency.DataTag.dataTag_property_ids"
        else this.dataTag_property_ids = ids
        return true
      },
      getObject: function(){ return this.dataTag_property_ids.map(id => agencyState["property"][id] )},
      validate: ()=>{ return true }
    },
    dataTag_typeObject_ids: {
      setValue: function(ids){
        if(ids === null || ids === undefined) this.dataTag_typeObject_ids = []
        else if(!this.properties.dataTag_typeObject_ids.validate(ids)) throw "invalid property: Agency.DataTag.dataTag_typeObject_ids"
        else this.dataTag_typeObject_ids = ids
        return true
     },
      getObject: function(){
        if(this.dataTag_tagType === "agent") return agencyState["role"][this.dataTag_typeObject_ids]
        else if(this.dataTag_tagType === "structural") return this.dataTag_typeObject_ids.map(id => agencyState["assignment"][id] )
        else return null
      },
      validate: ()=>{ return true }
    }
  },
  display: {
    card: dataTag => <div className="dataTag container-item">{dataTag.dataTag_label}</div>,
    document: dataTag =>
      <div className="document">
        <header>{`DataTag Info: ${dataTag.dataTag_label}`}</header>
        <div className="container-fill">
          <div className="container-row border-bottom">
            <div className="container-item item-label">DataTag:</div>
            <div className="container-fill">{ dataTag.display.card(dataTag) }</div>
          </div>

          <div className="container-row border-bottom">
            <div className="container-item item-label">DataTag Type:</div>
            <div className="container-fill">
              <div className="container-item">{dataTag.dataTag_tagType}</div>
            </div>
          </div>

          <div className="container-row border-bottom">
            <div className="container-item item-label">Properties:</div>
            <div className="container-fill">
              { dataTag.typeFunctions.getProperties(dataTag).map(property => property.display.card(property)) }
            </div>
          </div>
        </div>
      </div>,
    builder: (dataTag, close, alert) => {
      function Builder(props){
        const [tempDataTag, updateTempDataTag] = React.useState(props.dataTag)

        const updateHandler = newState => updateTempDataTag(Object.assign(Object.create(Object.getPrototypeOf(tempDataTag)), tempDataTag, newState))

        const toggleProperty = property_id => tempDataTag.dataTag_property_ids.includes(property_id) ?
          updateHandler({dataTag_property_ids: tempDataTag.dataTag_property_ids.filter(id => id !== property_id)})
          : updateHandler({dataTag_property_ids: [...tempDataTag.dataTag_property_ids, property_id]})

        const tagTypeOptions = () =>
          <select value={tempDataTag.dataTag_tagType}
              onChange={() => updateHandler({dataTag_tagType: event.target.value})} >
            <option value=""></option>
            <option value="agent">Agent</option>
            <option value="structural">Structural</option>
          </select>

        return  <div className="document">
                  <header>Modify DataTag</header>
                  <div className="container-fill">
                    <div className="container-row border-bottom">
                      <div className="container-item item-label">Set Label:</div>
                      <div className="container-fill">
                        <input value={tempDataTag.dataTag_label}
                            onChange={() => updateHandler({dataTag_label: event.target.value})} />
                      </div>
                    </div>

                    <div className="container-row border-bottom">
                      <div className="container-item item-label">Set DataTag Type:</div>
                      <div className="container-fill">
                        <div className="container-item">{tagTypeOptions()}</div>
                      </div>
                    </div>

                    <div className="container-row border-bottom">
                      <div className="container-item item-label">Set Properties:</div>
                      <div className="container">
                        {
                          Object.values(agencyState().property).map( property =>
                            <div className={`container-item ${tempDataTag.dataTag_property_ids.includes(property.id) ? "selected" : ""}`}
                                onClick={()=> toggleProperty(property.id)}>
                              {property.display.card(property)}
                            </div>)
                        }
                      </div>
                    </div>

                  </div>

                  { tempDataTag.storage.handlers.call(tempDataTag, close, alert) }

                </div>
      }

      return <Builder dataTag={dataTag} />
    }
  },
  typeFunctions: {
    getProperties: dataTag => dataTag.dataTag_property_ids.length < 1 ? []
      : dataTag.dataTag_property_ids.map( id => agencyState().property[id] )
  }
})



const displayProps = agencyState => ({
  displayKey: "dataTag_label",
  component: {
    list: {
      columns: [{selector: "display"}],
      tableData: Object.values(agencyState.dataTag).map(dataTag => ({
        data: dataTag,
        display: <div className="container-item">{dataTag.dataTag_label}</div>
      })),
      listActions: [
        {label: "New DataTag", action: (close, alert) => {
          let newDataTag = agencyObject("dataTag", {id: "new_object", dataTag_label: "new dataTag", dataTag_tagType: "agent"}, alert)
          return newDataTag.display.builder(newDataTag, close, alert)
        }}],
      drawerComponents: [
        {label: "document", component: item => item.data.display.document(item.data)},
      ],
      overlayComponents: [
        {label: "modify", component: (item, close, alert) => item.data.display.builder(item.data, close, alert)}
      ]
    }
  },
  procedure: {
    toggleTags: (dataTag, updateHandler) => {
      return <select value="" onChange={() => updateHandler(event.target.value)} >
        <option value=""></option>
        {
          Object.values(agencyState.dataTag).map( tag => <option value={tag.id} style={{background: `${dataTag.structuralNode_dataTag_ids.includes(tag.id) ? "yellow" : ""}`}}>{tag.dataTag_label}</option>)
        }
      </select>
    },
    showTags: tagSet => tagSet.map(tagId => {
      let tag = agencyState.dataTag[tagId]
      return tag.display.card(tag)}
    )
  }
})


export { prototype, displayProps }
