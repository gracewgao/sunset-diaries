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

  // loader stuff
  const [loaded, setLoaded] = useState(false);
  const [time, setTime] = useState(false);

  useEffect(() => {
    setLoaded(document.readyState === "complete");
    setTimeout(() => {
      setTime(true);
    }, 3000);
  }, []);

  document.onreadystatechange = () => {
    setLoaded(document.readyState === "complete");
  };

  return (
    <>
      <Loader className={loaded && time ? "inactive" : "active"} />
      <Page>
        <Row>
          <SunsetPanel sunset={selectedSunset} />
          <SunsetMap
            sunsets={sunsets ?? []}
            onMarkerClick={setSelectedSunset}
            selectedSunset={selectedSunset}
          />
        </Row>
      </Page>
    </>
  );
}

export default SunsetDiaries;
