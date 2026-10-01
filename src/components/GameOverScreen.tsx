import React from 'react';
import { motion } from 'framer-motion';
import { gameOverMessages } from '../data/storyData';

interface GameOverScreenProps {
  type: string;
  onContinue: () => void;
  directorName?: string;
  year?: number;
  turns?: number;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ type, onContinue, directorName = 'Директор', year = 0, turns = 0 }) => {
  const message = gameOverMessages[type] || gameOverMessages['secrecy_low'];
  
  const getAnimationVariant = () => {
    if (type.includes('chaos_high')) return 'fire';
    if (type.includes('secrecy_low')) return 'expose';
    if (type.includes('funds_low')) return 'bankrupt';
    if (type.includes('influence_high')) return 'tyrant';
    return 'default';
  };

  const variant = getAnimationVariant();

  const backgroundVariants = {
    fire: 'from-red-900 via-orange-900 to-black',
    expose: 'from-blue-900 via-indigo-900 to-black',
    bankrupt: 'from-yellow-900 via-amber-900 to-black',
    tyrant: 'from-purple-900 via-violet-900 to-black',
    default: 'from-gray-900 via-slate-900 to-black',
  };

  return (
    <motion.div
      className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-b ${backgroundVariants[variant]} relative overflow-hidden`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Animated background elements */}
      {variant === 'fire' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-orange-500/30 rounded-full"
              initial={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400), 
                y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 20,
                scale: Math.random() * 2 + 0.5
              }}
              animate={{ 
                y: -100,
                opacity: 0,
                scale: 0
              }}
              transition={{ 
                duration: Math.random() * 3 + 2, 
                repeat: Infinity, 
                delay: Math.random() * 2 
              }}
            />
          ))}
        </div>
      )}

      {variant === 'expose' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-xl sm:text-2xl"
              initial={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400), 
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                opacity: 0
              }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0.5, 1.2, 0.5]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                delay: Math.random() * 3 
              }}
            >
              📰
            </motion.div>
          ))}
        </div>
      )}

      {variant === 'bankrupt' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-xl sm:text-2xl"
              initial={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400), 
                y: -50,
                rotate: 0
              }}
              animate={{ 
                y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50,
                rotate: Math.random() * 720 - 360
              }}
              transition={{ 
                duration: Math.random() * 3 + 2, 
                repeat: Infinity, 
                delay: Math.random() * 2 
              }}
            >
              💸
            </motion.div>
          ))}
        </div>
      )}

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center max-w-md w-full"
        initial={{ scale: 0.5, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.3 }}
      >
        {/* Emoji */}
        <motion.div
          className="text-6xl sm:text-8xl mb-4 sm:mb-6"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {message.emoji}
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4 tracking-wider"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {message.title}
        </motion.h1>

        {/* Director info */}
        <motion.div
          className="bg-black/30 border border-white/10 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="text-gray-400 text-xs sm:text-sm mb-1">Правление окончено:</div>
          <div className="text-white font-bold text-base sm:text-lg">{directorName}</div>
          <div className="text-gray-500 text-xs sm:text-sm mt-1">
            {year} год • {turns} ходов
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {message.description}
        </motion.p>

        {/* Game Over badge */}
        <motion.div
          className="inline-block bg-red-900/60 border-2 border-red-500/50 rounded-full px-4 sm:px-6 py-1.5 sm:py-2 mb-6 sm:mb-8"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: 'spring' }}
        >
          <span className="text-red-300 font-bold text-xs sm:text-sm tracking-widest">КОНЕЦ ПРАВЛЕНИЯ</span>
        </motion.div>

        {/* Continue button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
        >
          <button
            onClick={onContinue}
            className="bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-xl text-sm sm:text-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-amber-900/50 w-full sm:w-auto"
          >
            → Следующий директор
          </button>
        </motion.div>

        {/* Flavor text */}
        <motion.p
          className="text-gray-500 text-[10px] sm:text-xs mt-4 sm:mt-6 italic px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          "Орден вечен. Директора приходят и уходят."
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default GameOverScreen;
