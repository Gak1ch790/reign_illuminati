import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stats } from '../types';

interface StatChange { key: keyof Stats; value: number; id: number; }

interface StatBarsProps {
  stats: Stats;
  changes?: StatChange[];
}

interface StatConfig {
  key: keyof Stats;
  label: string;
  shortLabel: string;
  icon: string;
  color: string;
  bgColor: string;
  dangerColor: string;
}

const statConfigs: StatConfig[] = [
  { key: 'secrecy', label: 'Секретность', shortLabel: 'Секр', icon: '👁️', color: 'bg-purple-500', bgColor: 'bg-purple-900/50', dangerColor: 'text-purple-400' },
  { key: 'influence', label: 'Влияние', shortLabel: 'Влия', icon: '👑', color: 'bg-amber-500', bgColor: 'bg-amber-900/50', dangerColor: 'text-amber-400' },
  { key: 'chaos', label: 'Хаос', shortLabel: 'Хаос', icon: '🔥', color: 'bg-red-500', bgColor: 'bg-red-900/50', dangerColor: 'text-red-400' },
  { key: 'funds', label: 'Средства', shortLabel: 'Сред', icon: '💰', color: 'bg-emerald-500', bgColor: 'bg-emerald-900/50', dangerColor: 'text-emerald-400' },
];

const StatBars: React.FC<StatBarsProps> = ({ stats, changes = [] }) => {
  const [activeChanges, setActiveChanges] = useState<StatChange[]>([]);

  useEffect(() => {
    if (changes.length > 0) {
      setActiveChanges(changes);
      const timer = setTimeout(() => setActiveChanges([]), 1500);
      return () => clearTimeout(timer);
    }
  }, [changes]);

  return (
    <div className="w-full max-w-md mx-auto px-2 sm:px-4 py-1 sm:py-2">
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
        {statConfigs.map((config) => {
          const value = stats[config.key];
          const isDanger = value <= 15 || value >= 85;
          const isCritical = value <= 5 || value >= 95;
          const changeForStat = activeChanges.find(c => c.key === config.key);
          
          return (
            <div key={config.key} className="flex flex-col items-center relative">
              <div className={`text-sm sm:text-lg mb-0.5 sm:mb-1 ${isCritical ? 'animate-bounce' : ''}`}>{config.icon}</div>
              <div className={`w-full h-2 sm:h-3 rounded-full ${config.bgColor} overflow-hidden relative`}>
                <motion.div
                  className={`h-full rounded-full ${isCritical ? 'bg-red-500' : isDanger ? `${config.color} animate-pulse` : config.color}`}
                  initial={{ width: '50%' }}
                  animate={{ width: `${value}%` }}
                  transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                />
                {isCritical && (
                  <motion.div className="absolute inset-0 bg-red-500/30" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 0.5, repeat: Infinity }} />
                )}
              </div>
              <div className={`text-[8px] sm:text-[10px] mt-0.5 sm:mt-1 font-medium ${isDanger ? config.dangerColor : 'text-gray-400'} hidden sm:block`}>
                {config.label}
              </div>
              <div className={`text-[8px] sm:text-[10px] mt-0.5 sm:mt-1 font-medium ${isDanger ? config.dangerColor : 'text-gray-400'} sm:hidden`}>
                {config.shortLabel}
              </div>
              <div className={`text-[10px] sm:text-xs font-bold ${isCritical ? 'text-red-400 animate-pulse' : isDanger ? config.dangerColor : 'text-gray-300'}`}>
                {value}%
              </div>

              <AnimatePresence>
                {changeForStat && (
                  <motion.div
                    key={changeForStat.id}
                    className={`absolute -top-1 sm:-top-2 left-1/2 -translate-x-1/2 font-bold text-xs sm:text-sm pointer-events-none z-20 ${changeForStat.value > 0 ? 'text-emerald-400' : 'text-red-400'}`}
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 0, y: -30 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                  >
                    {changeForStat.value > 0 ? '+' : ''}{changeForStat.value}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatBars;
