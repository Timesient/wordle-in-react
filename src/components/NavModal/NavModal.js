import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsNavModalShowing, setIsNavModalShowing } from '../../store/switchSlice';
import { closeIconSVG, NYTGamesLogoSVG } from '../../lib/svgIcons';
import { gameListContent, nytListContent } from './NavModalPresets';
import styles from './NavModal.module.css';

export default function NavModal() {
  const storeIsNavModalShowing = useSelector(selectIsNavModalShowing);
  const [isClosingContentContainer, setIsClosingContentContainer] = useState(false);
  const dispatch = useDispatch();

  function handleCloseNavModal() {
    setIsClosingContentContainer(true);
    setTimeout(() => {
      setIsClosingContentContainer(false);
      dispatch(setIsNavModalShowing(false));
    }, 180);
  }

  if (!storeIsNavModalShowing) return null;

  return (
    <div className={styles.overlay} onClick={handleCloseNavModal}>
      <div className={`${styles.contentContainer} ${isClosingContentContainer ? styles.closingContentContainer : ''}`}>
        <div className={styles.content}>
          <span className={styles.navHeader}>
            <a href="https://www.nytimes.com/crosswords">{NYTGamesLogoSVG}</a>
          </span>
          <span className={styles.moreText}>More From New York Times Games</span>
        </div>
        <span
          className={styles.closeIcon}
          onClick={handleCloseNavModal}
        >
          {closeIconSVG}
        </span>
        <div className={styles.gameList}>
          {
            gameListContent.map((content, index) => (
              <a aria-label={content.title} href={content.href} className={styles.navLink} key={index}>
                <div className={styles.navItem}>
                  <span className={styles.navIcon} style={{ backgroundImage: `url(${content.iconURL})` }} />
                  <span className={styles.navTitle}>{content.title}</span>
                </div>
              </a>
            ))
          }
        </div>
        <div className={styles.nytList}>
          {
            nytListContent.map((content, index) => (
              <a aria-label={content.title} href={content.href} className={styles.navLink} key={index}>
                <div className={styles.navItem}>
                  <span className={styles.navIcon} style={{ backgroundImage: `url(${content.iconURL})` }} />
                  <span className={styles.navTitle}>{content.title}</span>
                </div>
              </a>
            ))
          }
        </div>
        <div className={styles.privacy}>
          <a className={styles.privacyItem} href="https://www.nytimes.com/privacy/privacy-policy" data-track-label="privacy-policy-nav">Privacy Policy</a>
        </div>
      </div>
    </div>
  )
}