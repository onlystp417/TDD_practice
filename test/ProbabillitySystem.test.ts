import { ProbabilitySystem } from "../app/ProbabilitySystem"

describe('probability system', () => {
	// 將側向的實際情境定義清楚
	// 但目前看不出連線的邏輯，只有押哪一條的資訊可以被看到

	test('Row1 hit, bet L1 -> 20', () => {
		const sut = new ProbabilitySystem()
		expect(sut.spin('L1')).toBe(20)
	})

	test('Row1 hit, bet L2 -> 0', () => {
		const sut = new ProbabilitySystem()
		expect(sut.spin('L2')).toBe(0)
	})

	test('Row2 hit, bet L1 -> 0', () => {
		const sut = new ProbabilitySystem()
		expect(sut.spin('L2')).toBe(0)
	})

	test('Row2 hit, bet L2 -> 20', () => {
		const sut = new ProbabilitySystem()
		expect(sut.spin('L1')).toBe(20)
	})
})