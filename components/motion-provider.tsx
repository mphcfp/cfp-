"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type MotionContextValue = {
  /** null keeps the server and the first client render preference-neutral. */
  reducedMotion: boolean | null;
  toggleMotion: () => void;
};

const MotionContext = createContext<MotionContextValue | null>(null);
const preferenceKey = "aura-reduce-motion";

function resetTilt(card: HTMLElement) {
  card.style.setProperty("--tilt-x", "0deg");
  card.style.setProperty("--tilt-y", "0deg");
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);
  const explicitPreference = useRef<boolean | null>(null);
  const currentPreference = useRef<boolean | null>(null);

  const updatePreference = useCallback((reduced: boolean) => {
    currentPreference.current = reduced;
    setReducedMotion(reduced);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const previousClass = root.classList.contains("reduce-motion");
    const previousAttribute = root.getAttribute("data-motion");
    const systemPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

    const readStoredPreference = () => {
      try {
        const value = window.localStorage.getItem(preferenceKey);
        explicitPreference.current = value === "true" ? true : value === "false" ? false : null;
      } catch {
        explicitPreference.current = null;
      }
    };
    const applyPreference = () => {
      updatePreference(explicitPreference.current ?? systemPreference.matches);
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== preferenceKey && event.key !== null) return;
      readStoredPreference();
      applyPreference();
    };

    readStoredPreference();
    applyPreference();
    systemPreference.addEventListener("change", applyPreference);
    window.addEventListener("storage", handleStorage);

    return () => {
      systemPreference.removeEventListener("change", applyPreference);
      window.removeEventListener("storage", handleStorage);
      root.classList.toggle("reduce-motion", previousClass);
      if (previousAttribute === null) root.removeAttribute("data-motion");
      else root.setAttribute("data-motion", previousAttribute);
    };
  }, [updatePreference]);

  useEffect(() => {
    if (reducedMotion === null) return;
    document.documentElement.classList.toggle("reduce-motion", reducedMotion);
    document.documentElement.dataset.motion = reducedMotion ? "reduced" : "full";
  }, [reducedMotion]);

  const toggleMotion = useCallback(() => {
    if (currentPreference.current === null) return;
    const nextPreference = !currentPreference.current;
    explicitPreference.current = nextPreference;
    updatePreference(nextPreference);
    try {
      window.localStorage.setItem(preferenceKey, String(nextPreference));
    } catch {
      // The in-memory preference still works when browser storage is unavailable.
    }
  }, [updatePreference]);

  useEffect(() => {
    if (reducedMotion === null) return;

    const revealElements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".tilt-card"));
    const wasReady = document.body.classList.contains("js-ready");
    let observer: IntersectionObserver | null = null;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer?.unobserve(entry.target);
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
      );
      revealElements.forEach((element) => observer?.observe(element));
      // Content is hidden for reveal only after a working observer is attached.
      document.body.classList.add("js-ready");
    }

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const cleanups: Array<() => void> = [];
    const resetCards = () => cards.forEach(resetTilt);

    cards.forEach((card) => {
      resetTilt(card);
      if (reducedMotion) return;

      let frame: number | null = null;
      const handleMove = (event: PointerEvent) => {
        if (!finePointer.matches || event.pointerType === "touch") return;
        if (frame !== null) window.cancelAnimationFrame(frame);
        const { clientX, clientY } = event;
        frame = window.requestAnimationFrame(() => {
          frame = null;
          if (!finePointer.matches || !card.isConnected) return;
          const bounds = card.getBoundingClientRect();
          if (!bounds.width || !bounds.height) return;
          const x = Math.max(-0.5, Math.min(0.5, (clientX - bounds.left) / bounds.width - 0.5));
          const y = Math.max(-0.5, Math.min(0.5, (clientY - bounds.top) / bounds.height - 0.5));
          card.style.setProperty("--tilt-x", `${(-y * 5).toFixed(2)}deg`);
          card.style.setProperty("--tilt-y", `${(x * 5).toFixed(2)}deg`);
        });
      };
      const clear = () => {
        if (frame !== null) window.cancelAnimationFrame(frame);
        frame = null;
        resetTilt(card);
      };

      card.addEventListener("pointermove", handleMove, { passive: true });
      card.addEventListener("pointerleave", clear);
      card.addEventListener("pointercancel", clear);
      cleanups.push(() => {
        clear();
        card.removeEventListener("pointermove", handleMove);
        card.removeEventListener("pointerleave", clear);
        card.removeEventListener("pointercancel", clear);
      });
    });
    finePointer.addEventListener("change", resetCards);

    return () => {
      observer?.disconnect();
      finePointer.removeEventListener("change", resetCards);
      cleanups.forEach((cleanup) => cleanup());
      document.body.classList.toggle("js-ready", wasReady);
    };
  }, [reducedMotion]);

  const value = useMemo(() => ({ reducedMotion, toggleMotion }), [reducedMotion, toggleMotion]);
  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

export function useMotion() {
  const context = useContext(MotionContext);
  if (context === null) throw new Error("useMotion must be used inside MotionProvider.");
  return context;
}
