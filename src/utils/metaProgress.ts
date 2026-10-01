import { MetaProgress } from '../types';

const STORAGE_KEY = 'shadow_order_meta_progress';

const defaultProgress: MetaProgress = {
  totalGames: 0,
  totalTurns: 0,
  highestYear: 33,
  completedEras: [],
  collectedItems: [],
  seenDirectors: [],
  seenCards: [],
  unlockedCards: [],
  completedArcs: [],
  branchChoices: {},
  endings: [],
  achievements: [],
};

export const loadMetaProgress = (): MetaProgress => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...defaultProgress, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Failed to load meta progress:', e);
  }
  return { ...defaultProgress };
};

export const saveMetaProgress = (progress: MetaProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save meta progress:', e);
  }
};

export const updateMetaProgress = (updates: Partial<MetaProgress>): MetaProgress => {
  const current = loadMetaProgress();
  const updated = { ...current, ...updates };
  saveMetaProgress(updated);
  return updated;
};

export const resetMetaProgress = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to reset meta progress:', e);
  }
};

export const checkAchievements = (progress: MetaProgress): string[] => {
  const newAchievements: string[] = [];
  
  if (progress.totalGames >= 1 && !progress.achievements.includes('first_game')) {
    newAchievements.push('first_game');
  }
  if (progress.totalGames >= 5 && !progress.achievements.includes('veteran')) {
    newAchievements.push('veteran');
  }
  if (progress.highestYear >= 1000 && !progress.achievements.includes('millennium')) {
    newAchievements.push('millennium');
  }
  if (progress.highestYear >= 2000 && !progress.achievements.includes('modern_era')) {
    newAchievements.push('modern_era');
  }
  if (progress.collectedItems.length >= 5 && !progress.achievements.includes('collector')) {
    newAchievements.push('collector');
  }
  if (progress.collectedItems.length >= 15 && !progress.achievements.includes('hoarder')) {
    newAchievements.push('hoarder');
  }
  if (progress.completedEras.length >= 3 && !progress.achievements.includes('time_traveler')) {
    newAchievements.push('time_traveler');
  }
  if (progress.completedEras.length >= 6 && !progress.achievements.includes('eternal')) {
    newAchievements.push('eternal');
  }
  if (progress.endings.length >= 3 && !progress.achievements.includes('diverse')) {
    newAchievements.push('diverse');
  }
  if (progress.endings.length >= 6 && !progress.achievements.includes('completionist')) {
    newAchievements.push('completionist');
  }
  
  if (newAchievements.length > 0) {
    const updated = {
      ...progress,
      achievements: [...progress.achievements, ...newAchievements],
    };
    saveMetaProgress(updated);
  }
  
  return newAchievements;
};

export const achievementsInfo: Record<string, { name: string; description: string; icon: string }> = {
  first_game: { name: 'Первые шаги', description: 'Сыграйте первую игру', icon: '🎮' },
  veteran: { name: 'Ветеран', description: 'Сыграйте 5 игр', icon: '⭐' },
  millennium: { name: 'Тысячелетие', description: 'Достигните 1000 года', icon: '📅' },
  modern_era: { name: 'Современность', description: 'Достигните 2000 года', icon: '🌐' },
  collector: { name: 'Коллекционер', description: 'Соберите 5 предметов', icon: '💎' },
  hoarder: { name: 'Собиратель', description: 'Соберите 15 предметов', icon: '🏆' },
  time_traveler: { name: 'Путешественник во времени', description: 'Пройдите 3 эпохи', icon: '⏳' },
  eternal: { name: 'Вечный', description: 'Пройдите все 6 эпох', icon: '♾️' },
  diverse: { name: 'Разнообразие', description: 'Получите 3 разные концовки', icon: '🎭' },
  completionist: { name: 'Перфекционист', description: 'Получите все 6 концовок', icon: '👑' },
};
