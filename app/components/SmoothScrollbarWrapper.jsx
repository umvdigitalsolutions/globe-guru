"use client";

import { useEffect, useRef } from "react";
import Scrollbar from "smooth-scrollbar";

export default function SmoothScrollbarWrapper({ children }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    const scrollbar = Scrollbar.init(scrollRef.current, {
      damping: 0.08,
      thumbMinSize: 20,
      renderByPixels: true,
      alwaysShowTracks: false,
      continuousScrolling: true,
    });

    const handleResize = () => {
      scrollbar.update();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (scrollbar) scrollbar.destroy();
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      id="smoothScroll"
      className="w-full overflow-auto"
      style={{
        height: "calc(100vh - 84px)",
      }}
    >
      {children}
    </div>
  );
}