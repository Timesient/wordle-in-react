import AppHeader from './components/AppHeader/AppHeader';
import GameContainer from './components/GameContainer/GameContainer';
import NavModal from './components/NavModal/NavModal';
import styles from './App.module.css';

export default function App() {
  return (
    <div className={styles.App}>
      <AppHeader />
      <GameContainer />

      <NavModal />
    </div>
  );
}