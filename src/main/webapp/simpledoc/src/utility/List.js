import React from 'react'
import { Map } from 'immutable'
import { ListStyle } from '../styles/utilityStyles'



export default class List extends React.Component {

	listHeader() {
		return <div className="listheader" > {this.props.header} </div>
	}

	listItems() {
		return this.props.data.map ? this.props.data.map(item =>{
			let label_key = Object.keys(item).find(key => key.includes('label'))
			console.log(label_key, "label_key", item)

			return 	<div className="listitem" onClick={()=> this.props.itemclick(item)} >
								{	Map.isMap(item) ? item.get(label_key) : item[label_key] }
							</div>
		}) : <div>Empty List Set</div>
	}

	addItemButton() {
		return  <button onClick={() => this.props.itemclick(undefined)}>create new: {this.props.header}</button>
	}


	render() {
		return  <ListStyle className="list">
							{ this.listHeader() }
							{ this.listItems() }
							{ this.addItemButton() }
						</ListStyle>
	}

}
