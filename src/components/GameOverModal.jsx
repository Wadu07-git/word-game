export default function GameOverModal({ gameStatus, solutionWord, guessCount, onRestart }) {
  const won = gameStatus === 'WON';
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <h2>{won ? 'You got it!' : 'Out of guesses'}</h2>
        {won ? (
          <p>
            You found <strong>{solutionWord}</strong> in {guessCount}{' '}
            {guessCount === 1 ? 'guess' : 'guesses'}.
          </p>
        ) : (
          <p>
            The word was <strong className="solution">{solutionWord}</strong>.
          </p>
        )}
        <button type="button" className="primary" onClick={onRestart}>
          Restart Game
        </button>
      </div>
    </div>
  );
}
