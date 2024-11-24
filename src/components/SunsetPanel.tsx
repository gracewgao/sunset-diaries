import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TopBar from "./TopBar";
import ExampleSunset from "../assets/example_sunset.jpg";
import { Color } from "../constants/constants";
import { ApiResponse, invokeLambda, SunsetItem } from "../util/api";

const Caption = styled.div`
  padding: 1rem;
  text-align: center;
  max-width: 400px;
`;

const Panel = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;

  max-width: 600px;
  background-color: ${Color.BACKGROUND};
  color: ${Color.WARM_GREY};
`;

const SunsetContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  flex: 1;

  padding: 1rem;
  text-align: center;
`;

const SunsetImage = styled.img`
  width: 100%;
  border-radius: 10px;
`;

interface ISunsetPanel {
  sunset?: SunsetItem;
}

const SunsetPanel: React.FC<ISunsetPanel> = (props: ISunsetPanel) => {

  // const fetchData = async () => {
  //   try {
  //     const response: any = await invokeLambda();
  //     if (response.items) {
  //       setSunsetData(response.items[0]);
  //     }
  //   } catch (err) {
  //     console.error("Error:", err);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <Panel>
      <TopBar />
      <SunsetContent>
        {props.sunset == null ? null : (
          <>
            <SunsetImage src={props.sunset.sunset_url.S} />
            <Caption>
              <p>
                {props.sunset.user_name.S}'s sunset •{" "}
                {props.sunset.sunset_location_name.S} • august 4, 2024
              </p>
              <p>{props.sunset.sunset_caption.S}</p>
            </Caption>
          </>
        )}
      </SunsetContent>
    </Panel>
  );
};

export default SunsetPanel;
