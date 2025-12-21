import React, { useState } from "react";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";
import styled from "styled-components";
import { Row } from "./Row";
import { SecondarySubheading } from "./common";
import Spacer from "./Spacer";

const ToggleContainer = styled.div`
`;

const ToggleHeading = styled(SecondarySubheading)`
    cursor: pointer;
`;

const ToggleContent = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  transition: max-height 0.3s ease-in-out, opacity 0.2s ease-in-out;
  padding: ${({ isOpen }) => (isOpen ? "1em 0em" : "0")};
`;

interface ToggleProps {
  heading: string;
  children: React.ReactNode;
}

const Toggle: React.FC<ToggleProps> = ({ heading, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ToggleContainer>
      <ToggleHeading onClick={() => setIsOpen(!isOpen)}>
        <Row>
          {isOpen ? <BsChevronDown size={18} /> : <BsChevronRight size={18} />}
          <Spacer width={0.5} />
          {heading}
        </Row>
      </ToggleHeading>
      <ToggleContent isOpen={isOpen}>{children}</ToggleContent>
    </ToggleContainer>
  );
};

export default Toggle;
