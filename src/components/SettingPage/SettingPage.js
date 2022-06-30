import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectIsSettingPageShowing,
  selectIsDarkTheme,
  selectIsHighContrastMode,
  setIsSettingPageShowing,
  setIsDarkTheme,
  setIsHighContrastMode,
} from '../../store/switchSlice';
import {
  selectGameStatus,
  selectCurrentRowIndex,
  selectIsHardMode,
  setIsHardMode,
  addFailToEnableHardModeToast
} from '../../store/gameStateSlice';
import { getDayOffset } from '../../lib/wordConfig';
import PageContainer from '../PageContainer/PageContainer.js';
import CloseButton from '../CloseButton/CloseButton';
import SwitchButton from '../SwitchButton/SwitchButton';
import styles from './SettingPage.module.css';

export default function SettingPage() {
  const isSettingPageShowing = useSelector(selectIsSettingPageShowing);
  const gameStatus = useSelector(selectGameStatus);
  const currentRowIndex = useSelector(selectCurrentRowIndex);
  const isHardMode = useSelector(selectIsHardMode);
  const isDarkTheme = useSelector(selectIsDarkTheme);
  const isHighContrastMode = useSelector(selectIsHighContrastMode);
  const [isPageClosing, setIsPageClosing] = useState(false);
  const dispatch = useDispatch();

  function handleCloseButtonClicked() {
    setIsPageClosing(true);
    setTimeout(() => {
      setIsPageClosing(false);
      dispatch(setIsSettingPageShowing(false));
    }, 135);
  }

  function handleHardModeSwitchClicked() {
    if (gameStatus === 'IN_PROGRESS' && !isHardMode && currentRowIndex !== 0) {
      dispatch(addFailToEnableHardModeToast());
      return;
    }

    dispatch(setIsHardMode(!isHardMode));
  }

  function handleDarkThemeSwitchClicked() {
    dispatch(setIsDarkTheme(!isDarkTheme));
  }

  function handleHighContrastModeSwitchClicked() {
    dispatch(setIsHighContrastMode(!isHighContrastMode));
  }

  if (!isSettingPageShowing) return null;

  return (
    <PageContainer isClosing={isPageClosing}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.pageTitle}>Settings</h1>
          <CloseButton extraStyles={{ top: '0.335rem', right: '0' }} onClick={handleCloseButtonClicked} />
        </header>
        <div className={styles.contentWrapper}>

          <div className={styles.settingItem}>
            <div className={styles.textGroup}>
              <span className={styles.title}>Hard Mode</span>
              <span className={styles.description}>Any revealed hints must be used in subsequent guesses</span>
            </div>
            <SwitchButton
              isChecked={isHardMode}
              isDisabled={gameStatus === 'IN_PROGRESS' && !isHardMode && currentRowIndex !== 0}
              onClick={handleHardModeSwitchClicked}
            />
          </div>

          <div className={styles.settingItem}>
            <span className={styles.title}>Dark Theme</span>
            <SwitchButton isChecked={isDarkTheme} onClick={handleDarkThemeSwitchClicked} />
          </div>

          <div className={styles.settingItem}>
            <div className={styles.textGroup}>
              <span className={styles.title}>High Contrast Mode</span>
              <span className={styles.description}>For improved color vision</span>
            </div>
            <SwitchButton isChecked={isHighContrastMode} onClick={handleHighContrastModeSwitchClicked} />
          </div>

          <div className={styles.settingItem}>
            <span className={styles.title}>Feedback</span>
            <a className={styles.link} href="mailto:nytgames@nytimes.com?subject=Wordle%20Feedback" title="nytgames@nytimes.com">Email</a>
          </div>

          <div className={styles.settingItem}>
            <span className={styles.title}>Community</span>
            <a
              className={styles.link}
              href="https://twitter.com/NYTGames"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </div>

          <div className={styles.settingItem}>
            <span className={styles.title}>Questions?</span>
            <a
              className={styles.link}
              href="https://help.nytimes.com/hc/en-us/articles/360029050872-Word-Games-and-Logic-Puzzles#h_01FVGCB2Z00ZQMDMCYWBPWJNXB"
              target="_blank"
              rel="noopener noreferrer"
            >
              FAQ
            </a>
          </div>

        </div>
        <footer className={styles.footer}>
          <div>© 2022 The New York Times Company</div>
          <div>{`#${getDayOffset()}`}</div>
        </footer>
      </div>
    </PageContainer>
  )
}

