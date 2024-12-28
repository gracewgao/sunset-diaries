import { styled } from "styled-components";
import { ReactComponent as SemiCircle } from "../assets/logo.svg";
import { Color } from "../constants/constants";
import { Row } from "./common/Row";
import { useNavigate } from "react-router-dom";
import { IoHeart } from "react-icons/io5";
import { FaPen } from "react-icons/fa6";
import { useWindowSize } from "../util/windowSize";
import Spacer from "./common/Spacer";

const LogoSemiCircle = styled(SemiCircle)<{ homepage?: boolean }>`
  fill: inherit;
`;

const RowSpacer = styled(Spacer)`
  flex-grow: 1;
`;

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  align-items: center;
  padding: 24px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Logo = styled.div<{ homepage?: boolean }>`
  justify-content: start;
  cursor: pointer;
  fill: ${Color.WARM_GREY};

  &:hover {
    color: ${Color.ORANGE};
    fill: ${Color.ORANGE};
    -webkit-filter: drop-shadow(0 0 4px ${Color.ORANGE});
    filter: drop-shadow(0 0 4px ${Color.ORANGE});
  }

  ${(props) =>
    props.homepage &&
    `
      color: ${Color.YELLOW};
      fill: ${Color.YELLOW};
      -webkit-filter: drop-shadow(0 0 4px ${Color.ORANGE});
      filter: drop-shadow(0 0 4px ${Color.ORANGE});
      `}
`;

const Link = styled.a`
  text-decoration: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: ${Color.ORANGE};
    -webkit-filter: drop-shadow(0 0 4px ${Color.ORANGE});
    filter: drop-shadow(0 0 4px ${Color.ORANGE});
  }
`;

function TopBar(props: { homepage?: boolean }) {
  const { width, height, isMobile } = useWindowSize();
  const navigate = useNavigate();

  return (
    <Bar>
      <Logo onClick={() => navigate("/")} homepage={props.homepage}>
        <Row gap={8}>
          <LogoSemiCircle width={24} />
          sunset diaries
        </Row>
      </Logo>
      <RowSpacer />
      {props.homepage ? (
        <>
          <Link onClick={() => navigate("/about")}>
            <IoHeart size={18} />
            {isMobile ? null : "about"}
          </Link>
          <Link onClick={() => navigate("/new")}>
            <FaPen size={18} />
            {isMobile ? null : "add sunset"}
          </Link>
        </>
      ) : null}
    </Bar>
  );
}

export default TopBar;
