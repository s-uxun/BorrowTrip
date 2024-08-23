import React from "react";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./fonts/Pretendard.css";
import { createGlobalStyle } from "styled-components";

function App() {
  return (
    <div>
      hello world
    </div>
  );
}
export default App;

const GlobalStyle = createGlobalStyle`
  ${reset}
  #root{
    max-width: 390px;
    height: var(--app-height, 100vh);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: "Pretendard";
    padding: 20px 20px 0;
    background-color: #F9F9F9;
    box-sizing: border-box;
  }
`