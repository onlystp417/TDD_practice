import { ProbabilitySystem, Reels } from "../app/ProbabilitySystem"

describe('probability system', () => {
	// 將 Reels 改為依賴注入，解耦
	// 每個 case 都有自己的 Reels 初始值

	test('Row1 hit, bet L1 -> 20', () => {
		const sut = ProbabilitySystem.create(Reels.create([
			['A', 'Q', 'K'],
			['A', 'Q', 'K'],
			['A', 'Q', 'K'],
			['A', 'Q', 'K'],
			['A', '10', 'J'],
		]))
		expect(sut.spin('L1')).toBe(20)
	})

	test('Row1 hit, bet L2 -> 0', () => {
		const sut = ProbabilitySystem.create(Reels.create([
			['A', 'Q', 'K'],
			['A', 'Q', 'K'],
			['A', 'Q', 'K'],
			['A', 'Q', 'K'],
			['A', '10', 'J'],
		]))
		expect(sut.spin('L2')).toBe(0)
	})

	test('Row2 hit, bet L1 -> 0', () => {
		const sut = ProbabilitySystem.create(Reels.create([
			['A', 'Q', 'K'],
			['A', 'Q', 'K'],
			['A', 'Q', 'K'],
			['A', 'Q', 'K'],
			['10', 'Q', 'J'],
		]))
		expect(sut.spin('L1')).toBe(0)
	})

	test('Row2 hit, bet L2 -> 20', () => {
		const sut = ProbabilitySystem.create(Reels.create([
			['A', 'Q', 'K'],
			['A', 'Q', 'K'],
			['A', 'Q', 'K'],
			['A', 'Q', 'K'],
			['10', 'Q', 'J'],
		]))
		expect(sut.spin('L2')).toBe(20)
	})
})