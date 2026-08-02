/**
 * 银行家出价算法
 * 基于剩余金额的期望值，随游戏进程逐步提高出价比例
 */
export function calculateBankerOffer(
  remainingAmounts: number[],
  casesOpened: number,
  totalCases: number
): number {
  if (remainingAmounts.length === 0) return 0;

  const expectedValue =
    remainingAmounts.reduce((sum, v) => sum + v, 0) / remainingAmounts.length;

  // 出价比例：从 0.55 逐步增长到 0.95
  const totalToOpen = totalCases - 1; // 除了玩家箱子外都要开
  const progress = casesOpened / totalToOpen;
  const multiplier = 0.55 + progress * 0.4;

  // 加入轻微随机波动 (±5%)
  const randomFactor = 0.95 + Math.random() * 0.1;
  const rawOffer = expectedValue * multiplier * randomFactor;

  // 小于100时向下取整到整数，100-1000取整到10，更大取整到100
  return roundOffer(rawOffer);
}

function roundOffer(offer: number): number {
  if (offer < 1) return Math.round(offer * 100) / 100;
  if (offer < 100) return Math.round(offer);
  if (offer < 10000) return Math.round(offer / 10) * 10;
  return Math.round(offer / 100) * 100;
}
