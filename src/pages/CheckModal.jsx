import React from "react";
import styled from "styled-components";

const CheckModal = ({ message, onClose }) => {
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalBackground onClick={handleBackgroundClick}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>

      </ModalContainer>
    </ModalBackground>
  );
};

export default CheckModal;


export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  z-index: 1000;
`;


export const ModalContainer = styled.div`
  position: absolute;
  top: 6.5625rem;
  background: white;
  display: flex;
  flex-direction: column;
  border-radius: 1.875rem;
`;
