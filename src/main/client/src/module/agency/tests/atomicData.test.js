// check that data creators are:
//  setup and building needed objects
//  are validating data
import * as atomic from '../data/atomicData'


describe("atomic data tests", () => {

  describe("id", () => {
    // let string_id = Object.create(atomic.id)
    // string_id.init("1234")

    test('set value', () => {
      // expect(string_id.get()).toBe("1234")
    })

    test("confirm object structure", () => {
      // let keys = Object.keys(string_id)

      // expect(keys.length).toBe(0)
      // expect(keys[0]).toBe("id")
    })

  })

  describe("label", () => {

    test("label", () => {
      // let test_label = Object.create(atomic.label)
      // test_label.init("my label")

      // expect(test_label.get()).toBe("my label")
      // test_label.update("new label")

      // expect(test_label.get()).toBe("new label")
    })
  })


})
