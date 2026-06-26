"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap, registerGSAP, ScrollTrigger } from "../lib/gsap-register";
import DragonflyLogo from "./DragonflyLogo";

const TIME_SLOTS = [
  "8:00 PM",
  "9:30 PM",
  "11:00 PM",
  "12:30 AM",
] as const;

export default function Booking() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [form, setForm] = useState({
    date: "",
    guests: "2",
    time: TIME_SLOTS[0] as string,
    phone: "",
  });

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 60, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirming(true);

    setTimeout(() => {
      setConfirming(false);
      setSubmitted(true);
    }, 2200);
  };

  const inputClass =
    "w-full border-b border-gold/20 bg-transparent py-4 font-body text-sm tracking-wide text-text-primary placeholder:text-gold-soft/30 transition-colors duration-500 focus:border-gold/50";

  return (
    <section
      id="reserve"
      ref={sectionRef}
      className="section-pin relative flex min-h-screen items-center justify-center px-6 py-32"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary" />

      <div
        ref={panelRef}
        className="glass-panel gold-glow relative z-10 w-full max-w-lg rounded-2xl p-10 md:p-14"
      >
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center py-8 text-center"
            >
              <DragonflyLogo size={64} />
              <h3 className="mt-8 font-heading text-3xl tracking-[0.06em] text-gold-soft">
                Reserved
              </h3>
              <p className="mt-4 max-w-xs font-body text-sm leading-relaxed tracking-wide text-gold-soft/60">
                Your night awaits. Our concierge will confirm your experience
                shortly.
              </p>
            </motion.div>
          ) : confirming ? (
            <motion.div
              key="confirming"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center py-16"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, ease: "linear", repeat: Infinity }}
              >
                <DragonflyLogo size={56} />
              </motion.div>
              <p className="mt-8 font-body text-xs tracking-[0.3em] text-gold/60 uppercase">
                Securing your experience
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
            >
              <h2 className="font-heading text-[clamp(2rem,4vw,2.8rem)] font-light tracking-[0.04em] text-text-primary">
                Reserve Your Night
              </h2>
              <div className="mt-12 space-y-8">
                <div>
                  <label className="mb-2 block font-body text-[10px] tracking-[0.25em] text-gold/50 uppercase">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, date: e.target.value }))
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block font-body text-[10px] tracking-[0.25em] text-gold/50 uppercase">
                    Guests
                  </label>
                  <select
                    required
                    value={form.guests}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, guests: e.target.value }))
                    }
                    className={`${inputClass} cursor-pointer appearance-none`}
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                      <option key={n} value={n} className="bg-bg-secondary">
                        {n} {n === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-body text-[10px] tracking-[0.25em] text-gold/50 uppercase">
                    Time Slot
                  </label>
                  <select
                    required
                    value={form.time}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, time: e.target.value }))
                    }
                    className={`${inputClass} cursor-pointer appearance-none`}
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot} className="bg-bg-secondary">
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-body text-[10px] tracking-[0.25em] text-gold/50 uppercase">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="font-heading mt-12 w-full cursor-pointer border border-gold/40 bg-bg-maroon/30 py-4 text-sm tracking-[0.3em] text-gold uppercase transition-all duration-700 hover:border-gold/70 hover:bg-bg-accent/50 hover:text-gold-soft"
              >
                Reserve Experience
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
