import React from 'react'
import uuidv4 from 'uuid/v4'
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
    card: dataTag => {
      return  <div className="dataTag container-row">{dataTag.dataTag_label}</div>
    },
    document: dataTag => {
      let state = agencyState()
      return  <div className="dataTaga container-fill">
                <div className="container-row">{`dataTag label: ${dataTag.dataTag_label}`}</div>

                <div className="container-row">
                  <label>properties:</label>
                  {
                    dataTag.dataTag_property_ids
                      .map( id => state.property[id] )
                      .map( property => property.display.card(property))
                  }
                </div>
              </div>
    },
    builder: (dataTag, updateHandler) => {
      function Builder(props){
        const [tempDataTag, updateTempDataTag] = React.useState(props.dataTag)
        const updateHandler = newState => props.updateHandler ? props.updateHandler(newState)
          : updateTempDataTag(Object.assign(Object.create(Object.getPrototypeOf(tempDataTag)), tempDataTag, newState))

        const toggleProperty = property => {
          tempDataTag.dataTag_property_ids.includes(property.id) ?
            updateHandler({dataTag_property_ids: tempDataTag.dataTag_property_ids.filter(id => id === property.id)})
            : updateHandler({dataTag_property_ids: [...tempDataTag.dataTag_property_ids, property.id]})
        }

        return  <div className="dataTag container-fill">

                  <div className="container-row">
                    <label>Set Label</label>
                    <input value={tempDataTag.dataTag_label}
                          onChange={() => updateHandler({dataTag_label: event.target.value})} />
                  </div>

                  <div className="container">
                    <label>Set TagType</label>
                    <select value={tempDataTag.dataTag_tagType}
                            onChange={() => updateHandler({dataTag_tagType: event.target.value})} >
                      <option value=""></option>
                      <option value="agent">Agent</option>
                      <option value="structural">Structural</option>
                    </select>
                  </div>

                  <div className="container">
                    <label>Set Tag Properties</label>
                    {
                      Object.values(agencyState().property).map( property =>
                          <div onClick={() => toggleProperty(property)}
                                className={tempDataTag.dataTag_property_ids.includes(property.id) ? "selected-property" : "unselected-property"}>{property.display.document(property)}</div>)
                    }
                  </div>

                  { props.updateHandler ? null : tempDataTag.storage.handlers.call(tempDataTag) }


                </div>
      }

      return <Builder dataTag={dataTag} updateHandler={updateHandler} />
    }
  },
  typeFunctions: {}
})



const displayProps = agencyState => ({
  displayKey: "dataTag_label",
  component: {
    list: {
      columns: {
        limited: [{label: "Tag Name", selector: "dataTag_label"}],
        expanded: [
          {label: "Tag Name", selector: "dataTag_label"},
          {label: "Type", selector: "dataTag_tagType"}
        ]
      },
      tableData: Object.values(agencyState.dataTag),
      listActions: [{label: "New DataTag", action: () => {
        let newDataTag = agencyObject("dataTag", {id: "new_object", dataTag_label: "new dataTag", dataTag_tagType: "agent"}, err=>{console.log(err)})
        return newDataTag.display.builder(newDataTag)
      }}],
      drawerComponents: [
        {label: "document", component: item => item.display.document(item)}
      ],
      overlayComponents: [
        {label: "modify", component: item => item.display.builder(item)}
      ]
    }
  }
})


export { prototype, displayProps }
