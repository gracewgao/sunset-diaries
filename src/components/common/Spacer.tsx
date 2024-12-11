import styled from "styled-components";

interface ISpacer {
  width?: number;
  height?: number;
  isFixed?: boolean;
}

const StyledSpacer = styled.div<ISpacer>`
  width: ${(props) => props.width ?? 0}${(props) => (props.isFixed ? "px" : "rem")};
  height: ${(props) => props.height ?? 0}${(props) => (props.isFixed ? "px" : "rem")};
`;

function Spacer(props: ISpacer) {
  return <StyledSpacer {...props} />;
}

export default Spacer;
