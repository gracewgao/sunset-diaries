import { useEffect, useState } from "react";
import { styled } from "styled-components";
import "leaflet/dist/leaflet.css";
import SunsetMap from "./Map";
import SunsetPanel from "./SunsetPanel";
import { getDisplaySunsets, SunsetItem } from "../util/api";

const Page = styled.div`
  height: 100vh;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  height: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

function SunsetDiaries() {
  const [sunsets, setSunsets] = useState<SunsetItem[]>();
  const [selectedSunset, setSelectedSunset] = useState<SunsetItem>();
  const [sunsetIndex, setSunsetIndex] = useState(0);

  const fetchData = async () => {
    try {
      let response: SunsetItem[] = await getDisplaySunsets();
      setSunsets(response);

      const map = new Map<string, SunsetItem>();
      if (response.length > 0) {
        response.forEach((item: SunsetItem) => {
          map.set(item.sunsetId, item);
        });
        const randomSunset = Math.floor(Math.random() * response.length);
        setSunsetIndex(randomSunset);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (sunsets && sunsetIndex < 0) {
      setSunsetIndex(sunsets.length - 1);
    }
    if (sunsets && sunsetIndex > sunsets.length - 1) {
      setSunsetIndex(0);
    }
    if (sunsets && sunsets.length > 0) {
      setSelectedSunset(sunsets[sunsetIndex]);
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
