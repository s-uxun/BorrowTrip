import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useItemStore from "../stores/ItemStore";
import Detail from "../components/Detail";
import Confirm from "../components/Confirm";
import axios from "axios";


const OrderPage = () => {
  const items = useItemStore((state) => state.items);
  const updateItemQuantity = useItemStore((state) => state.updateItemQuantity);
  const [selectedItems, setSelectedItems] = useState({});
  const [showDetail, setShowDetail] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    startDate: "",
    endDate: "",
  });
  
  const navigate = useNavigate();

  const handleSelectItem = (id) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleQuantityChange = (id, quantity) => {
    updateItemQuantity(id, quantity);
  };

  const handleSubmit = async () => {
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
        if (selectedItems[id]) {
          const item = items.find((item) => item.id === id);
          acc[id] = item.quantity || 0;
        }
        return acc;
      }, {}),
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_PORT}/url`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      navigate("/list");
    } catch (error) {
      console.error("Order submission failed:", error);
    }
  };

  const totalAmount = items.reduce((total, item) => {
    if (selectedItems[item.id]) {
      return total + item.price * (item.quantity || 0);
    }
    return total;
  }, 0);

  return (
    <div>
      <h1>대여 신청</h1>
      <input
        type="text"
        placeholder="이름"
        value={userData.name}
        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="전화번호"
        value={userData.phoneNumber}
        onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
      />
      <input
        type="email"
        placeholder="이메일"
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
      />
      <div>
        <input
          type="date"
          value={userData.startDate}
          onChange={(e) => setUserData({ ...userData, startDate: e.target.value })}
        />
        <input
          type="date"
          value={userData.endDate}
          onChange={(e) => setUserData({ ...userData, endDate: e.target.value })}
        />
      </div>
      {items.map((item) => (
        <div key={item.id} onClick={() => setShowDetail(item)}>
          <span>{item.icon}</span>
          <span>{item.name}</span>
          <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
          <input
            type="number"
            value={item.quantity || 0}
            onChange={(e) => handleQuantityChange(item.id, +e.target.value)}
          />
          <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
          <input
            type="checkbox"
            checked={!!selectedItems[item.id]}
            onChange={() => handleSelectItem(item.id)}
          />
        </div>
      ))}
      <div>대여 금액: {totalAmount} 원</div>
      <button onClick={handleSubmit}>대여 신청하기</button>
      {showDetail && <Detail item={showDetail} onClose={() => setShowDetail(null)} />}
      {showConfirm && (
        <Confirm
          userData={userData}
          selectedItems={items.filter((item) => selectedItems[item.id])}
          onCancel={() => setShowConfirm(false)}
          onConfirm={confirmSubmit}
        />
      )}
    </div>
  );
};

export default OrderPage;