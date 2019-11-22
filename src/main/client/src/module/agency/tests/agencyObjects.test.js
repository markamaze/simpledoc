import * as agency from '../data/agencyObjects'


describe("agency objects testing", () => {

  describe("agent", () => {
    let agent_obj = Object.create(agency.agent().__proto__)

    test("check object", () => {
      // expect(agency.agent().isPrototypeOf(agent_obj)).toBe(true)
      expect(agent_obj.type()).toBe("agent")
      expect(Object.entries(agent_obj.defineProps).length).toBe(7)
    })
    test("initialization with valid data", () => {
      let state = {id: "123", label: "432", agentLink: "33333", templateId: "33333"}
      let agent = agent_obj.init(state)

      expect(agent.label).toBe("432")
    })
    test("initialization with missing data", () => {
      let state = {label: "432", agentLink: "33333", templateId: "33333"}
      let agent = agent_obj.init(state)

      expect(agent).toBe(false)
    })
    test("initialization with malformed data", () => {})
    test("update with valid data", () => {})
    test("update with missing data", () => {})
    test("update with malformed data", () => {})
    test("", () => {})

  })

})
