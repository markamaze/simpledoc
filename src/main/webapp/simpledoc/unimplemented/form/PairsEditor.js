//    add pair element
//    delete pairs layout
//    modify label

import React from 'react'

import {EditorStyle} from '../../styles/formStyles'
import { element } from '../../store/formdata'



export default class PairsEditor extends React.Component {

	propertyEditor() {
		const layout = this.props.pairsobject

		return <EditorStyle className="activeobjectinfo">
							<li className='propertyItem'>
								<span className='propertyTag'>Active Object:</span>
								<span className='propertyValue'>Pairs Layout</span>
							</li>

							<li className='propertyItem'>
								<span className='propertyTag'>ID:</span>
								<span className='propertyValue'>{ layout.get('id') }</span>
							</li>

							<li className='propertyItem'>
								<span className='propertyTag'>LABEL:</span>
								<input type='text' className='propertyTextInput'
															id='edittitleinput'
															placeholder={layout.get('label')}
															onChange={this.handleTitleChange.bind(this)} />
							</li>

							<li className='propertyItem'>
								<span className='propertyTag'>Elements:</span>
								<span className='propertyValue'><ul>{ layout.get('elements').map(element=><li onClick={()=>this.props.setActive(element)}>{element.get('key')}</li>) }</ul></span>
							</li>

							<li className='propertyAction'>
								<button className='editorbutton' onClick={()=>this.addElement()}>Add Element</button>
							</li>

							<li className='propertyAction'>
								<button className='editorbutton' onClick={()=>this.deleteLayout()}>Delete Layout</button>
							</li>

						</EditorStyle>
	}

	handleTitleChange(event){
		let input = event.target.value
		let updatedObject = this.props.pairsobject
		updatedObject = updatedObject.setIn(['label'], input)

		this.props.makeChanges(updatedObject)
	}

	addElement() {
		let newElement = element()
		let updatedObject = this.props.pairsobject
		let index = updatedObject.get('elements').size
		newElement = newElement.setIn(['parentid'], this.props.pairsobject.get('id'))
		updatedObject = updatedObject.setIn(['elements', index], newElement)

		this.props.makeChanges(updatedObject)

	}

	deleteLayout() {
		console.log('function not yet developed')
	}


	render() {
		return  this.propertyEditor()
	}
}
