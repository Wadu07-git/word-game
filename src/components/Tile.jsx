export default function Tile({ letter = '', status = '' }) {
  // status: '' (empty/typing) | 'correct' | 'present' | 'absent'
  const classes = ['tile'];
  if (letter && !status) classes.push('filled');
  if (status) classes.push(status, 'revealed');
  return <div className={classes.join(' ')}>{letter}</div>;
}
