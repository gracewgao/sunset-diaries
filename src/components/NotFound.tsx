import React from "react";
import { Container, GlowingText, MainText } from "./common/common";

const NotFound: React.FC = () => {
  return (
    <Container>
      <GlowingText>404</GlowingText>
      <MainText>sorry, this page doesn't exist!</MainText>
    </Container>
  );
};

export default NotFound;
