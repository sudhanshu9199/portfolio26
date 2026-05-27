"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./SkillMarquee.module.scss";

// Safely register GSAP plugins on the client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Gorgeous rounded 8-point geometric asterisk separator as shown in the design
const SeparatorStar = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.starIcon}
    aria-hidden="true"
  >
    <path
      d="M12 2V22M2 12H22M4.93 4.93L19.07 19.07M4.93 19.07L19.07 4.93"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
  </svg>
);

const SkillMarquee = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const skills = [
    "Web Design",
    "Web Architecture",
    "Web Animation",
    "Responsiveness",
    "Production-Redy Web Applications",
    "PWA (Progressive Web Apps)",
    "AI-Integrated Apps",
  ];

  // GSAP Infinite Seamless Scroll & Interactive Scroll-Velocity Acceleration
  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      // 1. Core loop animation shifting the track -50% (exactly one full duplicate width)
      const loop = gsap.to(track, {
        xPercent: -50,
        ease: "none",
        duration: 18, // Butter-smooth constant scrolling speed
        repeat: -1,
      });

      // 2. Tactile Hover Micro-Interaction (Slow down marquee on hover to invite reading)
      const handleMouseEnter = () => {
        gsap.to(loop, { timeScale: 0.35, duration: 0.8, ease: "power2.out" });
      };

      const handleMouseLeave = () => {
        gsap.to(loop, { timeScale: 1.0, duration: 0.8, ease: "power2.out" });
      };

      track.addEventListener("mouseenter", handleMouseEnter);
      track.addEventListener("mouseleave", handleMouseLeave);

      // 3. Scroll-Velocity Acceleration (Ticker spins slightly faster as the user scrolls, feeling alive and organic)
      const scrollTriggerInstance = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const scrollSpeed = Math.abs(self.getVelocity() * 0.0003); // Subtle multiplier to prevent abrupt speed jumps
          let targetScale = 1.0 + scrollSpeed;

          // Cap maximum speed to 1.8x (was 3.5x) to maintain legibility and premium motion design
          if (targetScale > 1.8) targetScale = 1.8;

          gsap.to(loop, {
            timeScale: targetScale,
            duration: 0.8, // Cushioned transition back to default speed
            ease: "power2.out",
            overwrite: "auto",
          });
        },
      });

      // Clean up event listeners and tweens on unmount
      return () => {
        if (track) {
          track.removeEventListener("mouseenter", handleMouseEnter);
          track.removeEventListener("mouseleave", handleMouseLeave);
        }
        loop.kill();
        scrollTriggerInstance.kill();
      };
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className={styles.marqueeSection}
      aria-label="Skills Marquee"
    >
      {/* Decorative slightly slanted orange background strip */}
      <div className={styles.orangeSlantedStrip} aria-hidden="true" />

      {/* Main horizontally straight yellow scrolling ticker */}
      <div className={styles.yellowStraightStrip}>
        {/* The Track contains exactly two identical groups to achieve perfect seamlessness */}
        <div ref={trackRef} className={styles.marqueeTrack}>
          {/* Primary Group */}
          <div className={styles.marqueeGroup}>
            {skills.map((skill, idx) => (
              <div key={`prime-${idx}`} className={styles.marqueeItem}>
                <span className={styles.skillText}>{skill}</span>
                <SeparatorStar />
              </div>
            ))}
          </div>

          {/* Mirror Duplicate Group for Seamless Loop */}
          <div className={styles.marqueeGroup} aria-hidden="true">
            {skills.map((skill, idx) => (
              <div key={`mirror-${idx}`} className={styles.marqueeItem}>
                <span className={styles.skillText}>{skill}</span>
                <SeparatorStar />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillMarquee;
