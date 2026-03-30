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
  private reels: Array<Array<String>>
  private index: number      // 原本的 index
  private nextIndex: number  // 轉動範圍

  constructor(reels: Array<Array<String>>, nextIndex: number) {
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
    // 算出賭注的 Line index
    const localRow: number = row + this.nextIndex
    const lineSet = new Set<String>()
    for (let i = 0; i < this.reels.length; i++) {
      const reel = this.reels[i]
      lineSet.add(reel[localRow])
    }
    return lineSet.size === 1
  }
}
