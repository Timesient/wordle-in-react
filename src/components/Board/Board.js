import { useSelector } from 'react-redux';
import { selectBoardState } from '../../store/gameStateSlice';
import TileGroup from '../TileGroup/TileGroup';
import Tile from '../Tile/Tile';
import styles from './Board.module.css';

export default function Board() {
  const boardState = useSelector(selectBoardState);

  return (
    <div className={styles.container}>
      <div className={styles.boardWrapper}>
        {
          boardState.map((rowContent, rowIndex) => (
            <TileGroup rowIndex={rowIndex} key={rowIndex}>
              {
                rowContent.map((content, tileIndex) => (
                  <Tile
                    rowIndex={rowIndex}
                    tileIndex={tileIndex}
                    evaluation={content.evaluation}
                    key={`${content.letter}-${tileIndex}`}
                  >
                    {content.letter}
                  </Tile>
                ))
              }
            </TileGroup>
          ))
        }
      </div>
    </div>
  )
}