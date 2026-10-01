import React from 'react';
import { motion } from 'framer-motion';
import { Item } from '../types';

interface ItemGetScreenProps {
  item: Item;
  onContinue: () => void;
}

const ItemGetScreen: React.FC<ItemGetScreenProps> = ({ item, onContinue }) => {
  const rarityColors = {
    common: 'from-gray-600 to-gray-800 border-gray-500',
    rare: 'from-blue-600 to-blue-900 border-blue-400',
    legendary: 'from-amber-500 to-amber-800 border-amber-300',
  };

  const rarityGlow = {
    common: 'shadow-gray-500/30',
    rare: 'shadow-blue-500/50',
    legendary: 'shadow-amber-500/70',
  };

  const rarityText = {
    common: 'text-gray-400',
    rare: 'text-blue-400',
    legendary: 'text-amber-400',
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-gray-950 via-purple-950 to-black relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Sparkle effects for legendary */}
      {item.rarity === 'legendary' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-amber-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center max-w-md"
        initial={{ scale: 0.5, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        {/* Title */}
        <motion.div
          className="text-amber-400 text-sm tracking-widest uppercase mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          ✦ Предмет получен ✦
        </motion.div>

        {/* Item card */}
        <motion.div
          className={`bg-gradient-to-b ${rarityColors[item.rarity]} border-2 rounded-2xl p-6 shadow-2xl ${rarityGlow[item.rarity]} mb-6`}
          initial={{ opacity: 0, rotateY: 180 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
        >
          {/* Icon */}
          <motion.div
            className="text-7xl mb-4"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {item.icon}
          </motion.div>

          {/* Name */}
          <h2
            className="text-2xl font-bold text-white mb-2"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            {item.name}
          </h2>

          {/* Rarity */}
          <div className={`text-xs tracking-wider uppercase mb-3 ${rarityText[item.rarity]}`}>
            {item.rarity === 'common' && '⚪ Обычный'}
            {item.rarity === 'rare' && '🔵 Редкий'}
            {item.rarity === 'legendary' && '🟡 Легендарный'}
          </div>

          {/* Description */}
          <p className="text-gray-200 text-sm leading-relaxed italic mb-4">
            {item.description}
          </p>

          {/* Passive effect */}
          {item.passiveEffect && (
            <div className="bg-black/30 rounded-lg p-3 border border-white/10">
              <div className="text-xs text-gray-400 mb-2">Пассивный эффект:</div>
              <div className="flex justify-center gap-3 flex-wrap">
                {item.passiveEffect.secrecy && (
                  <span className="text-purple-400 text-xs">
                    👁️ {item.passiveEffect.secrecy > 0 ? '+' : ''}{item.passiveEffect.secrecy}
                  </span>
                )}
                {item.passiveEffect.influence && (
                  <span className="text-amber-400 text-xs">
                    👑 {item.passiveEffect.influence > 0 ? '+' : ''}{item.passiveEffect.influence}
                  </span>
                )}
                {item.passiveEffect.chaos && (
                  <span className="text-red-400 text-xs">
                    🔥 {item.passiveEffect.chaos > 0 ? '+' : ''}{item.passiveEffect.chaos}
                  </span>
                )}
                {item.passiveEffect.funds && (
                  <span className="text-emerald-400 text-xs">
                    💰 {item.passiveEffect.funds > 0 ? '+' : ''}{item.passiveEffect.funds}
                  </span>
                )}
              </div>
            </div>
          )}
        </motion.div>

        {/* Continue button */}
        <motion.button
          onClick={onContinue}
          className="bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-bold py-3 px-8 rounded-xl text-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-amber-900/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          ✓ Забрать предмет
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ItemGetScreen;
