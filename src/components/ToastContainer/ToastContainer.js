import { useSelector } from 'react-redux';
import { selectToasts } from '../../store/gameStateSlice';
import Toast from '../Toast/Toast';
import styles from './ToastContainer.module.css';

export default function ToastContainer() {
  const toasts = useSelector(selectToasts);

  return (
    <div className={styles.container}>
      {
        toasts.map(toast => (
          <Toast
            key={toast.timestamp}
            msg={toast.msg}
            deleteDelay={toast.deleteDelay}
            timestamp={toast.timestamp}
          />
        ))
      }
    </div>
  )
}