import User from './User'
import DataTag from './DataTag'
import StructuralNode from './StructuralNode'
import React from 'react'


export const dataControl = {
  user: {
    builder: props => <User builder {...props} />,
    editor: props => <User editor {...props} />,
    card: props => <User card {...props} />
  },
  tag: {
    builder: props => <DataTag builder {...props} />,
    editor: props => <DataTag editor {...props} />,
    card: props => <DataTag card {...props} />
  },
  node: {
    builder: props => <StructuralNode builder {...props} />,
    editor: props => <StructuralNode editor {...props} />,
    card: props => <StructuralNode card {...props} />
  },
  template: {
    builder: props => <AgentTemplate builder {...props} />,
    editor: props => <AgentTemplate editor {...props} />,
    card: props => <AgentTemplate card {...props} />
  },
  agent: {
    builder: props => <Agent builder {...props} />,
    editor: props => <Agent editor {...props} />,
    card: props => <Agent card {...props} />
  }
}
