import Board from '../Board/Board';
import Keyboard from '../Keyboard/Keyboard';
import styles from './GameContainer.module.css';

export default function GameContainer() {
  return (
    <div className={styles.container}>
      <Board />
      <Keyboard />
    </div>
  )
}