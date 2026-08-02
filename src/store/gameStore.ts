import { create } from 'zustand';
import { Case, GamePhase, ROUNDS } from '../types';
import { PRIZES } from '../data/prizes';
import { calculateBankerOffer } from '../utils/banker';

interface GameState {
  cases: Case[];
  playerCaseId: number | null;
  currentRound: number;
  casesToOpenThisRound: number;
  casesOpenedThisRound: number;
  gamePhase: GamePhase;
  bankerOffer: number | null;
  lastRevealedAmount: number | null;
  finalAmount: number | null; // 游戏结束时玩家获得的金额

  // Actions
  startGame: () => void;
  pickPlayerCase: (caseId: number) => void;
  openCase: (caseId: number) => void;
  acceptDeal: () => void;
  rejectDeal: () => void;
  resetGame: () => void;
}

function shuffleAndAssign(): Case[] {
  const shuffled = [...PRIZES].sort(() => Math.random() - 0.5);
  return shuffled.map((amount, i) => ({
    id: i + 1,
    amount,
    opened: false,
    isPlayerCase: false,
  }));
}

export const useGameStore = create<GameState>((set, get) => ({
  cases: shuffleAndAssign(),
  playerCaseId: null,
  currentRound: 0,
  casesToOpenThisRound: ROUNDS[0],
  casesOpenedThisRound: 0,
  gamePhase: 'start',
  bankerOffer: null,
  lastRevealedAmount: null,
  finalAmount: null,

  startGame: () => {
    set({
      cases: shuffleAndAssign(),
      playerCaseId: null,
      currentRound: 0,
      casesToOpenThisRound: ROUNDS[0],
      casesOpenedThisRound: 0,
      gamePhase: 'pick_case',
      bankerOffer: null,
      lastRevealedAmount: null,
      finalAmount: null,
    });
  },

  pickPlayerCase: (caseId: number) => {
    set((state) => ({
      playerCaseId: caseId,
      gamePhase: 'play',
      cases: state.cases.map((c) =>
        c.id === caseId ? { ...c, isPlayerCase: true } : c
      ),
    }));
  },

  openCase: (caseId: number) => {
    const state = get();
    if (state.gamePhase !== 'play') return;
    if (caseId === state.playerCaseId) return;

    const targetCase = state.cases.find((c) => c.id === caseId);
    if (!targetCase || targetCase.opened) return;

    const newCasesOpened = state.casesOpenedThisRound + 1;
    const amount = targetCase.amount;

    // 先更新箱子状态
    set({
      cases: state.cases.map((c) =>
        c.id === caseId ? { ...c, opened: true } : c
      ),
      casesOpenedThisRound: newCasesOpened,
      lastRevealedAmount: amount,
    });

    // 检查本轮是否结束
    if (newCasesOpened >= state.casesToOpenThisRound) {
      // 计算银行家出价
      const currentState = get();
      const remainingAmounts = currentState.cases
        .filter((c) => !c.opened)
        .map((c) => c.amount);
      const totalOpened = currentState.cases.filter((c) => c.opened).length;
      const offer = calculateBankerOffer(remainingAmounts, totalOpened, PRIZES.length);

      set({
        bankerOffer: offer,
        gamePhase: 'banker_offer',
      });
    }
  },

  acceptDeal: () => {
    const state = get();
    set({
      gamePhase: 'game_over',
      finalAmount: state.bankerOffer,
    });
  },

  rejectDeal: () => {
    const state = get();
    const nextRound = state.currentRound + 1;

    // 检查是否所有非玩家箱子都已打开
    const unopenedNonPlayer = state.cases.filter(
      (c) => !c.opened && !c.isPlayerCase
    );

    if (unopenedNonPlayer.length === 0) {
      // 最后只剩玩家的箱子，显示结果
      const playerCase = state.cases.find((c) => c.isPlayerCase);
      set({
        gamePhase: 'game_over',
        finalAmount: playerCase?.amount ?? 0,
      });
    } else {
      const casesToOpen = ROUNDS[nextRound] ?? 1;
      set({
        currentRound: nextRound,
        casesToOpenThisRound: Math.min(casesToOpen, unopenedNonPlayer.length),
        casesOpenedThisRound: 0,
        gamePhase: 'play',
        bankerOffer: null,
      });
    }
  },

  resetGame: () => {
    set({
      cases: shuffleAndAssign(),
      playerCaseId: null,
      currentRound: 0,
      casesToOpenThisRound: ROUNDS[0],
      casesOpenedThisRound: 0,
      gamePhase: 'start',
      bankerOffer: null,
      lastRevealedAmount: null,
      finalAmount: null,
    });
  },
}));
