import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useItemStore from "../stores/ItemStore";
import Detail from "../components/Detail";
import Confirm from "../components/Confirm";
import instance from "axios";

const OrderPage = () => {
  const items = useItemStore((state) => state.items);
  const updateItemQuantity = useItemStore((state) => state.updateItemQuantity);
  const [selectedItems, setSelectedItems] = useState({});
  const [showDetail, setShowDetail] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorFields, setErrorFields] = useState({});

  const [userData, setUserData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    startDate: "",
    endDate: "",
  });

  const nameRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const emailRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const navigate = useNavigate();

  // 전화번호 입력 시 하이픈 자동 추가 및 숫자만 허용
  const handlePhoneNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // 숫자만 허용
    if (value.length > 3 && value.length <= 7) {
      value = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else if (value.length > 7) {
      value = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
    }
    setUserData({ ...userData, phoneNumber: value });
  };

  // 이메일 형식 검증 함수
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 필드 검증 및 경고 메시지 표시
  const validateFields = () => {
    const newErrorFields = {};

    if (!userData.name) {
      newErrorFields.name = true;
      alert("이름을 입력해주세요.");
      nameRef.current.focus();
    } else if (!userData.phoneNumber || userData.phoneNumber.length !== 13) {
      newErrorFields.phoneNumber = true;
      alert("올바른 전화번호를 입력해주세요.");
      phoneNumberRef.current.focus();
    } else if (!validateEmail(userData.email)) {
      newErrorFields.email = true;
      alert("올바른 이메일 형식을 입력해주세요.");
      emailRef.current.focus();
    } else if (!userData.startDate) {
      newErrorFields.startDate = true;
      alert("대여 시작일을 선택해주세요.");
      startDateRef.current.focus();
    } else if (!userData.endDate) {
      newErrorFields.endDate = true;
      alert("대여 종료일을 선택해주세요.");
      endDateRef.current.focus();
    }

    setErrorFields(newErrorFields);
    return Object.keys(newErrorFields).length === 0;
  };

  // 체크박스를 클릭할 때 처리
  const handleSelectItem = (id) => {
    setSelectedItems((prev) => {
      const newSelection = { ...prev };
      if (newSelection[id]) {
        delete newSelection[id];
      } else {
        newSelection[id] = { quantity: 1 }; // 기본 수량 1로 설정
      }
      return newSelection;
    });
  };

  // 수량 변경 처리
  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      setSelectedItems((prev) => ({
        ...prev,
        [id]: { ...prev[id], quantity }
      }));
    } else {
      setSelectedItems((prev) => {
        const newSelection = { ...prev };
        delete newSelection[id]; // 수량이 0 이하이면 선택 해제
        return newSelection;
      });
    }
  };

  // 대여 신청 버튼 클릭 시 검증
  const handleSubmit = async () => {
    if (!validateFields()) return;

    // 선택된 대여 물품이 있는지 확인
    if (Object.keys(selectedItems).length === 0) {
      alert("대여 물품을 선택해 주세요.");
      return;
    }

    setShowConfirm(true);
  };

  // 확인 버튼 클릭 시 API 호출
  const confirmSubmit = async () => {
    const orderData = {
      userName: userData.name,
      phoneNumber: userData.phoneNumber,
      email: userData.email,
      startDate: userData.startDate,
      finishDate: userData.endDate,
      items: Object.keys(selectedItems).reduce((acc, id) => {
        const item = selectedItems[id];
        if (item.quantity > 0) {
          acc[id] = item.quantity;
        }
        return acc;
      }, {}),
    };

    try {
      const response = await instance.post(
        `${process.env.REACT_APP_SERVER_PORT}/rental`,
        orderData
      );

      console.log(response);
      navigate("/list");
    } catch (error) {
      console.error("Order submission failed:", error);
    }
  };

  // 총 금액 계산
  const totalAmount = Object.keys(selectedItems).reduce((total, id) => {
    const item = items.find((item) => item.id === id);
    if (item && selectedItems[id].quantity > 0) {
      return total + item.price * selectedItems[id].quantity;
    }
    return total;
  }, 0);

  return (
    <Container>
      <Title>대여 신청</Title>
      <Input
        ref={nameRef}
        type="text"
        placeholder="이름"
        value={userData.name}
        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        isError={errorFields.name}
      />
      <Input
        ref={phoneNumberRef}
        type="text"
        placeholder="전화번호"
        value={userData.phoneNumber}
        onChange={handlePhoneNumberChange}
        maxLength={13} // 하이픈 포함 13자리 제한
        isError={errorFields.phoneNumber}
      />
      <Input
        ref={emailRef}
        type="email"
        placeholder="이메일"
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        isError={errorFields.email}
      />
      <DateContainer>
        <Input
          ref={startDateRef}
          type="date"
          value={userData.startDate}
          onChange={(e) => setUserData({ ...userData, startDate: e.target.value })}
          isError={errorFields.startDate}
        />
        <Input
          ref={endDateRef}
          type="date"
          value={userData.endDate}
          onChange={(e) => setUserData({ ...userData, endDate: e.target.value })}
          isError={errorFields.endDate}
        />
      </DateContainer>
      {items.map((item) => (
        <ItemContainer key={item.id}>
          <Checkbox
            type="checkbox"
            checked={!!selectedItems[item.id]}
            onChange={() => handleSelectItem(item.id)}
          />
          <span>{item.icon}</span>
          <ItemName onClick={() => setShowDetail(item)}>{item.name}</ItemName>
          {selectedItems[item.id] && (
            <QuantityContainer>
              <QuantityButton
                onClick={() => handleQuantityChange(item.id, selectedItems[item.id].quantity - 1)}
              >
                -
              </QuantityButton>
              <QuantityDisplay>{selectedItems[item.id].quantity}</QuantityDisplay>
              <QuantityButton
                onClick={() => handleQuantityChange(item.id, selectedItems[item.id].quantity + 1)}
              >
                +
              </QuantityButton>
            </QuantityContainer>
          )}
        </ItemContainer>
      ))}
      <TotalAmount>대여 금액: {totalAmount.toLocaleString()} 원</TotalAmount>
      <SubmitButton onClick={handleSubmit}>대여 신청하기</SubmitButton>
      {showDetail && <Detail item={showDetail} onClose={() => setShowDetail(null)} />}
      {showConfirm && (
        <Confirm
          userData={userData}
          selectedItems={items.filter((item) => selectedItems[item.id]?.quantity > 0)}
          onCancel={() => setShowConfirm(false)}
          onConfirm={confirmSubmit}
        />
      )}
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  max-width: 390px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  appearance: none;
  
  &:focus{
    outline: none;
    border: 1px solid ${(props) => (props.isError ? "red" : "blue")};
  }
`;

const DateContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  background-color: #fff;
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
`;

const ItemName = styled.span`
  flex: 1;
  margin-left: 10px;
  font-size: 16px;
  cursor: pointer;
  color: #333;
  &:hover {
    text-decoration: underline;
  }
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  background-color: #3f51b5;
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #303f9f;
  }
`;

const QuantityDisplay = styled.span`
  font-size: 18px;
  margin: 0 15px;
  min-width: 20px;
  text-align: center;
`;

const Checkbox = styled.input`
  margin-right: 10px;
  width: 24px;
  height: 24px;
  border: 2px solid #3f51b5;
  border-radius: 4px;
`;

const TotalAmount = styled.div`
  font-size: 18px;
  margin-top: 20px;
  text-align: right;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: #0056b3;
  }
`;

export default OrderPage;
