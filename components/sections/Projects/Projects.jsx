"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./Projects.module.scss";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Projects = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const titleOutlineRef = useRef(null);
  const titleSolidRef = useRef(null);
  const cardsRef = useRef([]);

  // Symmetrical and robust GSAP reveals
  useGSAP(
    () => {
      // 1. Dual-Layer clip-path bottom-to-top liquid black text fill
      // Starts exactly when the titleWrapper touches top 10% viewport and finishes exactly when it sticks at top 0%
      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: titleRef.current, // Trigger off the sticky titleWrapper itself!
          start: "top 10%", // Starts when the top of titleWrapper touches 10% of viewport
          end: "top 0%", // Ends exactly when it locks at top: 0% (sticks)
          scrub: 0.5, // Cushioned scroll scrub
        },
      });

      titleTl.fromTo(
        titleSolidRef.current,
        {
          clipPath: "inset(100% 0 0 0)", // Fully clipped out from top (hidden)
        },
        {
          clipPath: "inset(0% 0 0 0)", // Unclipped (fully revealed)
          ease: "none",
        },
        0,
      );

      titleTl.fromTo(
        titleOutlineRef.current,
        {
          opacity: 1, // Full outline border visible
        },
        {
          opacity: 0, // Outline fades to invisible as text fills solid
          ease: "none",
        },
        0,
      );

      // 2. Premium 3D Card Stacking & Receding tween using Dynamic Width Offsets
      const cards = cardsRef.current.filter(Boolean); // Safe-filter to prevent hydration/mount crashes
      cards.forEach((card, index) => {
        if (index === cards.length - 1) return; // Last card stays fully front-and-center

        const nextCard = cards[index + 1];
        const nextIndex = index + 1;

        gsap.to(card, {
          scale: 0.93, // Pull back in 3D space
          // PRODUCTION FIX: Remove opacity tween. Keeping card 100% opaque black prevents it from
          // blending with the white section background and creating a washed-out "grey haze" (white layer)!
          opacity: 1.0,
          filter: "brightness(0.20) blur(2px)", // Rich dark charcoal receding shadow effect
          yPercent: -10, // Pull upward slightly
          ease: "none",
          scrollTrigger: {
            trigger: nextCard,
            // Function-based coordinates automatically recalibrate on viewport resize and page refresh!
            start: () => `top ${getStickyTop(nextIndex) + 300}px`, // Starts exactly 300px before cards stack
            end: () => `top ${getStickyTop(nextIndex)}px`, // Ends exactly at the millisecond the card locks
            scrub: true, // Smooth scrub tied directly to scroll depth
          },
        });
      });

      // 3. Force ScrollTrigger refresh after a short delay
      // This recalibrates all downstream coordinates once images and VideoScroll settle
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 1000);

      return () => clearTimeout(timer);
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className={styles.projectsSection}
      aria-label="Selected Projects"
    >
      {/* Sticky Massive Centered PROJECTS Section Header (Dual Layer for subpixel-perfect alignment) */}
      <div ref={titleRef} className={styles.titleWrapper}>
        <div className={styles.titleInner}>
          <h2
            ref={titleOutlineRef}
            className={`${styles.sectionTitle} ${styles.titleOutline}`}
          >
            PROJECTS
          </h2>
          <h2
            ref={titleSolidRef}
            className={`${styles.sectionTitle} ${styles.titleSolid}`}
          >
            PROJECTS
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Projects;
