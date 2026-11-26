import Row from './Row.jsx';
import { MAX_GUESSES, evaluateGuess } from '../utils/gameLogic.js';

export default function GameBoard({ pastGuesses, currentGuess, solutionWord, gameStatus, shake }) {
  const rows = [];
  for (let i = 0; i < MAX_GUESSES; i++) {
    if (i < pastGuesses.length) {
      rows.push(
        <Row key={i} word={pastGuesses[i]} statuses={evaluateGuess(pastGuesses[i], solutionWord)} />
      );
    } else if (i === pastGuesses.length && gameStatus === 'IN_PROGRESS') {
      rows.push(<Row key={i} word={currentGuess} shake={shake} />);
    } else {
      rows.push(<Row key={i} />);
    }
  }
  return <div className="board">{rows}</div>;
}
