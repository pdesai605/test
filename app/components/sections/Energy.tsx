"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGSAP } from "../../lib/gsap-register";
import CinematicVideo from "../CinematicVideo";
import { VIDEOS } from "../../lib/videos";

export default function Energy() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const smokeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, scale: 1.1 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "center center",
            scrub: 1.5,
          },
        },
      );

      gsap.to(smokeRef.current, {
        opacity: 0.6,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pin relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <CinematicVideo src={VIDEOS.dj} videoId="section-energy" overlayClassName="opacity-80" />

      <div
        ref={smokeRef}
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-bg-accent/30 opacity-40"
        aria-hidden
      />

      <div
        ref={textRef}
        className="relative z-10 px-6 text-center"
      >
        <p className="mb-6 font-body text-xs tracking-[0.4em] text-gold/60 uppercase">
          The Pulse
        </p>
        <h2 className="font-heading text-glow text-[clamp(2.5rem,8vw,7.5rem)] leading-[0.95] font-light tracking-[0.08em] uppercase">
          Feel the
          <br />
          <span className="text-gold-soft">Energy</span>
        </h2>
      </div>
    </section>
  );
}
