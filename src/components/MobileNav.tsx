import { useState, useEffect, useRef } from "react";
import { styled } from "styled-components";
import { ReactComponent as SemiCircle } from "../assets/logo.svg";
import { Color } from "../constants/constants";
import { useNavigate, useLocation } from "react-router-dom";
import { IoHeart, IoImages, IoMenu, IoClose, IoCamera, IoMap } from "react-icons/io5";

const TopBar = styled.header<{ isVisible: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: ${Color.BACKGROUND};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  transform: translateY(${(props) => (props.isVisible ? "0" : "-100%")});
  transition: transform 0.3s ease;
`;

const LogoSemiCircle = styled(SemiCircle)`
  fill: ${Color.ORANGE};
  filter: drop-shadow(0 0 4px ${Color.ORANGE});
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: ${Color.WARM_GREY};
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;

  &:hover {
    color: ${Color.ORANGE};
    filter: drop-shadow(0 0 4px ${Color.ORANGE});
  }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${Color.BACKGROUND};
  z-index: 300;
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const OverlayHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48px;
`;

const NavLinks = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-left: 8px;
`;

const NavLink = styled.a<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: ${Color.WARM_GREY};
  cursor: pointer;
  font-size: 1.1rem;

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

const TopBarSpacer = styled.div`
  height: 56px;
  flex-shrink: 0;
`;

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;
      const atTop = currentScrollY < 10;

      if (atTop) {
        setIsVisible(true);
      } else if (scrollingDown && currentScrollY > 56) {
        setIsVisible(false);
      } else if (!scrollingDown) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      <TopBar isVisible={isVisible}>
        <Logo onClick={() => handleNavigate("/")}>
          <LogoSemiCircle width={24} />
        </Logo>
        <MenuButton onClick={() => setIsOpen(true)}>
          <IoMenu size={28} />
        </MenuButton>
      </TopBar>
      <TopBarSpacer />
      <Overlay isOpen={isOpen}>
        <OverlayHeader>
          <Logo onClick={() => handleNavigate("/")}>
            <LogoSemiCircle width={24} />
          </Logo>
          <MenuButton onClick={() => setIsOpen(false)}>
            <IoClose size={28} />
          </MenuButton>
        </OverlayHeader>
        <NavLinks>
          <NavLink onClick={() => handleNavigate("/browse")} active={isActive("/browse")}>
            <IoImages size={18} />
            browse
          </NavLink>
          <NavLink onClick={() => handleNavigate("/map")} active={isActive("/map")}>
            <IoMap size={18} />
            map
          </NavLink>
          <NavLink onClick={() => handleNavigate("/about")} active={isActive("/about")}>
            <IoHeart size={18} />
            about
          </NavLink>
          <NavLink onClick={() => handleNavigate("/new")} active={isActive("/new")}>
            <IoCamera size={18} />
            add sunset
          </NavLink>
        </NavLinks>
      </Overlay>
    </>
  );
}

export default MobileNav;

