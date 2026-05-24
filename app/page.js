"use client";
import React from "react";
import Welcome from "@/components/sections/Welcome/Welcome";
import HeroSection from "@/components/sections/Hero/Hero";

export default function Home() {
  return (
    <main >
      <Welcome />

      {/* This is the bottom section that scrolls up and covers the Hero */}
      <HeroSection />
    </main>
  );
}
