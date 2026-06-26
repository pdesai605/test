"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap-register";
import DragonflyLogo from "./DragonflyLogo";
import Particles from "./Particles";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 1.2,
            ease: "power2.inOut",
            onComplete,
          });
        },
      });

      tl.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.92, filter: "blur(8px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 2,
          ease: "power2.out",
        },
      )
        .to(logoRef.current, {
          opacity: 0,
          scale: 1.05,
          filter: "blur(4px)",
          duration: 1.2,
          ease: "power2.inOut",
          delay: 0.5,
        });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-primary"
    >
      <Particles count={25} />
      <div
        ref={logoRef}
        className="relative flex flex-col items-center gap-6 opacity-0"
      >
        <div className="gold-glow rounded-full p-8">
          <DragonflyLogo size={100} />
        </div>
        <span className="font-heading text-sm tracking-[0.4em] text-gold-soft/60 uppercase">
          Dragonfly
        </span>
      </div>
    </div>
  );
}
