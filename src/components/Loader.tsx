import React from "react";
import styled from "styled-components";
import { Color } from "../constants/constants";

const LoaderBg = styled.div<React.HTMLAttributes<HTMLDivElement>>`
  height: 100%;
  width: 100%;
  background-color: ${Color.BACKGROUND};
  position: fixed;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  transition: opacity 0.5s ease-out;
`;

export default function Loader(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <LoaderBg {...props}>
        <video
        width="100"
        controls={false}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/sunset-diaries/sunsetted.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </LoaderBg>
  );
}