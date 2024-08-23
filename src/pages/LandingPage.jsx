import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Image3 from "../asset/대여 내역.svg";

const mainLogo = `${process.env.PUBLIC_URL}/asset/Landing/로고.svg`;
const Image2 = `${process.env.PUBLIC_URL}/asset/Landing/대여.svg`;
const Image4 = `${process.env.PUBLIC_URL}/asset/Landing/아깝.svg`;
const Image5 = `${process.env.PUBLIC_URL}/asset/Landing/버리.svg`;
const Image6 = `${process.env.PUBLIC_URL}/asset/Landing/바로여행.svg`;
const Image7 = `${process.env.PUBLIC_URL}/asset/Landing/물품신청.svg`;



const LandingPage = () => {
    const navigate = useNavigate();
    const handleNavigateToOrder = () => {
        navigate("/order"); 
      };

      const handleNavigateToList = () => {
        navigate("/list"); 
      };


    return(
    <Container>
        <WhiteBox>
        <Logo> <Img1 src={mainLogo}/></Logo>
        <Img2 src={Image2} alt="대여" />
        <Apply>
            <ApplyButton onClick={handleNavigateToOrder}>대여 신청</ApplyButton>
        </Apply>
        <Check>
            <Img3 src={Image3} alt="대여내역" onClick={handleNavigateToList}></Img3>
        </Check>
        <Text><p>픽업장소</p> <p>Munich Airport Center - Ebene 03</p></Text>
        </WhiteBox>
        <GrayBox>
        <Img4 src={Image4} alt="아깝" />
        <Img5 src={Image5} alt="버리" />
        <Img6 src={Image6} alt="바로여행" />
        </GrayBox>
        <Img7 src={Image7} alt="물품신청" />
        <Apply>
            <ApplyButton>물품 신청</ApplyButton>
        </Apply>
    </Container>
    )
};

export default LandingPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px;
`;

const WhiteBox = styled.div`
  background: var(--Color, #FFF);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 800px;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  width: 100%;
  margin-left: 40px;
  margin-bottom: 50px;
`;


const Apply = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  width: 100%;
  margin-left: 20px;
  margin-bottom: 50px;
  margin-right: 70px;
`;

const ApplyButton = styled.button`
    display: flex;
    width: 100px;
    height: 40px;
    padding: 16px 14px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 4px;
    background: linear-gradient(100deg, #1B4AB9 -2.19%, #0C2153 131.58%);
    box-shadow: -1px -1px 4px 0px rgba(96, 170, 255, 0.25) inset, 1px 1px 4px 0px rgba(85, 158, 255, 0.25) inset;
    color: var(--Color, #FFF);
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;


const Img1 = styled.img`
  margin-bottom: 20px;
  width: 95px;
    height: 58.192px;
    flex-shrink: 0;
`;

const Img2 = styled.img`
  margin-bottom: 20px;
  width: auto;
  height: auto;
`;

const Check = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
`;

const Img3 = styled.img`
  margin-bottom: 20px;
  width: auto;
  height: auto;
  display: block;
`;

const OverlayButton = styled.button`
  position: absolute;
  right: 25px;  /* 버튼을 오른쪽으로 배치 */
  top: 49%;
  width: 100px;
  height: 40px;
  transform: translateY(-50%);  /* 버튼을 수직으로 가운데 정렬 */
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  border-radius: 4px;
    background: var(--Color, #FFF);
    box-shadow: -1px -1px 4px 0px rgba(96, 170, 255, 0.25) inset, 1px 1px 4px 0px rgba(85, 158, 255, 0.25) inset;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Text = styled.div`
display: flex;
width: 340px;
flex-direction: row;
justify-content: space-between;
color: #626262;
text-align: center;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: normal;
`;


const Img4 = styled.img`
  margin-top: 40px;
  width: auto;
  height: auto;
`;

const Img5 = styled.img`
  margin-bottom: 20px;
  width: auto;
  height: auto;
`;

const GrayBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 1250px;
  flex-shrink: 0;
  background: #e9e9e9;
`;

const Img6 = styled.img`
  margin-bottom: 60px;
  width: auto;
  height: auto;
`;

const Img7 = styled.img`
  margin-top: 80px;
  margin-bottom: 80px;
  width: auto;
  height: auto;
`;

