export interface Stats {
  secrecy: number;
  influence: number;
  chaos: number;
  funds: number;
}

export interface Choice {
  text: string;
  effects: Partial<Stats>;
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
  priority?: number;
  conditions?: {
    minStats?: Partial<Stats>;
    maxStats?: Partial<Stats>;
    requiredArc?: string;
    completedArcs?: string[];
  };
}

export interface Character {
  id: string;
  name: string;
  title: string;
  color: string;
}

export interface GameState {
  stats: Stats;
  currentCardId: string;
  currentCharacter: string;
  turn: number;
  history: string[];
  completedArcs: string[];
  gameOver: boolean;
  gameOverType?: string;
  gameOverDirection?: string;
}

export type GameScreen = 'title' | 'game' | 'gameover' | 'ending';
