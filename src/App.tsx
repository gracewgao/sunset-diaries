import React, { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SunsetForm from "./components/SunsetForm";
import SunsetDiaries from "./components/SunsetDiaries";
import { Color } from "./constants/constants";
import Loader from "./components/Loader";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Inclusive Sans', sans-serif; 
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    background-color: ${Color.BACKGROUND};
    color: ${Color.WARM_GREY};
  }

  html {
    font-size: clamp(14px, 2vw, 14px);
  }
  
  body {
    font-size: 1rem;
  }

.active {
    opacity: 1;
  }

  .inactive {
    opacity: 0;
    display: none;
  }
`;

function App() {

  return (
    <>
      <GlobalStyle />
      <BrowserRouter basename="/sunset-diaries">
        <Routes>
          <Route path="/" element={<SunsetDiaries />} />
          <Route path="/new" element={<SunsetForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
