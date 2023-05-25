import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CloseButton = styled.button`
  background-color: transparent;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  right: 15px;
  top: 15px;
  position: absolute;
  svg {
    width: 60px;
    height: 60px;
    fill: #aedf3c;
  }
`;

export const ModalWindow = styled.div`
  padding: 50px;
  max-width: 800px;
  max-height: 800px;
  margin: 0 auto;
  border-radius: 4px;
`;

export const Image = styled.img`
  width: 100%;
  max-height: 100%;
  border-radius: 4px;
`;
