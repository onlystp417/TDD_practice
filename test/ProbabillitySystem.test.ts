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

	test('Row3 hit, bet L3 -> 20', () => {
		const sut = ProbabilitySystem.create(Reels.create([
			['A', 'Q', 'K'],
			['A', 'Q', 'K'],
			['A', 'Q', 'K'],
			['A', 'Q', 'K'],
			['10', 'J', 'K'],
		]))
		expect(sut.spin('L3')).toBe(20)
	})

	// 把輸的測項統一寫在一起
	test('Bet line is not match hit row -> 0', () => {
		// arrange
		const row1Hit = [
			['A', 'Q', 'K'],
			['A', 'Q', 'K'],
			['A', 'Q', 'K'],
			['A', 'Q', 'K'],
			['A', '10', 'J'],
		]
		const betLineIsNotLine1 = 'L2'
		const sut = ProbabilitySystem.create(Reels.create(row1Hit))

		// action, basicly 1 line
		const result = sut.spin(betLineIsNotLine1)

		// assertion
		expect(result).toBe(0)
	})
})

