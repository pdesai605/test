"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "../lib/gsap-register";
import DragonflyLogo from "./DragonflyLogo";
import { NAV_LINKS } from "../lib/videos";

interface NavbarProps {
  visible: boolean;
}

export default function Navbar({ visible }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!navRef.current) return;

    gsap.to(navRef.current, {
      y: visible ? 0 : -100,
      opacity: visible ? 1 : 0,
      duration: 1.2,
      ease: "power3.out",
      pointerEvents: visible ? "auto" : "none",
    });
  }, [visible]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 right-0 left-0 z-50 -translate-y-full opacity-0"
      style={{ pointerEvents: "none" }}
    >
      <div className="glass-panel mx-4 mt-4 flex items-center justify-between rounded-full px-6 py-3 md:mx-8 md:px-10">
        <Link
          href="#"
          className="flex items-center gap-3 transition-opacity duration-500 hover:opacity-80"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <DragonflyLogo size={28} />
          <span className="font-heading hidden text-sm tracking-[0.25em] text-gold uppercase sm:block">
            Dragonfly
          </span>
        </Link>

        <ul className="flex items-center gap-3 overflow-x-auto sm:gap-4 md:gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="shrink-0">
              <a
                href={link.href}
                className="font-body text-[9px] tracking-[0.15em] text-gold-soft/80 uppercase transition-colors duration-500 hover:text-gold sm:text-[10px] md:text-xs md:tracking-[0.2em]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
