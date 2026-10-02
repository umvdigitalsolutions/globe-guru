"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [phase, setPhase] = useState("loading");

  useEffect(() => {
    const content = document.getElementById("site-content");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let minimumElapsed = false;
    let pageLoaded = document.readyState === "complete";
    let exitTimer;

    document.documentElement.classList.add("preloader-active");
    if (content) content.inert = true;

    const finish = () => {
      if (minimumElapsed && pageLoaded) setPhase("leaving");
    };
    const onLoad = () => {
      pageLoaded = true;
      finish();
    };
    const minimumTimer = window.setTimeout(() => {
      minimumElapsed = true;
      finish();
    }, reducedMotion ? 250 : 3000);
    exitTimer = window.setTimeout(() => setPhase("leaving"), 6000);
    window.addEventListener("load", onLoad);

    return () => {
      window.clearTimeout(minimumTimer);
      window.clearTimeout(exitTimer);
      window.removeEventListener("load", onLoad);
      document.documentElement.classList.remove("preloader-active");
      if (content) content.inert = false;
    };
  }, []);

  useEffect(() => {
    if (phase !== "leaving") return;
    const timer = window.setTimeout(() => {
      document.documentElement.classList.remove("preloader-active");
      const content = document.getElementById("site-content");
      if (content) content.inert = false;
      setPhase("done");
    }, 450);
    return () => window.clearTimeout(timer);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div className={`travel-preloader ${phase === "leaving" ? "travel-preloader--leaving" : ""}`}>
      <span className="sr-only" role="status">Loading GlobeGuru Holidays</span>
      <div className="preloader-sky" aria-hidden="true">
        <div className="preloader-cloud preloader-cloud--one" />
        <div className="preloader-cloud preloader-cloud--two" />
        <div className="preloader-cloud preloader-cloud--three" />
        <div className="preloader-cloud preloader-cloud--four" />
        <div className="preloader-flight">
          <span className="preloader-contrail" />
          <Image
            src="/preloader-airplane.png"
            alt=""
            width={2135}
            height={736}
            priority
            sizes="(max-width: 600px) 230px, 340px"
            className="preloader-plane"
          />
        </div>
      </div>
      <div className="preloader-brand">
        <Image src="/globe.png" alt="GlobeGuru Holidays" width={1536} height={1024} priority className="preloader-logo" sizes="(max-width: 600px) 80vw, 420px" />
        <div className="preloader-progress" aria-hidden="true"><span /></div>
      </div>
      <button type="button" className="preloader-skip" onClick={() => setPhase("leaving")}>Skip intro</button>
    </div>
  );
}
