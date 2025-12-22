import React from "react";
import { styled } from "styled-components";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import { useWindowSize } from "../util/windowSize";

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const SidebarSpace = styled.div`
  width: 160px;
  min-width: 160px;
  flex-shrink: 0;
`;

const MainContent = styled.main`
  flex: 1;
  min-height: 100vh;

  @media (max-width: 768px) {
    min-height: calc(100vh - 56px);
  }
`;

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const { isMobile } = useWindowSize();

  if (isMobile) {
    return (
      <>
        <MobileNav />
        <MainContent>{children}</MainContent>
      </>
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
