import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { formatCurrency } from '../types';
import { playPhoneRing, playDeal, playNoDeal } from '../utils/sound';

export default function BankerOffer() {
  const { bankerOffer, acceptDeal, rejectDeal } = useGameStore();
  const [showOffer, setShowOffer] = useState(false);
  const [phoneRinging, setPhoneRinging] = useState(true);

  useEffect(() => {
    playPhoneRing();

    const t1 = setTimeout(() => {
      setPhoneRinging(false);
      setShowOffer(true);
    }, 2500);

    return () => clearTimeout(t1);
  }, []);

  if (phoneRinging) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1, 1.1, 1],
            rotate: [0, -5, 5, -5, 0],
          }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="text-center"
        >
          <div className="text-7xl mb-4">📞</div>
          <div className="text-gold text-3xl font-bold animate-pulse tracking-widest">
            银行家来电...
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', duration: 0.6 }}
        className="bg-studio-bg border-2 border-gold rounded-2xl p-8 max-w-md w-full text-center
                   shadow-[0_0_60px_rgba(212,175,55,0.2)]"
      >
        {/* 头像 */}
        <div className="text-5xl mb-4">🏦</div>

        <h2 className="text-gray-400 text-sm tracking-widest mb-2">银行家出价</h2>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="text-5xl font-bold text-gold mb-6 tracking-wide"
        >
          {bankerOffer !== null ? formatCurrency(bankerOffer) : ''}
        </motion.div>

        <div className="text-gray-500 text-sm mb-8">
          用这笔钱买断你的箱子，<br />不管里面是多少，都归你。
        </div>

        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playDeal();
              acceptDeal();
            }}
            className="flex-1 py-4 bg-gradient-to-b from-green-600 to-green-800 text-white 
                       text-xl font-bold rounded-xl tracking-widest
                       hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all"
          >
            DEAL
            <br />
            <span className="text-xs font-normal tracking-normal">成交</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playNoDeal();
              rejectDeal();
            }}
            className="flex-1 py-4 bg-gradient-to-b from-red-700 to-red-900 text-white
                       text-xl font-bold rounded-xl tracking-widest
                       hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-all"
          >
            NO DEAL
            <br />
            <span className="text-xs font-normal tracking-normal">继续开箱</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
