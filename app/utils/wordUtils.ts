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


export const getValidSubjects = (selectedAnlaute: Set<string>) => {
  // Get names
  const validNames = WORD_BANK.names.filter(name => 
    canMakeWord(name, selectedAnlaute)
  );

  // Get nouns with articles
  const validNouns = {
    masculine: WORD_BANK.nouns.masculine
      .filter(noun => canMakeWord(noun, selectedAnlaute))
      .map(noun => `Der ${noun}`),
    feminine: WORD_BANK.nouns.feminine
      .filter(noun => canMakeWord(noun, selectedAnlaute))
      .map(noun => `Die ${noun}`),
    neuter: WORD_BANK.nouns.neuter
      .filter(noun => canMakeWord(noun, selectedAnlaute))
      .map(noun => `Das ${noun}`)
  };

  return [
    ...validNames,
    ...validNouns.masculine,
    ...validNouns.feminine,
    ...validNouns.neuter
  ];
};

export const getValidObjects = (selectedAnlaute: Set<string>) => {
  return {
    masculine: WORD_BANK.nouns.masculine.filter(noun => canMakeWord(noun, selectedAnlaute)),
    feminine: WORD_BANK.nouns.feminine.filter(noun => canMakeWord(noun, selectedAnlaute)),
    neuter: WORD_BANK.nouns.neuter.filter(noun => canMakeWord(noun, selectedAnlaute))
  };
};


export const getValidAdjectives = (selectedAnlaute: Set<string>) => {
  return {
    regular: WORD_BANK.adjectives.regular.filter(adj => 
      canMakeWord(adj, selectedAnlaute)
    ),
    akkusative: {
      masculine: WORD_BANK.adjectives.akkusative.masculine.filter(adj => 
        canMakeWord(adj, selectedAnlaute)
      ),
      feminine: WORD_BANK.adjectives.akkusative.feminine.filter(adj => 
        canMakeWord(adj, selectedAnlaute)
      ),
      neuter: WORD_BANK.adjectives.akkusative.neuter.filter(adj => 
        canMakeWord(adj, selectedAnlaute)
      )
    }
  };
};

export const getValidAdverbials = (selectedAnlaute: Set<string>) => {
  return {
    local: WORD_BANK.adverbials.local.filter(adv => 
      canMakeWord(adv, selectedAnlaute)
    ),
    temporal: WORD_BANK.adverbials.temporal.filter(adv => 
      canMakeWord(adv, selectedAnlaute)
    )
  };
};


export const getValidWordsFromCategory = (
  category: keyof WordBank,
  selectedAnlaute: Set<string>
): string[] => {
  const words = WORD_BANK[category];
  
  // Handle simple arrays (names, predicates)
  if (Array.isArray(words)) {
    return words.filter(word => canMakeWord(word, selectedAnlaute));
  }
  
  // Handle nested structures
  switch(category) {
    case 'nouns': {
      // Explicitly handle the nouns structure
      const { masculine, feminine, neuter } = words as {
        masculine: string[];
        feminine: string[];
        neuter: string[];
      };
      return [...masculine, ...feminine, ...neuter].filter(word => 
        canMakeWord(word, selectedAnlaute)
      );
    }
      
    case 'adverbials': {
      const { local, temporal } = words as {
        local: string[];
        temporal: string[];
      };
      return [...local, ...temporal].filter(word => 
        canMakeWord(word, selectedAnlaute)
      );
    }
      
    case 'adjectives': {
      const { regular, akkusative } = words as {
        regular: string[];
        akkusative: {
          masculine: string[];
          feminine: string[];
          neuter: string[];
        };
      };
      return [
        ...regular,
        ...akkusative.masculine,
        ...akkusative.feminine,
        ...akkusative.neuter
      ].filter(word => canMakeWord(word, selectedAnlaute));
    }
      
    default:
      return [];
  }
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

