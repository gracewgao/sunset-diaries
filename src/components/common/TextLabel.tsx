import styled from "styled-components";
import { Color } from "../../constants/constants";

const Label = styled.span`
  color: ${Color.WHITE};
  font-size: 1rem;
`;

const Required = styled.span`
  color: ${Color.ORANGE};
  font-size: 1rem;
`;

function TextLabel(props: { required?: boolean; children: React.ReactNode }) {
  return (
    <>
      <Label>{props.children}</Label>
      {props.required ? <Required>{" *"}</Required> : null}
    </>
  );
}

export default TextLabel;