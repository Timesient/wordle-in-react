import AppHeader from './components/AppHeader/AppHeader';
import GameContainer from './components/GameContainer/GameContainer';
import NavModal from './components/NavModal/NavModal';
import styles from './App.module.css';
import InstructionPage from './components/Instruction/InstructionPage';

export default function App() {
  return (
    <div className={styles.App}>
      <AppHeader />
      <GameContainer />

      <NavModal />
      <InstructionPage />
    </div>
  );
}