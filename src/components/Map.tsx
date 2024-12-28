import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, useMap } from "react-leaflet";
import { styled } from "styled-components";
import { Color } from "../constants/constants";
import { SunsetItem } from "../util/api";
import { LatLngBoundsExpression } from "leaflet";

const MapBox = styled(MapContainer)`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  flex: 1;

  .leaflet-control-zoom {
    background-color: ${Color.BACKGROUND};
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
    overflow: hidden;
    mix-blend-mode: normal;
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

const RegularMarker = styled(CircleMarker)`
  filter: drop-shadow(0 0 7px ${Color.ORANGE})
    drop-shadow(0 0 10px ${Color.ORANGE});
  fill-opacity: 1;
  fill: ${Color.ORANGE};
  stroke: none;
`;

interface IMap {
  sunsets: SunsetItem[];
  onMarkerClick: (sunset: SunsetItem) => void;
  selectedSunset?: SunsetItem;
}

const randomDistance = () => Math.random() * 0.001 - 0.0005;

const SunsetMap: React.FC<IMap> = (props: IMap) => {
  const [center, setCenter] = useState<[number, number]>([
    40.712776, -74.005974,
  ]); // default: new york

  const CenterMapOnMarker = ({ position }: { position: [number, number] }) => {
    const map = useMap();

    useEffect(() => {
      if (position) {
        map.flyTo(position, 5, { duration: 0.5, easeLinearity: 0.8 });
      }
    }, [map, position]);

    return null;
  };

  useEffect(() => {
    if (props.sunsets.length > 0) {
      const loc = props.sunsets[0].sunsetLocationCoords;
      if (loc.lat && loc.lng) {
        setCenter([loc.lat, loc.lng]);
      } else {
        if (navigator.geolocation) {
          // set current position
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              const { latitude, longitude } = pos.coords;
              setCenter([latitude, longitude]);
            },
            (error) => {
              console.error("Error getting location, using fallback:", error);
            }
          );
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      }
    }
  }, [props.sunsets]);

  const bounds: LatLngBoundsExpression = [
    [-90, -180],
    [90, 180],
  ];

  return (
    <Container>
      <MapBox
        center={center}
        zoom={13}
        minZoom={3}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution="&copy; OpenStreetMap contributors &copy; CARTO"
        />
        {props.sunsets.map((sunset, index) =>
          sunset.sunsetLocationCoords.lat && sunset.sunsetLocationCoords.lat ? (
            sunset === props.selectedSunset ? (
              <GlowMarker
                key={index}
                center={[
                  sunset.sunsetLocationCoords.lat + randomDistance(),
                  sunset.sunsetLocationCoords.lng + randomDistance(),
                ]}
                radius={5}
                eventHandlers={{
                  click: () => {
                    props.onMarkerClick(sunset);
                    setCenter([
                      sunset.sunsetLocationCoords.lat,
                      sunset.sunsetLocationCoords.lng,
                    ]);
                  },
                }}
              />
            ) : (
              <RegularMarker
                key={index}
                center={[
                  sunset.sunsetLocationCoords.lat,
                  sunset.sunsetLocationCoords.lng,
                ]}
                radius={5}
                eventHandlers={{
                  click: () => {
                    props.onMarkerClick(sunset);
                    setCenter([
                      sunset.sunsetLocationCoords.lat,
                      sunset.sunsetLocationCoords.lng,
                    ]);
                  },
                }}
              />
            )
          ) : null
        )}
        <CenterMapOnMarker position={center} />
      </MapBox>
    </Container>
  );
};

export default SunsetMap;
