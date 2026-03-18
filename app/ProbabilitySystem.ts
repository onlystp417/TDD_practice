export class ProbabilitySystem {
  // 讓第一條預設就連線
  reels : Array<Array<String>> = [
    ['A', 'Q', 'K'],
    ['A', 'Q', 'K'],
    ['A', 'Q', 'K'],
    ['A', 'Q', 'K'],
    ['A', '10', 'J'],
  ]
  
  spin(betLine: string): number {
    // 判斷第一條是否連線（不轉，預設本來就連線）
    const firstLineSet = new Set<String>()
    for (let i = 0; i < this.reels.length; i++) {
      const reel = this.reels[i]
      firstLineSet.add(reel[0])
    }
    return firstLineSet.size === 1 && betLine === 'L1'
      ? 20
      : 0
  }
}
