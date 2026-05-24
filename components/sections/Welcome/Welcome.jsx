"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import bulbIcon from "../../../public/images/welcAsset/icons/bulb.png";
import jsIcon from "../../../public/images/welcAsset/icons/js.png";
import mongodbIcon from "../../../public/images/welcAsset/icons/mongodb.png";
import nodejsIcon from "../../../public/images/welcAsset/icons/nodejs.png";
import pencilIcon from "../../../public/images/welcAsset/icons/pencil.png";
import reactIcon from "../../../public/images/welcAsset/icons/react.png";
import gridIcon from "../../../public/images/welcAsset/icons/grid.png";

import styles from "./Welcome.module.scss";
import theBoyImage from "../../../public/images/welcAsset/theBoy.png";

const Welcome = () => {
  const containerRef = useRef(null);

  // Track the scroll progress specifically for this section container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // 2026 Trend: Subtle, elegant parallax (0px to 150px) instead of extreme jumps
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0px", "150px"]);
  // Subtle fading out as you scroll down into the next section
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  return (
    <section ref={containerRef} className={styles.welSection}>
      <div className={styles.welcome}>
        <p>Welcome to my</p>
      </div>
      <div className={styles.contentWrapper}>
        <motion.div
          className={styles.topImageElem}
          style={{ y: yParallax, opacity: opacityFade }}
        >
          <Image
            className={styles.theBoyImage}
            src={theBoyImage}
            alt="The Boy"
            priority={true}
          />
        </motion.div>
        <Image src={bulbIcon} className={`${styles.bulbIcon} ${styles.icon}`} />
        <Image
          src={pencilIcon}
          className={`${styles.pencilIcon} ${styles.icon}`}
        />
        <Image src={jsIcon} className={`${styles.jsIcon} ${styles.icon}`} />
        <Image
          src={mongodbIcon}
          className={`${styles.mongodbIcon} ${styles.icon}`}
        />
        <Image
          src={nodejsIcon}
          className={`${styles.nodejsIcon} ${styles.icon}`}
        />
        <Image src={reactIcon} className={`${styles.reactIcon} ${styles.icon}`} />
        <Image src={gridIcon} className={`${styles.gridIcon} ${styles.icon}`} />
      </div>
    </section>
  );
};

export default Welcome;
