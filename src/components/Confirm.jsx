import React from "react";

const Confirm = ({ userData, selectedItems, onCancel, onConfirm }) => {
  return (
    <div className="modal">
      <p>이름: {userData.name}</p>
      <p>전화번호: {userData.phoneNumber}</p>
      <p>이메일: {userData.email}</p>
      <p>대여 물품:</p>
      <ul>
        {selectedItems.map((item) => (
          <li key={item.id}>
            {item.name} {item.quantity}
          </li>
        ))}
      </ul>
      <p>기간: {userData.startDate} ~ {userData.endDate}</p>
      <p>위 사용자 정보를 확인하셨나요?</p>
      <button onClick={onCancel}>취소</button>
      <button onClick={onConfirm}>확인</button>
    </div>
  );
};

export default Confirm;