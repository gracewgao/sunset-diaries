import React from "react";
import TopBar from "./TopBar";
import { Container, GlowingText, TextLink } from "./common/common";
import { styled } from "styled-components";
import Spacer from "./common/Spacer";
import WaterlooSunset from "../assets/waterloo_sunset.jpeg";
import { Color } from "../constants/constants";

const SunsetImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

const MainText = styled.p`
  color: ${Color.WHITE};
  
  a {
    color: ${Color.WHITE} !important;

    &:hover {
      color: ${Color.YELLOW} !important;
    }
`;

const About: React.FC = () => {
  return (
    <>
      <TopBar />
      <Container>
        <GlowingText>dear sunset diaries,</GlowingText>
        <MainText>
          this is a little project I started for the glowy, crunchy skies in my
          camera roll. I'm a big{" "}
          <TextLink href="https://playhoarder.com">hoarder</TextLink> of pretty
          sunsets and wanted a special place to enjoy them. also I put them on a
          map because I like maps.
        </MainText>
        <MainText>
          if you also have sunset diaries to share, let me know at{" "}
          <TextLink href="mailto:gracewgao@gmail.com">
            gracewgao@gmail.com
          </TextLink>{" "}
          to get the access code! please be nice and post responsibly.
        </MainText>
        <p>
          {"made with <3 by "}
          <TextLink href="https://gracewgao.me/">grace</TextLink>
        </p>
        <Spacer height={0.5} />
        <SunsetImage src={WaterlooSunset} />
        <p>
          ps. nothing beats a{" "}
          <TextLink href="https://open.spotify.com/track/3G0EALIIp5DAeIERxXBHmo?si=edcb03fde50e4fa2">
            waterloo sunset
          </TextLink>
        </p>
      </Container>
    </>
  );
};

export default About;
