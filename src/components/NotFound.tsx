import React from "react";
import TopBar from "./TopBar";
import { Container, GlowingText, MainText, TextLink } from "./common/common";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <TopBar />
      <Container>
        <GlowingText>404</GlowingText>
        <MainText>oops! no sunsets here...</MainText>
        <TextLink onClick={() => navigate("/")}>
          return to homepage
        </TextLink>
      </Container>
    </>
  );
};

export default NotFound;
