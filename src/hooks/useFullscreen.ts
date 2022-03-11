import { useState, useEffect } from "react";

function areWeFullscreen() {
  return Boolean(document.fullscreenElement);
}

export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(areWeFullscreen());

  const toggleFullscreen = document.fullscreenEnabled
    ? () =>
        document.fullscreenElement
          ? document.exitFullscreen()
          : document.documentElement.requestFullscreen()
    : false;

  useEffect(() => {
    const onChange = () => setIsFullscreen(areWeFullscreen());

    document.onfullscreenchange = onChange;
    return () => {
      document.onfullscreenchange = null;
    };
  }, []);

  return [isFullscreen, toggleFullscreen] as const;
}
