export class ProbabilitySystem {
  private reels: Reels

  static create(reels: Reels): ProbabilitySystem {
    return new ProbabilitySystem(reels);
  }

  constructor(reels: Reels) {
    this.reels = reels
  }

  spin(betLine: string): number {
    this.reels.spin()

    if (this.reels.isRowHit(0) && betLine === 'L1') {
      return 20
    }

    if (this.reels.isRowHit(1) && betLine === 'L2') {
      return 20
    }

    if (this.reels.isRowHit(2) && betLine === 'L3') {
      return 20
    }

    return 0
  }
}

export class Reels {
  private reels: Array<Reel>

  private constructor(randomNumberGenerator: RandomNumberGenerator, reels: Array<Array<string>>) {
    // 不需要再管理 indices 跟 randomNumberGenerator
    // 每個 Reel 都會自己處理了
    this.reels = reels.map((reel: Array<string>) => Reel.from(reel, randomNumberGenerator))
  }
  
  static create(randomNumberGenerator: RandomNumberGenerator, rowReels: Array<Array<string>>): Reels {
    return new Reels(randomNumberGenerator, rowReels);
  }

  spin(): void {
    for(let i: number = 0; i < this.reels.length; i++) {
      // 讓每個 reel 自己轉動
      this.reels[i].spin()
    }
  }

  isRowHit(row: number): boolean {
    const screen: Screen = this.getScreen()
    return screen.isScreenRowHit(row)
  }

  private getScreen(): Screen {
    const rawScreen: Array<Array<string>> = []
    for(let i: number = 0; i < this.reels.length; i++) {
      // 每個 reel 會自己回傳轉動後的 column
      rawScreen.push(this.reels[i].getScreenColumn())
    }
    return new Screen(rawScreen)
  }
}

class Reel {
  private symbols: Array<string>
  private randomNumberGenerator: RandomNumberGenerator
  private index: number

  constructor(symbols: Array<string>, randomNumberGenerator: RandomNumberGenerator) {
    this.symbols = symbols
    this.randomNumberGenerator = randomNumberGenerator
    this.index = 0
  }

  static from(symbols: Array<string>, randomNumberGenerator: RandomNumberGenerator) {
    return new Reel(symbols, randomNumberGenerator)
  }

  getScreenColumn(): string[] {
    return this.symbols.slice(this.index, this.index + 3)
  }

  spin() {
    this.index = this.randomNumberGenerator.nextInteger()
  }
}

class Screen {
  private readonly rawScreen: Array<Array<string>>

  constructor(rawScreen: Array<Array<string>>) {
    this.rawScreen = rawScreen
  }

  static from(rawScreen: Array<Array<string>>) {
    return new Screen(rawScreen)
  }

  isScreenRowHit(row: number) {
    // 看押注的 Line 有沒有中
    const lineSet = new Set<string>()
    for (let i = 0; i < this.rawScreen.length; i++) {
      const screenReel: string[] = this.rawScreen[i]
      lineSet.add(screenReel[row])
    }
    return lineSet.size === 1
  }
}

export class RandomNumberGenerator {
  private integers: number[]

  constructor(...numbers: number[]) {
    this.integers = numbers
  }

  nextInteger(): number {
    return <number>this.integers.shift()
  }
}