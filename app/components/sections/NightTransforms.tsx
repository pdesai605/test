"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGSAP } from "../../lib/gsap-register";
import CinematicVideo from "../CinematicVideo";
import { VIDEOS } from "../../lib/videos";

export default function NightTransforms() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top 20%",
            scrub: 1.2,
          },
        },
      );

      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-pin relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <CinematicVideo src={VIDEOS.night} videoId="section-night" />
      <div className="relative z-10 px-6 text-center">
        <div
          ref={lineRef}
          className="mx-auto mb-10 h-px w-24 origin-center bg-gold/40"
        />
        <h2
          ref={textRef}
          className="font-heading text-[clamp(2.2rem,7vw,6.5rem)] leading-[1.05] font-light tracking-[0.06em] text-text-primary"
        >
          Where the night
          <br />
          <span className="text-gold-soft italic">transforms.</span>
        </h2>
      </div>
    </section>
  );
}
