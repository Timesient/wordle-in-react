
import styles from './PageContainer.module.css';

export default function PageContainer({ children, isClosing }) {
  return (
    <div className={`${styles.container} ${isClosing ? styles.closingContainer : ''}`}>
      { children }
    </div>
  )
}