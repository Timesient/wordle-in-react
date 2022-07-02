import { useDispatch } from 'react-redux';
import {
  setIsNavModalShowing,
  setIsInstructionPageShowing,
  setIsStatisticModalShowing,
  setIsSettingPageShowing,
} from '../../store/switchSlice';
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
        <button
          className={styles.icon}
          onClick={() => dispatch(setIsInstructionPageShowing(true))}
        >
          { helpIconSVG }
        </button>
      </div>
      <div className={styles.title}>Wordle</div>
      <div className={styles.menuRight}>
        <button
          className={styles.icon}
          onClick={() => dispatch(setIsStatisticModalShowing(true))}
        >
          { statIconSVG }
        </button>
        <button
          className={styles.icon}
          onClick={() => dispatch(setIsSettingPageShowing(true))}
        >
          { settingIconSVG }
        </button>
      </div>
    </header>
  )
}