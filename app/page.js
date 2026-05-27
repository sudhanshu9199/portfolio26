"use client";
import React from "react";
import Welcome from "@/components/sections/Welcome/Welcome";
import HeroSection from "@/components/sections/Hero/Hero";
import SkillMarquee from "@/components/ui/skillMarquee/SkillMarquee";
import VideoScroll from "@/components/sections/VideoScroll/VideoScroll";

export default function Home() {
  return (
    <main>
      <Welcome />

      {/* This is the bottom section that scrolls up and covers the Hero */}
      <HeroSection />

      {/* Infinite Scrolling Ticker */}
      <SkillMarquee />

      {/* Interactive Video Scroll Scrub Section */}
      <VideoScroll />
    </main>
  );
}
