import React, { useState } from 'react';
import Information from '../components/Information';
import styled from 'styled-components';
import Back from "../images/Back.svg";
import { useNavigate } from "react-router-dom";

const ListPage = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();

  const handleCheckInfo = () => {
    if (orderNumber) {
      setShowInfo(true);
    } else {
      alert('예약번호를 입력해주세요.');
    }
  };

  return (
    <Wrapper>
      <Header>
        <BackButton onClick={() => navigate("/")}>
        <img src={Back} alt="Back" />
        </BackButton>
        <Title>대여 내역 확인</Title>
      </Header>
      <Description>
        대여 신청 시 이메일로 받은 예약 코드를 작성해 주세요.
      </Description>
      <InputWrapper>
        <Label>예약 코드 : </Label>
        <Input
          type="text"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
        />
        <CheckButton onClick={handleCheckInfo}>확인</CheckButton>
      </InputWrapper>
      
      {showInfo && 
        <Information orderNumber={orderNumber} />
      }
    </Wrapper>
  );
};

export default ListPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 390px;
  height: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  font-family: Pretendard;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  padding: 25px 0;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
`;

const BackButton = styled.div`
  cursor: pointer;
  width: 10px;
  position: absolute;
  left: 0;
  img {
    width: 10px;
    height: 20px;
  }
  margin-left: 20px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  text-align: center;
  margin-bottom: 20px;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  width: 76%;
  box-sizing: border-box;
`;

const Label = styled.label`
  width: 100px;
  font-size: 16px;
  color: #000;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px 0;
  border: none;
  border-bottom: 1px solid #000;
  box-sizing: border-box;
  appearance: none;

  &:focus {
    outline: none;
    border-bottom: 1px solid #1B4AB9;
  }
`;

const CheckButton = styled.button`
  width: 50px;
  height: 30px;
  margin-top: 5px;
  margin-left: 10px;
  background-color: #356df0;
  color: white;
  border: none;
  border-radius: 7px;
  font-size: 14px;
  font-family: pretendard;
  cursor: pointer;
  &:hover {
    background-color: #1B4AB9;
  }
`;

