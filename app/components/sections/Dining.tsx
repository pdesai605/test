"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGSAP } from "../../lib/gsap-register";
import CinematicVideo from "../CinematicVideo";
import { VIDEOS } from "../../lib/videos";

export default function Dining() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const accentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        [textRef.current, accentRef.current],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.6,
          stagger: 0.25,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 55%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pin relative flex min-h-screen items-end overflow-hidden pb-24 md:items-center md:pb-0"
    >
      <CinematicVideo
        src={VIDEOS.dining}
        videoId="section-dining"
        overlayClassName="bg-gradient-to-t from-bg-primary via-bg-primary/50 to-bg-primary/30"
      />

      <div className="relative z-10 px-8 md:px-20">
        <span
          ref={accentRef}
          className="mb-6 block font-body text-xs tracking-[0.35em] text-gold/50 uppercase"
        >
          Asian Cuisine · Fine Dining
        </span>
        <p
          ref={textRef}
          className="font-heading max-w-2xl text-[clamp(1.8rem,4vw,3.5rem)] leading-[1.2] font-light tracking-[0.04em] text-text-primary/90"
        >
          An evening of taste,
          <br />
          <span className="text-gold-soft italic">curated in silence.</span>
        </p>
      </div>
    </section>
  );
}
