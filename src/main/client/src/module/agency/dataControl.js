import UserEditor from './UserEditor'
import TagEditor from './TagEditor'
import StructuralNodeEditor from './StructuralNodeEditor'
import React from 'react'


export const dataControl = {
  user: {
    builder: props => <UserEditor builder {...props} />,
    editor: props => <UserEditor editor {...props} />,
    card: props => <UserEditor card {...props} />
  },
  tag: {
    builder: props => <TagEditor builder {...props} />,
    editor: props => <TagEditor editor {...props} />,
    card: props => <TagEditor card {...props} />
  },
  node: {
    builder: props => <StructuralNodeEditor builder {...props} />,
    editor: props => <StructuralNodeEditor editor {...props} />,
    card: props => <StructuralNodeEditor card {...props} />
  },
  template: {
    builder: props => <AgentTemplateEditor builder {...props} />,
    editor: props => <AgentTemplateEditor editor {...props} />,
    card: props => <AgentTemplateEditor card {...props} />
  },
  agent: {
    builder: props => <AgentEditor builder {...props} />,
    editor: props => <AgentEditor editor {...props} />,
    card: props => <AgentEditor card {...props} />
  }
}
