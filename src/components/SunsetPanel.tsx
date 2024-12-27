import React from "react";
import styled from "styled-components";
import TopBar from "./TopBar";
import { Color } from "../constants/constants";
import { SunsetItem } from "../util/api";
import { useWindowSize } from "../util/windowSize";

const Caption = styled.div`
  text-align: center;
  max-width: 400px;
  flex: 0;
`;

const Panel = styled.div`
  flex: 1;
  height: 100vh;

  box-shadow: 0 1px 0 1px ${Color.BACKGROUND};
  z-index: 1;

  display: grid;
  grid-template-rows: min-content 1fr;
  grid-template-columns: 1fr;

  max-width: 600px;
  background-color: ${Color.BACKGROUND};
`;

const SunsetContent = styled.div`
  display: grid;
  place-items: center;
  grid-template-rows: 1fr min-content;
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

interface ISunsetPanel {
  sunset?: SunsetItem;
}

const SunsetPanel: React.FC<ISunsetPanel> = (props: ISunsetPanel) => {
  const { width, height, isMobile } = useWindowSize();

  // unix to string date formatter
  const formatTimestamp = (timestamp: number) => {
    console.log(timestamp);
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
      <TopBar />
      <SunsetContent>
        {props.sunset == null ? null : (
          <>
            <SunsetImage src={props.sunset.sunsetUrl} />
            <Caption>
              <p>
                {props.sunset.userName ? `${props.sunset.userName}'s sunset • ` : ""}
                {props.sunset.sunsetLocationName ? ` ${props.sunset.sunsetLocationName} • ` : ""}
                {formatTimestamp(props.sunset.sunsetTimestamp)}
              </p>
              {isMobile ? null : <p><i>{props.sunset.sunsetCaption}</i></p>}
            </Caption>
          </>
        )}
      </SunsetContent>
    </Panel>
  );
};

export default SunsetPanel;
