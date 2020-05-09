import React from 'react'
import List from '../../../components/List'

//TODO: move and import
const utility = {
  validateId: id => true,
  validateString: (string, params) => true,

}

const prototype = (getStore, services, utilities) => ({
  type: () => "role",
  properties: {
    id: {
      setValue: function(id){
        if(id === null || id === undefined) throw "missing required property: Agency.Role.id"
        else if(!this.properties.id.validate(id)) throw "invalid property: Agency.Role.id"
        else this.id = id
        return true
      },
      validate: (id)=> utility.validateId(id)
    },
    label: {
      setValue: function(label){
        if(label === null || label === undefined) throw "missing required property: Agency.Role.label"
        else if(!this.properties.label.validate(label)) throw "invalid property: Agency.Role.label"
        else this.label = label
        return true
      },
      validate: (label)=> utility.validateString(label, {min_len: 1, max_len: 40, allow_spaces: true, allow_special_chars: true})
    },
    tag_ids: {
      setValue: function(ids){
        if(ids === null || ids === undefined) this.tag_ids = []
        else if(!this.properties.tag_ids.validate(ids)) throw "invalid required property: Agency.Role.tag_ids"
        else this.tag_ids = ids
        return true
      },
      validate: (ids)=>{
        let store = getStore()

        if(!Array.isArray(ids)) return false
        if(ids.length === 0) return true
        return ids.reduce( (result, id) => {
          if(!result) return false
          else if(!utility.validateId(id)) return false
          else if(!store.tag[id]) return false
          
          return true
        })
      }
    },
    role_type: {
      setValue: function(type){
        if(type === null || type === undefined) throw "missing required property: Agency.Role.role_type"
        else if(!this.properties.role_type.validate(type)) throw "invalid property: Agency.Role.role_type"
        else this.role_type = type
        return true
      },
      validate: type => {
        let roleTypes = ["supervisor", "roleplayer", "serviceConsumer", "serviceProvider", "monitor", ""]

        if(typeof type !== "string") return false
        else if(!roleTypes.includes(type)) return false
        
        return true
      }
    }
  },
  display: {
    card: role => {
      return  <div className="container-item">{ role.tools.getDisplayLabel(role) }</div>
    },
    document: role =>
      <List className="container"
          headerComponent={<header>document</header>}
          tableData={[ 
            role.agencyComponents.showTags(role.tools.getTags(role)), 
            role.components.showRoleType(role),
            role.agencyComponents.showPropertyKeys(role.tools.getProperties(role)) ]}
          iconComponent={ item => item } />,
    builder: (role, close, alert) => {
      function Builder(props){
        const [tempRole, updateTempRole] = React.useState(props.role)
        const updateHandler = newState => updateTempRole(tempRole.update(newState))

        return  <List className="container"
                    headerComponent={<header>{tempRole.display.card(tempRole)}</header>}
                    tableData={[
                      tempRole.agencyComponents.setLabel(tempRole, updateHandler),
                      tempRole.agencyComponents.setTags(tempRole, updateHandler),
                      tempRole.components.setRoleType(tempRole, updateHandler)
                    ]}
                    footerComponent={tempRole.storage.handlers.call(tempRole, close, alert)}
                    iconComponent={item => item} />
      }

      return <Builder role={role} />

    }
  },
  tools: {
    getDisplayLabel: role => role.label,
    getTags: role => getStore().getById(role.tag_ids, "tag"),
    getProperties: role => {
      let properties = []
      role.tools.getTags(role).forEach( tag => {
        tag.tools.getProperties(tag).forEach( property => {
          properties = [...properties, property]
        })
      })
      return properties
    }
  },
  components: {
    showRoleType: role => <div>{role.role_type}</div>,
    setRoleType: role => {
      return  <div>set role type component</div>
    }
  }
})

export { prototype }

