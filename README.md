# Wordle Clone (React + Vite)

## Run
```
npm install
npm run dev
```
Open the URL printed in the terminal (usually http://localhost:5173).

## Structure
- `src/App.jsx` – centralized state (solutionWord, currentGuess, pastGuesses, gameStatus) and input handling
- `src/components/` – GameBoard, Row, Tile, Keyboard, GameOverModal
- `src/utils/gameLogic.js` – guess evaluation (duplicate-letter safe) and keyboard colour syncing
- `src/utils/words.js` – solution word pool
