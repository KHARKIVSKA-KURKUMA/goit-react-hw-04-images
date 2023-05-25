import { Overlay, ModalWindow, Image, CloseButton } from './Modal.styled';
import { AiFillCloseCircle } from '@react-icons/all-files/ai/AiFillCloseCircle';
import React, { Component } from 'react';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleModal);
  }

  handleModal = e => {
    if (e.code === 'Escape' || e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <Overlay onClick={this.props.onClose}>
        <ModalWindow>
          <CloseButton onClick={this.props.onClose}>
            <AiFillCloseCircle />
          </CloseButton>
          <Image src={this.props.bigImg} alt="big image" />
        </ModalWindow>
      </Overlay>
    );
  }
}
