import React, { useState, useEffect } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Products from './components/Products'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Privacy from './components/Privacy'
import Terms from './components/Terms'
import Footer from './components/Footer'

function AppContent() {
  const [activePage, setActivePage] = useState('home')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activePage])

  const renderPage = () => {
    switch (activePage) {
      case 'privacy': return <Privacy />
      case 'terms':   return <Terms />
      default:
        return (
          <>
            <Hero     onCta={() => setActivePage('products')} />
            <About    />
            <Products />
            <FAQ      />
            <Contact  />
          </>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-animated text-zinc-100">
      <Navbar setActivePage={setActivePage} activePage={activePage} />
      <main>{renderPage()}</main>
      <Footer setActivePage={setActivePage} />
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}
