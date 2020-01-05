import React from 'react'
import TagWrapper from './TagWrapper'




export default class DataTagSetBuilder extends React.Component {

  toggleDataTags(id){
    if(this.props.disableEditing) return null
     
    let currentTags = this.props.activeTags ? Object.assign([], this.props.activeTags) : []

    let updatedSet = currentTags.includes(id) ?
      currentTags.filter( tagId => tagId !== id )
      : [...currentTags, id]

    this.props.updateTagSet(this.props.tagPropertyName, updatedSet)
  }

  render(){
    return  <div className="editor-container">
              <div className="editor-item-label">Tags</div>
              <div className="editor-item-input">
                {
                  this.props.availableTags.map(tag =>
                    <TagWrapper
                        className={`dataTag${ this.props.activeTags !== undefined && this.props.activeTags.includes(tag.id) ? "-selected" : ""}`}
                        onClick={() => this.toggleDataTags(tag.id)}>
                      {tag.dataTag_label}
                    </TagWrapper>)
                }
              </div>
            </div>
  }
}
