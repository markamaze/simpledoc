const sampleData = {
  layout: {
    drawerComponents: [],
    activeDrawerComponentKey: null
  },
  agency: {
    agency_categories: [
      {
        id: '-7906a9c-5fda-4b73-a83d-59ab2978b7a8',
        label: 'Agency',
        behavior: 'STRUCTURAL'
      },
      {
        id: '-73e328d-70c3-42ae-b503-9de726530c1b',
        label: 'Service Provider',
        behavior: 'STRUCTURAL'
      },
      {
        id: '-9cf2870-0ecc-4696-b893-b2081c7dc79d',
        label: 'Department',
        behavior: 'STRUCTURAL'
      },
      {
        id: '-ea48197-2d15-4cdc-9385-48c3ee57acff',
        label: 'Executive',
        behavior: 'ACTOR'
      },
      {
        id: '-28fbde7-efb5-4905-aad5-25554c62eeaa',
        label: 'Administrator',
        behavior: 'ACTOR'
      },
      {
        id: '-44e2d55-6cba-4186-b4bd-f2ef3ca2bf9a',
        label: 'Manager',
        behavior: 'ACTOR'
      },
      {
        id: '-9b23863-0c50-46dd-9116-71846a3c369f',
        label: 'Staff',
        behavior: 'ACTOR',
        security: '4444',
        data_struct: '{program_name=string-30}'
      }
    ],
    agency_definitions: [
      {
        id: '-5d44256-e4a5-4b12-812c-f066bf504b67',
        label: 'Agency',
        category_id: '-7906a9c-5fda-4b73-a83d-59ab2978b7a8'
      },
      {
        id: '-0a42ff2-48f9-4e15-954a-b14b99e43566',
        label: 'Group Home',
        category_id: '-73e328d-70c3-42ae-b503-9de726530c1b'
      },
      {
        id: '-e59e565-6300-4644-a66c-cbdf80eabca8',
        label: 'Voc Program',
        category_id: '-73e328d-70c3-42ae-b503-9de726530c1b'
      },
      {
        id: '-4ccfad8-9888-4005-b212-6a801fb6fd4e',
        label: 'SLP Program',
        category_id: '-73e328d-70c3-42ae-b503-9de726530c1b'
      },
      {
        id: '-9d4cab0-b1ba-490c-bf04-fd09869d4ac8',
        label: 'Residential Services',
        category_id: '-9cf2870-0ecc-4696-b893-b2081c7dc79d'
      },
      {
        id: '-ffe0964-e613-4e24-a325-38c0b23e469c',
        label: 'Vocational Services',
        category_id: '-9cf2870-0ecc-4696-b893-b2081c7dc79d'
      },
      {
        id: '-0d03e7d-dc9b-4f16-af6b-eb56b7732485',
        label: 'Supported Living Services',
        category_id: '-9cf2870-0ecc-4696-b893-b2081c7dc79d'
      },
      {
        id: '-4b4252e-2c3a-4703-b464-be9259ef62e3',
        label: 'Human Resources',
        category_id: '-9cf2870-0ecc-4696-b893-b2081c7dc79d'
      },
      {
        id: '-6d49ffa-171f-4108-893d-1e59a9b3cc8a',
        label: 'CEO',
        category_id: '-ea48197-2d15-4cdc-9385-48c3ee57acff'
      },
      {
        id: '-a283ebf-03c7-4937-b96f-230c9b2f035b',
        label: 'COO',
        category_id: '-ea48197-2d15-4cdc-9385-48c3ee57acff'
      },
      {
        id: '-b07c5c1-4bf6-4ed2-bdda-c30f45ae9871',
        label: 'HR Director',
        category_id: '-28fbde7-efb5-4905-aad5-25554c62eeaa'
      },
      {
        id: '-62a7731-d1c0-4497-9f01-830f7a5169c4',
        label: 'Residential Director',
        category_id: '-28fbde7-efb5-4905-aad5-25554c62eeaa'
      },
      {
        id: '-ebb8e49-210e-46bb-b014-6af9ef46c61',
        label: 'Vocational Director',
        category_id: '-28fbde7-efb5-4905-aad5-25554c62eeaa'
      },
      {
        id: '-9fdb67b-c703-4a06-87b6-bb9b5b30a61e',
        label: 'Supported Living Director',
        category_id: '-28fbde7-efb5-4905-aad5-25554c62eeaa'
      },
      {
        id: '-33a9925-e7a4-4ca7-bef4-e997033eba94',
        label: 'Residential Manager',
        category_id: '-44e2d55-6cba-4186-b4bd-f2ef3ca2bf9a'
      },
      {
        id: '-3887e43-9521-45b8-8596-5e1734405408',
        label: 'Vocational Manager',
        category_id: '-44e2d55-6cba-4186-b4bd-f2ef3ca2bf9a'
      },
      {
        id: '-c1e432f-3d0a-4d18-a36d-4900393cb06d',
        label: 'Supported Living Manager',
        category_id: '-44e2d55-6cba-4186-b4bd-f2ef3ca2bf9a'
      },
      {
        id: '-f7e5345-780e-4644-b074-2d2b8c027561',
        label: 'Lead Direct Support Professional',
        category_id: '-9b23863-0c50-46dd-9116-71846a3c369f'
      },
      {
        id: '-605e35c-c5a6-4505-90c0-33642067fc1b',
        label: 'Direct Support Professional',
        category_id: '-9b23863-0c50-46dd-9116-71846a3c369f'
      }



    ],
    agency_agents: [
      {
        id: '-20f65ce-763f-40b8-88be-7b1770751b35',
        definition_id: '-5d44256-e4a5-4b12-812c-f066bf504b67',
        agent_link_id: 'root',
        label: 'Adult Learning Systems of Oregon'
      },
      {
        id: '-ee65247-9bda-40d2-b8af-b7f03c94f53c',
        definition_id: '-4b4252e-2c3a-4703-b464-be9259ef62e3',
        agent_link_id: '-20f65ce-763f-40b8-88be-7b1770751b35',
        label: 'Human Resources'
      },
      {
        id: '-8b9347e-5c32-4eb1-913f-f6d620798c38',
        definition_id: '-9d4cab0-b1ba-490c-bf04-fd09869d4ac8',
        agent_link_id: '-20f65ce-763f-40b8-88be-7b1770751b35',
        label: 'Residential Services'
      },
      {
        id: '-93bce5e-8e1a-48d4-9ae7-c060452259e2',
        definition_id: '-ffe0964-e613-4e24-a325-38c0b23e469c',
        agent_link_id: '-20f65ce-763f-40b8-88be-7b1770751b35',
        label: 'Vocational Services'
      },
      {
        id: '-867c64d-8188-496c-bbba-a9a0035da856',
        definition_id: '-0d03e7d-dc9b-4f16-af6b-eb56b7732485',
        agent_link_id: '-20f65ce-763f-40b8-88be-7b1770751b35',
        label: 'Supported Living Services'
      },
      {
        id: '-0bb2d04-6592-4f66-a474-179c4f8586a0',
        definition_id: '-0a42ff2-48f9-4e15-954a-b14b99e43566',
        agent_link_id: '-8b9347e-5c32-4eb1-913f-f6d620798c38',
        label: 'Group Home - 1'
      },
      {
        id: '-1363a84-2e99-43ce-9391-ba2cebabbbb5',
        definition_id: '-0a42ff2-48f9-4e15-954a-b14b99e43566',
        agent_link_id: '-8b9347e-5c32-4eb1-913f-f6d620798c38',
        label: 'Group Home - 2'
      },
      {
        id: '-570484c-1a02-4313-8aa3-85c868b75b2b',
        definition_id: '-e59e565-6300-4644-a66c-cbdf80eabca8',
        agent_link_id: '-93bce5e-8e1a-48d4-9ae7-c060452259e2',
        label: 'Vocational Program - 1'
      },
      {
        id: '-b02a406-f6b2-453a-ad6b-d765cf870973',
        definition_id: '-e59e565-6300-4644-a66c-cbdf80eabca8',
        agent_link_id: '-93bce5e-8e1a-48d4-9ae7-c060452259e2',
        label: 'Vocational Program - 2'
      },
      {
        id: '-f417092-b0c6-49c1-a5c4-be2e1b208554',
        definition_id: '-4ccfad8-9888-4005-b212-6a801fb6fd4e',
        agent_link_id: '-867c64d-8188-496c-bbba-a9a0035da856',
        label: 'Supported Living Program - 1'
      },
      {
        id: '-dc42833-fd09-4d7b-b50b-849f460a6b56',
        definition_id: '-4ccfad8-9888-4005-b212-6a801fb6fd4e',
        agent_link_id: '-867c64d-8188-496c-bbba-a9a0035da856',
        label: 'Supported Living Program - 2'
      }
    ]
  }
}

export default sampleData
