"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type VideoEntry = {
  element: HTMLVideoElement;
  container: HTMLElement;
};

type VideoAudioContextValue = {
  registerVideo: (id: string, element: HTMLVideoElement, container: HTMLElement) => void;
  unregisterVideo: (id: string) => void;
  unlockAudio: () => void;
};

const VideoAudioContext = createContext<VideoAudioContextValue | null>(null);

export function useVideoAudio() {
  const ctx = useContext(VideoAudioContext);
  if (!ctx) {
    throw new Error("useVideoAudio must be used within VideoAudioProvider");
  }
  return ctx;
}

export function VideoAudioProvider({ children }: { children: React.ReactNode }) {
  const videosRef = useRef<Map<string, VideoEntry>>(new Map());
  const activeIdRef = useRef<string | null>(null);
  const [unlocked, setUnlocked] = useState(true);

  const unlockAudio = useCallback(() => {
    setUnlocked(true);
  }, []);

  const applyAudioState = useCallback(() => {
    const activeId = activeIdRef.current;

    videosRef.current.forEach((entry, id) => {
      const isActive = unlocked && id === activeId;
      entry.element.muted = !isActive;
      entry.element.volume = isActive ? 1 : 0;

      if (isActive) {
        entry.element.play().catch(() => {});
      }
    });
  }, [unlocked]);

  const pickActiveVideo = useCallback(() => {
    let bestId: string | null = null;
    let bestRatio = 0;

    videosRef.current.forEach((entry, id) => {
      const rect = entry.container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(viewportHeight, rect.bottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const ratio = visibleHeight / Math.min(rect.height, viewportHeight);

      if (ratio > bestRatio) {
        bestRatio = ratio;
        bestId = id;
      }
    });

    if (bestRatio < 0.25) {
      bestId = null;
    }

    if (activeIdRef.current !== bestId) {
      activeIdRef.current = bestId;
      applyAudioState();
    }
  }, [applyAudioState]);

  useEffect(() => {
    applyAudioState();
  }, [unlocked, applyAudioState]);

  useEffect(() => {
    const handleUpdate = () => pickActiveVideo();

    window.addEventListener("scroll", handleUpdate, { passive: true });
    window.addEventListener("resize", handleUpdate, { passive: true });

    const interval = setInterval(handleUpdate, 400);

    handleUpdate();

    return () => {
      window.removeEventListener("scroll", handleUpdate);
      window.removeEventListener("resize", handleUpdate);
      clearInterval(interval);
    };
  }, [pickActiveVideo]);

  useEffect(() => {
    const unlock = () => setUnlocked(true);

    document.addEventListener("pointerdown", unlock, { once: true });
    document.addEventListener("keydown", unlock, { once: true });

    return () => {
      document.removeEventListener("pointerdown", unlock);
      document.removeEventListener("keydown", unlock);
    };
  }, []);

  const registerVideo = useCallback(
    (id: string, element: HTMLVideoElement, container: HTMLElement) => {
      videosRef.current.set(id, { element, container });
      pickActiveVideo();
    },
    [pickActiveVideo],
  );

  const unregisterVideo = useCallback(
    (id: string) => {
      videosRef.current.delete(id);
      if (activeIdRef.current === id) {
        activeIdRef.current = null;
        pickActiveVideo();
      }
    },
    [pickActiveVideo],
  );

  return (
    <VideoAudioContext.Provider
      value={{ registerVideo, unregisterVideo, unlockAudio }}
    >
      {children}
    </VideoAudioContext.Provider>
  );
}
