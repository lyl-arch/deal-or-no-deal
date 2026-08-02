export const PRIZES: number[] = [
  0.01, 1, 5, 10, 25, 50, 75, 100, 200, 300, 400, 500, 750,
  1000, 5000, 10000, 25000, 50000, 75000, 100000,
  200000, 300000, 400000, 500000, 750000, 1000000,
];

/** 左侧小金额 */
export const LOW_PRIZES: number[] = PRIZES.slice(0, 13);

/** 右侧大金额 */
export const HIGH_PRIZES: number[] = PRIZES.slice(13);
