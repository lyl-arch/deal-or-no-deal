import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { playPhoneRing } from '../utils/sound';

export default function StartScreen() {
  const startGame = useGameStore((s) => s.startGame);
  const [showRules, setShowRules] = useState(false);

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
        className="text-gray-400 text-center max-w-md mb-8 text-lg"
      >
        26个箱子，最高100万美元。<br />
        与银行家博弈 —— 你敢于拒绝吗？
      </motion.p>

      {/* 按钮组 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="flex flex-col items-center gap-4"
      >
        {/* 开始按钮 */}
        <motion.button
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

        {/* 规则按钮 */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowRules(true)}
          className="px-8 py-3 border border-gray-600 text-gray-400 text-lg rounded-lg
                     hover:border-gold hover:text-gold transition-all duration-300"
        >
          游戏规则
        </motion.button>
      </motion.div>

      {/* 规则弹窗 */}
      <AnimatePresence>
        {showRules && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowRules(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-studio-bg border border-gold/50 rounded-2xl p-8 max-w-lg w-full 
                         max-h-[85vh] overflow-y-auto shadow-[0_0_40px_rgba(212,175,55,0.1)]"
            >
              <h2 className="text-3xl font-bold text-gold text-center mb-6 tracking-wider">
                游戏规则
              </h2>

              {/* 目标 */}
              <section className="mb-5">
                <h3 className="text-gold-light font-bold text-lg mb-2">游戏目标</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  在26个密封箱子中选择一个作为你的幸运箱，然后逐一打开其余箱子来推断你箱子里的金额。
                  过程中银行家会不断出价买断你的箱子，你的目标是 —— 在合适的时机成交，赚到最多的钱。
                </p>
              </section>

              {/* 流程 */}
              <section className="mb-5">
                <h3 className="text-gold-light font-bold text-lg mb-2">游戏流程</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex gap-3">
                    <span className="text-gold font-bold w-5 shrink-0">1.</span>
                    <span>从26个箱子中<span className="text-gold">选择1个</span>作为你的幸运箱</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-gold font-bold w-5 shrink-0">2.</span>
                    <span>分为<span className="text-gold">9轮</span>，逐一打开其余箱子</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-gold font-bold w-5 shrink-0">3.</span>
                    <span>每轮结束后，银行家会<span className="text-gold">出价</span>买断你的箱子</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-gold font-bold w-5 shrink-0">4.</span>
                    <span>选择<span className="text-green-400">DEAL</span>（接受报价拿钱走人）或<span className="text-red-400">NO DEAL</span>（继续开箱）</span>
                  </div>
                </div>
              </section>

              {/* 各轮开箱数 */}
              <section className="mb-5">
                <h3 className="text-gold-light font-bold text-lg mb-2">各轮需要开的箱子数</h3>
                <div className="grid grid-cols-3 gap-1 text-sm">
                  {[
                    { r: 1, n: 6 }, { r: 2, n: 5 }, { r: 3, n: 4 },
                    { r: 4, n: 3 }, { r: 5, n: 2 }, { r: 6, n: 1 },
                    { r: 7, n: 1 }, { r: 8, n: 1 }, { r: 9, n: 1 },
                  ].map(({ r, n }) => (
                    <div key={r} className="bg-studio-card/60 rounded-lg px-3 py-1.5 text-center">
                      <span className="text-gray-500">第{r}轮</span>
                      <span className="text-gold font-bold ml-1">{n}个</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* 奖金 */}
              <section className="mb-5">
                <h3 className="text-gold-light font-bold text-lg mb-2">26个奖金金额</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-xs font-mono">
                  <div className="text-blue-300">$0.01</div><div className="text-amber-200">$1,000</div>
                  <div className="text-blue-300">$1</div><div className="text-amber-200">$5,000</div>
                  <div className="text-blue-300">$5</div><div className="text-amber-200">$10,000</div>
                  <div className="text-blue-300">$10</div><div className="text-amber-200">$25,000</div>
                  <div className="text-blue-300">$25</div><div className="text-amber-200">$50,000</div>
                  <div className="text-blue-300">$50</div><div className="text-amber-200">$75,000</div>
                  <div className="text-blue-300">$75</div><div className="text-amber-200">$100,000</div>
                  <div className="text-blue-300">$100</div><div className="text-amber-200">$200,000</div>
                  <div className="text-blue-300">$200</div><div className="text-amber-200">$300,000</div>
                  <div className="text-blue-300">$300</div><div className="text-amber-200">$400,000</div>
                  <div className="text-blue-300">$400</div><div className="text-amber-200">$500,000</div>
                  <div className="text-blue-300">$500</div><div className="text-amber-200">$750,000</div>
                  <div className="text-blue-300">$750</div><div className="text-gold font-bold">$1,000,000</div>
                </div>
              </section>

              {/* 银行家 */}
              <section className="mb-5">
                <h3 className="text-gold-light font-bold text-lg mb-2">银行家出价</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  银行家根据<span className="text-gold">剩余金额的期望值</span>出价。
                  游戏前期出价偏低（约期望值的55%），越到后期越接近真实期望（最高95%）。
                  当你排除大量高金额后，出价会大幅下降——这正是博弈的乐趣所在。
                </p>
              </section>

              {/* 技巧提示 */}
              <section className="mb-6">
                <h3 className="text-gold-light font-bold text-lg mb-2">小技巧</h3>
                <ul className="text-gray-300 text-sm leading-relaxed space-y-1.5">
                  <li>关注左侧<span className="text-blue-300">蓝色</span>（小金额）和右侧<span className="text-amber-200">金色</span>（大金额）的变化</li>
                  <li>如果大金额被大量排除，银行家出价会骤降</li>
                  <li>你不一定非要等到最后——合适时果断 DEAL！</li>
                </ul>
              </section>

              {/* 关闭按钮 */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowRules(false)}
                className="w-full py-3 bg-gradient-to-b from-gold-light via-gold to-gold-dark
                           text-gray-900 text-lg font-bold rounded-xl tracking-widest"
              >
                我知道了
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
