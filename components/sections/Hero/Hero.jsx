"use client";
import React, { useRef } from "react";
import Image from "next/image";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./Hero.module.scss";
import boyHandImage from "../../../public/boyHand.png";
import sudhanshuImage from "../../../public/images/sudhanshu.png";
import Navbar from "@/components/layout/Navbar/Navbar";

// Safely register GSAP plugins on the client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Word-wrapping responsive scroll reveal layout component that coordinates staggered double-layer accessibility reveals
const ScrollRevealText = ({ text, fontClass, lineClass }) => {
  const words = text.split(" ");

  return (
    <div className={`${styles.revealParagraph} ${lineClass}`}>
      <div className={`${styles.animateMe} ${fontClass} animate-me`} aria-hidden="true">
        {words.map((word, wordIdx) => (
          <span key={wordIdx} className={`${styles.word} word-reveal`}>
            {word}
            {wordIdx < words.length - 1 && "\u00A0"}
          </span>
        ))}
      </div>
      <p className={styles.srOnly}>
        {text}
      </p>
    </div>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const glowRef = useRef(null);
  const handRef = useRef(null);
  const portTextRef = useRef(null);
  const folioTextRef = useRef(null);
  const cardRef = useRef(null);
  const manifestoRef = useRef(null);

  // 1. GSAP ScrollTrigger Pinning & Staggered Typographic Manifesto
  useGSAP(
    () => {
      let mm = gsap.matchMedia();

      // DESKTOP & TABLET TIMELINE (> 768px)
      mm.add("(min-width: 769px)", () => {
        // Set initial states for high-fidelity entry transitions
        gsap.set(portTextRef.current, { x: -160, rotate: -18, opacity: 0.3 });
        gsap.set(folioTextRef.current, {
          x: 160,
          rotate: 18,
          opacity: 0.2,
          backgroundColor: "rgba(255, 69, 0, 0.1)",
          borderColor: "#000000",
        });
        gsap.set(handRef.current, {
          y: 0,
          opacity: 1,
          scale: 0.95,
          rotate: 0,
          filter: "blur(0px)",
        });
        gsap.set(manifestoRef.current, { opacity: 0, x: -30 });
        gsap.set(".word-reveal", { opacity: 0, y: 15 });
        gsap.set(cardRef.current, { x: 0 }); // Center alignment

        // Setup master viewport pinning timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 6%", // Pin instantly when top of Hero meets top of viewport
            end: "+=85%", // Slightly more scroll height to give breathing room for staggered stagers
            scrub: 1.2, // Smooth scroll tracking ease
            pin: true, // PIN THE SECTION VIEWPORT
            anticipatePin: 1,
            markers: false, // Omit markers for production elegance
          },
        });

        // Phase 1: Background Theme Transition, Hand Waves & Logo Snapping (0.0 to 1.5)
        tl.to(
          sectionRef.current,
          { backgroundColor: "#0a0a0c", color: "#f3f4f6", duration: 1.5 },
          0,
        )
          .to(glowRef.current, { opacity: 0.65, scale: 1.15, duration: 1.5 }, 0)
          .to(
            handRef.current,
            {
              y: -120,
              opacity: 0,
              scale: 0.88,
              rotate: 0,
              filter: "blur(18px)",
              duration: 1.5,
            },
            0,
          )
          .to(
            portTextRef.current,
            { x: 0, rotate: 0, opacity: 1, duration: 1.5 },
            0.2,
          )
          .to(
            folioTextRef.current,
            {
              x: 0,
              rotate: 0,
              opacity: 1,
              backgroundColor: "rgba(255, 69, 0, 1)",
              borderColor: "#ffffff",
              duration: 1.5,
            },
            0.2,
          );

        // Phase 2: Card slides smoothly to the Right Side (1.5 to 3.5)
        tl.to(
          cardRef.current,
          { x: 240, ease: "power2.inOut", duration: 2.0 },
          1.5,
        );

        // Phase 3: Left Side manifestoBlock reveals and Line 1 staggers (3.5 to 5.0)
        tl.to(
          manifestoRef.current,
          { opacity: 1, x: 0, ease: "power2.out", duration: 0.8 },
          3.5,
        ).to(
          ".line-1 .word-reveal",
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            ease: "sine.out",
            duration: 1.5,
          },
          3.8,
        );

        // Phase 4: Line 2 staggers after a sequential breathing delay (5.2 to 7.5)
        tl.to(
          ".line-2 .word-reveal",
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            ease: "sine.out",
            duration: 2.0,
          },
          5.2,
        );
      });

      // MOBILE TIMELINE (<= 768px)
      mm.add("(max-width: 768px)", () => {
        // Set initial states for mobile center stacked layout
        gsap.set(portTextRef.current, { x: -100, rotate: -10, opacity: 0 });
        gsap.set(folioTextRef.current, {
          x: 100,
          rotate: 10,
          opacity: 0,
          backgroundColor: "rgba(255, 69, 0, 0.1)",
          borderColor: "#000000",
        });
        gsap.set(handRef.current, {
          y: 0,
          opacity: 1,
          scale: 0.95,
          rotate: 0,
          filter: "blur(0px)",
        });
        gsap.set(manifestoRef.current, { opacity: 1, x: 0 });
        gsap.set(".word-reveal", { opacity: 0, y: 15 });
        gsap.set(cardRef.current, { x: 0 });

        // Mobile trigger without pinning (keeps mobile page flows natural)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center", // Trigger midway down viewport
            end: "bottom center",
            scrub: 1.2,
          },
        });

        // Background transition & hand fadeout
        tl.to(
          sectionRef.current,
          { backgroundColor: "#0a0a0c", color: "#f3f4f6", duration: 1.5 },
          0,
        )
          .to(glowRef.current, { opacity: 0.6, scale: 1.05, duration: 1.5 }, 0)
          .to(
            handRef.current,
            {
              y: -80,
              opacity: 0,
              scale: 0.9,
              rotate: 0,
              filter: "blur(12px)",
              duration: 1.5,
            },
            0,
          )
          .to(
            portTextRef.current,
            { x: 0, rotate: 0, opacity: 1, duration: 1.2 },
            0.3,
          )
          .to(
            folioTextRef.current,
            {
              x: 0,
              rotate: 0,
              opacity: 1,
              backgroundColor: "rgba(255, 69, 0, 1)",
              borderColor: "#ffffff",
              duration: 1.2,
            },
            0.3,
          );

        // Sequential text staggers on mobile stacking layout
        tl.to(
          ".line-1 .word-reveal",
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            ease: "sine.out",
            duration: 1.5,
          },
          1.5,
        ).to(
          ".line-2 .word-reveal",
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            ease: "sine.out",
            duration: 1.8,
          },
          2.5,
        );
      });
    },
    { scope: containerRef },
  );

  // 2. GSAP Elastic Local Spotlight Mouse/Touch Hover Reveal (Butter-smooth, physical spring response)
  const updateCoordinates = (clientX, clientY) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    gsap.to(cardRef.current, {
      "--mouse-x": `${x}px`,
      "--mouse-y": `${y}px`,
      duration: 2.5,
      ease: "elastic.out(1, 0.3)",
      overwrite: "auto",
    });
  };

  const handleMouseMove = (e) => {
    updateCoordinates(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      updateCoordinates(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleMouseEnter = (e) => {
    // Expand circle spotlight from 0px to 110px and fade in indicator orb
    gsap.to(cardRef.current, {
      "--spotlight-radius": "110px",
      "--pointer-opacity": 1,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto",
    });
    if (e && e.clientX) {
      updateCoordinates(e.clientX, e.clientY);
    }
  };

  const handleMouseLeave = () => {
    // Shrink spotlight back to 0px on exit
    gsap.to(cardRef.current, {
      "--spotlight-radius": "0px",
      "--pointer-opacity": 0,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleTouchStart = (e) => {
    handleMouseEnter();
    if (e.touches.length > 0) {
      updateCoordinates(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    handleMouseLeave();
  };

  return (
    <div ref={containerRef} style={{ width: "100%" }}>
      <section ref={sectionRef} className={styles.heroSection}>
        {/* Premium Backdrop Glow Orb */}
        <div ref={glowRef} className={styles.glow} />

        {/* Hardware-Accelerated Cinematic Hand */}
        <div ref={handRef} className={styles.boyHand}>
          <Image
            className={styles.boyHandImage}
            src={boyHandImage}
            alt="Boy Hand"
            priority={true}
          />
        </div>

        {/* Title Separation Animation */}
        <div className={styles.portfolio}>
          <p ref={portTextRef} className={styles.portText}>
            Port
          </p>
          <p ref={folioTextRef} className={styles.folioText}>
            Folio
          </p>
        </div>

        {/* Responsive Split Row Container */}
        <div className={styles.splitRow}>
          {/* Left Side: Graphic Manifesto (Staggered Reveals) */}
          <div ref={manifestoRef} className={styles.manifestoBlock}>
            <ScrollRevealText
              text="I AM A PROGRAMMER"
              fontClass={styles.headlineText}
              lineClass="line-1"
            />
            <ScrollRevealText
              text="PLACING MYSELF AT THE CUTTING EDGE OF TECHNOLOGY WITH SWIFT ADAPTABILITY."
              fontClass={styles.gradientStatement}
              lineClass="line-2"
            />
          </div>

          {/* Right Side: Interactive Flashlight Spotlight Portrait */}
          <div
            ref={cardRef}
            className={styles.portraitContainer}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Cover Layer (Inactive - Grayscale and Blurred Portrait Grid) */}
            <div className={styles.coverLayer}>
              <Image
                className={styles.silhouetteImage}
                src={sudhanshuImage}
                alt="Sudhanshu Outline"
                priority={true}
              />
              <div className={styles.coverTextContainer}>
                <span className={styles.unveilText}>Hover to Unveil</span>
                <h2 className={styles.creatorName}>Sudhanshu</h2>
              </div>
            </div>

            {/* Revealed Layer (Active - Masked Spotlight Circle showing Sharp Full Color Image) */}
            <div
              className={styles.revealLayer}
            >
              <Image
                className={styles.revealedImage}
                src={sudhanshuImage}
                alt="Sudhanshu Colorized"
                priority={true}
              />
            </div>

            {/* Custom pointer neon source tracker */}
            <div
              className={styles.pointerOrb}
            />
          </div>
        </div>

        {/* <Navbar /> */}
      </section>
    </div>
  );
};

export default Hero;
