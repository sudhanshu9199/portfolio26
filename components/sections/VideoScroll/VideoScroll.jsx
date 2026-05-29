"use client";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./VideoScroll.module.scss";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const VideoScroll = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const caption1Ref = useRef(null);
  const caption2Ref = useRef(null);
  const caption3Ref = useRef(null);

  const [preloaded, setPreloaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const frameCount = 50;
  const imagesRef = useRef([]);
  const activeFrameRef = useRef(0);

  // Pad the index to match ezgif-frame-001.png format
  const getFramePath = (index) => {
    const padded = index.toString().padStart(3, "0");
    return `/frames/ezgif-frame-${padded}.png`;
  };

  // 1. Preload all 50 frames into memory for completely seamless, lag-free scrubbing
  useEffect(() => {
    let loadedCount = 0;
    const imagesArray = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / frameCount) * 100));
        if (loadedCount === frameCount) {
          setPreloaded(true);
        }
      };
      imagesArray.push(img);
    }
    imagesRef.current = imagesArray;
  }, []);

  // Canvas drawing function that centers and covers the canvas viewport (object-fit: cover)
  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas || !imagesRef.current[index]) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth || img.width;
    const imgHeight = img.naturalHeight || img.height;

    // Cover scale calculation
    const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const x = (canvasWidth - imgWidth * scale) / 2;
    const y = (canvasHeight - imgHeight * scale) / 2;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, x, y, imgWidth * scale, imgHeight * scale);
  };

  // Handle canvas scaling for high-resolution displays
  useEffect(() => {
    if (!preloaded) return;

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(activeFrameRef.current);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial resize and draw first frame

    return () => window.removeEventListener("resize", handleResize);
  }, [preloaded]);

  // 2. GSAP ScrollTrigger scrubbing timeline
  useGSAP(
    () => {
      if (!preloaded) return;

      const canvas = canvasRef.current;
      const section = sectionRef.current;
      if (!canvas || !section) return;

      // Dummy object to tween the frame index property
      const frameObj = { val: 0 };

      // Pin the section and scrub the frame index
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=220%", // Breathe-in scroll height for smooth frames playing
          scrub: 0.6, // Cushioned scroll scrubbing
          pin: true,
          anticipatePin: 1,
        },
      });

      // Frame scrubbing tween
      tl.to(
        frameObj,
        {
          val: frameCount - 1,
          ease: "none",
          duration: 3,
          onUpdate: () => {
            const index = Math.round(frameObj.val);
            activeFrameRef.current = index;
            drawFrame(index);
          },
        },
        0,
      );

      // Creative Typography Overlays synced with video progress (Awwwards apple-like layout style)
      // Caption 1: Appears at start, fades out at 30% progress
      tl.fromTo(
        caption1Ref.current,
        { opacity: 0, y: 30, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
        0.1,
      ).to(
        caption1Ref.current,
        { opacity: 0, y: -30, filter: "blur(6px)", duration: 0.6, ease: "power2.in" },
        0.9,
      );

      // Caption 2: Fades in at 35% progress, fades out at 65% progress
      tl.fromTo(
        caption2Ref.current,
        { opacity: 0, y: 30, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
        1.1,
      ).to(
        caption2Ref.current,
        { opacity: 0, y: -30, filter: "blur(6px)", duration: 0.6, ease: "power2.in" },
        1.9,
      );

      // Caption 3: Fades in at 70% progress and stays till end
      tl.fromTo(
        caption3Ref.current,
        { opacity: 0, y: 30, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
        2.1,
      );

      // Force a Refresh to recalibrate downstream triggers because the pinning adds +=220% height
      ScrollTrigger.refresh();
    },
    { dependencies: [preloaded], scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className={styles.videoSection}>
      {/* Dynamic Loader Backdrop for high-fidelity asset transitions */}
      {!preloaded && (
        <div className={styles.loaderBackdrop}>
          <div className={styles.loaderSpinner}>
            <div className={styles.doubleBounce1} />
            <div className={styles.doubleBounce2} />
          </div>
          <span className={styles.loaderProgress}>{loadProgress}% Loading Frames</span>
        </div>
      )}

      {/* Scrub Canvas */}
      <canvas ref={canvasRef} className={styles.videoCanvas} />

      {/* Visual Overlay Graphic Elements */}
      <div className={styles.overlayContainer}>
        {/* Caption Layer 1 */}
        <div ref={caption1Ref} className={`${styles.captionWrapper} ${styles.leftCap}`}>
          <span className={styles.taglineBadge}>ENGAGING EXPERIENCE</span>
          <h2 className={styles.mainCaption}>
            INTERACTIVE <br />
            <span className={styles.orangeGradient}>TECHNOLOGY</span>
          </h2>
        </div>

        {/* Caption Layer 2 */}
        <div ref={caption2Ref} className={`${styles.captionWrapper} ${styles.centerCap}`}>
          <span className={styles.taglineBadge}>PERFECT CRAFTSMANSHIP</span>
          <h2 className={styles.mainCaption}>
            FLUID MOTION <br />
            <span className={styles.yellowGradient}>&amp; GRAPHICS</span>
          </h2>
        </div>

        {/* Caption Layer 3 */}
        <div ref={caption3Ref} className={`${styles.captionWrapper} ${styles.rightCap}`}>
          <span className={styles.taglineBadge}>INNOVATION MEETS CREATION</span>
          <h2 className={styles.mainCaption}>
            BEYOND THE <br />
            <span className={styles.indigoGradient}>EXPECTED.</span>
          </h2>
        </div>
      </div>

      {/* Smooth blurry transition overlay blending into SkillsEdu navy blue */}
      <div className={styles.bottomBlurTransition} />
    </section>
  );
};

export default VideoScroll;
