import React from 'react';
import { motion } from 'framer-motion';
import { gameOverMessages } from '../data/storyData';

interface GameOverScreenProps {
  type: string;
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ type, onRestart }) => {
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
      className={`min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b ${backgroundVariants[variant]}`}
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
              className="absolute w-4 h-4 bg-orange-500/30 rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: window.innerHeight + 20,
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
              className="absolute text-2xl"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight,
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
              className="absolute text-2xl"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: -50,
                rotate: 0
              }}
              animate={{ 
                y: window.innerHeight + 50,
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
        className="relative z-10 text-center max-w-md"
        initial={{ scale: 0.5, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.3 }}
      >
        {/* Emoji */}
        <motion.div
          className="text-8xl mb-6"
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
          className="text-4xl font-bold text-white mb-4 tracking-wider"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {message.title}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-gray-300 text-sm leading-relaxed mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {message.description}
        </motion.p>

        {/* Game Over badge */}
        <motion.div
          className="inline-block bg-red-900/60 border-2 border-red-500/50 rounded-full px-6 py-2 mb-8"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: 'spring' }}
        >
          <span className="text-red-300 font-bold text-sm tracking-widest">КОНЕЦ ПРАВЛЕНИЯ</span>
        </motion.div>

        {/* Restart button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
        >
          <button
            onClick={onRestart}
            className="bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-bold py-3 px-8 rounded-xl text-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-amber-900/50"
          >
            ↻ Начать заново
          </button>
        </motion.div>

        {/* Flavor text */}
        <motion.p
          className="text-gray-500 text-xs mt-6 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          "Орден вечен. Ты — нет. Но следующий будет лучше... может быть."
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default GameOverScreen;
