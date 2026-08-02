import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { playPhoneRing } from '../utils/sound';

export default function StartScreen() {
  const startGame = useGameStore((s) => s.startGame);

  return (
    <div className="spotlight-bg min-h-screen flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', duration: 1.2, bounce: 0.5 }}
        className="text-center mb-12"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="text-8xl mb-4"
        >
          💼
        </motion.div>
        <h1 className="text-6xl md:text-7xl font-bold font-['Playfair_Display'] tracking-wider">
          <span className="text-gold-gradient">DEAL</span>
        </h1>
        <h2 className="text-4xl md:text-5xl font-light text-gray-300 mt-1 tracking-[0.3em]">
          OR NO DEAL
        </h2>
      </motion.div>

      {/* 描述 */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-gray-400 text-center max-w-md mb-10 text-lg"
      >
        26个箱子，最高100万美元。<br />
        与银行家博弈 —— 你敢于拒绝吗？
      </motion.p>

      {/* 开始按钮 */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(212, 175, 55, 0.5)' }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          playPhoneRing();
          startGame();
        }}
        className="px-12 py-5 bg-gradient-to-b from-gold-light via-gold to-gold-dark 
                   text-gray-900 text-2xl font-bold rounded-lg tracking-widest
                   shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-300"
      >
        开始游戏
      </motion.button>

      {/* 规则提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="mt-16 text-gray-500 text-sm text-center leading-relaxed"
      >
        <p>选择你的幸运箱 → 逐轮开箱 → 银行家出价</p>
        <p className="mt-1">每次面临选择：<span className="text-gold">DEAL</span>（接受报价）还是 <span className="text-gray-400">NO DEAL</span>（继续开箱）？</p>
      </motion.div>
    </div>
  );
}
