import React from 'react';
import { motion } from 'framer-motion';
import { Stats } from '../types';
import { endings, eras } from '../data/storyData';

interface EndingScreenProps {
  stats: Stats;
  turn: number;
  year?: number;
  eraIndex?: number;
  onRestart: () => void;
}

const EndingScreen: React.FC<EndingScreenProps> = ({ stats, turn, year = 3000, eraIndex = 5, onRestart }) => {
  const ending = endings.find(e => e.condition(stats)) || endings[endings.length - 1];
  const era = eras[eraIndex] || eras[eras.length - 1];

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-indigo-950 via-gray-900 to-black relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 text-center max-w-lg"
        initial={{ scale: 0.8, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 150, damping: 20, delay: 0.5 }}
      >
        {/* Era icon */}
        <motion.div
          className="text-7xl mb-4"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {era.ambientEmoji}
        </motion.div>

        {/* Ending title */}
        <motion.h1
          className="text-5xl font-bold text-amber-400 mb-2"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {ending.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-gray-400 text-sm mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {era.name} • Год {year} от Р.Х.
        </motion.p>
        <motion.p
          className="text-gray-500 text-xs mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          Ты продержался {turn} ходов
        </motion.p>

        {/* Description */}
        <motion.div
          className="bg-gray-800/60 border border-gray-700 rounded-xl p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-gray-300 text-sm leading-relaxed">
            {ending.description}
          </p>
        </motion.div>

        {/* Final stats */}
        <motion.div
          className="grid grid-cols-2 gap-3 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="bg-purple-900/30 border border-purple-700/30 rounded-lg p-3">
            <div className="text-purple-400 text-xs">👁️ Секретность</div>
            <div className="text-white font-bold">{stats.secrecy}%</div>
          </div>
          <div className="bg-amber-900/30 border border-amber-700/30 rounded-lg p-3">
            <div className="text-amber-400 text-xs">👑 Влияние</div>
            <div className="text-white font-bold">{stats.influence}%</div>
          </div>
          <div className="bg-red-900/30 border border-red-700/30 rounded-lg p-3">
            <div className="text-red-400 text-xs">🔥 Хаос</div>
            <div className="text-white font-bold">{stats.chaos}%</div>
          </div>
          <div className="bg-emerald-900/30 border border-emerald-700/30 rounded-lg p-3">
            <div className="text-emerald-400 text-xs">💰 Средства</div>
            <div className="text-white font-bold">{stats.funds}%</div>
          </div>
        </motion.div>

        {/* Restart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
        >
          <button
            onClick={onRestart}
            className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl text-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-indigo-900/50"
          >
            ↻ Новая игра
          </button>
        </motion.div>

        <motion.p
          className="text-gray-600 text-xs mt-6 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          "Каждый конец — начало нового заговора..."
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default EndingScreen;
