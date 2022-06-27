import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsInstructionPageShowing, setIsInstructionPageShowing } from '../../store/switchSlice';
import PageContainer from '../PageContainer/PageContainer';
import CloseButton from '../CloseButton/CloseButton';
import InstructionContent from './InstructionContent';
import styles from './InstructionPage.module.css';

export default function InstructionPage() {
  const isInstructionPageShowing = useSelector(selectIsInstructionPageShowing);
  const [isPageClosing, setIsPageClosing] = useState(false);
  const dispatch = useDispatch();
  
  function handleCloseButtonClicked() {
    setIsPageClosing(true);
    setTimeout(() => {
      setIsPageClosing(false);
      dispatch(setIsInstructionPageShowing(false));
    }, 135);
  }

  if (!isInstructionPageShowing) return null;

  return (
    <PageContainer isClosing={isPageClosing}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>How to play</h1>
          <CloseButton extraStyles={{ top: '0.335rem', right: '0' }} onClick={handleCloseButtonClicked} />
        </header>
        <div className={styles.contentWrapper}>
          <InstructionContent />
        </div>
      </div>
    </PageContainer>
  )
}