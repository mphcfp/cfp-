"use client";

import { useEffect, useState } from "react";
import { ArrowIcon, SparkIcon } from "@/components/icons";
import { useMotion } from "@/components/motion-provider";

export function SiteFooter() {
  const [year, setYear] = useState<string | null>(null);
  const { reducedMotion, toggleMotion } = useMotion();
  const motionReady = reducedMotion !== null;
  const motionAction = motionReady ? (reducedMotion ? "Enable animations" : "Pause animations") : "Motion settings";

  useEffect(() => {
    setYear(new Intl.DateTimeFormat("en-US", { year: "numeric", timeZone: "Asia/Tehran" }).format(new Date()));
  }, []);

  return (
    <footer className="container">
      <div className="footer-top">
        <a className="brand" href="#home" aria-label="AURA, back to top">
          <span className="brand-icon" aria-hidden="true"><SparkIcon /></span>
          <span className="brand-word" dir="ltr">aura<span className="brand-dot">.</span></span>
        </a>
        <p>A little courage. Endless possibilities.</p>
        <a className="back-top" href="#home">
          Back to top <span aria-hidden="true"><ArrowIcon direction="up" /></span>
        </a>
      </div>
      <div className="footer-bottom">
        <span>© <span id="year">{year}</span> AURA — Creative Studio</span>
        <button
          id="motion-toggle"
          type="button"
          aria-pressed={reducedMotion ?? undefined}
          aria-label={motionAction}
          title={motionAction}
          disabled={!motionReady}
          onClick={toggleMotion}
        >
          <span className="motion-indicator" aria-hidden="true">{reducedMotion ? "▷" : "Ⅱ"}</span>
          <span id="motion-label">{motionAction}</span>
        </button>
        <span dir="ltr">DESIGNED TO FEEL DIFFERENT.</span>
      </div>
    </footer>
  );
}
