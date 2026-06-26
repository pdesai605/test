"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGSAP } from "../../lib/gsap-register";
import CinematicVideo from "../CinematicVideo";
import { VIDEOS } from "../../lib/videos";

export default function Crafted() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line1Ref.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        line2Ref.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1.4,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
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
      className="section-pin relative flex min-h-screen items-center overflow-hidden"
    >
      <CinematicVideo
        src={VIDEOS.cocktail}
        videoId="section-crafted"
        overlayClassName="bg-gradient-to-r from-bg-primary/80 via-bg-primary/40 to-transparent"
      />
      <div className="relative z-10 px-8 md:px-20">
        <h2 className="font-heading text-[clamp(3rem,10vw,9rem)] leading-[0.9] font-light tracking-[0.04em]">
          <span ref={line1Ref} className="block text-text-primary">
            Crafted.
          </span>
          <span
            ref={line2Ref}
            className="mt-2 block text-gold-soft italic md:ml-[15vw]"
          >
            Not Served.
          </span>
        </h2>
      </div>
    </section>
  );
}
