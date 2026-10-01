import React, { useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Stats, Card, Choice, GameScreen, Director, Era, Item, MetaProgress } from './types';
import { cards, eras, directors, items } from './data/storyData';
import { loadMetaProgress, updateMetaProgress, checkAchievements } from './utils/metaProgress';
import GameCard from './components/GameCard';
import StatBars from './components/StatBars';
import GameOverScreen from './components/GameOverScreen';
import EndingScreen from './components/EndingScreen';
import HeirScreen from './components/HeirScreen';
import ItemGetScreen from './components/ItemGetScreen';
import ItemDisplay from './components/ItemDisplay';
import ProgressScreen from './components/ProgressScreen';

const INITIAL_STATS: Stats = { secrecy: 50, influence: 50, chaos: 50, funds: 50 };

interface StatChange { key: keyof Stats; value: number; id: number; }

const playSound = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = frequency;
    osc.type = type;
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
};

const playSwipeSound = (dir: 'left' | 'right') => playSound(dir === 'left' ? 200 : 400, 0.15, dir === 'left' ? 'sawtooth' : 'sine');
const playGameOverSound = () => { playSound(150, 0.3, 'sawtooth'); setTimeout(() => playSound(100, 0.5, 'sawtooth'), 200); };
const playItemSound = () => { playSound(600, 0.2, 'sine'); setTimeout(() => playSound(800, 0.3, 'sine'), 150); };

