export type WordBank = {
  names: string[];
  nouns: {
    masculine: string[];
    feminine: string[];
    neuter: string[];
  };
  predicates: string[];
  adverbials: {
    local: string[];
    temporal: string[];
  };
  adjectives: {
    regular: string[];
    akkusative: {
      masculine: string[];
      feminine: string[];
      neuter: string[];
    };
  };
};

