"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowIcon, SparkIcon } from "@/components/icons";

const navigation = [
  { href: "#about", label: "About AURA" },
  { href: "#services", label: "Our services" },
  { href: "#work", label: "Selected work" },
  { href: "#process", label: "Our process" },
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const mobileNav = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame: number | null = null;
    const updateHeader = () => {
      setScrolled(window.scrollY > 24);
      frame = null;
    };
    const handleScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(updateHeader);
    };
    updateHeader();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 681px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const focusFrame = window.requestAnimationFrame(() => mobileNav.current?.querySelector<HTMLAnchorElement>("a")?.focus());
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setMenuOpen(false);
      menuButton.current?.focus();
    };
    const handleOutsideClick = (event: MouseEvent) => {
      if (!(event.target instanceof Node)) return;
      if (mobileNav.current?.contains(event.target) || menuButton.current?.contains(event.target)) return;
      setMenuOpen(false);
      // Retain focus on a clicked control; recover it if the hidden menu had focus.
      if (mobileNav.current?.contains(document.activeElement)) menuButton.current?.focus();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleOutsideClick);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [menuOpen]);

  return (
    <header id="site-header" className={scrolled ? "scrolled" : undefined}>
      <div className="nav-wrap container">
        <a className="brand" href="#home" aria-label="AURA home" onClick={() => setMenuOpen(false)}>
          <span className="brand-icon" aria-hidden="true"><SparkIcon /></span>
          <span className="brand-word" dir="ltr">aura<span className="brand-dot">.</span></span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>
          Have an idea? <span aria-hidden="true"><ArrowIcon direction="up-right" /></span>
        </a>
        <button
          ref={menuButton}
          id="menu-toggle"
          className="icon-button"
          type="button"
          aria-controls="mobile-nav"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span />
        </button>
      </div>
      <nav ref={mobileNav} id="mobile-nav" aria-label="Mobile navigation" hidden={!menuOpen}>
        {navigation.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
        <a href="#contact" onClick={() => setMenuOpen(false)}>Start a project <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
  );
}
