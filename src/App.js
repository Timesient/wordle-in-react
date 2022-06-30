import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectIsRunningEvaluationAnimation,
  selectIsRunningWinAnimation,
  selectIsRunningFailAnimation,
  addWinToast,
  addFailToast,
} from './store/gameStateSlice';
import {
  selectIsDarkTheme,
  selectIsHighContrastMode,
} from './store/switchSlice';
import AppHeader from './components/AppHeader/AppHeader';
import GameContainer from './components/GameContainer/GameContainer';
import NavModal from './components/NavModal/NavModal';
import InstructionPage from './components/Instruction/InstructionPage';
import InstructionModal from './components/Instruction/InstructionModal';
import ToastContainer from './components/ToastContainer/ToastContainer';
import SettingPage from './components/SettingPage/SettingPage';
import styles from './App.module.css';

export default function App() {
  const isRunningEvaluationAnimation = useSelector(selectIsRunningEvaluationAnimation);
  const isRunningWinAnimation = useSelector(selectIsRunningWinAnimation);
  const isRunningFailAnimation = useSelector(selectIsRunningFailAnimation);
  const isDarkTheme = useSelector(selectIsDarkTheme);
  const isHighContrastMode = useSelector(selectIsHighContrastMode);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isRunningEvaluationAnimation && isRunningWinAnimation) {
      dispatch(addWinToast());
    }

    if (!isRunningEvaluationAnimation && isRunningFailAnimation) {
      dispatch(addFailToast());
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
      <ToastContainer />
      <SettingPage />
    </div>
  );
}