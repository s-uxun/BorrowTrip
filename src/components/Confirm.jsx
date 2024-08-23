import React from "react";
import styled from "styled-components";

const Confirm = ({ userData, selectedItems, onCancel, onConfirm }) => {
  
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <ModalBackground onClick={handleBackgroundClick}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Info>
          <Label>이름:</Label>
          <Value>{userData.name}</Value>
        </Info>
        <Info>
          <Label>전화번호:</Label>
          <Value>{userData.phoneNumber}</Value>
        </Info>
        <Info>
          <Label>이메일:</Label>
          <Value>{userData.email}</Value>
        </Info>
        <Info>
          <Label>대여 물품:</Label>
          <Value>
            <ul>
              {selectedItems.map((item) => (
                <li key={item.id}>
                  {item.name} {item.quantity}
                </li>
              ))}
            </ul>
          </Value>
        </Info>
        <Info>
          <Label>기간:</Label>
          <Value>{userData.startDate} ~ {userData.endDate}</Value>
        </Info>
        <Message>위 사용자 정보를 확인하셨나요?</Message>
        <ButtonGroup>
          <CancelButton onClick={onCancel}>취소</CancelButton>
          <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
        </ButtonGroup>
      </ModalContainer>
    </ModalBackground>
  );
};

export default Confirm;



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
  width: 290px;
  height: 50%;
  padding: 37px 25px;
  background: white;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  color: #333;
  border-radius: 4px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.50);
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;  
  margin-bottom: 10px;
  align-items: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal; 
`;

export const Label = styled.span`
  flex-basis: 100px;  
  font-weight: bold;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const Value = styled.span`
  flex: 1;
  text-align: right; 
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  white-space: nowrap;
`

export const Message = styled.p`
  text-align: center;
  margin-top: 15px;
  margin-bottom: 12px;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CancelButton = styled.button`
  flex: 1;
  margin-right: 10px;
  padding: 8px 0;
  background-color: #f5f5f5;
  border-radius: 4px;
  border: 1px solid var(--key_1, #1B4AB9);
  background: #FFF;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const ConfirmButton = styled.button`
  flex: 1;
  padding: 8px 0;
  color: white;
  border: none;
  cursor: pointer;

  border-radius: 4px;
  background: var(--key_1, #1B4AB9);

  &:hover {
    background-color: #0056b3;
  }
`;