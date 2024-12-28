import React from "react";
import { Color } from "../constants/constants";
import { styled } from "styled-components";
import TopBar from "./TopBar";
import { Container, GlowingText } from "./common/common";

const About: React.FC = () => {
  return (
    <>
      <TopBar />
      <Container>
        <GlowingText>sunset diaries</GlowingText>
        <p>more to come...</p>
        <p>{"made with <3 by grace"}</p>
      </Container>
    </>
  );
};

export default About;
