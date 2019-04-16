import { fromJS } from 'immutable'

import objectIdGenerator from '../../utility/objectIdGenerator'


// export const oldTypeobject = () => fromJS({
//   id: objectIdGenerator(),
//   type: null,
//   label: "new typeobject",
//   relationshipdefinitions: {
//     withprograms: 0,
//     withusers: 0,
//     withpositions: 0,
//     withclients: 0,
//     withservices: 0
//   },
//   profiledata: [[]]
// })

//New
export const agentTypes = () => fromJS({
  agent_type_id: null,
  agent_type: null, /*ENUM(position, program, client, user)*/
  agent_type_label: null,
  agent_profile_definitions: [[]],
  access_level_program: null, /*ENUM(read, write, hidden)*/
  access_level_position: null, /*ENUM(read, write, hidden)*/
  access_level_client: null, /*ENUM(read, write, hidden)*/
  access_level_user: null, /*ENUM(read, write, hidden)*/
})

// export const agencyobject = () => fromJS({
//   id: objectIdGenerator(),
//   type: 'NEW',
//   label: 'new agency object',
//   objectproperties: [],
//   formsets: [],
//   profile: {},
//   connections: {}
// })

// export const agentobject = () => fromJS({
//   agent_id: null,
//   agent_type: null,               // choose from defined variations of: CLIENT, POSITION, SERVICE
//   agent_label: null,
//   agent_profile: {},
//   agent_owner_id: null,           // agent can be owned by a user, program,
//   agent_form_ids: [],
//   agent_properties: {},
//   agent_assigned_agents: {},      //
//   agent_associated_agents: {}     //
// })

export const positionobject = () => fromJS({

})

export const clientobject = () => fromJS({

})

export const programobject = () => fromJS({
  program_id: null,
  program_type: null,
  program_label: null,
  program_parent_id: null,
  program_profile: {},
  program_form_ids: [],
  program_assigned_agents: [],
  program_associated_agents: []
})

export const userobject = () => fromJS({
  user_id: null,
  username: null,
  authentication_token: null,
  user_assigned_agents: [],
  user_associated_agents: [] //set of agents connected to users assigned agents
})
