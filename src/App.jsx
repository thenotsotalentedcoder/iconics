import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/animations/ScrollProgress';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Speakers from './pages/Speakers';
import CallForPapers from './pages/CallForPapers';
import Schedule from './pages/Schedule';
import Registration from './pages/Registration';
import Committee from './pages/Committee';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Try to use Lenis if available, otherwise fallback to native scroll
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname]);

  return null;
}

function App() {
  useSmoothScroll();

  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <ScrollProgress />
        <Navbar />

        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/speakers" element={<Speakers />} />
            <Route path="/callforpapers" element={<CallForPapers />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/committee" element={<Committee />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>

        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
