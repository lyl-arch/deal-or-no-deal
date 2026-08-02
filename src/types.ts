export interface Case {
  id: number;
  amount: number;
  opened: boolean;
  isPlayerCase: boolean;
}

export type GamePhase =
  | 'start'
  | 'pick_case'
  | 'play'
  | 'banker_offer'
  | 'game_over';

export const ROUNDS = [6, 5, 4, 3, 2, 1, 1, 1, 1];

export function formatCurrency(amount: number): string {
  if (amount < 1) {
    return `$${amount.toFixed(2)}`;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
