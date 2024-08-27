import React from "react";
import { useEffect } from "react";
import { reset } from "styled-reset";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./fonts/Pretendard.css";
import { createGlobalStyle } from "styled-components";

import LandingPage from "./pages/LandingPage.jsx";
import ListPage from "./pages/ListPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import CheckPage from "./pages/CheckPage.jsx";

function App() {

  useEffect(() => {
    const handleResize = () => {
      document.documentElement.style.setProperty(
        "--app-height",
        `${window.innerHeight}px`
      );
    };

    window.addEventListener("resize", handleResize);
    handleResize(); 

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/check/:orderNumber" element={<CheckPage />} />
        </Routes>
      </Router>
    </>
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
    background-color: #fff;
    border: 2px solid #f4f4f4;
  }
`
