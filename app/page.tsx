'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import ServicesOverview from '@/components/home/ServicesOverview';
import TurkeyMap from '@/components/home/TurkeyMap';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Services Overview */}
      <ServicesOverview />

      {/* Turkey Map Section */}
      <TurkeyMap />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
