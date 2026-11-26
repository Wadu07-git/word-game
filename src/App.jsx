import { useState, useEffect, useCallback, useRef } from 'react';
import GameBoard from './components/GameBoard.jsx';
import Keyboard from './components/Keyboard.jsx';
import GameOverModal from './components/GameOverModal.jsx';
import { getRandomWord } from './utils/words.js';
import { WORD_LENGTH, MAX_GUESSES, getKeyStatuses } from './utils/gameLogic.js';

export default function App() {
  // Centralized game state
  const [solutionWord, setSolutionWord] = useState(() => getRandomWord());
  const [currentGuess, setCurrentGuess] = useState('');
  const [pastGuesses, setPastGuesses] = useState([]);
  const [gameStatus, setGameStatus] = useState('IN_PROGRESS'); // IN_PROGRESS | WON | LOST

  // UI-only state
  const [message, setMessage] = useState('');
  const [shake, setShake] = useState(false);
  const timers = useRef([]);

  const showMessage = useCallback((text) => {
    setMessage(text);
    setShake(true);
    timers.current.push(setTimeout(() => setShake(false), 400));
    timers.current.push(setTimeout(() => setMessage(''), 1500));
  }, []);

  // Single entry point for physical and virtual keyboard input
  const handleKey = useCallback(
    (key) => {
      if (gameStatus !== 'IN_PROGRESS') return; // halt input after win/loss

      if (key === 'BACKSPACE') {
        setCurrentGuess((g) => g.slice(0, -1));
      } else if (key === 'ENTER') {
        if (currentGuess.length < WORD_LENGTH) {
          showMessage('Not enough letters');
          return;
        }
        const updated = [...pastGuesses, currentGuess];
        setPastGuesses(updated);
        setCurrentGuess('');
        if (currentGuess === solutionWord) {
          setGameStatus('WON');
        } else if (updated.length >= MAX_GUESSES) {
          setGameStatus('LOST');
        }
      } else if (/^[A-Z]$/.test(key)) {
        setCurrentGuess((g) => (g.length < WORD_LENGTH ? g + key : g));
      }
    },
    [gameStatus, currentGuess, pastGuesses, solutionWord, showMessage]
  );

  // Physical keyboard listener; re-attached only when handleKey changes, cleaned up each time
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const key = e.key === 'Backspace' ? 'BACKSPACE' : e.key === 'Enter' ? 'ENTER' : e.key.toUpperCase();
      if (key === 'ENTER' || key === 'BACKSPACE' || /^[A-Z]$/.test(key)) {
        e.preventDefault();
        handleKey(key);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleKey]);

  // Clear pending timeouts on unmount
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const restart = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setSolutionWord(getRandomWord());
    setCurrentGuess('');
    setPastGuesses([]);
    setGameStatus('IN_PROGRESS');
    setMessage('');
    setShake(false);
  };

  const keyStatuses = getKeyStatuses(pastGuesses, solutionWord);

  return (
    <div className="app">
      <header>
        <h1>Wordle</h1>
        <p className="subtitle">Guess the 5-letter word in 6 tries</p>
      </header>

      <div className="toast-slot">{message && <div className="toast">{message}</div>}</div>

      <GameBoard
        pastGuesses={pastGuesses}
        currentGuess={currentGuess}
        solutionWord={solutionWord}
        gameStatus={gameStatus}
        shake={shake}
      />

      <Keyboard keyStatuses={keyStatuses} onKey={handleKey} />

      <div className="game-actions">
        <div className="guess-progress" aria-label={`${pastGuesses.length} of ${MAX_GUESSES} guesses used`}>
          {Array.from({ length: MAX_GUESSES }, (_, index) => (
            <span
              key={index}
              className={`progress-dot ${index < pastGuesses.length ? 'used' : ''}`}
              aria-hidden="true"
            />
          ))}
        </div>
        <button type="button" className="restart-button" onClick={restart}>
          Restart Game
        </button>
      </div>

      {gameStatus !== 'IN_PROGRESS' && (
        <GameOverModal
          gameStatus={gameStatus}
          solutionWord={solutionWord}
          guessCount={pastGuesses.length}
          onRestart={restart}
        />
      )}
    </div>
  );
}
