const ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
];

export default function Keyboard({ keyStatuses, onKey }) {
  return (
    <div className="keyboard">
      {ROWS.map((row, r) => (
        <div className="keyboard-row" key={r}>
          {row.map((key) => {
            const wide = key.length > 1;
            const status = keyStatuses[key] || '';
            return (
              <button
                key={key}
                type="button"
                className={`key ${wide ? 'wide' : ''} ${status}`}
                onClick={(e) => {
                  onKey(key);
                  e.currentTarget.blur(); // keep Enter key from re-clicking this button
                }}
                aria-label={key}
              >
                {key === 'BACKSPACE' ? '⌫' : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
