import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import instance from "axios";

const Check = () => {
    const { orderNumber } = useParams(); 
    const [orderData, setOrderData] = useState(null);
    const [error, setError] = useState(null);
  

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await instance.get(
                  `${process.env.REACT_APP_SERVER_PORT}/rental?orderNumber=${orderNumber}`
                );
            setOrderData(response.data);
            console.log(response.data)
          } catch (err) {
            setError("주문 정보가 없습니다.");
            console.error(err);
          }
        };

        fetchOrderData();
    }, []);
  

    return (
        <Container>
          <Info>
            <Label>이름</Label>
            <Value>{orderData.userName}</Value>
          </Info>
          <Info>
            <Label>전화번호</Label>
            <Value>{orderData.phoneNumber}</Value>
          </Info>
          <Info>
            <Label>대여물품</Label>
            <Value>
              {Object.entries(orderData.items).map(([itemName, quantity], index) => (
                <div key={index}>{`${itemName} 외 ${quantity}건`}</div>
              ))}
            </Value>
          </Info>
          <Info>
            <Label>대여 기간</Label>
            <Value>
              {orderData.startDate} ~ {orderData.finishDate}
            </Value>
          </Info>
          <Info>
            <Label>대여 금액</Label>
            <Value>{orderData.price.toLocaleString()}원</Value>
          </Info>
        </Container>
      );
    };
    


export default Check;



const Container = styled.div`
  padding: 10px;
  background-color: #fff;
  border: none;
  width : 320px;
  height : 258px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Label = styled.div`
    color: #626262;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const Value = styled.div`
    color: #000;
    text-align: right;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;
