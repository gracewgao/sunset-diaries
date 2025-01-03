import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import styled from "styled-components";
import { Color } from "../constants/constants";
import { LatLngExpression } from "leaflet";

export interface SunsetLocationCoords {
  lat: number;
  lng: number;
}

const MapBox = styled(MapContainer)`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
`;

const Container = styled.div`
  width: 100%;

  .leaflet-control-zoom {
    border: none;
    box-shadow: none;
  }

  .leaflet-control-zoom a {
    color: ${Color.WARM_GREY};
    background-color: ${Color.BACKGROUND};
    border: none;
    text-shadow: none;
  }

  .leaflet-control-zoom a:hover {
    background-color: ${Color.MED_GREY};
    color: ${Color.WARM_GREY};
  }

  .leaflet-control-attribution {
    background-color: ${Color.BACKGROUND};
    color: ${Color.WARM_GREY};
    border: none;
  }

  .leaflet-control-attribution a {
    color: ${Color.WARM_GREY};
    text-decoration: none;
  }

  .leaflet-control-attribution a:hover {
    color: ${Color.WARM_GREY};
    text-decoration: underline;
  }

  .map-wrapper {
    overflow: hidden;
  }

  .leaflet-container {
    font-family: "Inclusive Sans";
    overflow: hidden;
    mix-blend-mode: normal;
  }

  .leaflet-bar {
    border: none !important;
    color: ${Color.WHITE} !important;
    box-shadow: none !important;
    width: 100% !important;
  }

  /* all the styling to override geosearch defaults */

  .leaflet-geosearch-bar {
    background-color: ${Color.MED_GREY};
    color: #fff;
    border: none;
    border-radius: 4px;
  }
  
  .leaflet-touch .leaflet-geosearch-bar form {
    background-color: ${Color.MED_GREY};
    border: none;
  }

  .leaflet-geosearch-bar form input {
    font-family: "Inclusive Sans";
    background-color: ${Color.MED_GREY};
    color: ${Color.WHITE};
    border: none;
    border-radius: 4px;
  }

  .leaflet-control-geosearch button.reset {
    background-color: ${Color.MED_GREY};
    color: ${Color.WARM_GREY};
    border: none;
    cursor: pointer;
  }

  .leaflet-control-geosearch button.reset:hover {
    background-color: ${Color.MED_GREY};
    color: ${Color.WHITE};
  }

  .leaflet-control-geosearch input::placeholder {
    color: ${Color.WARM_GREY};
  }

  .leaflet-control-geosearch .results.active {
    padding: 8px 0;
    border-top: none;
  }
    
  .leaflet-control-geosearch .results {
      background-color: ${Color.MED_GREY};
      
  }

  .leaflet-control-geosearch .results > * {
    &:hover {
      background-color: ${Color.BACKGROUND};
      border: 1px solid transparent;
      border-radius: 4px;
    }
  }
`;

const GlowMarker = styled(CircleMarker)`
  filter: drop-shadow(0 0 7px ${Color.YELLOW})
    drop-shadow(0 0 10px ${Color.YELLOW}) drop-shadow(0 0 21px ${Color.YELLOW})
    drop-shadow(0 0 42px ${Color.ORANGE}) drop-shadow(0 0 82px ${Color.ORANGE})
    drop-shadow(0 0 92px ${Color.ORANGE});
  fill-opacity: 1;
  fill: ${Color.YELLOW};
  stroke: none;
`;

const LocationMarker: React.FC<{
  setPosition: React.Dispatch<
    React.SetStateAction<SunsetLocationCoords | null>
  >;
}> = ({ setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return null;
};

const SearchControl: React.FC<{
  setPosition: React.Dispatch<
    React.SetStateAction<SunsetLocationCoords | null>
  >;
  position: SunsetLocationCoords | null;
}> = ({ setPosition, position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView([position.lat, position.lng], map.getZoom());
    }
  }, [position, map]);

  useEffect(() => {
    const handleSearchResult = (result: any) => {
      if (result.location) {
        setPosition({
          lat: result.location.y,
          lng: result.location.x,
        });
        map.setView([result.location.y, result.location.x], map.getZoom());
      }
    };
    
    const provider = new OpenStreetMapProvider();
    const searchControl = new (GeoSearchControl as any)({
      provider,
      style: "bar",
      showMarker: false,
      keepResult: true,
    });

    map.addControl(searchControl);
    map.on("geosearch/showlocation", handleSearchResult);

    return () => {
      map.removeControl(searchControl);
      map.off("geosearch/showlocation", handleSearchResult);
    };
  }, [map, setPosition]);

  return null;
};

const SelectLocation: React.FC<{
  setCoords: React.Dispatch<React.SetStateAction<SunsetLocationCoords | null>>;
  coords: SunsetLocationCoords | null;
}> = ({ setCoords, coords }) => {
  const NEW_YORK: LatLngExpression = [40.758896, -73.98513];
  return (
    <Container>
      <MapBox
        center={NEW_YORK}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution="&copy; OpenStreetMap contributors &copy; CARTO"
        />
        <SearchControl setPosition={setCoords} position={coords} />
        <LocationMarker setPosition={setCoords} />
        {coords && coords.lat && coords.lng && (
          <GlowMarker radius={5} center={[coords.lat, coords.lng]} />
        )}
      </MapBox>
    </Container>
  );
};

export default SelectLocation;
