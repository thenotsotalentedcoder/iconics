import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger);

// Configure ScrollTrigger defaults
export const initScrollTrigger = () => {
  ScrollTrigger.config({
    // Sync ScrollTrigger with Lenis
    syncInterval: 0,
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load'
  });

  ScrollTrigger.defaults({
    markers: false, // Set to true for debugging
    toggleActions: 'play none none reverse'
  });

  // Refresh ScrollTrigger on resize
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
};

// Cleanup function
export const cleanupScrollTrigger = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};

export default { initScrollTrigger, cleanupScrollTrigger };
