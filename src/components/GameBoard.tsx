import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import Briefcase from './Briefcase';
import PrizeBoard from './PrizeBoard';
import BankerOffer from './BankerOffer';
import { playCaseOpen, playBigAmount } from '../utils/sound';
import { ROUNDS } from '../types';

export default function GameBoard() {
  const {
    cases,
    playerCaseId,
    currentRound,
    casesToOpenThisRound,
    casesOpenedThisRound,
    gamePhase,
    lastRevealedAmount,
    pickPlayerCase,
    openCase,
  } = useGameStore();

  const isPickingCase = gamePhase === 'pick_case';
  const isPlaying = gamePhase === 'play';
  const isBankerOffer = gamePhase === 'banker_offer';

  const remainingToOpen = casesToOpenThisRound - casesOpenedThisRound;

  const unopenedCases = cases.filter((c) => !c.opened);

  const handleCaseClick = (caseId: number) => {
    if (isPickingCase) {
      pickPlayerCase(caseId);
    } else if (isPlaying) {
      const target = cases.find((c) => c.id === caseId);
      if (target && !target.opened && caseId !== playerCaseId) {
        openCase(caseId);
        playCaseOpen();
        if (target.amount >= 100000) {
          setTimeout(() => playBigAmount(), 300);
        }
      }
    }
  };

  // 计算银行家出价动画需要的最后揭示金额
  const lastCase = cases.find((c) => c.amount === lastRevealedAmount && c.opened);

  return (
    <div className="spotlight-bg min-h-screen flex flex-col">
      {/* 顶部信息栏 */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-800/50">
        <div className="text-gray-400 text-sm">
          Round {currentRound + 1} / {ROUNDS.length}
        </div>
        {isPlaying && (
          <motion.div
            key={remainingToOpen}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            className="text-gold font-bold text-lg"
          >
            还需开 {remainingToOpen} 个箱子
          </motion.div>
        )}
        {isPickingCase && (
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-gold font-bold text-lg"
          >
            选择你的幸运箱！
          </motion.div>
        )}
        <div className="w-24" />
      </div>

      {/* 主区域 */}
      <div className="flex-1 flex gap-4 p-4 overflow-auto">
        {/* 左侧奖金面板 */}
        <div className="hidden lg:block flex-shrink-0">
          <PrizeBoard />
        </div>

        {/* 中间箱子区域 */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-9 gap-2 md:gap-3 max-w-4xl">
            <AnimatePresence>
              {cases.map((c) => (
                <Briefcase
                  key={c.id}
                  caseData={c}
                  onClick={() => handleCaseClick(c.id)}
                  disabled={
                    (isPlaying && (c.opened || c.id === playerCaseId)) ||
                    isBankerOffer
                  }
                  isPlayerCase={c.isPlayerCase}
                  isSelectable={isPickingCase}
                  highlight={isPickingCase && !c.opened}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* 最新揭示金额 */}
          <AnimatePresence>
            {lastRevealedAmount !== null && isPlaying && lastCase && (
              <motion.div
                key={`reveal-${lastCase.id}`}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className={`mt-6 px-6 py-3 rounded-xl text-center font-bold text-xl
                  ${lastRevealedAmount >= 100000
                    ? 'bg-red-900/60 text-red-300 border border-red-700'
                    : lastRevealedAmount >= 10000
                      ? 'bg-yellow-900/40 text-yellow-300 border border-yellow-700'
                      : 'bg-gray-800/60 text-gray-300 border border-gray-700'
                  }`}
              >
                箱子 #{lastCase.id} 揭晓：
                <span className="ml-2">
                  {lastRevealedAmount < 1
                    ? `$${lastRevealedAmount.toFixed(2)}`
                    : `$${lastRevealedAmount.toLocaleString()}`}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 右侧玩家箱子 */}
        <div className="hidden lg:flex flex-col items-center gap-3 flex-shrink-0 w-32">
          <div className="text-gray-500 text-xs tracking-widest">你的箱子</div>
          {playerCaseId && (
            <Briefcase
              caseData={cases.find((c) => c.id === playerCaseId)!}
              isPlayerCase
            />
          )}
        </div>
      </div>

      {/* 银行家出价弹窗 */}
      {isBankerOffer && <BankerOffer />}
    </div>
  );
}
