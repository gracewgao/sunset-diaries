import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "leaflet/dist/leaflet.css";
import Map, { ILocation } from "./components/Map";
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
      const response: any = await invokeLambda();
      setSunsets(response.items);
      if (response.items.length > 0) {
        setSelectedSunset(response.items[0]);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const locations: ILocation[] =
    sunsets === undefined
      ? []
      : sunsets.map((item) => ({
          lat: item.sunset_location_coords.M?.latitude.N,
          lng: item.sunset_location_coords.M?.longitude.N,
        }));

  return (
    <Page>
      <GlobalStyle />
      <Row>
        <SunsetPanel sunset={selectedSunset} />
        <Map sunsets={locations} />
      </Row>
    </Page>
  );
}

export default App;
