// check that data creators are:
//  setup and building needed objects
//  are validating data
import * as objectCreator from '../agencyObjects'


const agent = objectCreator.agent({id: "123"})


describe("testing describe", () => {
  test('testing test', () => {
    expect(agent.id).toBe("123")
    agent.id = "321"
    expect(agent.id).toBe("123")
  })

})
