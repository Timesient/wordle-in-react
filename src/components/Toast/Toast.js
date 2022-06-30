import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { delToast } from '../../store/gameStateSlice';
import styles from './Toast.module.css';

export default function Toast({ msg, deleteDelay, timestamp }) {
  const [isHidden, setIsHidden] = useState(false);
  const dispatch = useDispatch();

  const handleToastLoaded = (node) => {
    if (!node) return;

    setTimeout(() => {
      setIsHidden(true);
      setTimeout(() => {
        dispatch(delToast(timestamp));
      }, 300);
    }, deleteDelay);
  }

  return (
    <div
      ref={handleToastLoaded}
      className={`${styles.container} ${ isHidden ? styles.hiddenContainer : '' }`}
    >
      { msg }
    </div>
  )
}