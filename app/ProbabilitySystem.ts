export class ProbabilitySystem {
  private reels: Reels

  static create(reels: Reels): ProbabilitySystem {
    return new ProbabilitySystem(reels);
  }

  constructor(reels: Reels) {
    this.reels = reels
  }

  spin(betLine: string): number {
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
  private reels: Array<Array<string>>
  private index: number      // 原本的 index
  private nextIndex: number  // 轉動範圍

  constructor(reels: Array<Array<string>>, nextIndex: number) {
    this.reels = reels
    this.index = 0
    this.nextIndex = nextIndex
  }
  
  static create(nextIndex: number, rowReels: Array<Array<string>>): Reels {
    // 給予轉動後的 index
    return new Reels(rowReels, nextIndex);
  }

  spin() {
    this.index = this.nextIndex
  }

  isRowHit(row: number): boolean {
    const screen: Screen = this.getScreen()
    return screen.isScreenRowHit(row)
  }

  private getScreen() {
    // 定義出觀景窗範圍 Screen
    const rawScreen: Array<Array<string>> = []
    // spin
    for (let i: number = 0; i < this.reels.length; i++) {
      rawScreen.push(this.reels[i].slice(this.index, this.index + 3))
    }
    return new Screen(rawScreen)
  }
}

class Screen {
  private readonly rawScreen: Array<Array<string>>

  constructor(rawScreen: Array<Array<string>>) {
    this.rawScreen = rawScreen
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
