import { useDispatch } from 'react-redux';
import { setIsNavModalShowing } from '../../store/switchSlice';

import { menuIconSVG, helpIconSVG, statIconSVG, settingIconSVG } from '../../lib/svgIcons';
import styles from './AppHeader.module.css';

export default function AppHeader() {
  const dispatch = useDispatch();

  return (
    <header className={styles.appHeader}>
      <div className={styles.menuLeft}>
        <button
          className={styles.icon}
          style={{ paddingTop: '2px' }}
          onClick={() => dispatch(setIsNavModalShowing(true))}
        >
          { menuIconSVG }
        </button>
        <button className={styles.icon}>{ helpIconSVG }</button>
      </div>
      <div className={styles.title}>Wordle</div>
      <div className={styles.menuRight}>
        <button className={styles.icon}>{ statIconSVG }</button>
        <button className={styles.icon}>{ settingIconSVG }</button>
      </div>
    </header>
  )
}