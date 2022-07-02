import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectGameStatus,
  selectBoardState,
  selectIsRunningInitEvaluationAnimation,
  selectIsRunningEvaluationAnimation,
  setIsRunningInitEvaluationAnimation,
  setIsRunningEvaluationAnimation,
  addLetterOnCurrentRow,
  delLetterOnCurrentRow,
  requestEvaluation
} from '../../store/gameStateSlice';
import { setIsStatisticModalShowing } from '../../store/switchSlice';
import { backspaceIconSVG } from '../../lib/svgIcons';
import styles from './Keyboard.module.css';

const keyboardArrangement = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ''],
  ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'],
];

const initialKeyboardState = keyboardArrangement.map(row => {
  return row.map(key => {
    return {
      key: key,
      evaluation: 'null'
    }
  })
});

const keys = keyboardArrangement.reduce((acc, cur) => acc.concat(cur.filter(key => key !== '')), []);

export default function Keyboard() {
  const [keyboardState, setKeyboardState] = useState(initialKeyboardState);
  const gameStatus = useSelector(selectGameStatus);
  const boardState = useSelector(selectBoardState);
  const isRunningInitEvaluationAnimation = useSelector(selectIsRunningInitEvaluationAnimation);
  const isRunningEvaluationAnimation = useSelector(selectIsRunningEvaluationAnimation);
  const dispatch = useDispatch();

  // handle input from keyboard or button
  const handleKeyInput = useCallback((key) => {
    if (!keys.includes(key)) return;

    switch (key) {
      case 'enter':
        dispatch(requestEvaluation());
        break;
      case 'backspace':
        dispatch(delLetterOnCurrentRow());
        break;
      default:
        dispatch(addLetterOnCurrentRow(key));
        break;
    }
  }, [dispatch]);

  // handle keyboard event
  const handleKeyboardInput = useCallback((e) => {
    const key = String(e.key).toLowerCase();
    handleKeyInput(key);
  }, [handleKeyInput]);

  // handle click event of buttons from the keyboard on screen
  const handleKeyButtonClicked = useCallback((e) => {
    const key = e.target.dataset.key;
    handleKeyInput(key);
  }, [handleKeyInput]);

  // check & update the status of animation; update keyboard state when animation is over
  useEffect(() => {
    if (isRunningInitEvaluationAnimation) {
      setTimeout(() => {
        dispatch(setIsRunningInitEvaluationAnimation(false));
        updateKeyboardState();
        gameStatus !== "IN_PROGRESS" && dispatch(setIsStatisticModalShowing(true));
      }, boardState[0][0].letter ? 1000 : 0);
    }
    
    if (isRunningEvaluationAnimation) {
      setTimeout(() => {
        dispatch(setIsRunningEvaluationAnimation(false));
        updateKeyboardState();
      }, 1800);
    }

    function updateKeyboardState() {
      const evaluatedLetters = boardState.reduce((acc, cur) => {
        cur.forEach(letterConfig => {
          if (!letterConfig.evaluation) return;

          if (acc[letterConfig.letter] === 'correct') return;

          if (acc[letterConfig.letter] === 'present' && letterConfig.evaluation !== 'correct') return;

          acc[letterConfig.letter] = letterConfig.evaluation;
        });

        return acc;
      }, {});
      
      setKeyboardState((state) => {
        return state.map(row => {
          return row.map(keyState => {
            return {
              key: keyState.key,
              evaluation: evaluatedLetters[keyState.key] || 'null'
            }
          })
        });
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunningInitEvaluationAnimation, isRunningEvaluationAnimation]);

  // install keydown event listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardInput);

    return () => {
      document.removeEventListener('keydown', handleKeyboardInput);
    }
  }, [handleKeyboardInput]);

  return (
    <div className={styles.container}>
      {
        keyboardState.map((row, rowIndex) => (
          <div className={styles.row} key={rowIndex}>
            {
              row.map((keyConfig, keyConfigIndex) => {
                const key = keyConfig.key;
                const evaluation = keyConfig.evaluation;
                let keyElement;
        
                switch (key) {
                  case '':
                    keyElement = <span className={styles.halfKeyPlaceholder} key={`halfKeyPlaceholder-${keyConfigIndex}`} />
                    break;
                  case 'enter':
                    keyElement = 
                      <button
                        type="button"
                        data-key="enter"
                        data-state={evaluation}
                        onClick={handleKeyButtonClicked}
                        className={`${styles.key} ${styles.oneAndAHalfKey}`}
                        key="enter"
                      >
                        enter
                      </button>
                    break;
                  case 'backspace':
                    keyElement = 
                      <button
                        type="button"
                        data-key="backspace"
                        data-state={evaluation}
                        onClick={handleKeyButtonClicked}
                        className={`${styles.key} ${styles.oneAndAHalfKey}`}
                        key="backspace"
                      >
                        { backspaceIconSVG }
                      </button>
                    break;
                  default:
                    keyElement = 
                      <button
                        type="button"
                        data-key={key}
                        data-state={evaluation}
                        onClick={handleKeyButtonClicked}
                        className={styles.key}
                        key={key}
                      >
                        {key}
                      </button>
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