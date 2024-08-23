import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useItemStore from "../stores/ItemStore";
import Detail from "../components/Detail";
import Confirm from "../components/Confirm";
import instance from "axios";

import Back from "../images/Back.svg";

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

  const handlePhoneNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); 
    if (value.length > 3 && value.length <= 7) {
      value = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else if (value.length > 7) {
      value = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
    }
    setUserData({ ...userData, phoneNumber: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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

  const handleSelectItem = (id) => {
    setSelectedItems((prev) => {
      const newSelection = { ...prev };
      if (newSelection[id]) {
        delete newSelection[id];
      } else {
        newSelection[id] = { quantity: 1 }; 
      }
      return newSelection;
    });
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      setSelectedItems((prev) => ({
        ...prev,
        [id]: { ...prev[id], quantity }
      }));
    } else {
      setSelectedItems((prev) => {
        const newSelection = { ...prev };
        delete newSelection[id]; 
        return newSelection;
      });
    }
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

    if (Object.keys(selectedItems).length === 0) {
      alert("대여 물품을 선택해 주세요.");
      return;
    }

    setShowConfirm(true);
  };

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
      const orderNumber = response.data.orderNumber;
      navigate(`/check/${orderNumber}`);
    } catch (error) {
      console.error("Order submission failed:", error);
    }
  };

  const totalAmount = Object.keys(selectedItems).reduce((total, id) => {
    const item = items.find((item) => item.id === id);
    if (item && selectedItems[id].quantity > 0) {
      return total + item.price * selectedItems[id].quantity;
    }
    return total;
  }, 0);

  return (
    <Wrapper>
      <Header>
        <BackButton onClick={() => navigate("/")}>
        <img src={Back} alt="Back" />
        </BackButton>
        <Title>대여 신청</Title>
      </Header>
      <Container>
      <InputWrapper>
      <Label>이름</Label>
      <Input
        ref={nameRef}
        type="text"
        placeholder="홍길동"
        value={userData.name}
        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        isError={errorFields.name}
      />
    </InputWrapper>
    <InputWrapper>
      <Label>전화번호</Label>
      <Input
        ref={phoneNumberRef}
        type="text"
        placeholder="010-0000-0000"
        value={userData.phoneNumber}
        onChange={handlePhoneNumberChange}
        maxLength={13}
        isError={errorFields.phoneNumber}
      />
    </InputWrapper>
    <InputWrapper>
      <Label>이메일</Label>
      <Input
        ref={emailRef}
        type="email"
        placeholder="000@0000.com"
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        isError={errorFields.email}
      />
    </InputWrapper>
    <DateContainer>
    <Label>대여 기간</Label>
      <DateInput
        ref={startDateRef}
        type="date"
        value={userData.startDate}
        onChange={(e) => setUserData({ ...userData, startDate: e.target.value })}
        isError={errorFields.startDate}
      />
      <Tilde>~</Tilde>
      <DateInput
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
                  −
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
        <Notice>보증금은 보증금표를 확인해주세요. <br/>대여비와 보증금은 픽업 현장에서 결제해주세요. </Notice>
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
    </Wrapper>
  );
};

export default OrderPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  color: #000;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.5px;
  margin: 0; 
`;

const Container = styled.div`
  padding: 20px;
  max-width: 390px;
  margin: 0 ;
  padding-bottom: 20px;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Label = styled.label`
  width: 100px; /* 레이블의 고정 너비 설정 */
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
    border-bottom: 1px solid ${(props) => (props.isError ? "red" : "#1B4AB9")};
  }
`;

const DateInput = styled.input`
  display: flex;
  align-items: center;
`;

const DateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0;
`;

const Tilde = styled.span`
  font-size: 20px;
  margin: 0 13px;
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
  background-color: #356df0;
  color: white;
  border: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #1B4AB9;
  }
`;

const QuantityDisplay = styled.span`
  font-size: 18px;
  margin: 0 7px;
  min-width: 20px;
  text-align: center;
`;

const Checkbox = styled.input`
  margin-right: 10px;
  width: 18px;
  height: 18px;
  border-radius: 4px;
`;

const TotalAmount = styled.div`
  font-size: 18px;
  margin: 40px 0 15px;
  text-align: right;
`;

const SubmitButton = styled.button`
  font-family: Pretendard;
  width: 100%;
  padding: 15px;
  background-color: #356df0;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: #1B4AB9;
  }
`;

const Notice = styled.p`
color: #C3C3C3;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 1.7;
margin-left: 3px;
`;