import styles from './SwitchButton.module.css';

export default function SwitchButton({ isChecked, isDisabled, onClick }) {
  return (
    <div className={`${styles.container} ${isDisabled ? styles.disabled : ''}`}>
      <button className={styles.switch} data-checked={isChecked} onClick={onClick}>
        <span className={styles.knob} data-checked={isChecked} />
      </button>
    </div>
  )
}
