import React from "react";
import TopBar from "./TopBar";
import { Container, GlowingText, TextLink } from "./common/common";
import { styled } from "styled-components";
import Spacer from "./common/Spacer";
import WaterlooSunset from "../assets/waterloo_sunset.jpeg";

const SunsetImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

const About: React.FC = () => {
  return (
    <>
      <TopBar />
      <Container>
        <GlowingText>for sunset lovers,</GlowingText>
        <p>
          this is a little project I started for the glowy, crunchy skies in my
          camera roll. i've become a big{" "}
          <TextLink href="https://playhoarder.com">hoarder</TextLink> of sunsets
          this past year and decided to build a space to host them. also i put
          them on a map because i like maps.
        </p>
        <p>
          if you also have sunset diaries to share, let me know at{" "}
          <TextLink href="mailto:gracewgao@gmail.com">
            gracewgao@gmail.com
          </TextLink>{" "}
          to get the access code! please be nice and don't post weird things.
        </p>
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
