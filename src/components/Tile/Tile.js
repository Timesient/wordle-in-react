/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectIsRunningEvaluationAnimation,
  selectIsRunningWinAnimation,
  selectCurrentRowIndex,
} from '../../store/gameStateSlice';
import styles from './Tile.module.css';

export default function Tile({ rowIndex, tileIndex, evaluation, children }) {
  const [state, setState] = useState(children ? 'tbd' : 'empty');
  const [animation, setAnimation] = useState('idle');
  const isRunningEvaluationAnimation = useSelector(selectIsRunningEvaluationAnimation);
  const isRunningWinAnimation = useSelector(selectIsRunningWinAnimation);
  const currentRowIndex = useSelector(selectCurrentRowIndex);

  // init pop animation
  useEffect(() => {
    state === 'tbd' && setAnimation('pop');
  }, []);

  // init & new evaluation animation
  useEffect(() => {
    if (!evaluation) return;

    const animationDelay = isRunningEvaluationAnimation ? tileIndex * 300 : tileIndex * 100;
    setTimeout(() => {
      setAnimation('flip-in-out');

      setTimeout(() => {
        setState(evaluation);
      }, 250);
    }, 100 + animationDelay);
  }, [evaluation]);

  // win animation
  useEffect(() => {
    if (!isRunningEvaluationAnimation && isRunningWinAnimation && currentRowIndex === rowIndex) {      
      setTimeout(() => {
        setAnimation('bounce');
      }, tileIndex * 100);
    }
  }, [isRunningEvaluationAnimation, isRunningWinAnimation]);

  return (
    <div
      className={styles.container}
      data-state={state}
      data-animation={animation}
    >
      { children }
    </div>
  )
}