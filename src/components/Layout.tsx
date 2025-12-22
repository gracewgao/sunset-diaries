import React from "react";
import { styled } from "styled-components";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import { useWindowSize } from "../util/windowSize";

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MobileLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SidebarSpace = styled.div`
  width: 160px;
  min-width: 160px;
  flex-shrink: 0;
`;

const MainContent = styled.main`
  flex: 1;
  min-height: 100vh;
`;

const MobileMainContent = styled.main`
  flex: 1;
  min-height: 0;
`;

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const { isMobile } = useWindowSize();

  if (isMobile) {
    return (
      <MobileLayoutContainer>
        <MobileNav />
        <MobileMainContent>{children}</MobileMainContent>
      </MobileLayoutContainer>
    );
  }

  return (
    <LayoutContainer>
      <Sidebar />
      <SidebarSpace />
      <MainContent>{children}</MainContent>
    </LayoutContainer>
  );
}

export default Layout;
