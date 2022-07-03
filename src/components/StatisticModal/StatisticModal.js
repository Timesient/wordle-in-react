import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { 
  selectGameStatus,
  selectCurrentRowIndex
} from '../../store/gameStateSlice';
import {
  selectIsStatisticModalShowing,
  setIsStatisticModalShowing
} from '../../store/switchSlice';
import {
  selectGameStatistic
} from '../../store/gameStatisticSlice';
import ModalContainer from '../ModalContainer/ModalContainer';
import CloseButton from '../CloseButton/CloseButton';
import styles from './StatisticModal.module.css';

export default function StatisticModal() {
  const gamestatus = useSelector(selectGameStatus);
  const currentRowIndex = useSelector(selectCurrentRowIndex);
  const isStatisticModalShowing = useSelector(selectIsStatisticModalShowing);
  const gameStatistic = useSelector(selectGameStatistic);
  const [maxGuessCount, setMaxGuessCount] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [timerText, setTimerText] = useState('');
  const dispatch = useDispatch();

  // calculate max guess in guesses
  useEffect(() => {
    const guesses = gameStatistic.guesses;
    const max = Math.max(guesses[1], guesses[2], guesses[3], guesses[4], guesses[5], guesses[6]);
    setMaxGuessCount(max);
  }, [gameStatistic.guesses]);

  // generate timer text every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const restHour = (23 - now.getHours()).toString().padStart(2, '0');
      const restMinute = (59 - now.getMinutes()).toString().padStart(2, '0');
      const restSecond = (59 - now.getSeconds()).toString().padStart(2, '0');
      const text = `${restHour}:${restMinute}:${restSecond}`;

      setTimerText(text);
      text === '00:00:00' && clearInterval(timer);
    }, 1000);

    return () => {
      clearInterval(timer);
    }
  }, []);

  function handleCloseModal() {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      dispatch(setIsStatisticModalShowing(false));
    }, 180);
  }

  if (!isStatisticModalShowing) return null;

  return (
    <ModalContainer handleCloseModal={handleCloseModal} isClosing={isClosing}>
      <CloseButton extraStyles={{ top: '1rem', right: '1rem', padding: '0' }}/>
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>Statistics</h1>
        <div className={styles.statisticsContainer}>
          <div className={styles.statisticWrapper}>
            <div className={styles.statistic}>{gameStatistic.gamesPlayed}</div>
            <div className={styles.statisticLabel}>Played</div>
          </div>

          <div className={styles.statisticWrapper}>
            <div className={styles.statistic}>{gameStatistic.winPercentage}</div>
            <div className={styles.statisticLabel}>Win %</div>
          </div>

          <div className={styles.statisticWrapper}>
            <div className={styles.statistic}>{gameStatistic.currentStreak}</div>
            <div className={styles.statisticLabel}>Current Streak</div>
          </div>

          <div className={styles.statisticWrapper}>
            <div className={styles.statistic}>{gameStatistic.maxStreak}</div>
            <div className={styles.statisticLabel}>Max Streak</div>
          </div>
        </div>
        <h1 className={styles.title}>Guess distribution</h1>
        {
          gameStatistic.gamesPlayed
          ? (
            <div className={styles.guessDistribution}>
              {
                Array.from({ length: 6 }, (item, index) => {
                  return (
                    <div className={styles.graphContainer}>
                      <div>{index + 1}</div>
                      <div className={styles.graph}>
                        <div
                          className={[
                            styles.graphBar,
                            gameStatistic.guesses[index + 1] ? styles.alignRight : '',
                            gamestatus === 'WIN' && currentRowIndex === index ? styles.highlight : ''
                          ].join(' ')}
                          style={
                            gameStatistic.guesses[index + 1]
                            ? { width: `calc(${gameStatistic.guesses[index + 1] / maxGuessCount * 100}% + 8px)` }
                            : { width: `7%` }
                          }
                        >
                          <div className={styles.numGuesses}>{gameStatistic.guesses[index + 1]}</div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          )
          : <div style={{ marginBottom: '10px' }}>No Data</div>
        }
        {
          gameStatistic.gamesPlayed && gamestatus !== 'IN_PROGRESS' ? (
            <div className={styles.footer}>
              <div className={styles.countdown}>
                <h1 className={styles.title}>Next Wordle</h1>
                <div className={styles.timerContainer}>
                  <span>{timerText}</span>
                </div>
              </div>
              <div className={styles.share}>
                <button className={styles.shareButton}>
                  Share
                  <span className={styles.shareIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" class="game-icon" data-testid="icon-share"><path fill="var(--white)" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"></path></svg>
                  </span>
                </button>
              </div>
            </div>
          ) : null
        }
        <div className={styles.promo}>
          <div className={styles.divider} />
          <a className={styles.promoLink} href="https://www.nytimes.com/puzzles/spelling-bee">
            <div className={styles.promoIcon}><svg width="42" height="44" viewBox="0 0 42 44" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.9528 14.8924L28.952 21.8171L24.9528 28.7417H16.9628L12.9636 21.8171L16.9628 14.8924H24.9528Z" fill="#F7DA21" stroke="#F7DA21" stroke-width="0.495011"></path><path d="M12.9892 21.7667L16.9884 28.6914L12.9892 35.616H4.99921L1 28.6914L4.99921 21.7667H12.9892Z" fill="white" stroke="#121212" stroke-width="1.5"></path><path d="M17.0056 14.8493L13.0064 7.92463L17.0056 1L24.9955 1L28.9948 7.92463L24.9955 14.8493L17.0056 14.8493Z" fill="white" stroke="#121212" stroke-width="1.5"></path><path d="M37.0008 7.96736L41 14.892L37.0008 21.8166H29.0108L25.0116 14.892L29.0108 7.96736H37.0008Z" fill="white" stroke="#121212" stroke-width="1.5"></path><path d="M12.9972 7.96736L16.9964 14.892L12.9972 21.8166H5.00727L1.00806 14.892L5.00727 7.96736H12.9972Z" fill="white" stroke="#121212" stroke-width="1.5"></path><path d="M37.0008 21.8089L41 28.7335L37.0008 35.6582H29.0108L25.0116 28.7335L29.0108 21.8089H37.0008Z" fill="white" stroke="#121212" stroke-width="1.5"></path><path d="M24.9947 28.7333L28.9939 35.658L24.9947 42.5826H17.0047L13.0055 35.658L17.0047 28.7333H24.9947Z" fill="white" stroke="#121212" stroke-width="1.5"></path></svg></div>
            <div className={styles.promoText}>
              <span className={styles.promoTextPrimary}>How many words can you find </span>
              <span>using 7 letters?</span>
              <div className={styles.promoCta}>Play Spelling Bee</div>
            </div>
            <div className={styles.promoArrow}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12" fill="var(--svg-arrow-fill)"></circle><path d="M10.4038 6L15.8076 11.4038L10.4038 16.8076" stroke="var(--svg-arrow-stroke)" stroke-width="1.5" stroke-linecap="round"></path></svg></div>
          </a>
        </div>
      </div>
    </ModalContainer>
  )
}