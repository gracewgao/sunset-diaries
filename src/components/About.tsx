import React from "react";
import {
  Container,
  GlowingText,
  MainText,
  TextLink,
} from "./common/common";
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
    <Container>
      <GlowingText>dear sunset diaries,</GlowingText>
      <MainText>
        I used to have beautiful west-facing windows in college and saw the
        most magical sunsets from my room. this project is for remembering all
        the pretty skies I come across and the days that come between them.
      </MainText>
      <MainText>
        if you also have sunset diaries to share, please feel free to
        contribute! please be nice and post responsibly.
      </MainText>
      <p>
        {"made with <3 by "}
        <TextLink noStyle href="https://gracewgao.me/">grace</TextLink>
      </p>
      <Spacer height={0.5} />
      <SunsetImage src={WaterlooSunset} />
      <p>
        ps. nothing beats a{" "}
        <TextLink noStyle href="https://open.spotify.com/track/3G0EALIIp5DAeIERxXBHmo?si=edcb03fde50e4fa2">
          waterloo sunset
        </TextLink>
      </p>
    </Container>
  );
};

export default About;
