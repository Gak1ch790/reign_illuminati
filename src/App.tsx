import React, { useState, useCallback, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Stats, Card, Choice, GameScreen, Director, Era, Item, MetaProgress } from './types';
import { cards, characters, eras, directors, items } from './data/storyData';
import { loadMetaProgress, updateMetaProgress, checkAchievements } from './utils/metaProgress';
import GameCard from './components/GameCard';
import StatBars from './components/StatBars';
import GameOverScreen from './components/GameOverScreen';
import EndingScreen from './components/EndingScreen';
import HeirScreen from './components/HeirScreen';
import ItemGetScreen from './components/ItemGetScreen';
import ItemDisplay from './components/ItemDisplay';
import ProgressScreen from './components/ProgressScreen';

const INITIAL_STATS: Stats = {
  secrecy: 50,
  influence: 50,
  chaos: 50,
  funds: 50,
};

const MAX_TURNS_PER_DIRECTOR = 15;

interface StatChange {
  key: keyof Stats;
  value: number;
  id: number;
}

// Звуковые эффекты
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
  } catch (e) {}
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

const playItemSound = () => {
  playSound(600, 0.2, 'sine');
  setTimeout(() => playSound(800, 0.3, 'sine'), 150);
};

function App() {
  const [screen, setScreen] = useState<GameScreen>('title');
  const [stats, setStats] = useState<Stats>(INITIAL_STATS);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [turn, setTurn] = useState(0);
  const [totalTurns, setTotalTurns] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [completedArcs, setCompletedArcs] = useState<string[]>([]);
  const [gameOverType, setGameOverType] = useState<string>('');
  const [cardKey, setCardKey] = useState(0);
  const [statChanges, setStatChanges] = useState<StatChange[]>([]);
  const changeIdRef = useRef(0);
  
  // Мета-прогрессия
  const [metaProgress, setMetaProgress] = useState<MetaProgress>(loadMetaProgress());
  
  // Глобальная хронология (не сбрасывается!)
  const [currentEraIndex, setCurrentEraIndex] = useState(0);
  const [currentDirectorIndex, setCurrentDirectorIndex] = useState(0);
  const [currentYear, setCurrentYear] = useState(33);
  const [collectedItems, setCollectedItems] = useState<string[]>([]);
  const [pendingItem, setPendingItem] = useState<Item | null>(null);
  const [previousDirector, setPreviousDirector] = useState<Director | null>(null);

  const getCurrentEra = (): Era => eras[currentEraIndex];
  const getCurrentDirector = (): Director => {
    const era = getCurrentEra();
    const directorId = era.directors[currentDirectorIndex % era.directors.length];
    return directors.find(d => d.id === directorId) || directors[0];
  };

  const getNextCard = useCallback((currentStats: Stats, currentHistory: string[], currentArcs: string[], currentEra: string, currentYear: number, collectedItemsList: string[]): Card => {
    const availableCards = cards.filter(card => {
      if (currentHistory.includes(card.id)) return false;

      // Проверка эпохи
      if (card.era && card.era !== currentEra) return false;

      // Проверка диапазона годов
      if (card.yearRange) {
        const [minYear, maxYear] = card.yearRange;
        if (currentYear < minYear || currentYear > maxYear) return false;
      }

      // Проверка условий
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
      // Если нет карточек для текущей эпохи/года, берём универсальные
      const universalCards = cards.filter(c => !c.era && !currentHistory.includes(c.id));
      if (universalCards.length > 0) {
        return universalCards[Math.floor(Math.random() * universalCards.length)];
      }
      return cards[0];
    }

    // Приоритет карточкам с высоким priority
    const priorityCards = availableCards.filter(c => c.priority && c.priority > 80);
    if (priorityCards.length > 0 && Math.random() > 0.3) {
      return priorityCards[Math.floor(Math.random() * priorityCards.length)];
    }

    return availableCards[Math.floor(Math.random() * availableCards.length)];
  }, []);

  const startGame = () => {
    setStats(INITIAL_STATS);
    setTurn(0);
    setTotalTurns(0);
    setHistory([]);
    setCompletedArcs([]);
    setGameOverType('');
    setCollectedItems([]);
    setPendingItem(null);
    setPreviousDirector(null);
    
    // НЕ сбрасываем эпоху и год — продолжаем глобальный сюжет
    // Но если это первая игра, начинаем с начала
    if (metaProgress.totalGames === 0) {
      setCurrentEraIndex(0);
      setCurrentDirectorIndex(0);
      setCurrentYear(33);
    }
    
    setScreen('heir');
  };

  const startNewGameFromBeginning = () => {
    // Полностью сбросить всё
    setCurrentEraIndex(0);
    setCurrentDirectorIndex(0);
    setCurrentYear(33);
    startGame();
  };

  const startGameplay = () => {
    setScreen('game');
    const era = getCurrentEra();
    const nextCard = getNextCard(INITIAL_STATS, [], [], era.id, currentYear, []);
    setCurrentCard(nextCard);
    setCardKey(prev => prev + 1);
  };

  const handleChoice = (choice: Choice) => {
    const isRightChoice = choice === currentCard?.rightChoice;
    playSwipeSound(isRightChoice ? 'right' : 'left');

    // Применяем эффекты
    const newStats = { ...stats };
    const changes: StatChange[] = [];
    
    // Применяем пассивные эффекты от предметов
    collectedItems.forEach(itemId => {
      const item = items.find(i => i.id === itemId);
      if (item?.passiveEffect) {
        for (const [key, value] of Object.entries(item.passiveEffect)) {
          const statKey = key as keyof Stats;
          const numValue = value as number;
          newStats[statKey] = Math.max(0, Math.min(100, newStats[statKey] + numValue));
        }
      }
    });

    // Применяем эффекты выбора
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
    setTotalTurns(prev => prev + 1);
    setHistory(prev => [...prev, currentCard?.id || '']);

    // Обновляем год (прогрессия времени)
    setCurrentYear(prev => prev + Math.floor(Math.random() * 3) + 1);

    // Проверяем получение предмета
    if (choice.itemReward && !collectedItems.includes(choice.itemReward)) {
      const item = items.find(i => i.id === choice.itemReward);
      if (item) {
        setPendingItem(item);
        setCollectedItems(prev => [...prev, item.id]);
        setTimeout(() => {
          playItemSound();
          setScreen('item_get');
        }, 500);
        return;
      }
    }

    if (currentCard?.arcId && !completedArcs.includes(currentCard.arcId)) {
      setCompletedArcs(prev => [...prev, currentCard.arcId!]);
    }

    // Проверка Game Over
    const gameOverCheck = checkGameOver(newStats);
    if (gameOverCheck) {
      playGameOverSound();
      setGameOverType(gameOverCheck);
      
      // Обновляем мета-прогрессию
      const updatedProgress = updateMetaProgress({
        totalGames: metaProgress.totalGames + 1,
        totalTurns: metaProgress.totalTurns + totalTurns + 1,
        highestYear: Math.max(metaProgress.highestYear, currentYear),
        collectedItems: Array.from(new Set([...metaProgress.collectedItems, ...collectedItems])),
        seenDirectors: Array.from(new Set([...metaProgress.seenDirectors, getCurrentDirector().id])),
        seenCards: Array.from(new Set([...metaProgress.seenCards, ...history, currentCard?.id || ''])),
      });
      
      // Проверяем достижения
      checkAchievements(updatedProgress);
      setMetaProgress(updatedProgress);
      
      setScreen('gameover');
      return;
    }

    // Проверка перехода к следующему директору
    if (turn + 1 >= MAX_TURNS_PER_DIRECTOR) {
      advanceToNextDirector();
      return;
    }

    // Получаем следующую карточку
    const era = getCurrentEra();
    const nextCard = getNextCard(newStats, [...history, currentCard?.id || ''], completedArcs, era.id, currentYear, collectedItems);
    setCurrentCard(nextCard);
    setCardKey(prev => prev + 1);
  };

  const advanceToNextDirector = () => {
    const era = getCurrentEra();
    const nextDirectorIndex = (currentDirectorIndex + 1) % era.directors.length;
    
    // Если прошли всех директоров в эпохе, переходим к следующей эпохе
    if (nextDirectorIndex === 0) {
      const nextEraIndex = (currentEraIndex + 1) % eras.length;
      
      // Обновляем мета-прогрессию
      const updatedProgress = updateMetaProgress({
        completedEras: Array.from(new Set([...metaProgress.completedEras, era.id])),
      });
      setMetaProgress(updatedProgress);
      
      if (nextEraIndex === 0) {
        // Цикл завершён — концовка
        setScreen('ending');
        return;
      }
      setCurrentEraIndex(nextEraIndex);
      setCurrentDirectorIndex(0);
    } else {
      setCurrentDirectorIndex(nextDirectorIndex);
    }

    setPreviousDirector(getCurrentDirector());
    setTurn(0);
    setScreen('heir');
  };

  const handleItemContinue = () => {
    setPendingItem(null);
    setScreen('game');
    
    const era = getCurrentEra();
    const nextCard = getNextCard(stats, history, completedArcs, era.id, currentYear, collectedItems);
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

  const handleGameOverContinue = () => {
    setScreen('progress');
  };

  const handleProgressContinue = () => {
    startNewGameFromBeginning();
  };

  // Title Screen
  if (screen === 'title') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-gray-950 via-indigo-950 to-black overflow-hidden relative">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
          
          {['👁️', '🔺', '💀', '🗝️', '📜', '🏛️', '⚔️', '🎨', '⚙️', '🌐', '🚀'].map((emoji, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl opacity-20"
              style={{
                left: `${10 + i * 8}%`,
                top: `${20 + (i % 4) * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.3,
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

          {metaProgress.totalGames > 0 && (
            <motion.div
              className="mb-6 bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 max-w-xs mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-gray-400 text-xs mb-2">Ваш прогресс:</div>
              <div className="flex justify-between text-sm">
                <span className="text-amber-400">{metaProgress.totalGames} игр</span>
                <span className="text-amber-400">{metaProgress.highestYear} год</span>
              </div>
            </motion.div>
          )}

          <motion.p
            className="text-gray-400 text-sm max-w-xs mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Управляй тайным обществом сквозь века. От Рима до будущего. 
            Каждый директор оставляет след в истории.
          </motion.p>

          <motion.button
            onClick={startGame}
            className="bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-bold py-4 px-10 rounded-xl text-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-amber-900/50 border border-amber-500/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ boxShadow: '0 0 30px rgba(217, 119, 6, 0.3)' }}
          >
            ▶ {metaProgress.totalGames > 0 ? 'ПРОДОЛЖИТЬ' : 'НАЧАТЬ ИГРУ'}
          </motion.button>

          <motion.div
            className="mt-8 flex justify-center gap-3 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {eras.map((era, i) => (
              <motion.div
                key={era.id}
                className="text-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + i * 0.1 }}
                title={era.name}
              >
                {era.ambientEmoji}
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            className="text-gray-600 text-xs mt-8 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            "Орден вечен. Директора приходят и уходят."
          </motion.p>
        </motion.div>
      </div>
    );
  }

  // Heir Screen
  if (screen === 'heir') {
    const era = getCurrentEra();
    const director = getCurrentDirector();
    return (
      <HeirScreen
        director={director}
        era={era}
        previousDirector={previousDirector}
        year={currentYear}
        onContinue={startGameplay}
      />
    );
  }

  // Item Get Screen
  if (screen === 'item_get' && pendingItem) {
    return <ItemGetScreen item={pendingItem} onContinue={handleItemContinue} />;
  }

  // Game Over Screen
  if (screen === 'gameover') {
    return <GameOverScreen type={gameOverType} onContinue={handleGameOverContinue} />;
  }

  // Progress Screen
  if (screen === 'progress') {
    return (
      <ProgressScreen
        progress={metaProgress}
        lastYear={currentYear}
        lastEra={getCurrentEra().id}
        onContinue={handleProgressContinue}
      />
    );
  }

  // Ending Screen
  if (screen === 'ending') {
    return <EndingScreen stats={stats} turn={totalTurns} year={currentYear} eraIndex={currentEraIndex} onRestart={startNewGameFromBeginning} />;
  }

  // Game Screen
  const isCritical = Object.values(stats).some(v => v <= 10 || v >= 90);
  const era = getCurrentEra();
  const collectedItemsList = collectedItems.map(id => items.find(i => i.id === id)).filter(Boolean) as Item[];

  return (
    <motion.div
      className={`min-h-screen flex flex-col bg-gradient-to-b ${era.bgGradient} overflow-hidden relative`}
      animate={isCritical ? {
        x: [0, -2, 2, -2, 2, 0],
        y: [0, -1, 1, -1, 1, 0],
      } : { x: 0, y: 0 }}
      transition={{ duration: 0.3, repeat: isCritical ? Infinity : 0, repeatDelay: 2 }}
    >
      {/* Ambient background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-xl opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            {era.ambientEmoji}
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 pt-4 pb-2">
        <div className="flex justify-between items-center px-4 mb-2">
          <div className="text-gray-400 text-xs">
            <span className="text-amber-400 font-bold">{era.ambientEmoji} {era.name}</span>
            <span className="mx-2">•</span>
            Год <span className="text-amber-400 font-bold">{currentYear}</span>
          </div>
          <div className="text-gray-500 text-xs">
            Ход: <span className="text-amber-400 font-bold">{turn}</span>/{MAX_TURNS_PER_DIRECTOR}
          </div>
        </div>
        <StatBars stats={stats} changes={statChanges} />
        {collectedItemsList.length > 0 && <ItemDisplay items={collectedItemsList} />}
      </div>

      {/* Card area */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-4">
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
      <div className="relative z-10 pb-4 pt-2 text-center">
        <p className="text-gray-600 text-xs">
          Свайпни карточку ← или → для выбора
        </p>
      </div>
    </motion.div>
  );
}

export default App;
