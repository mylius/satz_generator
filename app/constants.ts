import { WordBank } from "./types";

export const ANLAUTE = ['M', 'L', 'I', 'O', 'A', 'U', 'R', 'E', 'N', 'T', 'S', 'J', 'EI', 'AU', 'EU', 'H', 'W', 'F', 'CH', 'SCH', 'B', 'D', 'G', 'K', 'P', 'Z', 'V', 'Ä', 'Ö', 'Ü', 'QU', 'X', 'Y'];

export const WORD_BANK: WordBank = {
  names: [
    'Mama', 'Papa', 'Oma', 'Opa', 'Tim', 'Tarzan', 'Lisa',
    'Anna', 'Jonas', 'Tom', 'Lili', 'Linda', 'Maria', 'Pit', 
    'Ines', 'Lena', 'Lara', 'Lars', 'Lina', 'Lotta', 'Zara',
    'Tori', 'Rike', 'Lasse', 'Luisa', 'Luise', 'Luca', 'Peter', 
    'Paul', 'Max', 'Fred', 'Anni', 'Emma', 'Emil', 'Emilia',
    'Erik', 'Erna', 'Ella', 'Eva', 'Evi', 'Edda'
  ],
  nouns: {
    masculine: [
      'Hund', 'Ball', 'Stift', 'Brief', 'Tisch', 'Stuhl', 'Ring',
      'Schlüssel', 'Kuchen', 'Saft', 'Tee', 'Baum', 'Apfel', 'Rest',
      'Vogel', 'Bär', 'Tiger', 'Esel', 'Hund', 'Hase', 'Wal', 'Hai','Hahn',
      'Adler','Egel','Igel','Stier','Emu','Elch'
    ],
    feminine: [
      'Katze', 'Blume', 'Tasche', 'Münze', 'Zeitung', 'Banane',
      'Geschichte', 'Milch', 'Suppe', 'Qualle', 'Maus', 'Ente', 'Gans',
      'Kuh', 'Ziege', 'Biene','Mücke','Fliege','Hummel','Eule'
    ],
    neuter: [
      'Buch', 'Haus', 'Auto', 'Bild', 'Brot', 'Wasser',
      'Spielzeug', 'Geschenk', 'Kind', 'Ei', 'Fahrrad', 'Tier', 
      'Pferd', 'Zebra','Nashorn','Krokodil','Lamm'
    ]
  },
  predicates: [
    'liest', 'malt', 'sucht', 'sieht', 'holt', 'isst', 'trinkt',
    'findet', 'liebt', 'ruft', 'hat', 'spielt', 'schreibt', 'sitzt',
    'geht', 'rennt', 'springt', 'schwimmt', 'tanzt', 'lacht', 'weint',
    'schläft', 'wacht', 'singt', 'zählt', 'baut', 'fährt', 'fliegt',
    'steht', 'klettert', 'fällt', 'wirft', 'fängt', 'stemmt'
  ],
  adverbials: {
    local: [
      'im Haus', 'im Garten', 'am Tisch', 'im Bett', 'im Auto', 
      'im Park', 'im Wald', 'im Zoo', 'am Strand', 'im Bus', 
      'am See', 'im Baum', 'im Zug', 'im Boot'
    ],
    temporal: [
      'heute', 'morgen', 'am Montag', 'am Mittag', 'am Abend',
      'in der Nacht', 'am Morgen', 'am Samstag', 'im Winter',
      'im Sommer', 'früh', 'spät', 'abends', 'an Ostern', 
      'im Juli', 'im August', 'im September', 'im Oktober', 
      'im November', 'im Dezember', 'im Frühling', 'im Herbst', 
      'um drei', 'um vier', 'um fünf', 'um sechs', 'um sieben',
      'um acht', 'um neun', 'um zehn', 'um elf', 'um zwölf', 
      'um eins', 'um zwei'
    ]
  },
  adjectives: {
    regular: [
      'müde', 'klein', 'groß', 'nett', 'laut', 'leise', 'alt',
      'neu', 'blond', 'schlau', 'stark', 'satt', 'nass', 'fett', 
      'sauber', 'schön', 'weich', 'hart', 'dunkel', 'hell', 'warm', 
      'kalt', 'schnell', 'langsam', 'jung', 'klug', 'frech'
    ],
    akkusative: {
      masculine: [
        'kleinen', 'großen', 'alten', 'neuen', 'roten', 'blauen',
        'grünen', 'gelben', 'braunen', 'schwarzen', 'lilanen',
        'rosanen', 'bunten', 'leisen', 'lauten', 'schnellen',
        'langsamen', 'warmen', 'kalten'
      ],
      feminine: [
        'kleine', 'große', 'alte', 'neue', 'rote', 'blaue',
        'grüne', 'gelbe', 'braune', 'schwarze', 'lilane',
        'rosane', 'bunte', 'leise', 'laute', 'schnelle',
        'langsame', 'warme', 'kalte'
      ],
      neuter: [
        'kleine', 'große', 'alte', 'neue', 'rote', 'blaue',
        'grüne', 'gelbe', 'braune', 'schwarze', 'lilane',
        'rosane', 'bunte', 'leise', 'laute', 'schnelle',
        'langsame', 'warme', 'kalte'
      ]
    }
  }
};
