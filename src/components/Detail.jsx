import React from "react";
import styled from "styled-components";

const Detail = ({ item, onClose }) => {

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };


  return (
    <ModalBackground onClick={handleBackgroundClick}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Header>
          <ImagePlaceholder src={item.img} alt={item.name} />
          <TitleContainer>
            <ItemName>{item.name}</ItemName>
            <ItemPrice>{item.price.toLocaleString()} 원</ItemPrice>
          </TitleContainer>
        </Header>
        <Description>{item.text}</Description>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalContainer>
    </ModalBackground>
  );
};

export default Detail;



export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center; 
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  width: 300px;
  padding: 15px;
  background: white;
  border-radius: 9px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

export const ImagePlaceholder = styled.img`
  width: 70px;
  height: 70px;
  background-color: #e0e0e0;
  margin-right: 15px;
  object-fit: cover;
`;

export const TitleContainer = styled.div`
  justify-content: space-between;
  display: flex;
  width: 100%;
`;

export const ItemName = styled.h2`
  text-align: center;
  font-size: 20px;
  margin: 0;
  flex-shrink: 0;
`;

export const ItemPrice = styled.p`
  color: #000;
  text-align: right;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  flex-shrink: 0;
`;

export const Description = styled.p`
  font-size: 14px;
  color: #333;
  margin: 0 0 15px 0;
  line-height: 1.4;
`;

export const CloseButton = styled.button`
  align-self: flex-end;
  padding: 3px 20px;
  font-size: 14px;
  background: var(--key_1, #1B4AB9);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #003268;
  }
`;