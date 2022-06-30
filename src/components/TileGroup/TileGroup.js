import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCurrentRowIndex,
  selectIsRunningInvalidAnimation,
  setIsRunningInvalidAnimation
} from '../../store/gameStateSlice';
import styles from './TileGroup.module.css';

export default function TileGroup({ rowIndex, children }) {
  const [animation, setAnimation] = useState('idle');
  const currentRowIndex = useSelector(selectCurrentRowIndex);
  const isRunningInvalidAnimation = useSelector(selectIsRunningInvalidAnimation);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isRunningInvalidAnimation && rowIndex === currentRowIndex) {
      setAnimation('shake');
      setTimeout(() => {
        setAnimation('idle');
        dispatch(setIsRunningInvalidAnimation(false));
      }, 600);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunningInvalidAnimation]);

  return (
    <div className={styles.container} data-animation={animation}>
      { children }
    </div>
  )
}