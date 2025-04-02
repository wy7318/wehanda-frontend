import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'main' | 'terms' | 'privacy'>('main');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Reveal animations on scroll
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = () => {
    window.location.href = 'https://admin.wehanda.com';
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'terms':
        return <TermsOfService />;
      case 'privacy':
        return <PrivacyPolicy />;
      default:
        return (
          <>
            <Hero />
            <About />
            <Features />
            <Pricing />
            <FAQ />
            <Contact />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <img 
                src="https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/wehanda//WEHANDA%20FINAL%202%20copy.png" 
                alt="Wehanda Logo" 
                className="h-8 w-auto cursor-pointer hover-scale"
                onClick={() => setCurrentPage('main')}
              />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-800 hover:text-[#037ffc] transition-colors hover-lift">About</a>
              <a href="#features" className="text-gray-800 hover:text-[#037ffc] transition-colors hover-lift">Features</a>
              <a href="#pricing" className="text-gray-800 hover:text-[#037ffc] transition-colors hover-lift">Pricing</a>
              <a href="#contact" className="text-gray-800 hover:text-[#037ffc] transition-colors hover-lift">Contact</a>
              <button 
                onClick={handleLogin}
                className="bg-[#037ffc] text-white px-6 py-2 rounded-full hover:bg-[#0265ca] transition-all hover-lift"
              >
                Login
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#about" className="block px-3 py-2 text-gray-600 hover:text-[#037ffc] hover-lift">About</a>
              <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-[#037ffc] hover-lift">Features</a>
              <a href="#pricing" className="block px-3 py-2 text-gray-600 hover:text-[#037ffc] hover-lift">Pricing</a>
              <a href="#contact" className="block px-3 py-2 text-gray-600 hover:text-[#037ffc] hover-lift">Contact</a>
              <button 
                onClick={handleLogin}
                className="w-full mt-4 bg-[#037ffc] text-white px-6 py-2 rounded-full hover:bg-[#0265ca] transition-all hover-lift"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </nav>

      <main>
        {renderContent()}
        <Footer setCurrentPage={setCurrentPage} />
      </main>
    </div>
  );
}

export default App;