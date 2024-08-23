import React, { useState, useEffect } from 'react';
import instance from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

const Information = ({ orderNumber }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`${process.env.REACT_APP_SERVER_PORT}/rental?orderNumber=${orderNumber}`);
        setData(response.data);
      } catch (error) {
        setError('정보를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orderNumber]);

  const handleCancelRental = async () => {
    try {
      await instance.delete(`${process.env.REACT_APP_SERVER_PORT}/rental?orderNumber=${orderNumber}`);
      alert('대여 신청이 취소되었습니다.');
      navigate('/'); // 성공적으로 취소되면 홈으로 이동
    } catch (error) {
      setError('대여 취소 중 오류가 발생했습니다.');
    }
  };

  if (loading) return <Loading>로딩 중...</Loading>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!data) return <ErrorMessage>데이터 없음</ErrorMessage>;

  return (
    <Container>
      <InfoContainer>
        <Label>이름</Label>
        <Value>{data.userName}</Value>
        <Label>전화번호</Label>
        <Value>{data.phoneNumber}</Value>
        <Label>대여물품</Label>
        <ItemList>
          {Object.entries(data.items).map(([itemId, quantity]) => (
            <li key={itemId}>
              {itemId} - {quantity}개
            </li>
          ))}
        </ItemList>
        <Label>대여 기간</Label>
        <Value>{data.startDate} ~ {data.finishDate}</Value>
        <Label>대여 금액</Label>
        <Value>{data.price ? `${data.price.toLocaleString()} 원` : '가격 정보 없음'}</Value>
      </InfoContainer>
      <ButtonContainer>
        <CancelButton onClick={() => setShowModal(true)}>대여 취소</CancelButton>
        <HomeButton onClick={() => navigate('/')}>홈으로</HomeButton>
      </ButtonContainer>

      {showModal && (
        <Modal>
          <ModalContent>
            <ModalText>대여를 취소하시겠습니까?</ModalText>
            <ButtonGroup>
              <ModalButton onClick={handleCancelRental}>대여 취소</ModalButton>
              <ModalButton onClick={() => setShowModal(false)}>아니오</ModalButton>
            </ButtonGroup>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default Information;

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 390px;
  margin: 0 auto;
  padding-bottom: 20px;
  overflow-y: auto; 
  height: 100%; 
  &::-webkit-scrollbar {
    display: none;
  }
`

const Label = styled.p`
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
`;

const Value = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #000;
  margin-bottom: 12px;
`;

const InfoContainer = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const ItemList = styled.ul`
  font-size: 16px;
  color: #000;
  list-style: none;
  padding: 0;
  margin-bottom: 12px;
`;

const ButtonContainer = styled.div`
margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

const CancelButton = styled.button`
  width: 48%;
  padding: 12px;
  border: 1px solid #1b4ab9;
  background-color: white;
  color: #1b4ab9;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const HomeButton = styled.button`
  width: 48%;
  padding: 12px;
  border: none;
  background-color: #1b4ab9;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #3f6cd5;
  }
`;

const Modal = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  width: 100%;
  max-width: 400px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
`;

const ModalText = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ModalButton = styled.button`
  width: 48%;
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  &:nth-child(1) {
    background-color: #f9f9f9;
    color: #1b4ab9;
    border: 1px solid #1b4ab9;
  }
  &:nth-child(2) {
    background-color: #1b4ab9;
    color: white;
    border: none;
  }
`;

const Loading = styled.div`
  text-align: center;
  font-size: 16px;
  margin-top: 50px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  font-size: 16px;
  color: red;
  margin-top: 50px;
`;
