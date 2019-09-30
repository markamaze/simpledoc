import React from 'react'
import AgencyModule from './agency/AgencyModule'
import Workspace from './workspace/Workspace'

export const modules = [
  {path: "/", exact: true, render: <div>Welcome</div>},
  {path: "/Home", exact: false, render: <div>Home</div>},
  {path: "/Agency", exact: false, render: <AgencyModule />},
  {path: "/Workspace", exact: false, render: <Workspace />}
]


export const linkdata = [
  {title: "Home", to: "/Home"},
  {title: "Agency", to: "/Agency", links: [
    {title: "Agents", to: "/Agency/Agents"},
    {title: "Agent Builder", to: "/Agency/AgentBuilder"},
    {title: "Tag Manager", to: "/Agency/TagManager"},
    {title: "User Manager", to: "/Agency/UserManager"},
    {title: "Structure Manager", to: "/Agency/StructureManager"}
  ]},
  {title: "Workspace", to: "/Workspace"}
]
