import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import "leaflet/dist/leaflet.css";
import SunsetMap from "./Map";
import SunsetPanel from "./SunsetPanel";
import { getDisplaySunsets, SunsetItem } from "../util/api";

const Page = styled.div`
  height: 100vh;
  width: 100%;

  @media (max-width: 768px) {
    height: calc(100vh - 56px);
  }
`;

const Row = styled.div`
  display: flex;
  height: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SESSION_KEY = "sunset_diaries_current_index";

interface LocationState {
  sunsetIndex?: number;
}

function SunsetDiaries() {
  const location = useLocation();
  const locationState = location.state as LocationState | null;
  const [sunsets, setSunsets] = useState<SunsetItem[]>();
  const [selectedSunset, setSelectedSunset] = useState<SunsetItem>();
  const [sunsetIndex, setSunsetIndex] = useState<number>(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    return stored !== null ? parseInt(stored, 10) : 0;
  });
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: SunsetItem[] = await getDisplaySunsets();
        setSunsets(response);

        if (response.length > 0 && !initialized) {
          setInitialized(true);

          if (locationState?.sunsetIndex !== undefined) {
            const idx = locationState.sunsetIndex;
            if (idx >= 0 && idx < response.length) {
              setSunsetIndex(idx);
              sessionStorage.setItem(SESSION_KEY, idx.toString());
              return;
            }
          }

          const storedIndex = sessionStorage.getItem(SESSION_KEY);
          if (storedIndex !== null) {
            const parsedIndex = parseInt(storedIndex, 10);
            if (!isNaN(parsedIndex) && parsedIndex >= 0 && parsedIndex < response.length) {
              setSunsetIndex(parsedIndex);
              return;
            }
          }

          const randomSunset = Math.floor(Math.random() * response.length);
          setSunsetIndex(randomSunset);
          sessionStorage.setItem(SESSION_KEY, randomSunset.toString());
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!sunsets || sunsets.length === 0 || !initialized) return;
    
    if (locationState?.sunsetIndex !== undefined) {
      const idx = locationState.sunsetIndex;
      if (idx >= 0 && idx < sunsets.length && idx !== sunsetIndex) {
        setSunsetIndex(idx);
        sessionStorage.setItem(SESSION_KEY, idx.toString());
      }
    }
  }, [locationState]);

  useEffect(() => {
    if (sunsets && sunsets.length > 0) {
      let newIndex = sunsetIndex;
      if (sunsetIndex < 0) {
        newIndex = sunsets.length - 1;
      } else if (sunsetIndex > sunsets.length - 1) {
        newIndex = 0;
      }
      if (newIndex !== sunsetIndex) {
        setSunsetIndex(newIndex);
      }
      setSelectedSunset(sunsets[newIndex]);
      sessionStorage.setItem(SESSION_KEY, newIndex.toString());
    }
  }, [sunsetIndex, sunsets]);

  return (
    <Page>
      <Row>
        <SunsetPanel
          sunset={selectedSunset}
          setSunsetIndex={setSunsetIndex}
        />
        <SunsetMap
          sunsets={sunsets ?? []}
          onMarkerClick={setSunsetIndex}
          selectedSunset={selectedSunset}
        />
      </Row>
    </Page>
  );
}

export default SunsetDiaries;
