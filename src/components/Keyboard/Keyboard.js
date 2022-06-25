import { backspaceIconSVG } from '../../lib/svgIcons';
import styles from './Keyboard.module.css';

const keys = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ''],
  ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'],
];

export default function Keyboard() {
  return (
    <div className={styles.container}>
      {
        keys.map((row, rowIndex) => (
          <div className={styles.row} key={rowIndex}>
            {
              row.map((key, keyIndex) => {
                let keyElement;
        
                switch (key) {
                  case '':
                    keyElement = <span className={styles.halfKeyPlaceholder} key={`halfKeyPlaceholder-${keyIndex}`} />
                    break;
                  case 'enter':
                    keyElement = <button type='button' data-key={key} className={`${styles.key} ${styles.oneAndAHalfKey}`} key="enter">{key}</button>
                    break;
                  case 'backspace':
                    keyElement =  <button type='button' data-key={key} className={`${styles.key} ${styles.oneAndAHalfKey}`} key="backspace">{ backspaceIconSVG }</button>
                    break;
                  default:
                    keyElement = <button type='button' data-key={key} className={styles.key} key={key}>{key}</button>
                    break;
                }
        
                return keyElement;
              })
            }
          </div>
        ))
      }
    </div>
  )
}