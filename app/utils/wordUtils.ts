import { WORD_BANK } from '../constants';
import { WordBank } from '../types';


const SPECIAL_COMBINATIONS = [
  'SCH',
  'CH',
  'EI',
  'IE', 
  'EU',
  'AU',
  'ÄU',
  'QU'
];


export const canMakeWord = (word: string, selectedAnlaute: Set<string>): boolean => {
  if (selectedAnlaute.size === 0) return false;
  
  let remainingWord = word.toUpperCase();
  const selectedAnlauteUpper = new Set([...selectedAnlaute].map(a => a.toUpperCase()));
  
  for (const combo of SPECIAL_COMBINATIONS) {
    if (remainingWord.includes(combo)) {
      if (!selectedAnlauteUpper.has(combo)) {
          console.log(selectedAnlauteUpper, combo, remainingWord);
        return false;
      }
      // Replace to avoid overlapping SPECIAL_COMBINATIONS
      remainingWord = remainingWord.replaceAll(combo, ' ');
    }
  }
  
  const sortedAnlaute = [...selectedAnlauteUpper].sort((a, b) => b.length - a.length);
  
  for (const anlaut of sortedAnlaute) {
    remainingWord = remainingWord.replaceAll(anlaut, '');
  }
  
  remainingWord = remainingWord.replace(/[ .,]/g, '');
  
  return remainingWord.length === 0;
};


export const getValidWordsFromCategory = (category: keyof WordBank, selectedAnlaute: Set<string>) => {
  return WORD_BANK[category].filter((word: string) => canMakeWord(word, selectedAnlaute));
};

export function hyphenate(text: string) {
  // Split the text into words while preserving punctuation and spacing
  const tokens = text.match(/\b[\w\u00C0-\u00FF]+\b|[^\w\s]|\s+/g) || [];
  
  return tokens.map(token => {
    // If it's whitespace or punctuation, return as is
    if (/^\s+$/.test(token) || /^[^\w\s]$/.test(token)) {
      return token;
    }
    // If it's a word, hyphenate it
    return hyphenateWord(token);
  }).join('');
}

function hyphenateWord(word: string) {
  if (word.length <= 3) return word;

  // Remember if word was capitalized
  const wasCapitalized = word[0] === word[0].toUpperCase();
  const originalWord = word;  // Keep original for double consonant cases
  word = word.toLowerCase();

  const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'y', 'ä', 'ö', 'ü']);
  
  function isVowel(char: string) {
    return vowels.has(char.toLowerCase());
  }

  function isDoubleConsonantAtEnd(str: string) {
    const lastTwo = str.slice(-2);
    return lastTwo.length === 2 && 
           !isVowel(lastTwo[0]) && 
           !isVowel(lastTwo[1]) && 
           lastTwo[0] === lastTwo[1];
  }

  // Return original word (preserving case) for double consonant endings
  if (isDoubleConsonantAtEnd(word)) {
    return originalWord;
  }

  const syllables = [];
  let current = '';
  let i = 0;

  while (i < word.length) {
    current += word[i];
    
    if (isVowel(word[i]) && i + 1 < word.length) {
      const nextChar = word[i + 1];
      
      if (!isVowel(nextChar) && i + 2 < word.length && isVowel(word[i + 2])) {
        syllables.push(current);
        current = '';
      }
      else if (!isVowel(nextChar) && 
               i + 2 < word.length && 
               !isVowel(word[i + 2]) && 
               i + 2 !== word.length - 1) {
        current += nextChar;
        syllables.push(current);
        current = '';
        i++;
      }
    }
    i++;
  }

  if (current) {
    syllables.push(current);
  }

  // Join syllables and handle capitalization
  let result = syllables.join('·');
  if (wasCapitalized) {
    result = result.charAt(0).toUpperCase() + result.slice(1);
  }
  return result;
}

