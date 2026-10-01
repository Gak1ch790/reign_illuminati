import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Card, Choice } from '../types';
import Portrait from './Portrait';

interface GameCardProps {
  card: Card;
  onChoice: (choice: Choice) => void;
}

const GameCard: React.FC<GameCardProps> = ({ card, onChoice }) => {
  const [exitX, setExitX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const leftOpacity = useTransform(x, [-200, 0], [1, 0]);
  const rightOpacity = useTransform(x, [0, 200], [0, 1]);
  const scale = useTransform(x, [-200, 0, 200], [0.95, 1, 0.95]);

  const handleDragStart = () => setIsDragging(true);
  const handleDragEnd = (_: any, info: PanInfo) => {
    setIsDragging(false);
    const threshold = 100;
    if (info.offset.x > threshold) {
      setExitX(1);
      onChoice(card.rightChoice);
    } else if (info.offset.x < -threshold) {
      setExitX(-1);
      onChoice(card.leftChoice);
    }
  };

  const handleButtonClick = (direction: 'left' | 'right') => {
    setExitX(direction === 'left' ? -1 : 1);
    onChoice(direction === 'left' ? card.leftChoice : card.rightChoice);
  };

  // Определяем стиль карточки
  const isBranchPoint = card.isBranchPoint;
  const isEasterEgg = card.isEasterEgg;
  const isArc = card.arcId && card.arcStep === 1;

  const getCardBorder = () => {
    if (isBranchPoint) return 'border-amber-400 shadow-amber-500/30';
    if (isEasterEgg) return 'border-purple-400 shadow-purple-500/30';
    if (isArc) return 'border-cyan-400 shadow-cyan-500/30';
    return 'border-gray-700 shadow-black/50';
  };

  const getCardGlow = () => {
    if (isBranchPoint) return 'from-amber-900/20 via-transparent to-transparent';
    if (isEasterEgg) return 'from-purple-900/20 via-transparent to-transparent';
    if (isArc) return 'from-cyan-900/20 via-transparent to-transparent';
    return 'from-transparent via-transparent to-transparent';
  };

  return (
    <div className="relative w-full max-w-sm mx-auto" style={{ perspective: 1000 }}>
      {/* Swipe indicators */}
      <motion.div className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-20 pointer-events-none" style={{ opacity: leftOpacity }}>
        <div className="bg-red-500/90 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border-2 border-red-300 font-bold text-xs sm:text-sm rotate-[-15deg] shadow-lg shadow-red-900/50">
          ✕ ОТКАЗ
        </div>
      </motion.div>
      
      <motion.div className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-20 pointer-events-none" style={{ opacity: rightOpacity }}>
        <div className="bg-emerald-500/90 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border-2 border-emerald-300 font-bold text-xs sm:text-sm rotate-[15deg] shadow-lg shadow-emerald-900/50">
          ✓ ДА
        </div>
      </motion.div>

      {/* Card */}
      <motion.div
        className={`relative rounded-xl sm:rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing select-none border-2 ${getCardBorder()} shadow-2xl`}
        style={{ x, rotate, scale }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.9}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ x: exitX * 500, opacity: 0, rotate: exitX * 30, transition: { duration: 0.3 } }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        key={card.id}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-gray-850 to-gray-900" />
        <div className={`absolute inset-0 bg-gradient-to-b ${getCardGlow()}`} />
        
        {/* Special badges */}
        {isBranchPoint && (
          <div className="absolute top-2 right-2 z-30 bg-amber-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
            ⚡ РАЗВИЛКА
          </div>
        )}
        {isEasterEgg && (
          <div className="absolute top-2 right-2 z-30 bg-purple-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            ✨ ПАСХАЛКА
          </div>
        )}
        {isArc && (
          <div className="absolute top-2 right-2 z-30 bg-cyan-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
            📖 АРКА
          </div>
        )}

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="bg-black/40 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 border-b border-white/10">
            <div className="text-center">
              <span className="text-amber-400 font-bold text-xs sm:text-sm tracking-wider uppercase">
                {card.character === 'architect' && '🏛️ Архитектор'}
                {card.character === 'banker' && '💼 Банкир'}
                {card.character === 'agent' && '🕶️ Агент'}
                {card.character === 'oracle' && '🔮 Оракул'}
                {card.character === 'heir' && '📱 Наследник'}
                {card.character === 'pope' && '✝️ Папа'}
                {card.character === 'knight' && '⚔️ Рыцарь'}
                {card.character === 'merchant' && '💎 Купец'}
                {card.character === 'scientist' && '🔬 Учёный'}
                {card.character === 'ai' && '🤖 ИИ'}
                {card.character === 'reptilian' && '🦎 Рептилоид'}
                {card.character === 'alien' && '👽 Посол'}
                {card.character === 'corporation' && '🏢 Корпорация'}
                {card.character === 'celebrity' && '⭐ Знаменитость'}
                {card.character === 'president' && '🎖️ Президент'}
                {card.character === 'musk' && '🚀 Илон'}
                {card.character === 'rick' && '🧪 Рик'}
                {card.character === 'morty' && '😰 Морти'}
                {card.character === 'zuck' && '🦎 Цукерберг'}
              </span>
            </div>
          </div>

          {/* Portrait */}
          <div className="p-3 sm:p-4 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-1.5 sm:-inset-2 border border-amber-700/30 rounded-lg" />
              <Portrait character={card.portrait} className="w-28 h-28 sm:w-36 sm:h-36" />
            </div>
          </div>

          {/* Dialogue */}
          <div className="px-3 sm:px-5 pb-3 sm:pb-4">
            <div className="relative bg-black/20 rounded-lg p-2.5 sm:p-3 border border-white/5">
              <p className="text-gray-200 text-center text-xs sm:text-sm leading-relaxed font-medium italic">
                {card.dialogue}
              </p>
            </div>
          </div>

          {/* Choices */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2 p-2 sm:p-3 bg-black/30 border-t border-white/10">
            <button
              onClick={() => handleButtonClick('left')}
              className="relative bg-gradient-to-br from-red-900/40 to-red-950/60 hover:from-red-800/60 hover:to-red-900/80 active:from-red-700/60 active:to-red-800/80 border border-red-700/40 rounded-lg px-2 sm:px-3 py-2.5 sm:py-3 text-red-200 text-[10px] sm:text-xs font-medium transition-all duration-150 hover:scale-[1.02] active:scale-95"
            >
              <span className="relative">← {card.leftChoice.text}</span>
            </button>
            <button
              onClick={() => handleButtonClick('right')}
              className="relative bg-gradient-to-br from-emerald-900/40 to-emerald-950/60 hover:from-emerald-800/60 hover:to-emerald-900/80 active:from-emerald-700/60 active:to-emerald-800/80 border border-emerald-700/40 rounded-lg px-2 sm:px-3 py-2.5 sm:py-3 text-emerald-200 text-[10px] sm:text-xs font-medium transition-all duration-150 hover:scale-[1.02] active:scale-95"
            >
              <span className="relative">{card.rightChoice.text} →</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Swipe hint */}
      <div className="text-center mt-3">
        <p className="text-gray-500 text-[10px] sm:text-xs">← Свайпни или нажми →</p>
      </div>
    </div>
  );
};

export default GameCard;
