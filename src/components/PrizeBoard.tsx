import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { LOW_PRIZES, HIGH_PRIZES } from '../data/prizes';
import { formatCurrency } from '../types';

export default function PrizeBoard() {
  const cases = useGameStore((s) => s.cases);

  const getRevealedAmounts = () => {
    const revealed = new Set(cases.filter((c) => c.opened).map((c) => c.amount));
    return revealed;
  };

  const revealed = getRevealedAmounts();

  return (
    <div className="bg-studio-card/80 backdrop-blur rounded-xl border border-gray-800 p-4 w-64">
      <h3 className="text-center text-gold text-sm font-bold tracking-widest mb-3">
        奖金面板
      </h3>
      <div className="flex gap-2">
        {/* 左侧小金额 */}
        <div className="flex-1">
          {LOW_PRIZES.map((amount) => {
            const isRevealed = revealed.has(amount);
            return (
              <motion.div
                key={amount}
                animate={{
                  opacity: isRevealed ? 0.2 : 1,
                  scale: isRevealed ? 0.95 : 1,
                }}
                transition={{ duration: 0.4 }}
                className={`text-xs py-0.5 px-1 rounded font-mono flex items-center gap-1
                  ${isRevealed ? 'line-through text-gray-600' : 'text-blue-300'}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isRevealed ? 'bg-gray-700' : 'bg-blue-400'}`} />
                {formatCurrency(amount)}
              </motion.div>
            );
          })}
        </div>
        {/* 右侧大金额 */}
        <div className="flex-1">
          {HIGH_PRIZES.map((amount) => {
            const isRevealed = revealed.has(amount);
            const isBig = amount >= 100000;
            return (
              <motion.div
                key={amount}
                animate={{
                  opacity: isRevealed ? 0.2 : 1,
                  scale: isRevealed ? 0.95 : 1,
                }}
                transition={{ duration: 0.4 }}
                className={`text-xs py-0.5 px-1 rounded font-mono flex items-center gap-1
                  ${isRevealed
                    ? 'line-through text-gray-600'
                    : isBig
                      ? 'text-gold font-bold'
                      : 'text-amber-200'}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isRevealed ? 'bg-gray-700' : isBig ? 'bg-gold' : 'bg-amber-400'}`} />
                {formatCurrency(amount)}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
