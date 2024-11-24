import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";
import L from "leaflet";
import { styled } from "styled-components";

const MapBox = styled(MapContainer)`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  flex: 1;
`;

// Custom marker icon example
const customIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export interface ILocation {
  lat?: string;
  lng?: string;
}

interface IMap {
  sunsets: ILocation[];
}

const Map: React.FC<IMap> = (props: IMap) => {
  const position: [number, number] = [51.505, -0.09]; // [latitude, longitude]

  return (
    <Container>
      <MapBox center={position} zoom={13}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution="&copy; OpenStreetMap contributors &copy; CARTO"
        />
        {props.sunsets.map((loc, index) =>
          loc.lat && loc.lng ? (
            <CircleMarker
              key={index}
              center={[parseFloat(loc.lat), parseFloat(loc.lng)]}
              radius={5}
              fillColor="orange"
              color="orange"
              weight={1}
              fillOpacity={0.8}
            />
          ) : null
        )}
      </MapBox>
    </Container>
  );
};

export default Map;
