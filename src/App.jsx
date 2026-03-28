import React, { lazy, Suspense, useEffect } from 'react';
import Navbar from './Components/Navbar';
import HeroSection from './Components/HeroSection';

const ServicesSection    = lazy(() => import('./Components/ServicesSection'));
const BeforeAfterSection = lazy(() => import('./Components/BeforeafterSection'));
const AboutSection       = lazy(() => import('./Components/AboutSection'));
const TeamSection        = lazy(() => import('./Components/TeamSection'));
const ReviewsSection     = lazy(() => import('./Components/ReviewsSection'));
const GallerySection     = lazy(() => import('./Components/GallerySection'));
const FAQSection         = lazy(() => import('./Components/FAQSection'));
const ContactSection     = lazy(() => import('./Components/ContactSection'));
const Footer             = lazy(() => import('./Components/Footer'));
const TalkWithUsWidget   = lazy(() => import('./Components/TalkWithUsWidget'));

const Fallback = () => <div style={{ minHeight: '200px', background: '#F8FFFE' }} />;

// Prefetch secciones debajo del fold tras idle
const prefetchBelowFold = () => {
  const schedule = window.requestIdleCallback || ((fn) => setTimeout(fn, 300));
  schedule(() => {
    import('./Components/ServicesSection');
    import('./Components/AboutSection');
  });
  schedule(() => {
    import('./Components/ReviewsSection');
    import('./Components/ContactSection');
  });
};

function App() {
  useEffect(() => {
    prefetchBelowFold();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F8FFFE] selection:bg-[#0099CC]/30 selection:text-[#002B4E]">
      <Navbar />
      <main>
        <HeroSection />
        <Suspense fallback={<Fallback />}><ServicesSection /></Suspense>
        <Suspense fallback={<Fallback />}><BeforeAfterSection /></Suspense>
        <Suspense fallback={<Fallback />}><AboutSection /></Suspense>
        <Suspense fallback={<Fallback />}><TeamSection /></Suspense>
        <Suspense fallback={<Fallback />}><ReviewsSection /></Suspense>
        <Suspense fallback={<Fallback />}><GallerySection /></Suspense>
        <Suspense fallback={<Fallback />}><FAQSection /></Suspense>
        <Suspense fallback={<Fallback />}><ContactSection /></Suspense>
      </main>
      <Suspense fallback={null}><Footer /></Suspense>
      <Suspense fallback={null}><TalkWithUsWidget /></Suspense>
    </div>
  );
}

export default App;