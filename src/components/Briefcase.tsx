import { motion } from 'framer-motion';
import { Case } from '../types';
import { formatCurrency } from '../types';

interface Props {
  caseData: Case;
  onClick?: () => void;
  disabled?: boolean;
  isPlayerCase?: boolean;
  isSelectable?: boolean;
  revealed?: boolean;
  highlight?: boolean;
}

export default function Briefcase({
  caseData,
  onClick,
  disabled,
  isPlayerCase,
  isSelectable,
  revealed,
  highlight,
}: Props) {
  const isOpen = caseData.opened || revealed;

  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: isPlayerCase ? 1.05 : 1,
        boxShadow: highlight
          ? '0 0 25px rgba(212, 175, 55, 0.6)'
          : isPlayerCase
            ? '0 0 15px rgba(212, 175, 55, 0.4)'
            : 'none',
      }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
      whileHover={
        !disabled && !isOpen
          ? { scale: 1.08, boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)' }
          : {}
      }
      whileTap={!disabled && !isOpen ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled || isOpen}
      className={`
        relative w-20 h-24 rounded-xl border-2 font-bold flex flex-col items-center justify-center
        transition-colors duration-300 select-none
        ${isOpen
          ? 'bg-gray-800/50 border-gray-700 text-gray-600 cursor-default'
          : isPlayerCase
            ? 'bg-gradient-to-b from-gold/30 to-gold-dark/30 border-gold text-gold cursor-default'
            : isSelectable
              ? 'bg-studio-card border-gray-600 text-gray-300 hover:border-gold hover:text-gold cursor-pointer'
              : 'bg-studio-card border-gray-600 text-gray-300 hover:border-gold hover:text-gold cursor-pointer'
        }
      `}
    >
      {isOpen ? (
        <motion.div
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="text-center"
        >
          <div className="text-xs text-gray-500 mb-0.5">#{caseData.id}</div>
          <div className={`text-xs font-mono ${caseData.amount >= 50000 ? 'text-gold/50' : 'text-gray-500'}`}>
            {formatCurrency(caseData.amount)}
          </div>
        </motion.div>
      ) : (
        <>
          <span className="text-2xl mb-1">💼</span>
          <span className="text-lg font-bold">{caseData.id}</span>
          {isPlayerCase && (
            <span className="text-[10px] text-gold mt-0.5">你的箱子</span>
          )}
        </>
      )}
    </motion.button>
  );
}
