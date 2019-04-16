import React from 'react'
import List from './List'

export default function listFactory(lists) {

	return lists.map(list =>
		<List {...list} >
			{ list.buttons ? list.buttons : null }
		</List>
	)
}
