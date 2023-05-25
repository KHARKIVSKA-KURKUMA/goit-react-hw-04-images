import { Overlay, ModalWindow, Image, CloseButton } from './Modal.styled';
import { AiFillCloseCircle } from '@react-icons/all-files/ai/AiFillCloseCircle';
import React, { useEffect } from 'react';

const Modal = ({ onClose, bigImg }) => {
  useEffect(() => {
    const handleModal = e => {
      if (e.code === 'Escape' || e.currentTarget === e.target) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleModal);
    return () => {
      window.removeEventListener('keydown', handleModal);
    };
  }, [onClose]);

  /* --------------------------------- RENDER --------------------------------- */
  return (
    <Overlay onClick={onClose}>
      <ModalWindow>
        <CloseButton onClick={onClose}>
          <AiFillCloseCircle />
        </CloseButton>
        <Image src={bigImg} alt="big image" />
      </ModalWindow>
    </Overlay>
  );
};

export default Modal;
