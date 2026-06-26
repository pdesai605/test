"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap } from "../lib/gsap-register";
import CinematicVideo from "./CinematicVideo";
import Particles from "./Particles";
import { useVideoAudio } from "./VideoAudioProvider";
import { VIDEOS } from "../lib/videos";

interface HeroProps {
  entered: boolean;
  onEnter: () => void;
  audioReady?: boolean;
}

export default function Hero({ entered, onEnter, audioReady }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const parallaxX = useTransform(springX, [-0.5, 0.5], [-15, 15]);
  const parallaxY = useTransform(springY, [-0.5, 0.5], [-10, 10]);
  const { unlockAudio, forceActiveVideo } = useVideoAudio();

  useEffect(() => {
    if (audioReady) unlockAudio();
  }, [audioReady, unlockAudio]);

  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        [titleRef.current, subtitleRef.current, buttonRef.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          stagger: 0.2,
          ease: "power3.out",
          delay: 0.3,
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (entered) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const playHeroVideo = () => {
    unlockAudio();
    forceActiveVideo("hero");
  };

  const handleVideoTap = (e: React.PointerEvent) => {
    e.stopPropagation();
    playHeroVideo();
  };

  const handleEnter = () => {
    if (entered) return;

    playHeroVideo();

    const tl = gsap.timeline({ onComplete: onEnter });

    tl.to([titleRef.current, subtitleRef.current, buttonRef.current], {
      opacity: 0,
      y: -30,
      duration: 0.8,
      stagger: 0.08,
      ease: "power2.inOut",
    }).to(
      sectionRef.current,
      {
        opacity: 0.4,
        duration: 1.4,
        ease: "power3.inOut",
      },
      "-=0.4",
    );
  };

  return (
    <section
      ref={sectionRef}
      className={`section-pin relative flex h-screen w-full items-center justify-center overflow-hidden ${
        entered ? "pointer-events-none" : "z-40"
      }`}
      onMouseMove={handleMouseMove}
    >
      <CinematicVideo
        src={VIDEOS.hero}
        priority
        videoId="hero"
        overlayClassName="opacity-90"
      />

      {!entered && (
        <button
          type="button"
          aria-label="Play hero video"
          className="absolute inset-0 z-[5] cursor-pointer touch-manipulation bg-transparent md:hidden"
          onPointerDown={handleVideoTap}
        />
      )}

      <Particles count={20} />

      <motion.div
        ref={contentRef}
        style={{ x: entered ? 0 : parallaxX, y: entered ? 0 : parallaxY }}
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        <h1
          ref={titleRef}
          className="font-heading text-glow text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] font-light tracking-[0.08em] text-text-primary uppercase opacity-0"
        >
          Enter the Dragon
        </h1>

        <p
          ref={subtitleRef}
          className="mt-8 max-w-md font-body text-sm leading-relaxed tracking-[0.15em] text-gold-soft/70 uppercase opacity-0 md:text-base"
        >
          A luxury nightlife experience unlike anything else
        </p>

        {!entered && (
          <button
            ref={buttonRef}
            type="button"
            onClick={handleEnter}
            className="font-heading gold-glow relative z-20 mt-14 cursor-pointer touch-manipulation border border-gold/40 bg-bg-accent/30 px-16 py-4 text-sm tracking-[0.35em] text-gold uppercase opacity-0 backdrop-blur-sm transition-all duration-700 hover:border-gold/70 hover:bg-bg-maroon/40 hover:text-gold-soft"
          >
            Enter
          </button>
        )}
      </motion.div>
    </section>
  );
}
