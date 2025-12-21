import { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import { HashRouter, Route, Routes } from "react-router-dom";
import SunsetForm from "./components/SunsetForm";
import SunsetDiaries from "./components/SunsetDiaries";
import { Color } from "./constants/constants";
import About from "./components/About";
import NotFound from "./components/NotFound";
import Admin from "./components/Admin";
import Layout from "./components/Layout";
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

const SESSION_KEY = "sunset_diaries_loaded";

function App() {
  const [showLoader, setShowLoader] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [time, setTime] = useState(false);

  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem(SESSION_KEY);
    
    if (!hasLoadedBefore) {
      setShowLoader(true);
      sessionStorage.setItem(SESSION_KEY, "true");
      
      setLoaded(document.readyState === "complete");
      setTimeout(() => {
        setTime(true);
      }, 3000);

      document.onreadystatechange = () => {
        setLoaded(document.readyState === "complete");
      };
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      {showLoader && <Loader className={loaded && time ? "inactive" : "active"} />}
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<SunsetDiaries />} />
            <Route path="/new" element={<SunsetForm />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Layout>
      </HashRouter>
    </>
  );
}

export default App;
