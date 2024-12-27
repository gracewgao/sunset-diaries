import { styled } from "styled-components";
import { ReactComponent as SemiCircle } from "../assets/logo.svg";
import { Color } from "../constants/constants";
import { Row } from "./common/Row";
import { useNavigate } from "react-router-dom";

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
  cursor: pointer;
`;

const Link = styled.a`
  text-decoration: none;
  cursor: pointer;
`;

function TopBar(props: {sharePage?: boolean}) {
  const navigate = useNavigate();
  
  return (
    <Bar>
      <Logo onClick={() => navigate("/")}>
        <Row gap={8}>
          <SemiCircle fill={Color.WARM_GREY} width={24} />
          sunset diaries
        </Row>
      </Logo>
      {props.sharePage ? null : <Link onClick={() => navigate("/new")}>share your sunset</Link>}
    </Bar>
  );
};

export default TopBar;
