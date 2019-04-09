import React from 'react'

import {EditorStyle} from '../../styles/formStyles'
import { section } from '../../store/formdata'




export default class FormEditor extends React.Component {

	propertyEditor() {
		const form = this.props.formobject

		return  <EditorStyle className="activeobjectinfo">
							<li className='propertyItem'>
								<span className='propertyTag'>Active Object:</span>
								<span className='propertyValue'>Form</span>
							</li>

							<li className='propertyItem'>
								<span className='propertyTag'>ID:</span>
								<span className='propertyValue'>{ form.get('id') }</span>
							</li>

							<li className='propertyItem'>
								<span className='propertyTag'>LABEL:</span>
								<input  type='text'
												className='propertyTextInput'
												id='edittitleinput'
												placeholder={this.props.formobject.get('label')}
												onChange={this.handleTitleChange.bind(this)} />
							</li>

							<li className='propertyItem'>
								<span className='propertyTag'>Sections:</span>
								<span className='propertyValue'><ul>{ form.get('sections').map(section=><li onClick={()=>this.props.setActive(section)}>{section.get('label')}</li>) }</ul></span>
							</li>

							<li className='propertyAction'>
								<button className="editorbutton" onClick={ () => this.addSection() } >Add Section</button>
							</li>

							<li className='propertyAction'>
								<button className='editorbutton' onClick={()=>this.deleteForm()} >Delete Form</button>
							</li>
						</EditorStyle>
	}

	handleTitleChange(event){
		let input = event.target.value
		let updatedObject = this.props.formobject
		updatedObject = updatedObject.setIn(['label'], input)

		this.props.makeChanges(updatedObject)
	}

	addSection() {
		let newSection = section().setIn(['parentid'], this.props.formobject.get('id'))

		let updatedObject = this.props.formobject
		let index = updatedObject.get('sections').size
		updatedObject = updatedObject.setIn(['sections', index], newSection)

		this.props.makeChanges(updatedObject)
	}

	deleteForm() {
		console.log("delete form button clicked >> not yet built")
	}

	render() {
		return  this.propertyEditor()
	}
}
