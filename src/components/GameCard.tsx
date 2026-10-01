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
  const borderColor = useTransform(
    x,
    [-200, -50, 0, 50, 200],
    ['rgba(239,68,68,0.8)', 'rgba(107,114,128,0.3)', 'rgba(107,114,128,0.3)', 'rgba(107,114,128,0.3)', 'rgba(16,185,129,0.8)']
  );

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
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 pointer-events-none"
        style={{ opacity: leftOpacity }}
      >
        <div className="bg-red-500/90 text-white px-3 py-2 rounded-lg border-2 border-red-300 font-bold text-sm rotate-[-15deg] shadow-lg shadow-red-900/50">
          ✕ ОТКАЗ
        </div>
      </motion.div>
      
      <motion.div
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 pointer-events-none"
        style={{ opacity: rightOpacity }}
      >
        <div className="bg-emerald-500/90 text-white px-3 py-2 rounded-lg border-2 border-emerald-300 font-bold text-sm rotate-[15deg] shadow-lg shadow-emerald-900/50">
          ✓ СОГЛАСЕН
        </div>
      </motion.div>

      {/* Card shadow */}
      <motion.div
        className="absolute inset-0 bg-black/50 rounded-2xl blur-xl -z-10"
        style={{ x, rotate, scale: useTransform(scale, v => v * 0.95) }}
      />

      {/* Card */}
      <motion.div
        className="relative rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing select-none"
        style={{ 
          x, 
          rotate, 
          scale,
          borderColor,
          borderWidth: '2px',
          borderStyle: 'solid',
        }}
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
        {/* Card background with texture */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-gray-850 to-gray-900" />
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        
        {/* Inner glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5" />

        {/* Card content */}
        <div className="relative z-10">
          {/* Card header - character name */}
          <div className="bg-black/40 backdrop-blur-sm px-4 py-2 border-b border-white/10">
            <div className="text-center">
              <span className="text-amber-400 font-bold text-sm tracking-wider uppercase">
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
              </span>
            </div>
          </div>

          {/* Portrait with ornate frame */}
          <div className="p-4 flex justify-center">
            <div className="relative">
              {/* Ornate frame */}
              <div className="absolute -inset-2 border-2 border-amber-700/30 rounded-lg" />
              <div className="absolute -inset-3 border border-amber-600/20 rounded-lg" />
              {/* Corner decorations */}
              <div className="absolute -top-4 -left-4 text-amber-600/40 text-xs">✦</div>
              <div className="absolute -top-4 -right-4 text-amber-600/40 text-xs">✦</div>
              <div className="absolute -bottom-4 -left-4 text-amber-600/40 text-xs">✦</div>
              <div className="absolute -bottom-4 -right-4 text-amber-600/40 text-xs">✦</div>
              <Portrait character={card.portrait} className="w-36 h-36" />
            </div>
          </div>

          {/* Dialogue with scroll-like background */}
          <div className="px-5 pb-4">
            <div className="relative bg-black/20 rounded-lg p-3 border border-white/5">
              <div className="absolute top-0 left-2 text-amber-600/30 text-lg">❝</div>
              <div className="absolute bottom-0 right-2 text-amber-600/30 text-lg">❞</div>
              <p className="text-gray-200 text-center text-sm leading-relaxed font-medium italic px-4">
                {card.dialogue}
              </p>
            </div>
          </div>

          {/* Choices with better styling */}
          <div className="grid grid-cols-2 gap-2 p-3 bg-black/30 border-t border-white/10">
            <button
              onClick={() => handleButtonClick('left')}
              className="relative bg-gradient-to-br from-red-900/40 to-red-950/60 hover:from-red-800/60 hover:to-red-900/80 active:from-red-700/60 active:to-red-800/80 border border-red-700/40 rounded-lg px-3 py-3 text-red-200 text-xs font-medium transition-all duration-150 hover:scale-[1.02] active:scale-95 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">← {card.leftChoice.text}</span>
            </button>
            <button
              onClick={() => handleButtonClick('right')}
              className="relative bg-gradient-to-br from-emerald-900/40 to-emerald-950/60 hover:from-emerald-800/60 hover:to-emerald-900/80 active:from-emerald-700/60 active:to-emerald-800/80 border border-emerald-700/40 rounded-lg px-3 py-3 text-emerald-200 text-xs font-medium transition-all duration-150 hover:scale-[1.02] active:scale-95 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">{card.rightChoice.text} →</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Swipe hint */}
      <div className="text-center mt-4">
        <p className="text-gray-500 text-xs">
          ← Свайпни или нажми →
        </p>
      </div>
    </div>
  );
};

export default GameCard;
