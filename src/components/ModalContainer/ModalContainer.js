import styles from './ModalContainer.module.css';

export default function ModalContainer({ children, handleCloseModal, isClosing }) {
  return (
    <div className={styles.overlay} onClick={handleCloseModal}>
      <div className={`${styles.contentContainer} ${isClosing ? styles.closingContentContainer : ''}`}>
        { children }
      </div>
    </div>
  )
}