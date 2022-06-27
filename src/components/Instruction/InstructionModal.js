import { useDispatch, useSelector } from "react-redux";
import { selectIsInstructionModalShowing, setIsInstructionModalShowing } from "../../store/switchSlice";
import ModalContainer from "../ModalContainer/ModalContainer";
import InstructionContent from "./InstructionContent";
import CloseButton from '../CloseButton/CloseButton';
import styles from './InstructionModal.module.css';
import { useState } from "react";

export default function InstructionModal() {
  const isInstructionModalShowing = useSelector(selectIsInstructionModalShowing);
  const [isClosing, setIsClosing] = useState(false);
  const dispatch = useDispatch();

  function handleCloseModal() {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      dispatch(setIsInstructionModalShowing(false));
    }, 180);
  }

  if (!isInstructionModalShowing) return null;

  return (
    <ModalContainer handleCloseModal={handleCloseModal} isClosing={isClosing}>
      <CloseButton extraStyles={{ top: '1rem', right: '1rem' }}/>
      <div className={styles.contentWrapper}>
        <InstructionContent />
      </div>
    </ModalContainer>
  )
}