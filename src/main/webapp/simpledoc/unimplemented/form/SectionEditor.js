import React from 'react'

import {EditorStyle} from '../../styles/formStyles'
import { pairs, table, grid } from '../../store/formdata'




export default class SectionEditor extends React.Component {

	propertyEditor() {
		const section = this.props.sectionobject

		return  <EditorStyle className="activeobjectinfo">
							<li className='propertyItem'>
								<span className='propertyTag'>Active Object:</span>
								<span className='propertyValue'>Section</span>
							</li>

							<li className='propertyItem'>
								<span className='propertyTag'>ID:</span>
								<span className='propertyValue'>{ section.get('id') }</span>
							</li>

							<li className='propertyItem'>
								<span className='propertyTag'>LABEL:</span>
								<input  type='text'
												className='propertyTextInput'
												id='edittitleinput'
												placeholder={section.get('label')}
												onChange={this.handleTitleChange.bind(this)} />
							</li>

							<li className='propertyItem'>
								<span className='propertyTag'>Layouts:</span>
								<span className='propertyValue'><ul>{ section.get('layouts').map(layout=><li onClick={()=>this.props.setActive(layout)}>{layout.get('label')}</li>) }</ul></span>
							</li>

							<li className='propertyAction'>
								<button className='editorbutton' onClick={()=>this.handleNewLayout('pairs')}>Add: Key/Value Set</button>
							</li>

							<li className='propertyAction'>
								<button className='editorbutton' onClick={()=>this.handleNewLayout('table')}>Add: Table</button>
							</li>

							<li className='propertyAction'>
								<button className='editorbutton' onClick={()=>this.handleNewLayout('grid')}>Add: Grid</button>
							</li>

							<li className='propertyAction'>
								<button className='editorbutton' onClick={()=>this.deleteSection()}>Delete Section</button>
							</li>
						</EditorStyle>
	}

	handleTitleChange(event){
		let input = event.target.value
		let updatedObject = this.props.sectionobject
		updatedObject = updatedObject.setIn(['label'], input)

		this.props.makeChanges(updatedObject)
	}

	handleNewLayout(type){
		let newLayout

		switch(type){
			case 'pairs':
				newLayout = pairs()
				break
			case 'table':
				newLayout = tableLayout()
				break
			case 'grid':
				newLayout = gridLayout()
				break
		}

		newLayout = newLayout.setIn(['parentid'], this.props.sectionobject.get('id'))
		let updatedObject = this.props.sectionobject
		let index = updatedObject.get('layouts').size
		updatedObject = updatedObject.setIn(['layouts', index], newLayout)

		this.props.makeChanges(updatedObject)
	}


	deleteSection() {
		console.log("delete form button clicked >> not yet built")
	}


	render() {
		return this.propertyEditor()
	}
}
