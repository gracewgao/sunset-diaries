import { styled } from "styled-components";
import { ReactComponent as SemiCircle } from "../assets/logo.svg";
import { Color } from "../constants/constants";
import { Row } from "./common/Row";

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  padding: 24px;
`;

const Logo = styled.div`
  flex-grow: 1;
  justify-content: start;
`;

const Link = styled.a`
  text-decoration: none;
  cursor: pointer;
`;

const TopBar: React.FC = () => {
  return (
    <Bar>
      <Logo>
        <Row gap={8}>
          <SemiCircle fill={Color.WARM_GREY} width={24} />
          sunset diaries
        </Row>
      </Logo>
      {/* <Link>about</Link>
      <Link>share your sunset</Link> */}
    </Bar>
  );
};

export default TopBar;
