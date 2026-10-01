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
  const cardGlow = useTransform(x, [-200, 0, 200], ['rgba(239,68,68,0.3)', 'transparent', 'rgba(16,185,129,0.3)']);

  const handleDragStart = () => {
    setIsDragging(true);
  };

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

  return (
    <div className="relative w-full max-w-sm mx-auto" style={{ perspective: 1000 }}>
      {/* Swipe indicators */}
      <motion.div
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none"
        style={{ opacity: leftOpacity }}
      >
        <div className="bg-red-500/80 text-white px-4 py-2 rounded-lg border-2 border-red-300 font-bold text-lg rotate-[-15deg] shadow-lg">
          ✕ НЕТ
        </div>
      </motion.div>
      
      <motion.div
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none"
        style={{ opacity: rightOpacity }}
      >
        <div className="bg-emerald-500/80 text-white px-4 py-2 rounded-lg border-2 border-emerald-300 font-bold text-lg rotate-[15deg] shadow-lg">
          ✓ ДА
        </div>
      </motion.div>

      {/* Card */}
      <motion.div
        className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-2xl border-2 border-gray-700 overflow-hidden cursor-grab active:cursor-grabbing select-none"
        style={{ x, rotate, scale, boxShadow: isDragging ? undefined : '0 25px 50px -12px rgba(0,0,0,0.5)' }}
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
        {/* Glow overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl z-10"
          style={{ backgroundColor: cardGlow, opacity: 0.15 }}
        />
        {/* Card header - character name */}
        <div className="bg-gray-900/80 px-4 py-2 border-b border-gray-700">
          <div className="text-center">
            <span className="text-amber-400 font-bold text-sm tracking-wider uppercase">
              {card.character === 'architect' && '🏛️ Архитектор'}
              {card.character === 'banker' && '💼 Банкир'}
              {card.character === 'agent' && '🕶️ Агент'}
              {card.character === 'oracle' && '🔮 Оракул'}
              {card.character === 'heir' && '📱 Наследник'}
            </span>
          </div>
        </div>

        {/* Portrait */}
        <div className="p-4 flex justify-center">
          <Portrait character={card.portrait} className="w-40 h-40" />
        </div>

        {/* Dialogue */}
        <div className="px-5 pb-4">
          <p className="text-gray-200 text-center text-sm leading-relaxed font-medium italic">
            "{card.dialogue}"
          </p>
        </div>

        {/* Choices */}
        <div className="grid grid-cols-2 gap-2 p-3 bg-gray-900/60 border-t border-gray-700">
          <button
            onClick={() => handleButtonClick('left')}
            className="bg-red-900/40 hover:bg-red-800/60 active:bg-red-700/60 border border-red-700/50 rounded-lg px-3 py-3 text-red-200 text-xs font-medium transition-all duration-150 hover:scale-105 active:scale-95"
          >
            ← {card.leftChoice.text}
          </button>
          <button
            onClick={() => handleButtonClick('right')}
            className="bg-emerald-900/40 hover:bg-emerald-800/60 active:bg-emerald-700/60 border border-emerald-700/50 rounded-lg px-3 py-3 text-emerald-200 text-xs font-medium transition-all duration-150 hover:scale-105 active:scale-95"
          >
            {card.rightChoice.text} →
          </button>
        </div>
      </motion.div>

      {/* Swipe hint */}
      <div className="text-center mt-3 text-gray-500 text-xs">
        ← Свайпни или нажми →
      </div>
    </div>
  );
};

export default GameCard;
