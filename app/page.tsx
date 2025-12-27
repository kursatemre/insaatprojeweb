'use client';

import dynamic from 'next/dynamic';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';

// Lazy load components below the fold
const ServicesOverview = dynamic(() => import('@/components/home/ServicesOverview'), {
  loading: () => <div className="h-96 bg-warm-concrete animate-pulse" />,
});

const FeaturedProjects = dynamic(() => import('@/components/home/FeaturedProjects'), {
  loading: () => <div className="h-96 bg-gradient-to-br from-night-blue to-dark-carbon animate-pulse" />,
});

const TurkeyMap = dynamic(() => import('@/components/home/TurkeyMap'), {
  loading: () => <div className="h-96 bg-warm-concrete animate-pulse" />,
});

const CTASection = dynamic(() => import('@/components/home/CTASection'), {
  loading: () => <div className="h-64 bg-night-blue animate-pulse" />,
});

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section - Critical, load immediately */}
      <HeroSection />

      {/* Stats Section - Critical, load immediately */}
      <StatsSection />

      {/* Services Overview - Lazy loaded */}
      <ServicesOverview />

      {/* Featured Projects - Lazy loaded */}
      <FeaturedProjects />

      {/* Turkey Map Section - Lazy loaded */}
      <TurkeyMap />

      {/* CTA Section - Lazy loaded */}
      <CTASection />
    </div>
  );
}
