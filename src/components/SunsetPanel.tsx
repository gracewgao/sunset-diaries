import React from "react";
import styled from "styled-components";
import TopBar from "./TopBar";
import { Color } from "../constants/constants";
import { SunsetItem } from "../util/api";
import { useWindowSize } from "../util/windowSize";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import Spacer from "./common/Spacer";
import { TextLink } from "./common/common";

const Caption = styled.div`
  text-align: center;
  max-width: 400px;
  flex: 0;
`;

const Panel = styled.div`
  flex: 1;
  height: 100%;

  background-color: ${Color.BACKGROUND};
  box-shadow: 0 1px 0 1px ${Color.BACKGROUND};
  z-index: 1;

  display: grid;
  grid-template-rows: min-content minmax(0, 1fr);
  grid-template-columns: 1fr;
  max-width: 600px;

  @media (max-width: 768px) {
    max-width: 100%;
    max-height: 60%;
  }
`;

const SunsetContent = styled.div`
  display: grid;
  place-items: center;
  grid-template-rows: minmax(0, 1fr) min-content;
  grid-template-columns: 1fr;
  box-sizing: border-box;

  padding: 24px;
  text-align: center;
`;

const SunsetImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  flex: 1;
  border-radius: 10px;
`;

const Metadata = styled.p``;

const Arrow = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${Color.WARM_GREY};

  &:hover {
    color: ${Color.ORANGE};
    -webkit-filter: drop-shadow(0 0 4px ${Color.ORANGE});
    filter: drop-shadow(0 0 4px ${Color.ORANGE});
  }
`;

interface ISunsetPanel {
  sunset?: SunsetItem;
  setSunsetIndex: (sunsetIndex: number) => void;
}

const SunsetPanel: React.FC<ISunsetPanel> = (props: ISunsetPanel) => {
  const { width, height, isMobile } = useWindowSize();

  // unix to string date formatter
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const formatter = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return formatter.format(date).toLowerCase();
  };

  return (
    <Panel>
      <TopBar homepage />
      <SunsetContent>
        {props.sunset == null ? null : (
          <>
            <SunsetImage src={props.sunset.sunsetUrl} />
            <Caption>
              {isMobile ? null : (
                <p>
                  <i>{props.sunset.sunsetCaption}</i>
                </p>
              )}
              <Metadata>
                {props.sunset.userName
                  ? `${props.sunset.userName}'s sunset • `
                  : ""}
                {props.sunset.sunsetLocationName
                  ? ` ${props.sunset.sunsetLocationName} • `
                  : ""}
                {formatTimestamp(props.sunset.sunsetTimestamp)}
              </Metadata>
              <Arrow
                onClick={() => {
                  if (props.sunset)
                    props.setSunsetIndex(props.sunset.index - 1);
                }}
              >
                <IoArrowBack size={18} />
              </Arrow>
              <Spacer width={1} />
              <Arrow
                onClick={() => {
                  if (props.sunset)
                    props.setSunsetIndex(props.sunset.index + 1);
                }}
              >
                <IoArrowForward size={18} />
              </Arrow>
            </Caption>
          </>
        )}
      </SunsetContent>
    </Panel>
  );
};

export default SunsetPanel;
