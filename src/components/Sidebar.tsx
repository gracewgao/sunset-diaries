import { styled } from "styled-components";
import { ReactComponent as SemiCircle } from "../assets/logo.svg";
import { Color } from "../constants/constants";
import { useNavigate, useLocation } from "react-router-dom";
import { IoHeart, IoSearch, IoImages, IoCamera } from "react-icons/io5";

const SidebarContainer = styled.nav`
  width: 160px;
  min-width: 160px;
  height: 100vh;
  background-color: ${Color.BACKGROUND};
  border-right: 1px solid ${Color.MED_GREY};
  display: flex;
  flex-direction: column;
  padding: 24px;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
`;

const LogoSemiCircle = styled(SemiCircle)`
  fill: ${Color.ORANGE};
  filter: drop-shadow(0 0 4px ${Color.ORANGE});
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 32px;
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const NavLink = styled.a<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: ${Color.WARM_GREY};
  cursor: pointer;
  padding: 4px 0;

  &:hover {
    color: ${Color.ORANGE};
    filter: drop-shadow(0 0 4px ${Color.ORANGE});
  }

  ${(props) =>
    props.active &&
    `
      color: ${Color.YELLOW};
      filter: drop-shadow(0 0 4px ${Color.ORANGE});
    `}
`;

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <SidebarContainer>
      <Logo onClick={() => navigate("/")}>
        <LogoSemiCircle width={24} />
      </Logo>
      <NavLinks>
        <NavLink onClick={() => navigate("/")} active={isActive("/") && location.pathname === "/"}>
          <IoImages size={18} />
          browse
        </NavLink>
        <NavLink onClick={() => navigate("/search")} active={isActive("/search")}>
          <IoSearch size={18} />
          search
        </NavLink>
        <NavLink onClick={() => navigate("/about")} active={isActive("/about")}>
          <IoHeart size={18} />
          about
        </NavLink>
        <NavLink onClick={() => navigate("/new")} active={isActive("/new")}>
          <IoCamera size={18} />
          add sunset
        </NavLink>
      </NavLinks>
    </SidebarContainer>
  );
}

export default Sidebar;

