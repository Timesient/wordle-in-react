import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCurrentRowIndex,
  selectIsRunningEvaluationAnimation,
  selectIsRunningWinAnimation,
  selectIsRunningFailAnimation,
  addWinToast,
  addFailToast,
} from './store/gameStateSlice';
import {
  selectIsDarkTheme,
  selectIsHighContrastMode,
  selectIsInstructionModalShowing,
  setIsInstructionModalShowing,
  setIsStatisticModalShowing,
} from './store/switchSlice';
import {
  updateWinnedGameStatistic,
  updateFailedGameStatistic,
  selectGameStatistic,
} from './store/gameStatisticSlice';

import AppHeader from './components/AppHeader/AppHeader';
import GameContainer from './components/GameContainer/GameContainer';
import NavModal from './components/NavModal/NavModal';
import InstructionPage from './components/Instruction/InstructionPage';
import InstructionModal from './components/Instruction/InstructionModal';
import ToastContainer from './components/ToastContainer/ToastContainer';
import SettingPage from './components/SettingPage/SettingPage';
import styles from './App.module.css';
import StatisticModal from './components/StatisticModal/StatisticModal';

export default function App() {
  const currentRowIndex = useSelector(selectCurrentRowIndex);
  const isRunningEvaluationAnimation = useSelector(selectIsRunningEvaluationAnimation);
  const isRunningWinAnimation = useSelector(selectIsRunningWinAnimation);
  const isRunningFailAnimation = useSelector(selectIsRunningFailAnimation);
  const isDarkTheme = useSelector(selectIsDarkTheme);
  const isHighContrastMode = useSelector(selectIsHighContrastMode);
  const isInstructionModalShowing = useSelector(selectIsInstructionModalShowing);
  const gameStatistic = useSelector(selectGameStatistic);
  const dispatch = useDispatch();

  useEffect(() => {
    // show instruction modal if user is new to wordle
    if (gameStatistic.gamesPlayed === 0 && currentRowIndex === 0) {
      dispatch(setIsInstructionModalShowing(true));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStatistic.gamesPlayed, currentRowIndex]);

  useEffect(() => {
    if (!isRunningEvaluationAnimation && isRunningWinAnimation) {
      dispatch(addWinToast());
      dispatch(updateWinnedGameStatistic(currentRowIndex + 1)); // win and update statistic
      setTimeout(() => {
        isInstructionModalShowing && dispatch(setIsInstructionModalShowing(false));
        dispatch(setIsStatisticModalShowing(true));
      }, 2400);
    }

    if (!isRunningEvaluationAnimation && isRunningFailAnimation) {
      dispatch(addFailToast());
      dispatch(updateFailedGameStatistic()); // fail and update statistic
      setTimeout(() => {
        dispatch(setIsStatisticModalShowing(true));
      }, 2400);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunningEvaluationAnimation, isRunningWinAnimation, isRunningFailAnimation]);

  return (
    <div className={[
      styles.app,
      isHighContrastMode ? styles.highContrastMode : '',
      isDarkTheme ? styles.darkTheme : ''
    ].join(' ')}>
      <AppHeader />
      <GameContainer />

      <NavModal />
      <InstructionPage />
      <InstructionModal />
      <StatisticModal />
      <SettingPage />
      <ToastContainer />
    </div>
  );
}