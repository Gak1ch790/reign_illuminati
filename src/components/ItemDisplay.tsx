import React from 'react';
import { motion } from 'framer-motion';
import { Item } from '../types';

interface ItemDisplayProps {
  items: Item[];
}

const ItemDisplay: React.FC<ItemDisplayProps> = ({ items }) => {
  if (items.length === 0) return null;

  return (
    <div className="w-full max-w-md mx-auto px-4 py-2">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <div className="text-gray-500 text-xs whitespace-nowrap">Реликвии:</div>
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className="flex-shrink-0 relative group"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl cursor-help border-2 ${
                item.rarity === 'legendary'
                  ? 'bg-amber-900/50 border-amber-500/50'
                  : item.rarity === 'rare'
                  ? 'bg-blue-900/50 border-blue-500/50'
                  : 'bg-gray-800/50 border-gray-600/50'
              }`}
              title={`${item.name}: ${item.description}`}
            >
              {item.icon}
            </div>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50">
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-2 text-xs whitespace-nowrap shadow-xl">
                <div className="text-white font-bold">{item.name}</div>
                <div className="text-gray-400 text-[10px]">{item.description}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ItemDisplay;
