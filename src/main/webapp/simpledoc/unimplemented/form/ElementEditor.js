import React from 'react'

import {EditorStyle} from '../../styles/formStyles'



export default class ElementEditor extends React.Component {

	propertyEditor() {
		const element = this.props.elementobject

		return <EditorStyle className="activeobjectinfo">
							<li className='propertyItem'>
								<span className='propertyTag'>Active Object:</span>
								<span className='propertyValue'>Element</span>
							</li>

							<li className='propertyItem'>
								<span className='propertyTag'>ID:</span>
								<span className='propertyValue'>{ element.get('id') }</span>
							</li>

							<li className='propertyItem'>
								<span className='propertyTag'>Key:</span>
								<input type='text' className='propertyTextInput'
															id='edittitleinput'
															placeholder={element.get('key')}
															onChange={this.handleKeyChange.bind(this)} />
							</li>

							<li className='propertyItem'>
								<span className='propertyTag'>Value Type:</span>
								<span className='propertyValue'>{element.get('valueType')}</span>
							</li>

						</EditorStyle>
	}

	handleKeyChange(event){
		let input = event.target.value
		let updatedObject = this.props.elementobject
		updatedObject = updatedObject.setIn(['key'], input)

		this.props.makeChanges(updatedObject)
	}

	render() {
		return  this.propertyEditor()
	}
}
