import React from 'react';
import { useParams } from 'react-router-dom';
import Information from '../components/Information';
import styled from 'styled-components';
import Back from "../images/Back.svg";
import { useNavigate } from "react-router-dom";

const CheckPage = () => {
  const { orderNumber } = useParams();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Header>
        <BackButton onClick={() => navigate("/")}>
        <img src={Back} alt="Back" />
        </BackButton>
        <Title>대여 신청</Title>
      </Header>
      <Message>대여 신청이 완료되었습니다.</Message>
      <Label>예약번호: </Label>
        <Value>{orderNumber}</Value>
      <Information orderNumber={orderNumber} />
    </Wrapper>
  );
};

export default CheckPage;

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

const Label = styled.p`
  font-size: 15px;
  color: #333;
  margin-bottom: 8px;
`;

const Value = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: #000;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  color: #000;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.5px;
  margin: 0; 
`;


const Message = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 30px;
`;

