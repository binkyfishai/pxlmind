import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import './pages.css';

// Import pages
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import ShowcasesPage from './pages/ShowcasesPage';
import TechnologyPage from './pages/TechnologyPage';
import RoadmapPage from './pages/RoadmapPage';
import InsightsPage from './pages/InsightsPage';
import AboutPage from './pages/AboutPage';
import DocumentationPage from './pages/DocumentationPage';
import Footer from './components/Footer';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Exact navigation items from design spec
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/features', label: 'Core Features' },
    { path: '/showcases', label: 'Showcases / Demos' },
    { path: '/technology', label: 'Technology Insight' },
    { path: '/documentation', label: 'Documentation' },
    { path: '/roadmap', label: 'Roadmap' },
    { path: '/insights', label: 'Insights' },
    { path: '/about', label: 'About Us' }
  ];

  // Pixel colors from design specification
  const pixelColors = [
    '#165DFF', '#36D399', '#FF6B9B',  // Primary and secondary colors
    '#FFD700', '#FF4500', '#165DFF',  // Pixel accents
    '#36D399', '#FF6B9B', '#FFD700'   // Pattern completion
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleTryExplainer = () => {
    window.open('https://pixelmindpro.com/embed.html', '_blank');
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-content">
          <Link to="/" className="logo">
            <div className="pixel-logo">
              {pixelColors.map((color, index) => (
                <div
                  key={index}
                  className="pixel"
                  style={{backgroundColor: color}}
                ></div>
              ))}
            </div>
            <span>PixelMind Explainer</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="nav-links">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={location.pathname === item.path ? 'active' : ''}
              >
                {item.label}
              </Link>
            ))}
            <button className="cta-button" onClick={handleTryExplainer}>Try the Explainer</button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'active' : ''}`}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={location.pathname === item.path ? 'active' : ''}
          >
            {item.label}
          </Link>
        ))}
        <button className="cta-button" onClick={handleTryExplainer}>Try the Explainer</button>
      </div>
    </>
  );
}

function LoadingProgress() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="loading-progress">
      <div className="loading-bar"></div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <LoadingProgress />
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/showcases" element={<ShowcasesPage />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/documentation" element={<DocumentationPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App; 