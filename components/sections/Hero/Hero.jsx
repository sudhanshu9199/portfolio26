"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./Hero.module.scss";
import boyHandImage from "../../../public/boyHand.png";
import Navbar from "@/components/layout/Navbar/Navbar";

const Hero = () => {
  const sectionRef = useRef(null);

  // Track the scroll progress of the Hero section as it enters the viewport and reaches the top
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  // Fade out the hand when the Hero section is close to touching the top (starts fading at 80% scroll progress)
  const handOpacity = useTransform(scrollYProgress, [0, 0.9, 1], [1, 1, 0]);

  // Subtle upward translate as it fades out to make the disappearance feel dynamic
  const handY = useTransform(scrollYProgress, [0, 1, 1], ["0px", "0px", "0px"]);

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  return (
    <section ref={sectionRef} className={styles.heroSection}>
      <motion.div
        className={styles.boyHand}
        style={{ opacity: handOpacity, y: handY }}
      >
        <Image
          className={styles.boyHandImage}
          src={boyHandImage}
          alt="Boy Hand"
          priority={true}
        />
      </motion.div>
      <div className={styles.portfolio}>
        <p className={styles.portText}>Port</p>
        <p className={styles.folioText}>Folio</p>
      </div>
      <Navbar />
    </section>
  );
};

export default Hero;
