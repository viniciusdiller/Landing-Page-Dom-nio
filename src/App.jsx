import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import Footer from './components/Footer';

export default function App() {
  const [darkMode, setDarkMode] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [section, setSection] = useState('home');

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', darkMode);
    const fav = document.getElementById('favicon');
    if (fav) fav.href = darkMode ? '/images/icon-dark-32x32.png' : '/images/icon-light-32x32.png';
    const tc = document.getElementById('theme-color');
    if (tc) tc.content = darkMode ? '#09090b' : '#fafaf9';
  }, [darkMode]);

  const renderSection = () => {
    switch (section) {
      case 'privacy': return <Privacy />;
      case 'terms':   return <Terms />;
      default:
        return (
          <>
            <Hero />
            <About />
            <Products />
            <FAQ />
            <Contact />
          </>
        );
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen transition-colors duration-300">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} setSection={setSection} />
        <main>{renderSection()}</main>
        <Footer setSection={setSection} />
      </div>
    </LanguageProvider>
  );
}
