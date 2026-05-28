"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./SkillsEdu.module.scss";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SkillsEdu = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  // GSAP ScrollTrigger Entrance Animation for the premium lavender card
  useGSAP(
    () => {
      const card = cardRef.current;
      if (!card) return;

      gsap.fromTo(
        card,
        {
          xPercent: -30,
          opacity: 0,
          scale: 0.98,
        },
        {
          xPercent: 0,
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%", // Trigger slightly before the section scrolls into full view
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Stagger animate all headers inside the card
      gsap.fromTo(
        `.${styles.groupHeader}`,
        {
          opacity: 0,
          x: -20,
        },
        {
          opacity: 1,
          x: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className={styles.skillsEduSection} aria-label="Skills and Credentials">
      {/* Abstract neon glow shapes in background for premium 2026 aesthetics */}
      <div className={styles.ambientGlow} />

      <div ref={cardRef} className={styles.credentialsCard}>
        {/* Decorative subtle texture noise */}
        <div className={styles.noiseOverlay} />

        <div className={styles.gridContainer}>
          {/* Left Column: Education, Technical Skill, Interest */}
          <div className={styles.leftColumn}>
            {/* 1. Education Section */}
            <div className={styles.gridGroup}>
              <div className={styles.headerRow}>
                <h3 className={styles.groupHeader}>Education</h3>
                <span className={styles.dateBadge}>2022 - Now</span>
              </div>
              <div className={styles.educationContent}>
                <div className={styles.eduItem}>
                  <h4 className={styles.universityName}>Jain University</h4>
                  <p className={styles.degreeTitle}>Master of Computer Application (MCA)</p>
                  <div className={styles.metaRow}>
                    <span className={styles.location}>Bangalore, India</span>
                    <span className={styles.divider}>•</span>
                    <span className={styles.duration}>July 2025 - Now</span>
                  </div>
                </div>

                <div className={styles.eduItem}>
                  <h4 className={styles.universityName}>Chandigarh University</h4>
                  <p className={styles.degreeTitle}>Bachelor of Computer Applications (BCA)</p>
                  <div className={styles.metaRow}>
                    <span className={styles.location}>Punjab, India</span>
                    <span className={styles.divider}>•</span>
                    <span className={styles.duration}>July 2022 – Aug 2025</span>
                    <span className={styles.divider}>•</span>
                    <span className={styles.cgpa}>CGPA: 8.04</span>
                  </div>
                  <a
                    href="https://drive.google.com/file/d/14SdIzy6dwyYl6Nh_8-9Fz2aVMcqNKJpX/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.certificateLink}
                  >
                    Verify Degree ↗
                  </a>
                </div>
              </div>
            </div>

            {/* 2. Technical Skill Section */}
            <div className={styles.gridGroup}>
              <h3 className={styles.groupHeader}>Technical skill</h3>
              <div className={styles.skillsContent}>
                <div className={styles.skillCategory}>
                  <span className={styles.categoryLabel}>Languages:</span>
                  <span className={styles.categoryValue}>Python, C++, JavaScript (ES6+), Java</span>
                </div>
                <div className={styles.skillCategory}>
                  <span className={styles.categoryLabel}>Libraries &amp; Frameworks:</span>
                  <span className={styles.categoryValue}>React (Redux), Socket.io, Framer Motion, Tailwind CSS</span>
                </div>
                <div className={styles.skillCategory}>
                  <span className={styles.categoryLabel}>Web Development:</span>
                  <span className={styles.categoryValue}>CSS/SASS, MERN Stack</span>
                </div>
                <div className={styles.skillCategory}>
                  <span className={styles.categoryLabel}>Databases &amp; Analytics:</span>
                  <span className={styles.categoryValue}>SQL, Power BI, MongoDB</span>
                </div>
                <div className={styles.skillCategory}>
                  <span className={styles.categoryLabel}>Tools &amp; Platforms:</span>
                  <span className={styles.categoryValue}>Git, GitHub, VS Code, Power BI, Postman</span>
                </div>
                <div className={styles.skillCategory}>
                  <span className={styles.categoryLabel}>DSA:</span>
                  <span className={styles.categoryValue}>Proficient in core DSA concepts using JavaScript</span>
                </div>
              </div>
            </div>

            {/* 3. Interest Section */}
            <div className={styles.gridGroup}>
              <h3 className={styles.groupHeader}>Interest</h3>
              <div className={styles.interestsRow}>
                <span className={styles.interestTag}>Design Trends</span>
                <span className={styles.dividerPipe}>|</span>
                <span className={styles.interestTag}>Technology</span>
              </div>
            </div>
          </div>

          {/* Right Column: Experience, Courses, Soft Skill, Language */}
          <div className={styles.rightColumn}>
            {/* 1. Experience & Internship Section */}
            <div className={styles.gridGroup}>
              <h3 className={styles.groupHeader}>Experience</h3>
              <div className={styles.experienceContent}>
                <div className={styles.eduItem}>
                  <h4 className={styles.universityName}>Bluestock Fintech</h4>
                  <p className={styles.degreeTitle}>Web Development Intern</p>
                  <div className={styles.metaRow}>
                    <span className={styles.location}>Remote</span>
                    <span className={styles.divider}>•</span>
                    <span className={styles.duration}>Internship</span>
                  </div>
                  <a
                    href="https://drive.google.com/file/d/1uP0YBP2ImOlwHto4TMSrdhAZl_EDgjjw/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.certificateLink}
                  >
                    Verify Internship ↗
                  </a>
                </div>
              </div>
            </div>

            {/* 2. Specialized Courses Section */}
            <div className={styles.gridGroup}>
              <h3 className={styles.groupHeader}>Specialized Courses</h3>
              <div className={styles.coursesContent}>
                <div className={styles.courseItem}>
                  <h4 className={styles.courseName}>Full-Stack &amp; DevOps Engineering</h4>
                  <p className={styles.coursePlatform}>Sheryians Coding School</p>
                  <div className={styles.courseTags}>
                    <span className={styles.courseTag}>Frontend Development</span>
                    <span className={styles.courseTag}>DSA</span>
                    <span className={styles.courseTag}>Backend Development</span>
                    <span className={styles.courseTag}>DevOps CI/CD</span>
                    <span className={styles.courseTag}>Docker</span>
                    <span className={styles.courseTag}>Kubernetes</span>
                    <span className={styles.courseTag}>Aptitude &amp; Reasoning</span>
                  </div>
                  <a
                    href="https://drive.google.com/file/d/1Lhh2DbzRbQAg-bTKB1t6Ahv43yVX9DoH/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.certificateLink}
                  >
                    Verify Certificate ↗
                  </a>
                </div>
              </div>
            </div>

            {/* 3. Soft Skill Section */}
            <div className={styles.gridGroup}>
              <h3 className={styles.groupHeader}>Soft skill</h3>
              <div className={styles.softSkillsGrid}>
                <div className={styles.softSkillCol}>
                  <div className={styles.softSkillItem}>Teamwork</div>
                  <div className={styles.softSkillItem}>Communication</div>
                </div>
                <div className={styles.softSkillDivider} />
                <div className={styles.softSkillCol}>
                  <div className={styles.softSkillItem}>Critical Thinking</div>
                  <div className={styles.softSkillItem}>Time Management</div>
                </div>
              </div>
            </div>

            {/* 4. Language Section */}
            <div className={styles.gridGroup}>
              <h3 className={styles.groupHeader}>Language</h3>
              <div className={styles.languagesRow}>
                <div className={styles.langItem}>
                  <span className={styles.langName}>English</span>
                </div>
                <span className={styles.dividerPipe}>|</span>
                <div className={styles.langItem}>
                  <span className={styles.langName}>Hindi</span>
                </div>
                <span className={styles.dividerPipe}>|</span>
                <div className={styles.langItem}>
                  <span className={styles.langName}>Bangla</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsEdu;
