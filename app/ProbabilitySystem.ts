export class ProbabilitySystem {
  private reels: Reels

  constructor(reels: Reels) {
    this.reels = reels
  }

  spin(betLine: string): number {
    if (this.reels.isRow1Hit() && betLine === 'L1') {
      return 20
    }

    if (this.reels.isRow2Hit() && betLine === 'L2') {
      return 20
    }

    return 0
  }
}

export class Reels {
  private reels: Array<Array<String>>

  constructor(reels: Array<Array<String>>) {
    this.reels = reels
  }

  isRow1Hit(): boolean {
    // 判斷第一條是否連線
    const firstLineSet = new Set<String>()
    for (let i = 0; i < this.reels.length; i++) {
      const reel = this.reels[i]
      firstLineSet.add(reel[0])
    }
    return firstLineSet.size === 1
  }

  isRow2Hit(): boolean {
    // 判斷第二條是否連線
    const secondLineSet = new Set<String>()
    for (let i = 0; i < this.reels.length; i++) {
      const reel = this.reels[i]
      secondLineSet.add(reel[1])
    }
    return secondLineSet.size === 1
  }
}