function App() {
  const [screen, setScreen] = useState<GameScreen>('title');
  const [stats, setStats] = useState<Stats>(INITIAL_STATS);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [turn, setTurn] = useState(0);
  const [totalTurns, setTotalTurns] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [gameOverType, setGameOverType] = useState<string>('');
  const [cardKey, setCardKey] = useState(0);
  const [statChanges, setStatChanges] = useState<StatChange[]>([]);
  const changeIdRef = useRef(0);
  
  const [metaProgress, setMetaProgress] = useState<MetaProgress>(loadMetaProgress());
  
  // Глобальная хронология
  const [currentEraIndex, setCurrentEraIndex] = useState(0);
  const [currentDirectorIndex, setCurrentDirectorIndex] = useState(0);
  const [currentYear, setCurrentYear] = useState(33);
  const [collectedItems, setCollectedItems] = useState<string[]>([]);
  const [pendingItem, setPendingItem] = useState<Item | null>(null);
  const [previousDirector, setPreviousDirector] = useState<Director | null>(null);
  
  // Текущая сессия: арки и выборы
  const [sessionArcs, setSessionArcs] = useState<string[]>([]);
  const [branchChoices, setBranchChoices] = useState<Record<string, 'left' | 'right'>>({});

  const getCurrentEra = (): Era => eras[currentEraIndex];
  const getCurrentDirector = (): Director => {
    const era = getCurrentEra();
    const directorId = era.directors[currentDirectorIndex % era.directors.length];
    return directors.find(d => d.id === directorId) || directors[0];
  };

  const isCardAvailable = useCallback((card: Card, currentStats: Stats, currentHistory: string[], currentYear: number, currentEra: string, currentArcs: string[], currentBranchChoices: Record<string, 'left' | 'right'>): boolean => {
    if (currentHistory.includes(card.id)) return false;
    if (card.era && card.era !== currentEra) return false;
    if (card.yearRange) {
      const [minYear, maxYear] = card.yearRange;
      if (currentYear < minYear || currentYear > maxYear) return false;
    }
    if (card.unlockConditions) {
      const uc = card.unlockConditions;
      if (uc.completedArcs && !uc.completedArcs.every(arc => currentArcs.includes(arc))) return false;
      if (uc.madeChoice) {
        const choice = currentBranchChoices[uc.madeChoice.branchId];
        if (choice !== uc.madeChoice.choice) return false;
      }
      if (uc.minStats) {
        for (const [key, value] of Object.entries(uc.minStats)) {
          if (currentStats[key as keyof Stats] < (value as number)) return false;
        }
      }
      if (uc.year && currentYear < uc.year) return false;
      if (uc.seenCards && !uc.seenCards.every(c => currentHistory.includes(c))) return false;
    }
    return true;
  }, []);

  const getNextCard = useCallback((currentStats: Stats, currentHistory: string[], currentEra: string, currentYear: number, currentArcs: string[], currentBranchChoices: Record<string, 'left' | 'right'>): Card => {
    const availableCards = cards.filter(c => isCardAvailable(c, currentStats, currentHistory, currentYear, currentEra, currentArcs, currentBranchChoices));
    
    if (availableCards.length === 0) {
      // Если нет карточек, сбросить историю для текущей эпохи
      const fallback = cards.filter(c => (!c.era || c.era === currentEra) && c.yearRange && currentYear >= c.yearRange[0] && currentYear <= c.yearRange[1]);
      if (fallback.length > 0) return fallback[Math.floor(Math.random() * fallback.length)];
      return cards[0];
    }

    // Приоритет: арки > развилки > обычные
    const arcCards = availableCards.filter(c => c.arcId && c.priority && c.priority >= 90);
    if (arcCards.length > 0 && Math.random() > 0.4) {
      return arcCards[Math.floor(Math.random() * arcCards.length)];
    }
    
    const branchCards = availableCards.filter(c => c.isBranchPoint);
    if (branchCards.length > 0 && Math.random() > 0.6) {
      return branchCards[Math.floor(Math.random() * branchCards.length)];
    }

    const priorityCards = availableCards.filter(c => c.priority && c.priority >= 80);
    if (priorityCards.length > 0 && Math.random() > 0.3) {
      return priorityCards[Math.floor(Math.random() * priorityCards.length)];
    }

    return availableCards[Math.floor(Math.random() * availableCards.length)];
  }, [isCardAvailable]);

  const startGame = () => {
    setStats(INITIAL_STATS);
    setTurn(0);
    setTotalTurns(0);
    setHistory([]);
    setGameOverType('');
    setCollectedItems([]);
    setPendingItem(null);
    setPreviousDirector(null);
    setSessionArcs([...metaProgress.completedArcs]);
    setBranchChoices({...metaProgress.branchChoices});
    
    if (metaProgress.totalGames === 0) {
      setCurrentEraIndex(0);
      setCurrentDirectorIndex(0);
      setCurrentYear(33);
    }
    
    setScreen('heir');
  };

  const startNewGameFromBeginning = () => {
    setCurrentEraIndex(0);
    setCurrentDirectorIndex(0);
    setCurrentYear(33);
    startGame();
  };

  const startGameplay = () => {
    setScreen('game');
    const era = getCurrentEra();
    const nextCard = getNextCard(INITIAL_STATS, [], era.id, currentYear, sessionArcs, branchChoices);
    setCurrentCard(nextCard);
    setCardKey(prev => prev + 1);
  };

  const handleChoice = (choice: Choice) => {
    const isRightChoice = choice === currentCard?.rightChoice;
    playSwipeSound(isRightChoice ? 'right' : 'left');

    const newStats = { ...stats };
    const changes: StatChange[] = [];
    
    // Пассивные эффекты предметов
    collectedItems.forEach(itemId => {
      const item = items.find(i => i.id === itemId);
      if (item?.passiveEffect) {
        for (const [key, value] of Object.entries(item.passiveEffect)) {
          const statKey = key as keyof Stats;
          newStats[statKey] = Math.max(0, Math.min(100, newStats[statKey] + (value as number)));
        }
      }
    });

    // Эффекты выбора
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
    setCurrentYear(prev => prev + Math.floor(Math.random() * 3) + 1);

    // Разблокировка арки
    if (choice.unlocksArc && !sessionArcs.includes(choice.unlocksArc)) {
      setSessionArcs(prev => [...prev, choice.unlocksArc!]);
    }

    // Запись выбора на развилке
    if (currentCard?.isBranchPoint && currentCard?.branchId) {
      const newBranchChoices: Record<string, 'left' | 'right'> = { ...branchChoices, [currentCard.branchId]: isRightChoice ? 'right' : 'left' };
      setBranchChoices(newBranchChoices);
    }

    // Получение предмета
    if (choice.itemReward && !collectedItems.includes(choice.itemReward)) {
      const item = items.find(i => i.id === choice.itemReward);
      if (item) {
        setPendingItem(item);
        setCollectedItems(prev => [...prev, item.id]);
        setTimeout(() => { playItemSound(); setScreen('item_get'); }, 500);
        return;
      }
    }

    // Проверка Game Over
    const gameOverCheck = checkGameOver(newStats);
    if (gameOverCheck) {
      playGameOverSound();
      setGameOverType(gameOverCheck);
      
      const updatedProgress = updateMetaProgress({
        totalGames: metaProgress.totalGames + 1,
        totalTurns: metaProgress.totalTurns + totalTurns + 1,
        highestYear: Math.max(metaProgress.highestYear, currentYear),
        collectedItems: Array.from(new Set([...metaProgress.collectedItems, ...collectedItems])),
        seenDirectors: Array.from(new Set([...metaProgress.seenDirectors, getCurrentDirector().id])),
        seenCards: Array.from(new Set([...metaProgress.seenCards, ...history, currentCard?.id || ''])),
        completedArcs: Array.from(new Set([...metaProgress.completedArcs, ...sessionArcs])),
        branchChoices: { ...metaProgress.branchChoices, ...branchChoices },
      });
      
      checkAchievements(updatedProgress);
      setMetaProgress(updatedProgress);
      setScreen('gameover');
      return;
    }

    // Проверка перехода между эпохами
    const era = getCurrentEra();
    if (era.yearEnd && currentYear > era.yearEnd) {
      advanceToNextEra();
      return;
    }

    const nextCard = getNextCard(newStats, [...history, currentCard?.id || ''], era.id, currentYear, sessionArcs, branchChoices);
    setCurrentCard(nextCard);
    setCardKey(prev => prev + 1);
  };

  const advanceToNextEra = () => {
    const era = getCurrentEra();
    const updatedProgress = updateMetaProgress({
      completedEras: Array.from(new Set([...metaProgress.completedEras, era.id])),
      completedArcs: Array.from(new Set([...metaProgress.completedArcs, ...sessionArcs])),
      branchChoices: { ...metaProgress.branchChoices, ...branchChoices },
    });
    setMetaProgress(updatedProgress);

    const nextEraIndex = currentEraIndex + 1;
    if (nextEraIndex >= eras.length) {
      setScreen('ending');
      return;
    }
    
    setPreviousDirector(getCurrentDirector());
    setCurrentEraIndex(nextEraIndex);
    setCurrentDirectorIndex(0);
    setTurn(0);
    setScreen('heir');
  };

  const handleItemContinue = () => {
    setPendingItem(null);
    setScreen('game');
    const era = getCurrentEra();
    const nextCard = getNextCard(stats, history, era.id, currentYear, sessionArcs, branchChoices);
    setCurrentCard(nextCard);
    setCardKey(prev => prev + 1);
  };

  const checkGameOver = (s: Stats): string | null => {
    if (s.secrecy <= 0) return 'secrecy_low';
    if (s.secrecy >= 100) return 'secrecy_high';
    if (s.influence <= 0) return 'influence_low';
    if (s.influence >= 100) return 'influence_high';
    if (s.chaos <= 0) return 'chaos_low';
    if (s.chaos >= 100) return 'chaos_high';
    if (s.funds <= 0) return 'funds_low';
    if (s.funds >= 100) return 'funds_high';
    return null;
  };

  // Title Screen
  if (screen === 'title') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-gray-950 via-indigo-950 to-black overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}>
            <svg width="300" height="300" viewBox="0 0 300 300">
              <polygon points="150,30 270,250 30,250" fill="none" stroke="#ffd700" strokeWidth="2" />
              <circle cx="150" cy="180" r="30" fill="none" stroke="#ffd700" strokeWidth="2" />
              <circle cx="150" cy="180" r="10" fill="#ffd700" />
            </svg>
          </motion.div>
          {['👁️', '🔺', '💀', '🗝️', '📜', '🏛️', '⚔️', '🎨', '⚙️', '🌐', '🚀'].map((emoji, i) => (
            <motion.div key={i} className="absolute text-xl sm:text-2xl opacity-20" style={{ left: `${10 + i * 8}%`, top: `${20 + (i % 4) * 20}%` }} animate={{ y: [0, -20, 0], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.3 }}>{emoji}</motion.div>
          ))}
        </div>

        <motion.div className="relative z-10 text-center max-w-sm sm:max-w-md" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <motion.div className="mb-4 sm:mb-6" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }}>
            <div className="text-5xl sm:text-6xl mb-2">👁️</div>
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-400 mb-1 sm:mb-2 tracking-wider" style={{ fontFamily: 'Cormorant Garamond, serif' }}>ТЕНЬ МИРОВОГО</h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-300 mb-3 sm:mb-4 tracking-wider" style={{ fontFamily: 'Cormorant Garamond, serif' }}>ПОРЯДКА</h2>

          {metaProgress.totalGames > 0 && (
            <motion.div className="mb-4 sm:mb-6 bg-gray-800/50 border border-gray-700/50 rounded-xl p-3 sm:p-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <div className="text-gray-400 text-xs mb-2">Прогресс:</div>
              <div className="flex justify-between text-sm">
                <span className="text-amber-400">{metaProgress.totalGames} игр</span>
                <span className="text-amber-400">{metaProgress.highestYear} год</span>
                <span className="text-amber-400">{metaProgress.completedArcs.length} арок</span>
              </div>
            </motion.div>
          )}

          <motion.p className="text-gray-400 text-xs sm:text-sm max-w-xs mx-auto mb-6 sm:mb-8 leading-relaxed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            Управляй тайным обществом сквозь века. Каждый выбор имеет последствия.
          </motion.p>

          <motion.button onClick={startGame} className="bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-xl text-base sm:text-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-amber-900/50 border border-amber-500/30 w-full sm:w-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            ▶ {metaProgress.totalGames > 0 ? 'ПРОДОЛЖИТЬ' : 'НАЧАТЬ ИГРУ'}
          </motion.button>

          <motion.div className="mt-6 sm:mt-8 flex justify-center gap-2 sm:gap-3 flex-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
            {eras.map((era, i) => (
              <motion.div key={era.id} className="text-lg sm:text-xl" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 + i * 0.1 }} title={era.name}>{era.ambientEmoji}</motion.div>
            ))}
          </motion.div>

          <motion.p className="text-gray-600 text-xs mt-6 sm:mt-8 italic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>"Орден вечен. Директора приходят и уходят."</motion.p>
        </motion.div>
      </div>
    );
  }

  if (screen === 'heir') {
    return <HeirScreen director={getCurrentDirector()} era={getCurrentEra()} previousDirector={previousDirector} year={currentYear} onContinue={startGameplay} />;
  }

  if (screen === 'item_get' && pendingItem) {
    return <ItemGetScreen item={pendingItem} onContinue={handleItemContinue} />;
  }

  if (screen === 'gameover') {
    return <GameOverScreen type={gameOverType} onContinue={() => setScreen('progress')} />;
  }

  if (screen === 'progress') {
    return <ProgressScreen progress={metaProgress} lastYear={currentYear} lastEra={getCurrentEra().id} onContinue={startGame} />;
  }

  if (screen === 'ending') {
    return <EndingScreen stats={stats} turn={totalTurns} year={currentYear} eraIndex={currentEraIndex} onRestart={startNewGameFromBeginning} />;
  }

  // Game Screen
  const isCritical = Object.values(stats).some(v => v <= 10 || v >= 90);
  const era = getCurrentEra();
  const collectedItemsList = collectedItems.map(id => items.find(i => i.id === id)).filter(Boolean) as Item[];

  return (
    <motion.div className={`min-h-screen flex flex-col bg-gradient-to-b ${era.bgGradient} overflow-hidden relative`} animate={isCritical ? { x: [0, -2, 2, -2, 2, 0] } : { x: 0 }} transition={{ duration: 0.3, repeat: isCritical ? Infinity : 0, repeatDelay: 2 }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div key={i} className="absolute text-lg opacity-10" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} animate={{ y: [0, -20, 0], opacity: [0.05, 0.15, 0.05] }} transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}>{era.ambientEmoji}</motion.div>
        ))}
      </div>

      <div className="relative z-10 pt-3 sm:pt-4 pb-2">
        <div className="flex justify-between items-center px-3 sm:px-4 mb-2">
          <div className="text-gray-400 text-[10px] sm:text-xs">
            <span className="text-amber-400 font-bold">{era.ambientEmoji} {era.name}</span>
            <span className="mx-1 sm:mx-2">•</span>
            <span className="text-amber-400 font-bold">{currentYear}</span>
          </div>
          <div className="text-gray-500 text-[10px] sm:text-xs">
            Ход: <span className="text-amber-400 font-bold">{turn}</span>
          </div>
        </div>
        <StatBars stats={stats} changes={statChanges} />
        {collectedItemsList.length > 0 && <ItemDisplay items={collectedItemsList} />}
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center px-2 sm:px-4 py-2 sm:py-4">
        <AnimatePresence mode="wait">
          {currentCard && <GameCard key={cardKey} card={currentCard} onChoice={handleChoice} />}
        </AnimatePresence>
      </div>

      <div className="relative z-10 pb-3 sm:pb-4 pt-2 text-center">
        <p className="text-gray-600 text-[10px] sm:text-xs">← Свайпни → или нажми</p>
      </div>
    </motion.div>
  );
}

export default App;
