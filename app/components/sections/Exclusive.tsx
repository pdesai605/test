"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGSAP } from "../../lib/gsap-register";
import CinematicVideo from "../CinematicVideo";
import { VIDEOS } from "../../lib/videos";

export default function Exclusive() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const confettiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 60, letterSpacing: "0.2em" },
        {
          opacity: 1,
          y: 0,
          letterSpacing: "0.06em",
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 55%",
            end: "center center",
            scrub: 1.8,
          },
        },
      );

      if (confettiRef.current) {
        const particles = confettiRef.current.children;
        gsap.fromTo(
          particles,
          { y: -20, opacity: 0, rotation: 0 },
          {
            y: 100,
            opacity: 0.7,
            rotation: 360,
            duration: 4,
            stagger: 0.1,
            repeat: -1,
            ease: "none",
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="events"
      ref={sectionRef}
      className="section-pin relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <CinematicVideo src={VIDEOS.crowd} videoId="section-exclusive" overlayClassName="opacity-75" />

      <div
        ref={confettiRef}
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-gold/40"
            style={{
              left: `${8 + i * 7.5}%`,
              top: `${10 + (i % 4) * 15}%`,
            }}
          />
        ))}
      </div>

      <h2
        ref={textRef}
        className="relative z-10 max-w-4xl px-6 text-center font-heading text-[clamp(1.8rem,5vw,4.5rem)] leading-[1.15] font-light tracking-[0.06em] text-text-primary"
      >
        The City&apos;s Most
        <br />
        <span className="text-gold-soft italic">Exclusive Nights</span>
      </h2>
    </section>
  );
}
