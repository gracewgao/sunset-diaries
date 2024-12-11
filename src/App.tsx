import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import SunsetMap from "./components/Map";
import { createGlobalStyle, styled } from "styled-components";
import SunsetPanel from "./components/SunsetPanel";
import { Color } from "./constants/constants";
import { invokeLambda, SunsetItem } from "./util/api";

const Page = styled.div`
  height: 100vh;
`;

const Row = styled.div`
  display: flex;
  height: 100%;
`;

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Inclusive Sans', sans-serif; 
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    background-color: ${Color.BACKGROUND};
  }
`;

function App() {
  const [sunsets, setSunsets] = useState<SunsetItem[]>();
  const [selectedSunset, setSelectedSunset] = useState<SunsetItem>();

  const fetchData = async () => {
    try {
      const response: SunsetItem[] = await invokeLambda();
      setSunsets(response);

      const map = new Map<string, SunsetItem>();
      if (response.length > 0) {
        response.forEach((item: SunsetItem) => {
          map.set(item.sunsetId, item);
        });
        setSelectedSunset(response[0]);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // fetch data on component load
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Page>
      <GlobalStyle />
      <Row>
        <SunsetPanel sunset={selectedSunset} />
        <SunsetMap sunsets={sunsets ?? []} onMarkerClick={setSelectedSunset} selectedSunset={selectedSunset} />
      </Row>
    </Page>
  );
}

export default App;
