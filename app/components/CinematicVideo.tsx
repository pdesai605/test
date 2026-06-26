"use client";

import { useEffect, useId, useRef } from "react";
import { useVideoAudio } from "./VideoAudioProvider";

interface CinematicVideoProps {
  src: string;
  className?: string;
  overlayClassName?: string;
  priority?: boolean;
  videoId?: string;
}

export default function CinematicVideo({
  src,
  className = "",
  overlayClassName = "",
  priority = false,
  videoId,
}: CinematicVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const autoId = useId();
  const id = videoId ?? `video-${autoId}`;
  const { registerVideo, unregisterVideo } = useVideoAudio();

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    registerVideo(id, video, container);

    const play = async () => {
      video.muted = true;
      try {
        await video.play();
      } catch {
        /* autoplay blocked */
      }
    };

    play();

    return () => unregisterVideo(id);
  }, [id, src, registerVideo, unregisterVideo]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        loop
        playsInline
        autoPlay
        preload={priority ? "auto" : "metadata"}
        className="h-full w-full scale-105 object-cover"
      />
      <div
        className={`cinematic-overlay absolute inset-0 ${overlayClassName}`}
      />
    </div>
  );
}
