import React from 'react';
import { motion } from 'framer-motion';
import { Director, Era } from '../types';
import Portrait from './Portrait';

interface HeirScreenProps {
  director: Director;
  era: Era;
  previousDirector: Director | null;
  year: number;
  onContinue: () => void;
}

const HeirScreen: React.FC<HeirScreenProps> = ({ director, era, previousDirector, year, onContinue }) => {
  return (
    <motion.div
      className={`min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b ${era.bgGradient} relative overflow-hidden`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            {era.ambientEmoji}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center max-w-md"
        initial={{ scale: 0.8, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 150, damping: 20, delay: 0.3 }}
      >
        {/* Era info */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-4xl mb-2">{era.ambientEmoji}</div>
          <div className="text-amber-400/80 text-sm font-bold tracking-widest uppercase">
            {era.name}
          </div>
          <div className="text-gray-400 text-xs mt-1">
            Год {year} от Р.Х.
          </div>
        </motion.div>

        {/* Previous director (if exists) */}
        {previousDirector && (
          <motion.div
            className="mb-4 bg-black/30 border border-gray-700/50 rounded-xl p-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="text-gray-500 text-xs mb-1">Предыдущий директор:</div>
            <div className="text-gray-400 text-sm font-medium">
              {previousDirector.name}
            </div>
            <div className="text-gray-600 text-xs italic">
              "Его правление окончено. Орден продолжается."
            </div>
          </motion.div>
        )}

        {/* Arrow / transition */}
        <motion.div
          className="text-2xl text-amber-500 my-3"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ↓
        </motion.div>

        {/* New director */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, type: 'spring', stiffness: 200 }}
        >
          <div className="text-amber-400 text-xs tracking-widest uppercase mb-2">
            Новый Директор
          </div>
          
          {/* Portrait */}
          <div className="w-32 h-32 mx-auto mb-3">
            <Portrait character={director.portrait} className="w-full h-full" />
          </div>

          {/* Name */}
          <h2
            className="text-2xl font-bold text-white mb-1"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            {director.name}
          </h2>

          {/* Title */}
          <div className="text-amber-400/70 text-sm">
            {director.backstory.split('.')[0]}.
          </div>
        </motion.div>

        {/* Backstory */}
        <motion.div
          className="bg-black/40 border border-amber-900/30 rounded-xl p-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-gray-300 text-sm leading-relaxed italic">
            "{director.backstory}"
          </p>
        </motion.div>

        {/* Era description */}
        <motion.p
          className="text-gray-500 text-xs mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          {era.description}
        </motion.p>

        {/* Continue button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
        >
          <button
            onClick={onContinue}
            className="bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-bold py-3 px-8 rounded-xl text-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-amber-900/50"
          >
            ▶ Принять бремя власти
          </button>
        </motion.div>

        {/* Flavor text */}
        <motion.p
          className="text-gray-600 text-xs mt-4 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          "Орден вечен. Директора — нет."
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default HeirScreen;
