import styles from './InstructionContent.module.css';

const tileGroupPresets = {
  'weary': [
    { letter: 'w', state: 'correct'},
    { letter: 'e', state: 'normal'},
    { letter: 'a', state: 'normal'},
    { letter: 'r', state: 'normal'},
    { letter: 'y', state: 'normal'},
  ],
  'pills': [
    { letter: 'p', state: 'normal'},
    { letter: 'i', state: 'present'},
    { letter: 'l', state: 'normal'},
    { letter: 'l', state: 'normal'},
    { letter: 's', state: 'normal'},
  ],
  'vague': [
    { letter: 'v', state: 'normal'},
    { letter: 'a', state: 'normal'},
    { letter: 'g', state: 'normal'},
    { letter: 'u', state: 'absent'},
    { letter: 'e', state: 'normal'},
  ],
}


export default function InstructionContent() {
  return (
    <div className={styles.container}>
      <p>Guess the <strong>WORDLE</strong> in six tries.</p>
      <p>Each guess must be a valid five-letter word. Hit the enter button to submit.</p>
      <p>After each guess, the color of the tiles will change to show how close your guess was to the word.</p>
      <div className={styles.exampleContainer}>
        <p><strong>Examples</strong></p>
        <TileGroup preset={tileGroupPresets['weary']} />
        <p>The letter <strong>W</strong> is in the word and in the correct spot.</p>
        <TileGroup preset={tileGroupPresets['pills']} />
        <p>The letter <strong>I</strong> is in the word but in the wrong spot.</p>
        <TileGroup preset={tileGroupPresets['vague']} />
        <p>The letter <strong>U</strong> is not in the word in any spot.</p>
      </div>
      <p><strong>A new WORDLE will be available each day!</strong></p>
    </div>
  )
}

function TileGroup({ preset }) {
  return (
    <div className={styles.tileGroup}>
      { 
        preset.map((tile, index) =>(
          <Tile
            key={`${tile.letter}-${index}`}
            state={tile.state}
          >
            {tile.letter}
          </Tile>
        ))
      }
    </div>
  )
}

function Tile({ children, state }) {

  function handleTileAnimation(node) {
    if (!node || state === 'normal') return;

    node.dataset.animation = 'flip-in-out';

    setTimeout(() => {
      node.dataset.state = state;
    }, 250);
  }

  return (
    <div
      ref={handleTileAnimation}
      className={styles.tileContainer}
      data-state="idle"
      data-animation="none"
    >
      { children }
    </div>
  )
}