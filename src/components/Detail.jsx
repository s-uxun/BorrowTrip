import React from "react";

const Detail = ({ item, onClose }) => {
  return (
    <div className="modal">
      <img src={item.img} alt={item.name} />
      <h2>{item.name}</h2>
      <p>{item.text}</p>
      <p>{item.price} 원</p>
      <button onClick={onClose}>닫기</button>
    </div>
  );
};

export default Detail;