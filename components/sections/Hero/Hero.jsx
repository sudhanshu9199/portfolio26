"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  animate,
} from "framer-motion";
import styles from "./Hero.module.scss";
import boyHandImage from "../../../public/boyHand.png";
import sudhanshuImage from "../../../public/images/sudhanshu.png";
import Navbar from "@/components/layout/Navbar/Navbar";

const Hero = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  // Track the scroll progress of the Hero section as it enters the viewport and reaches the top
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  // 1. Dynamic Background and Text Color Transitions (Light to Premium Dark Theme Shift)
  const heroBg = useTransform(
    scrollYProgress,
    [0, 0.65, 1],
    ["#ffffff", "#f8f9fa", "#0a0a0c"],
  );
  const textColor = useTransform(
    scrollYProgress,
    [0.65, 1],
    ["#000000", "#f3f4f6"],
  );

  // 2. Backdrop Accent Neon Orb Glow
  const glowOpacity = useTransform(
    scrollYProgress,
    [0.45, 0.85, 1],
    [0, 0.75, 0.6],
  );
  const glowScale = useTransform(scrollYProgress, [0.9, 1], [1, 0]);

  // 3. Kinetic Hand Animation Mappings
  const handOpacity = useTransform(scrollYProgress, [0, 0.9, 1], [1, 1, 0]);
  const handY = useTransform(
    scrollYProgress,
    [0, 0.85, 1],
    ["0px", "-15px", "-120px"],
  );
  const handScale = useTransform(
    scrollYProgress,
    [0, 0.85, 1],
    [0.95, 1.06, 0.88],
  );
  const handRotate = useTransform(
    scrollYProgress,
    [0, 0.85],
    ["-12deg", "3deg"],
  );
  const handFilter = useTransform(
    scrollYProgress,
    [0, 0.85, 1],
    ["blur(0px)", "blur(0px)", "blur(18px)"],
  );

  // 4. Portfolio Text Reveal (Elastic Spring Split Effect)
  const portX = useTransform(
    scrollYProgress,
    [0, 0.82, 1],
    ["-160px", "20px", "0px"],
  );
  const portXTemplate = useMotionTemplate`calc(-50% + ${portX})`; // Preserves absolute positioning translateX(-50%)
  const portRotate = useTransform(scrollYProgress, [0, 1], [-18, 0]);
  const portScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const portOpacity = useTransform(scrollYProgress, [0.35, 0.85], [0, 1]);

  const folioX = useTransform(
    scrollYProgress,
    [0, 0.82, 1],
    ["160px", "-20px", "0px"],
  );
  const folioRotate = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const folioScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const folioOpacity = useTransform(scrollYProgress, [0.35, 0.85], [0, 1]);

  // Smoothly light up folio block elements
  const folioBg = useTransform(
    scrollYProgress,
    [0.55, 1],
    ["rgba(255, 69, 0, 0.1)", "rgba(255, 69, 0, 1)"],
  );
  const folioBorderColor = useTransform(
    scrollYProgress,
    [0.65, 1],
    ["#000000", "#ffffff"],
  );

  // 5. Spotlight Hover Mouse/Touch Coordinate Motion Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spotlight circle radius (pixels)
  const spotlightRadius = useMotionValue(0);
  const spotlightRadiusSpring = useSpring(spotlightRadius, {
    stiffness: 180,
    damping: 22,
  });

  // Custom pointer light source orb opacity
  const pointerOpacity = useMotionValue(0);
  const pointerOpacitySpring = useSpring(pointerOpacity, {
    stiffness: 200,
    damping: 25,
  });

  // Coordinate tracker helper
  const updateCoordinates = (clientX, clientY) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(clientX - rect.left);
    mouseY.set(clientY - rect.top);
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
    animate(spotlightRadius, 110, { duration: 0.35, ease: "easeOut" });
    animate(pointerOpacity, 1, { duration: 0.25 });
    if (e && e.clientX) {
      updateCoordinates(e.clientX, e.clientY);
    }
  };

  const handleMouseLeave = () => {
    // Shrink spotlight back to 0px on exit
    animate(spotlightRadius, 0, { duration: 0.35, ease: "easeIn" });
    animate(pointerOpacity, 0, { duration: 0.25 });
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

  // Mask clip-path driving circle bounds dynamically
  const spotlightClipPath = useMotionTemplate`circle(${spotlightRadiusSpring}px at ${mouseX}px ${mouseY}px)`;

  return (
    <motion.section
      ref={sectionRef}
      className={styles.heroSection}
      style={{ backgroundColor: heroBg, color: textColor }}
    >
      {/* Premium Backdrop Glow Orb */}
      <motion.div
        className={styles.glow}
        style={{ opacity: glowOpacity, scale: glowScale }}
      />

      {/* Hardware-Accelerated Cinematic Hand */}
      <motion.div
        className={styles.boyHand}
        style={{
          opacity: handOpacity,
          x: "-50%", // Retain SCSS horizontal translation
          scale: handScale,
          rotate: handRotate,
          filter: handFilter,
        }}
      >
        <Image
          className={styles.boyHandImage}
          src={boyHandImage}
          alt="Boy Hand"
          priority={true}
        />
      </motion.div>

      {/* Title Separation Animation */}
      <div className={styles.portfolio}>
        <motion.p
          className={styles.portText}
          style={{
            x: portXTemplate,
            rotate: portRotate,
            scale: portScale,
            opacity: portOpacity,
          }}
        >
          Port
        </motion.p>
        <motion.p
          className={styles.folioText}
          style={{
            x: folioX,
            rotate: folioRotate,
            scale: folioScale,
            opacity: folioOpacity,
            backgroundColor: folioBg,
            borderColor: folioBorderColor,
          }}
        >
          Folio
        </motion.p>
      </div>

      {/* Interactive Flashlight Spotlight Portrait */}
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
        <motion.div
          className={styles.revealLayer}
          style={{ clipPath: spotlightClipPath }}
        >
          <Image
            className={styles.revealedImage}
            src={sudhanshuImage}
            alt="Sudhanshu Colorized"
            priority={true}
          />
        </motion.div>

        {/* Custom pointer neon source tracker */}
        <motion.div
          className={styles.pointerOrb}
          style={{
            left: mouseX,
            top: mouseY,
            opacity: pointerOpacitySpring,
          }}
        />
      </div>

      <Navbar />
    </motion.section>
  );
};

export default Hero;
