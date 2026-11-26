import Tile from './Tile.jsx';
import { WORD_LENGTH } from '../utils/gameLogic.js';

// `word` is the letters to show; `statuses` is undefined for rows not yet submitted.
export default function Row({ word = '', statuses, shake = false }) {
  return (
    <div className={`row${shake ? ' shake' : ''}`}>
      {Array.from({ length: WORD_LENGTH }, (_, i) => (
        <Tile key={i} letter={word[i] || ''} status={statuses ? statuses[i] : ''} />
      ))}
    </div>
  );
}
