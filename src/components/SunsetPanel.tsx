import React from "react";
import styled from "styled-components";
import TopBar from "./TopBar";
import { Color } from "../constants/constants";
import { SunsetItem } from "../util/api";

const Caption = styled.div`
  text-align: center;
  max-width: 400px;
  flex: 0;
`;

const Panel = styled.div`
  flex: 1;
  height: 100vh;

  display: grid;
  grid-template-rows: min-content 1fr;
  grid-template-columns: 1fr;

  max-width: 600px;
  background-color: ${Color.BACKGROUND};
  color: ${Color.WARM_GREY};
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
                {props.sunset.userName}'s sunset •{" "}
                {props.sunset.sunsetLocationName} •{" "}
                {formatTimestamp(props.sunset.sunsetTimestamp)}
              </p>
              <p>{props.sunset.sunsetCaption}</p>
            </Caption>
          </>
        )}
      </SunsetContent>
    </Panel>
  );
};

export default SunsetPanel;
