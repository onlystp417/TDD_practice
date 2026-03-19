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

    return 0
  }
}

export class Reels {
  private reels: Array<Array<String>>

  static create(data: Array<Array<string>>): Reels {
    // 這裡可以加入驗證邏輯，例如檢查陣列長度是否正確
    return new Reels(data);
  }

  constructor(reels: Array<Array<String>>) {
    this.reels = reels
  }

  isRowHit(row: number): boolean {
    const lineSet = new Set<String>()
    for (let i = 0; i < this.reels.length; i++) {
      const reel = this.reels[i]
      lineSet.add(reel[row])
    }
    return lineSet.size === 1
  }
}
