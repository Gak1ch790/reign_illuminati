export interface Stats {
  secrecy: number;
  influence: number;
  chaos: number;
  funds: number;
}

export interface Choice {
  text: string;
  effects: Partial<Stats>;
  itemReward?: string;
  unlocksCard?: string; // ID карточки, которая разблокируется
  unlocksArc?: string; // ID арки, которая разблокируется
  spawnsCharacter?: string; // ID персонажа-пасхалки, который появится
  nextCardId?: string;
}

export interface Card {
  id: string;
  character: string;
  portrait: string;
  dialogue: string;
  leftChoice: Choice;
  rightChoice: Choice;
  arcId?: string;
  arcStep?: number; // Позиция в арке
  era?: string;
  yearRange?: [number, number];
  priority?: number;
  isBranchPoint?: boolean; // Ключевая развилка
  branchId?: string; // ID развилки для отслеживания выбора
  unlockConditions?: {
    completedArcs?: string[];
    madeChoice?: { branchId: string; choice: 'left' | 'right' };
    collectedItems?: string[];
    minStats?: Partial<Stats>;
    year?: number;
    seenCards?: string[];
  };
  isEasterEgg?: boolean; // Пасхалка
  easterEggCharacter?: string; // Какой персонаж-пасхалка появляется
}

export interface Character {
  id: string;
  name: string;
  title: string;
  color: string;
}

export interface Era {
  id: string;
  name: string;
  year: number;
  yearEnd?: number;
  description: string;
  bgGradient: string;
  ambientEmoji: string;
  directors: string[];
  theme: 'religious' | 'medieval' | 'renaissance' | 'industrial' | 'modern' | 'future';
}

export interface Item {
  id: string;
  name: string;
  description: string;
  icon: string;
  era?: string;
  passiveEffect?: Partial<Stats>;
  rarity: 'common' | 'rare' | 'legendary';
}

export interface Director {
  id: string;
  characterId: string;
  name: string;
  era: string;
  year: number;
  yearEnd?: number;
  backstory: string;
  portrait: string;
  deathReason?: string;
}

export interface MetaProgress {
  totalGames: number;
  totalTurns: number;
  highestYear: number;
  completedEras: string[];
  collectedItems: string[];
  seenDirectors: string[];
  seenCards: string[];
  unlockedCards: string[]; // Разблокированные карточки
  completedArcs: string[]; // Выполненные арки (сохраняются между играми!)
  branchChoices: Record<string, 'left' | 'right'>; // Сделанные выборы на развилках
  endings: string[];
  achievements: string[];
}

export interface GameState {
  stats: Stats;
  currentCardId: string;
  currentDirector: Director;
  turn: number;
  currentYear: number;
  currentEra: string;
  history: string[];
  completedArcs: string[];
  items: string[];
  gameOver: boolean;
  gameOverType?: string;
  directorIndex: number;
}

export type GameScreen = 'title' | 'game' | 'gameover' | 'ending' | 'heir' | 'item_get' | 'progress';
