"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGSAP } from "../../lib/gsap-register";
import { useVideoAudio } from "../VideoAudioProvider";
import { VIDEOS } from "../../lib/videos";

function GalleryItem({ src, index }: { src: string; index: number }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);
  const videoId = `gallery-${index}`;
  const { registerVideo, unregisterVideo } = useVideoAudio();

  useEffect(() => {
    registerGSAP();
    const el = itemRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    registerVideo(videoId, video, el);

    const play = async () => {
      video.muted = true;
      try {
        await video.play();
      } catch {
        /* autoplay blocked */
      }
    };

    play();

    gsap.fromTo(
      el,
      { opacity: 0, scale: 0.92 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    );

    return () => unregisterVideo(videoId);
  }, [videoId, registerVideo, unregisterVideo]);

  return (
    <div
      ref={itemRef}
      className="group relative h-[50vh] min-h-[320px] flex-1 overflow-hidden transition-all duration-700 ease-out md:h-[70vh]"
      style={{
        flex: hovered ? 1.8 : 1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <video
        ref={videoRef}
        src={src}
        loop
        playsInline
        preload="metadata"
        className="h-full w-full scale-105 object-cover transition-transform duration-1000 ease-out group-hover:scale-100"
      />
      <div className="absolute inset-0 bg-bg-primary/30 transition-opacity duration-700 group-hover:opacity-10" />
      <span className="absolute bottom-6 left-6 font-body text-[10px] tracking-[0.3em] text-gold-soft/50 uppercase transition-opacity duration-500 group-hover:opacity-100">
        0{index + 1}
      </span>
    </div>
  );
}

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    registerGSAP();

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative min-h-screen py-24 md:py-32"
    >
      <h2
        ref={titleRef}
        className="mb-16 px-8 font-heading text-[clamp(2rem,5vw,4rem)] font-light tracking-[0.06em] text-text-primary/80 md:px-16"
      >
        Moments
      </h2>

      <div className="flex flex-col md:flex-row">
        {VIDEOS.gallery.map((src, i) => (
          <GalleryItem key={`${src}-${i}`} src={src} index={i} />
        ))}
      </div>
    </section>
  );
}
