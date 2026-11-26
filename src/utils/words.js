// Pool of possible hidden solution words (all 5 letters, uppercase).
export const WORDS = [
  'APPLE', 'BRAVE', 'CRANE', 'DREAM', 'EAGLE', 'FLAME', 'GRAPE', 'HOUSE',
  'IMAGE', 'JOKER', 'KNIFE', 'LEMON', 'MANGO', 'NIGHT', 'OCEAN', 'PIANO',
  'QUEEN', 'RIVER', 'STONE', 'TIGER', 'UNITY', 'VIVID', 'WATER', 'YOUTH',
  'ZEBRA', 'BEACH', 'CLOUD', 'DANCE', 'EARTH', 'FROST', 'GHOST', 'HEART',
  'LIGHT', 'MUSIC', 'PLANT', 'ROBOT', 'SMILE', 'TRAIN', 'WORLD', 'SPARK',
  'REACT', 'STATE', 'CLASS', 'ARRAY', 'LOGIC', 'INPUT', 'TOKEN', 'QUERY'
];

export function getRandomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}
