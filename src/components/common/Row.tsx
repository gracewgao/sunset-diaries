import styled from "styled-components";

interface IRow {
  center?: boolean;
  gap?: number;
}

export const Row = styled.div<IRow>`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${(props) => (props.gap ? `gap: ${props.gap}px` : "")};
  ${(props) => (props.center ? "justify-content: center" : "")};
`;
