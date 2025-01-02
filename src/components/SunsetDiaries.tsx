import { useEffect, useState } from "react";
import { styled } from "styled-components";
import "leaflet/dist/leaflet.css";
import SunsetMap from "./Map";
import SunsetPanel from "./SunsetPanel";
import { invokeLambda, SunsetItem } from "../util/api";
import Loader from "./Loader";

const Page = styled.div`
  height: 100vh;
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
      const response: SunsetItem[] = await invokeLambda();
      setSunsets(response);

      const map = new Map<string, SunsetItem>();
      if (response.length > 0) {
        response.forEach((item: SunsetItem) => {
          map.set(item.sunsetId, item);
        });
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // fetch data on component load
  useEffect(() => {
    fetchData();
  }, []);

  // loader stuff
  const [loaded, setLoaded] = useState(false);
  const [time, setTime] = useState(false);

  useEffect(() => {
    setLoaded(document.readyState === "complete");
    setTimeout(() => {
      setTime(true);
    }, 3000);
  }, []);

  useEffect(() => {
    if (sunsetIndex < 0) {
      setSunsetIndex(0);
    }
    if (sunsets && sunsetIndex > sunsets.length - 1) {
      setSunsetIndex(sunsets.length - 1);
    }

    if (sunsets && sunsets.length > 0) {
      setSelectedSunset(sunsets[sunsetIndex]);
    }
  }, [sunsetIndex, sunsets]);

  document.onreadystatechange = () => {
    setLoaded(document.readyState === "complete");
  };

  return (
    <>
      <Loader className={loaded && time ? "inactive" : "active"} />
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
    </>
  );
}

export default SunsetDiaries;
