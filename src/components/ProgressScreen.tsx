import React from 'react';
import { motion } from 'framer-motion';
import { MetaProgress } from '../types';
import { eras } from '../data/storyData';
import { achievementsInfo } from '../utils/metaProgress';

interface ProgressScreenProps {
  progress: MetaProgress;
  lastYear: number;
  lastEra: string;
  onContinue: () => void;
}

const ProgressScreen: React.FC<ProgressScreenProps> = ({ progress, lastYear, lastEra, onContinue }) => {
  const era = eras.find(e => e.id === lastEra) || eras[0];

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-gray-950 via-indigo-950 to-black relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 text-center max-w-2xl w-full"
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
      >
        {/* Title */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1
            className="text-4xl font-bold text-amber-400 mb-2"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            ХРОНИКИ ОРДЕНА
          </h1>
          <p className="text-gray-400 text-sm">
            Последнее правление окончено в {lastYear} году • {era.name}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
            <div className="text-3xl font-bold text-amber-400">{progress.totalGames}</div>
            <div className="text-gray-400 text-xs mt-1">Игр сыграно</div>
          </div>
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
            <div className="text-3xl font-bold text-amber-400">{progress.totalTurns}</div>
            <div className="text-gray-400 text-xs mt-1">Всего ходов</div>
          </div>
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
            <div className="text-3xl font-bold text-amber-400">{progress.highestYear}</div>
            <div className="text-gray-400 text-xs mt-1">Макс. год</div>
          </div>
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
            <div className="text-3xl font-bold text-amber-400">{progress.collectedItems.length}</div>
            <div className="text-gray-400 text-xs mt-1">Реликвий</div>
          </div>
        </motion.div>

        {/* Eras Progress */}
        <motion.div
          className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-lg font-bold text-white mb-4">Пройденные эпохи</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {eras.map((era) => {
              const completed = progress.completedEras.includes(era.id);
              return (
                <motion.div
                  key={era.id}
                  className={`px-4 py-2 rounded-lg border-2 ${
                    completed
                      ? 'bg-amber-900/30 border-amber-500/50 text-amber-300'
                      : 'bg-gray-800/50 border-gray-700/30 text-gray-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-xl mr-2">{era.ambientEmoji}</span>
                  <span className="text-sm font-medium">{era.name}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Achievements */}
        {progress.achievements.length > 0 && (
          <motion.div
            className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <h2 className="text-lg font-bold text-white mb-4">Достижения ({progress.achievements.length}/10)</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {progress.achievements.map((achId) => {
                const ach = achievementsInfo[achId];
                if (!ach) return null;
                return (
                  <motion.div
                    key={achId}
                    className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-3 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-2xl mb-1">{ach.icon}</div>
                    <div className="text-xs text-amber-300 font-medium">{ach.name}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Continue Button */}
        <motion.button
          onClick={onContinue}
          className="bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-bold py-4 px-10 rounded-xl text-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-amber-900/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          ▶ Начать новое правление
        </motion.button>

        <motion.p
          className="text-gray-600 text-xs mt-6 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          "Орден вечен. Директора приходят и уходят. Но прогресс остаётся."
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default ProgressScreen;
