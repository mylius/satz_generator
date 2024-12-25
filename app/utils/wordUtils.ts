import { WORD_BANK } from '../constants';
import { WordBank } from '../types';

export const canMakeWord = (word: string, selectedAnlaute: Set<string>): boolean => {
  if (selectedAnlaute.size === 0) return false;
  
  let remainingWord = word.toLowerCase();
  const sortedAnlaute = [...selectedAnlaute].sort((a, b) => b.length - a.length);
  
  for (const anlaut of sortedAnlaute) {
    remainingWord = remainingWord.replaceAll(anlaut.toLowerCase(), '');
  }
  
  return remainingWord.replace(/[ .,]/g, '').length === 0;
};

export const getValidWordsFromCategory = (category: keyof WordBank, selectedAnlaute: Set<string>) => {
  return WORD_BANK[category].filter((word: string) => canMakeWord(word, selectedAnlaute));
};

