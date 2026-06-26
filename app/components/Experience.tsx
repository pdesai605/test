"use client";

import { useCallback, useEffect, useState } from "react";
import Loader from "./Loader";
import Hero from "./Hero";
import Navbar from "./Navbar";
import SmoothScroll from "./SmoothScroll";
import { VideoAudioProvider } from "./VideoAudioProvider";
import { ScrollTrigger } from "../lib/gsap-register";
import NightTransforms from "./sections/NightTransforms";
import Crafted from "./sections/Crafted";
import Energy from "./sections/Energy";
import Dining from "./sections/Dining";
import Exclusive from "./sections/Exclusive";
import Gallery from "./sections/Gallery";
import Booking from "./Booking";
import Footer from "./Footer";

export default function Experience() {
  const [loading, setLoading] = useState(true);
  const [showHero, setShowHero] = useState(false);
  const [entered, setEntered] = useState(false);
  const [audioReady, setAudioReady] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setLoading(false);
    setShowHero(true);
    setAudioReady(true);
  }, []);

  const handleEnter = useCallback(() => {
    setEntered(true);
  }, []);

  useEffect(() => {
    if (!entered) return;

    ScrollTrigger.refresh();

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) return;

    const timer = setTimeout(() => {
      document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
    }, 1400);

    return () => clearTimeout(timer);
  }, [entered]);

  return (
    <VideoAudioProvider>
      <ExperienceContent
        loading={loading}
        showHero={showHero}
        entered={entered}
        audioReady={audioReady}
        onLoaderComplete={handleLoaderComplete}
        onEnter={handleEnter}
      />
    </VideoAudioProvider>
  );
}

function ExperienceContent({
  loading,
  showHero,
  entered,
  audioReady,
  onLoaderComplete,
  onEnter,
}: {
  loading: boolean;
  showHero: boolean;
  entered: boolean;
  audioReady: boolean;
  onLoaderComplete: () => void;
  onEnter: () => void;
}) {
  return (
    <>
      {loading && <Loader onComplete={onLoaderComplete} />}

      <Navbar visible={entered} />

      <SmoothScroll enabled={entered}>
        <main className="relative bg-bg-primary">
          {showHero && (
            <Hero
              entered={entered}
              onEnter={onEnter}
              audioReady={audioReady}
            />
          )}

          {entered && (
            <>
              <NightTransforms />
              <Crafted />
              <Energy />
              <Dining />
              <Exclusive />
              <Gallery />
              <Booking />
              <Footer />
            </>
          )}
        </main>
      </SmoothScroll>
    </>
  );
}
