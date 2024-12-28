import { useState, useEffect } from "react";

interface IWindowProps {
  width?: number;
  height?: number;
  isMobile: boolean;
}

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<IWindowProps>({
    width: undefined,
    height: undefined,
    isMobile: false,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 768,
      });
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};