export const WORD_LENGTH = 5;
export const MAX_GUESSES = 6;

/**
 * Evaluate a guess against the solution using the classic two-pass rules,
 * which handles duplicate letters correctly.
 * Returns an array of 'correct' | 'present' | 'absent' (one per letter).
 */
export function evaluateGuess(guess, solution) {
  const result = Array(WORD_LENGTH).fill('absent');
  const remaining = {}; // unmatched solution letters and their counts

  // Pass 1: exact matches (green)
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guess[i] === solution[i]) {
      result[i] = 'correct';
    } else {
      remaining[solution[i]] = (remaining[solution[i]] || 0) + 1;
    }
  }

  // Pass 2: right letter, wrong slot (yellow), limited by remaining counts
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i] === 'correct') continue;
    const letter = guess[i];
    if (remaining[letter] > 0) {
      result[i] = 'present';
      remaining[letter] -= 1;
    }
  }
  return result;
}

const PRIORITY = { absent: 1, present: 2, correct: 3 };

/**
 * Build a { LETTER: status } map from all past guesses.
 * A key never downgrades (green stays green even if a later guess marks it yellow).
 */
export function getKeyStatuses(pastGuesses, solution) {
  const statuses = {};
  pastGuesses.forEach((guess) => {
    evaluateGuess(guess, solution).forEach((status, i) => {
      const letter = guess[i];
      if (!statuses[letter] || PRIORITY[status] > PRIORITY[statuses[letter]]) {
        statuses[letter] = status;
      }
    });
  });
  return statuses;
}
