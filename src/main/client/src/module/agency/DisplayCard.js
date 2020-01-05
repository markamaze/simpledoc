import React from 'react'
import styled from 'styled-components'

import TagWrapper from './moduleComponents/TagWrapper'

const StyleWrapper = styled.div`
  background: orange;
  margin: 1rem auto;
  padding: .5rem;
  max-width: 300px;

  .data-item {
    font-size: smaller;
    padding: .2rem;
  }
  .property {
    display: flex;
    border-top: thin solid black;

    .property-key {
      min-width: 50%;
    }

    .property-value {
      min-width: 50%;
      padding: 0 .3rem 0 auto;
    }
  }

  .tag {
    background: lightblue;
    border-radius: .2rem;
  }
`



export default class DisplayCard extends React.Component{

  getLabel(id){
    let item = this.props.structuralNodes.find( node => node.id === id)

    return item ? item.structuralNode_label : ""
  }

  getProperties(item){
    let propertyCollector = []

    this.props.dataTags
      .filter( tag => item.structuralNode_dataTag_ids.includes(tag.id) )
      .forEach( tag => { tag.dataTag_properties.forEach(prop => propertyCollector.push(prop)) })

    item.structuralNode_properties
      .forEach( prop => { propertyCollector.push(prop) })

    return propertyCollector
  }

  getPropertyElement(property){
    return  <div className="property">
              <span className="property-key">{property.key}</span>
              <span className="property-value">{property.value ? property.value : "value not set"}</span>
            </div>
  }

  render() {
    return  <StyleWrapper>
              <div className="data-item">
                <div>{this.props.data.structuralNode_label}</div>
                <div style={{fontSize: "x-small"}}>{`-${this.getLabel(this.props.data.structuralNode_parent_id)}`}</div>
              </div>

              <div className="data-item">
                {
                  this.props.data.structuralNode_dataTag_ids
                    .map( tagId => <TagWrapper className="tag">
                                      { this.props.dataTags.find( tag => tag.id === tagId).dataTag_label }
                                    </TagWrapper>)
                }
              </div>

              <div className="data-item">
                Assigned Agents
              </div>

              <div className="data-item">
                <div>Properties:</div>
                <div>{this.getProperties(this.props.data).map( prop => this.getPropertyElement(prop) )}</div>
              </div>
            </StyleWrapper>
  }
}
