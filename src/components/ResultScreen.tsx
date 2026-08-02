import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { formatCurrency } from '../types';

export default function ResultScreen() {
  const { finalAmount, cases, playerCaseId, bankerOffer, resetGame } = useGameStore();

  const playerCase = cases.find((c) => c.id === playerCaseId);
  const playerAmount = playerCase?.amount ?? 0;

  // 判断是 Deal 还是最终开箱
  const isDeal = finalAmount === bankerOffer && finalAmount !== null;
  const isBetterThanCase = finalAmount !== null && playerAmount !== null && finalAmount > playerAmount;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="spotlight-bg min-h-screen flex flex-col items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.8 }}
        className="text-center"
      >
        {/* 结果标题 */}
        {isDeal ? (
          <div className="mb-8">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl font-bold text-green-400 mb-2 tracking-widest"
            >
              DEAL!
            </motion.div>
            <div className="text-gray-400">你接受了银行家的报价</div>
          </div>
        ) : (
          <div className="mb-8">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl font-bold text-gold mb-2 tracking-widest"
            >
              最终揭晓
            </motion.div>
            <div className="text-gray-400">你坚持到了最后！</div>
          </div>
        )}

        {/* 获得金额 */}
        <div className="bg-studio-card/80 border-2 border-gold rounded-2xl p-8 mb-6
                        shadow-[0_0_40px_rgba(212,175,55,0.15)]">
          <div className="text-gray-500 text-sm mb-2">你获得</div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="text-6xl font-bold text-gold tracking-wide"
          >
            {finalAmount !== null ? formatCurrency(finalAmount) : ''}
          </motion.div>
        </div>

        {/* 对比信息 */}
        {!isDeal && playerCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-gray-400 text-lg mb-4"
          >
            你的箱子 #{playerCaseId} 里装着{' '}
            <span className="text-gold font-bold">{formatCurrency(playerAmount)}</span>
          </motion.div>
        )}

        {isDeal && playerCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className={`text-lg mb-4 ${isBetterThanCase ? 'text-green-400' : 'text-red-400'}`}
          >
            {isBetterThanCase
              ? `🏆 你的箱子只有 ${formatCurrency(playerAmount)}，你做对了！`
              : `😬 你的箱子有 ${formatCurrency(playerAmount)}，比报价高！`}
          </motion.div>
        )}

        {/* 再来一局 */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212, 175, 55, 0.4)' }}
          whileTap={{ scale: 0.95 }}
          onClick={resetGame}
          className="mt-8 px-10 py-4 bg-gradient-to-b from-gold-light via-gold to-gold-dark
                     text-gray-900 text-xl font-bold rounded-xl tracking-widest
                     shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all"
        >
          再来一局
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
