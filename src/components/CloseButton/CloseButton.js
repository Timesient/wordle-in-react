import { closeIconSVG } from '../../lib/svgIcons';
import styles from './CloseButton.module.css';

export default function CloseButton({ onClick, extraStyles }) {
  return (
    <span
      className={styles.closeIcon}
      onClick={onClick}
      style={extraStyles}
    >
      {closeIconSVG}
    </span>
  )
}