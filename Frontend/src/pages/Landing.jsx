import React from "react"
import Navbar from "../layout/Navbar"
import Footer from "../layout/Footer"
import Hero from "../sections/Hero"
import StatsStrip from "../sections/StatsStrip"
import FeatureGrid from "../sections/FeatureGrid"
import HowItWorks from "../sections/HowItWorks"
import CTA from "../sections/CTA"
import Testimonials from "../sections/Testimonials"
import Metrics from "../sections/Metrics"

export default function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsStrip />
      <FeatureGrid />
      <HowItWorks />
      <Metrics/>
      <Testimonials/>
      <CTA />
      <Footer />
    </>
  )
}