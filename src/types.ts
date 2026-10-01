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
  nextCardId?: string;
  gameOver?: {
    type: 'secrecy' | 'influence' | 'chaos' | 'funds';
    direction: 'low' | 'high';
  };
}

export interface Card {
  id: string;
  character: string;
  portrait: string;
  dialogue: string;
  leftChoice: Choice;
  rightChoice: Choice;
  arcId?: string;
  era?: string;
  yearRange?: [number, number]; // [minYear, maxYear]
  priority?: number;
  conditions?: {
    minStats?: Partial<Stats>;
    maxStats?: Partial<Stats>;
    requiredArc?: string;
    completedArcs?: string[];
    requiredEra?: string;
    requiredItem?: string;
    requiredYear?: number;
    maxYear?: number;
  };
}

export interface Character {
  id: string;
  name: string;
  title: string;
  color: string;
  era?: string;
  description?: string;
  activeYears?: [number, number]; // Когда персонаж активен
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
  yearEnd?: number; // Когда правление закончилось
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
  gameOverDirection?: string;
  directorIndex: number;
}

export type GameScreen = 'title' | 'game' | 'gameover' | 'ending' | 'heir' | 'item_get' | 'progress';
