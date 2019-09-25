const sampleData = {
  layout: {
    workspaceComponents: [],

    savedTempState: []
  },
  agency: {
    structuralNodes: [
      {
        label: "Adult Learning Systems of Oregon",
        id: "1000",
        parentId: "root",
        agentAssignments: [{id: '2016', limit: 1}, {id: '2015', limit: 1}, {id: '2014', limit: 1}, {id: '2013', limit: 1}, {id: '2012', limit: 1}],
        dataTags: [],
        type: "structuralNode"
      },
      {
        label: "Residential Services",
        id: "1001",
        parentId: "1000",
        agentAssignments: [{id: '2008', limit: 1},{id: '2011', limit: 1},{id:'2013', limit: 1}],
        dataTags: ["3001"],
        type: "structuralNode"
      },
      {
        label: "Group Home 1",
        id: "1002",
        parentId: "1001",
        agentAssignments: [{id: '2002', limit: 1}, {id: '2000', limit: 0}],
        dataTags: ["3002","3003"],
        type: "structuralNode"
      },
      {
        label: "Accounting",
        id: "1003",
        parentId: "1000",
        agentAssignments: [{id: '2004', limit: 1},{id: '2005', limit: 1},{id: '2006', limit: 1}],
        dataTags: [],
        type: "structuralNode"
      },
      {
        label: "Human Resources",
        id: "1004",
        parentId: "1000",
        agentAssignments: [{id: '2007', limit: 1},{id: '2013', limit: 1}],
        dataTags: [],
        type: "structuralNode"
      },
      {
        label: "Vocational Services",
        id: "1005",
        parentId: "1000",
        agentAssignments: [{id: '2009', limit: 1}],
        dataTags: [],
        type: "structuralNode"
      },
      {
        label: "Supported Living Services",
        id: "1006",
        parentId: "1000",
        agentAssignments: [{id: '2010', limit: 1}],
        dataTags: [],
        type: "structuralNode"
      },
      {
        label: "VOC program 1",
        id: "1007",
        parentId: "1005",
        agentAssignments: [{id: '2000', limit: 0}],
        dataTags: [],
        type: "structuralNode"
      },
      {
        label: "VOC program 2",
        id: "1008",
        parentId: "1005",
        agentAssignments: [{id: '2000', limit: 0}],
        dataTags: [],
        type: "structuralNode"
      },
      {
        label: "SLP 1",
        id: "1009",
        parentId: "1006",
        agentAssignments: [{id: '2000', limit: 0},{id: '2003', limit: 1}],
        dataTags: [],
        type: "structuralNode"
      },
      {
        label: "SLP 2",
        id: "1010",
        parentId: "1006",
        agentAssignments: [{id: '2000', limit: 0}, {id: '2003', limit: 1}],
        dataTags: [],
        type: "structuralNode"
      },
      {
        label: "SLP 3",
        id: "1011",
        parentId: "1006",
        agentAssignments: [{id: '2000', limit: 0}, {id: '2003', limit: 1}],
        dataTags: [],
        type: "structuralNode"
      },
      {
        label: "Group Home 2",
        id: "1012",
        parentId: "1001",
        agentAssignments: [{id: '2000', limit: 0}, {id: '2002', limit: 1}],
        dataTags: [],
        type: "structuralNode"
      },
      {
        label: "Group Home 3",
        id: "1013",
        parentId: "1001",
        agentAssignments: [{id: '2000', limit: 0}, {id: '2002', limit: 1}],
        dataTags: [],
        type: "structuralNode"
      }
    ],

    agentTemplates: [
      {
        label: "Direct Support Professional",
        id: "2000",
        securityCode: "",
        dataTags: [],
        type: "agentTemplate"
      },
      {
        label: "Job Coach",
        id: "2001",
        securityCode: "",
        dataTags: [],
        type: "agentTemplate"
      },
      {
        label: "Residential Manager",
        id: "2002",
        securityCode: "",
        dataTags: [],
        type: "agentTemplate"
      },
      {
        label: "Supported Living Manager",
        id: "2003",
        securityCode: "",
        dataTags: [],
        type: "agentTemplate"
      },
      {
        label: "Accounts Payable",
        id: "2004",
        securityCode: "",
        dataTags: [],
        type: "agentTemplate"
      },
      {
        label: "Payroll Coordinator",
        id: "2005",
        securityCode: "",
        dataTags: [],
        type: "agentTemplate"
      },
      {
        label: "Accounts Recievable",
        id: "2006",
        securityCode: "",
        dataTags: [],
        type: "agentTemplate"
      },
      {
        label: "Human Resources Director",
        id: "2007",
        securityCode: "",
        dataTags: [],
        type: "agentTemplate"
      },
      {
        label: "Residential Director",
        id: "2008",
        securityCode: "",
        dataTags: [],
        type: "agentTemplate"
      },
      {
        label: "Vocational Director",
        id: "2009",
        securityCode: "",
        dataTags: [],
        type: "agentTemplate"
      },
      {
        label: "Supported Living Director",
        id: "2010",
        securityCode: "",
        dataTags: [],
        type: "agentTemplate"
      },
      {
        label: "Associate Residential Director",
        id: "2011",
        securityCode: "",
        dataTags: [],
        type: "agentTemplate"
      },
      {
        label: "Quality Assurance Coordiantor",
        id: "2012",
        securityCode: "",
        dataTags: [],
        type: "agentTemplate"
      },
      {
        label: "Administrative Assistant",
        id: "2013",
        securityCode: "",
        dataTags: [],
        type: "agentTemplate"
      },
      {
        label: "Executive Assistant",
        id: "2014",
        securityCode: "",
        dataTags: [],
        type: "agentTemplate"
      },
      {
        label: "Chief Executive Officer",
        id: "2015",
        securityCode: "",
        dataTags: [],
        type: "agentTemplate"
      },
      {
        label: "Chief Operations Officer",
        id: "2016",
        securityCode: "",
        dataTags: [],
        type: "agentTemplate"
      }
    ],

    agents: [
      {
        id: 4000,
        label: "sample agent",
        securityCode: 3333,
        dataTags: [],
        type: "agent",
        agentLink: "1013",
        templateId: "2002"
      },
      {
        id: 4001,
        label: "sample agent",
        securityCode: 3333,
        dataTags: [],
        type: "agent",
        agentLink: "1001",
        templateId: "2008"
      }
    ],

    dataTags: [
      {
        label: "Company",
        id: "3000",
        type: "dataTag",
        tagFor: "structural"
      },
      {
        label: "Department",
        id: "3001",
        type: "dataTag",
        tagFor: "structural"
      },
      {
        label: "Service Provider",
        id: "3002",
        type: "dataTag",
        tagFor: "structural"
      },
      {
        label: "Group Home",
        id: "3003",
        type: "dataTag",
        tagFor: "structural"
      },
      {
        label: "Supported Living Program",
        id: "3004",
        type: "dataTag",
        tagFor: "structural"
      },
      {
        label: "Vocational Program",
        id: "3005",
        type: "dataTag",
        tagFor: "structural"
      },
      {
        label: "Employee",
        id: "3006",
        type: "dataTag",
        tagFor: "agent"
      },
      {
        label: "Management",
        id: "3007",
        type: "dataTag",
        tagFor: "agent"
      },
      {
        label: "Administration",
        id: "3008",
        type: "dataTag",
        tagFor: "agent"
      }

    ],

    users: [
      {
        id: 5000,
        username: "sample_user",
        type: "user"
      }
    ]
  }
}

export default sampleData
