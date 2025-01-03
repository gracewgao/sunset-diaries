import { createGlobalStyle } from "styled-components";
import { HashRouter, Route, Routes } from "react-router-dom";
import SunsetForm from "./components/SunsetForm";
import SunsetDiaries from "./components/SunsetDiaries";
import { Color } from "./constants/constants";
import About from "./components/About";
import NotFound from "./components/NotFound";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Inclusive Sans', sans-serif; 
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    background-color: ${Color.BACKGROUND};
    color: ${Color.WARM_GREY};
    font-size: 1rem;
  }

  html {
    font-size: clamp(14px, 2vw, 14px);
  }

  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
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
      <HashRouter>
        <Routes>
          <Route path="/" element={<SunsetDiaries />} />
          <Route path="/new" element={<SunsetForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
