const dummy = require('../utils/unit_tests').dummy

describe("dummy test", () => {
    test("Always returns 1", () => {
        expect(dummy([])).toBe(1)
    })
})