import { ProbabilitySystem } from "../app/ProbabilitySystem"

describe('probability system', () => {
	test('lose', () => {
		const sut = new ProbabilitySystem()
		expect(sut.spin()).toBe(0)
	})
})