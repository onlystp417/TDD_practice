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
  private indices: number[] // 起始 index
  private randomNumberGenerator: RandomNumberGenerator  // 每個 reel 要轉動的範圍

  private constructor(randomNumberGenerator: RandomNumberGenerator, reels: Array<Array<string>>) {
    this.reels = reels.map((reel: Array<string>) => Reel.from(reel))
    this.randomNumberGenerator = randomNumberGenerator
    this.indices = [0, 0, 0, 0, 0]
  }
  
  static create(randomNumberGenerator: RandomNumberGenerator, rowReels: Array<Array<string>>): Reels {
    return new Reels(randomNumberGenerator, rowReels);
  }

  spin(): void {
    for(let i: number = 0; i < this.reels.length; i++) {
      this.indices[i] = this.randomNumberGenerator.nextInteger()
    }
  }

  isRowHit(row: number): boolean {
    const screen: Screen = this.getScreen()
    return screen.isScreenRowHit(row)
  }

  private getScreen(): Screen {
    const rawScreen: Array<Array<string>> = []
    for(let i: number = 0; i < this.reels.length; i++) {
      rawScreen.push(this.reels[i].getScreenColumn(this.indices[i]))
    }
    return new Screen(rawScreen)
  }
}

class Reel {
  private symbols: Array<string>

  constructor(symbols: Array<string>) {
    this.symbols = symbols
  }

  static from(symbols: Array<string>) {
    return new Reel(symbols)
  }

  getScreenColumn(index: number): string[] {
    return this.symbols.slice(index, index + 3)
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