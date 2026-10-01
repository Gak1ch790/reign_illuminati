import React, { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Stats, Card, Choice, GameScreen } from './types';
import { cards, characters } from './data/storyData';
import GameCard from './components/GameCard';
import StatBars from './components/StatBars';
import GameOverScreen from './components/GameOverScreen';
import EndingScreen from './components/EndingScreen';

const INITIAL_STATS: Stats = {
  secrecy: 50,
  influence: 50,
  chaos: 50,
  funds: 50,
};

const MAX_TURNS = 30;

interface StatChange {
  key: keyof Stats;
  value: number;
  id: number;
}

// Простой звуковой эффект через Web Audio API
const playSound = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  } catch (e) {
    // Звук не поддерживается
  }
};

const playSwipeSound = (direction: 'left' | 'right') => {
  if (direction === 'left') {
    playSound(200, 0.15, 'sawtooth');
  } else {
    playSound(400, 0.15, 'sine');
  }
};

const playGameOverSound = () => {
  playSound(150, 0.3, 'sawtooth');
  setTimeout(() => playSound(100, 0.5, 'sawtooth'), 200);
};

function App() {
  const [screen, setScreen] = useState<GameScreen>('title');
  const [stats, setStats] = useState<Stats>(INITIAL_STATS);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [turn, setTurn] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [completedArcs, setCompletedArcs] = useState<string[]>([]);
  const [gameOverType, setGameOverType] = useState<string>('');
  const [cardKey, setCardKey] = useState(0);
  const [statChanges, setStatChanges] = useState<StatChange[]>([]);
  const changeIdRef = useRef(0);

  const getNextCard = useCallback((currentStats: Stats, currentHistory: string[], currentArcs: string[]): Card => {
    // Filter available cards based on conditions
    const availableCards = cards.filter(card => {
      // Skip already shown cards
      if (currentHistory.includes(card.id)) return false;

      // Check conditions
      if (card.conditions) {
        if (card.conditions.completedArcs) {
          const hasAllArcs = card.conditions.completedArcs.every(arc => currentArcs.includes(arc));
          if (!hasAllArcs) return false;
        }
        if (card.conditions.minStats) {
          for (const [key, value] of Object.entries(card.conditions.minStats)) {
            if (currentStats[key as keyof Stats] < (value as number)) return false;
          }
        }
        if (card.conditions.maxStats) {
          for (const [key, value] of Object.entries(card.conditions.maxStats)) {
            if (currentStats[key as keyof Stats] > (value as number)) return false;
          }
        }
      }

      return true;
    });

    if (availableCards.length === 0) {
      // Reset history if we've seen all cards
      const allCards = cards.filter(card => {
        if (card.conditions?.completedArcs) {
          return card.conditions.completedArcs.every(arc => currentArcs.includes(arc));
        }
        if (card.conditions?.minStats) {
          for (const [key, value] of Object.entries(card.conditions.minStats)) {
            if (currentStats[key as keyof Stats] < (value as number)) return false;
          }
        }
        return true;
      });
      
      if (allCards.length > 0) {
        return allCards[Math.floor(Math.random() * allCards.length)];
      }
      return cards[0];
    }

    // Prioritize cards with higher priority
    const priorityCards = availableCards.filter(c => c.priority && c.priority > 50);
    if (priorityCards.length > 0 && Math.random() > 0.3) {
      return priorityCards[Math.floor(Math.random() * priorityCards.length)];
    }

    return availableCards[Math.floor(Math.random() * availableCards.length)];
  }, []);

  const startGame = () => {
    setStats(INITIAL_STATS);
    setTurn(0);
    setHistory([]);
    setCompletedArcs([]);
    setGameOverType('');
    setScreen('game');
    
    const firstCard = getNextCard(INITIAL_STATS, [], []);
    setCurrentCard(firstCard);
    setCardKey(prev => prev + 1);
  };

  const handleChoice = (choice: Choice) => {
    // Play sound based on which choice was made
    const isRightChoice = choice === currentCard?.rightChoice;
    playSwipeSound(isRightChoice ? 'right' : 'left');

    // Apply effects
    const newStats = { ...stats };
    const changes: StatChange[] = [];
    
    for (const [key, value] of Object.entries(choice.effects)) {
      const statKey = key as keyof Stats;
      const numValue = value as number;
      newStats[statKey] = Math.max(0, Math.min(100, newStats[statKey] + numValue));
      if (numValue !== 0) {
        changeIdRef.current += 1;
        changes.push({ key: statKey, value: numValue, id: changeIdRef.current });
      }
    }

    setStatChanges(changes);
    setStats(newStats);
    setTurn(prev => prev + 1);
    setHistory(prev => [...prev, currentCard?.id || '']);

    // Track completed arcs
    if (currentCard?.arcId && !completedArcs.includes(currentCard.arcId)) {
      setCompletedArcs(prev => [...prev, currentCard.arcId!]);
    }

    // Check game over conditions
    const gameOverCheck = checkGameOver(newStats);
    if (gameOverCheck) {
      playGameOverSound();
      setGameOverType(gameOverCheck);
      setScreen('gameover');
      return;
    }

    // Check if reached max turns (ending)
    if (turn + 1 >= MAX_TURNS) {
      setScreen('ending');
      return;
    }

    // Get next card
    const nextCard = getNextCard(newStats, [...history, currentCard?.id || ''], completedArcs);
    setCurrentCard(nextCard);
    setCardKey(prev => prev + 1);
  };

  const checkGameOver = (currentStats: Stats): string | null => {
    if (currentStats.secrecy <= 0) return 'secrecy_low';
    if (currentStats.secrecy >= 100) return 'secrecy_high';
    if (currentStats.influence <= 0) return 'influence_low';
    if (currentStats.influence >= 100) return 'influence_high';
    if (currentStats.chaos <= 0) return 'chaos_low';
    if (currentStats.chaos >= 100) return 'chaos_high';
    if (currentStats.funds <= 0) return 'funds_low';
    if (currentStats.funds >= 100) return 'funds_high';
    return null;
  };

  // Title Screen
  if (screen === 'title') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-gray-950 via-indigo-950 to-black overflow-hidden relative">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* All-seeing eye */}
          <motion.div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
            <svg width="300" height="300" viewBox="0 0 300 300">
              <polygon points="150,30 270,250 30,250" fill="none" stroke="#ffd700" strokeWidth="2" />
              <circle cx="150" cy="180" r="30" fill="none" stroke="#ffd700" strokeWidth="2" />
              <circle cx="150" cy="180" r="10" fill="#ffd700" />
            </svg>
          </motion.div>
          
          {/* Floating symbols */}
          {['👁️', '🔺', '💀', '🗝️', '📜', '🏛️'].map((emoji, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl opacity-20"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>

        {/* Title content */}
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Logo */}
          <motion.div
            className="mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="text-6xl mb-2">👁️</div>
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />
          </motion.div>

          <h1
            className="text-4xl md:text-5xl font-bold text-amber-400 mb-2 tracking-wider"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            ТЕНЬ МИРОВОГО
          </h1>
          <h2
            className="text-3xl md:text-4xl font-bold text-amber-300 mb-4 tracking-wider"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            ПОРЯДКА
          </h2>

          <motion.p
            className="text-gray-400 text-sm max-w-xs mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Управляй тайным обществом. Балансируй между властью и безумием. 
            Каждый выбор имеет последствия.
          </motion.p>

          <motion.button
            onClick={startGame}
            className="bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-bold py-4 px-10 rounded-xl text-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-amber-900/50 border border-amber-500/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ boxShadow: '0 0 30px rgba(217, 119, 6, 0.3)' }}
          >
            ▶ НАЧАТЬ ИГРУ
          </motion.button>

          <motion.div
            className="mt-8 flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {characters.slice(0, 4).map((char, i) => (
              <motion.div
                key={char.id}
                className="text-2xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + i * 0.1 }}
                title={char.name}
              >
                {i === 0 && '🏛️'}
                {i === 1 && '💼'}
                {i === 2 && '🕶️'}
                {i === 3 && '🔮'}
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            className="text-gray-600 text-xs mt-8 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            "Мы не злодеи. Мы — необходимость."
          </motion.p>
        </motion.div>
      </div>
    );
  }

  // Game Over Screen
  if (screen === 'gameover') {
    return <GameOverScreen type={gameOverType} onRestart={startGame} />;
  }

  // Ending Screen
  if (screen === 'ending') {
    return <EndingScreen stats={stats} turn={turn} onRestart={startGame} />;
  }

  // Check if any stat is critical
  const isCritical = Object.values(stats).some(v => v <= 10 || v >= 90);

  // Game Screen
  return (
    <motion.div
      className="min-h-screen flex flex-col bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 overflow-hidden"
      animate={isCritical ? {
        x: [0, -2, 2, -2, 2, 0],
        y: [0, -1, 1, -1, 1, 0],
      } : { x: 0, y: 0 }}
      transition={{ duration: 0.3, repeat: isCritical ? Infinity : 0, repeatDelay: 2 }}
    >
      {/* Header */}
      <div className="pt-4 pb-2">
        <div className="flex justify-between items-center px-4 mb-2">
          <div className="text-gray-500 text-xs">
            Ход: <span className="text-amber-400 font-bold">{turn}</span>/{MAX_TURNS}
          </div>
          <div className="text-gray-500 text-xs">
            {currentCard?.arcId && (
              <span className="text-purple-400">📖 {currentCard.arcId.replace('_', ' ')}</span>
            )}
          </div>
        </div>
        <StatBars stats={stats} changes={statChanges} />
      </div>

      {/* Card area */}
      <div className="flex-1 flex items-center justify-center px-4 py-4">
        <AnimatePresence mode="wait">
          {currentCard && (
            <GameCard
              key={cardKey}
              card={currentCard}
              onChoice={handleChoice}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="pb-4 pt-2 text-center">
        <p className="text-gray-600 text-xs">
          Свайпни карточку ← или → для выбора
        </p>
      </div>
    </motion.div>
  );
}

export default App;
