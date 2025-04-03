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
import LoadingScreen from './components/LoadingScreen';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';

// Define all possible page types
type PageType = 'main' | 'terms' | 'privacy' | 'blog' | 'blogPost';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('main');
  const [currentBlogSlug, setCurrentBlogSlug] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  // Handle navigation to blog posts
  const navigateToBlogPost = (slug: string) => {
    setCurrentBlogSlug(slug);
    setCurrentPage('blogPost');
    window.scrollTo(0, 0);
  };

  // Handle navigation to blog list
  const navigateToBlog = () => {
    setCurrentPage('blog');
    setCurrentBlogSlug(null);
    window.scrollTo(0, 0);
  };

  const handleLogin = () => {
    window.location.href = 'https://admin.wehanda.com';
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'terms':
        return <TermsOfService />;
      case 'privacy':
        return <PrivacyPolicy />;
      case 'blog':
        return <BlogList navigateToBlogPost={navigateToBlogPost} />;
      case 'blogPost':
        return <BlogPost slug={currentBlogSlug} navigateToBlog={navigateToBlog} />;
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
    <>
      {isLoading ? (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      ) : (
        <>
          <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4">
            {/* Navigation */}
            <nav className={`max-w-7xl mx-auto rounded-full transition-all duration-300 ${isScrolled
              ? 'bg-white/90 backdrop-blur-md shadow-lg'
              : 'bg-white/50 backdrop-blur-sm'
              }`}>
              <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
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
                    {/* These links always show regardless of page */}
                    <a
                      href={currentPage === 'main' ? "#about" : "/"}
                      onClick={currentPage !== 'main' ? (e) => {
                        e.preventDefault();
                        setCurrentPage('main');
                        setTimeout(() => {
                          const aboutSection = document.getElementById('about');
                          if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      } : undefined}
                      className="text-gray-800 hover:text-[#037ffc] transition-colors hover-lift"
                    >
                      About
                    </a>
                    <a
                      href={currentPage === 'main' ? "#features" : "/"}
                      onClick={currentPage !== 'main' ? (e) => {
                        e.preventDefault();
                        setCurrentPage('main');
                        setTimeout(() => {
                          const featuresSection = document.getElementById('features');
                          if (featuresSection) featuresSection.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      } : undefined}
                      className="text-gray-800 hover:text-[#037ffc] transition-colors hover-lift"
                    >
                      Features
                    </a>
                    <a
                      href={currentPage === 'main' ? "#pricing" : "/"}
                      onClick={currentPage !== 'main' ? (e) => {
                        e.preventDefault();
                        setCurrentPage('main');
                        setTimeout(() => {
                          const pricingSection = document.getElementById('pricing');
                          if (pricingSection) pricingSection.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      } : undefined}
                      className="text-gray-800 hover:text-[#037ffc] transition-colors hover-lift"
                    >
                      Pricing
                    </a>
                    <a
                      href={currentPage === 'main' ? "#contact" : "/"}
                      onClick={currentPage !== 'main' ? (e) => {
                        e.preventDefault();
                        setCurrentPage('main');
                        setTimeout(() => {
                          const contactSection = document.getElementById('contact');
                          if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      } : undefined}
                      className="text-gray-800 hover:text-[#037ffc] transition-colors hover-lift"
                    >
                      Contact
                    </a>
                    <button
                      onClick={navigateToBlog}
                      className={`text-gray-800 hover:text-[#037ffc] transition-colors hover-lift ${currentPage === 'blog' || currentPage === 'blogPost' ? 'text-[#037ffc] font-medium' : ''
                        }`}
                    >
                      News
                    </button>
                    <button
                      onClick={handleLogin}
                      className="bg-[#037ffc] text-white px-6 py-2 rounded-full hover:bg-[#0265ca] transition-all hover-lift"
                    >
                      Login
                    </button>
                  </div>

                  {/* Mobile menu button - ONLY ONE INSTANCE */}
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
                <div className="md:hidden bg-white/90 backdrop-blur-md rounded-b-3xl mt-1 border-t border-gray-100 animate-fade-in">
                  <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <a
                      href={currentPage === 'main' ? "#about" : "/"}
                      onClick={currentPage !== 'main' ? (e) => {
                        e.preventDefault();
                        setIsMenuOpen(false);
                        setCurrentPage('main');
                        setTimeout(() => {
                          const section = document.getElementById('about');
                          if (section) section.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      } : () => setIsMenuOpen(false)}
                      className="block px-3 py-2 text-gray-600 hover:text-[#037ffc] hover-lift"
                    >
                      About
                    </a>
                    <a
                      href={currentPage === 'main' ? "#features" : "/"}
                      onClick={currentPage !== 'main' ? (e) => {
                        e.preventDefault();
                        setIsMenuOpen(false);
                        setCurrentPage('main');
                        setTimeout(() => {
                          const section = document.getElementById('features');
                          if (section) section.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      } : () => setIsMenuOpen(false)}
                      className="block px-3 py-2 text-gray-600 hover:text-[#037ffc] hover-lift"
                    >
                      Features
                    </a>
                    <a
                      href={currentPage === 'main' ? "#pricing" : "/"}
                      onClick={currentPage !== 'main' ? (e) => {
                        e.preventDefault();
                        setIsMenuOpen(false);
                        setCurrentPage('main');
                        setTimeout(() => {
                          const section = document.getElementById('pricing');
                          if (section) section.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      } : () => setIsMenuOpen(false)}
                      className="block px-3 py-2 text-gray-600 hover:text-[#037ffc] hover-lift"
                    >
                      Pricing
                    </a>
                    <a
                      href={currentPage === 'main' ? "#contact" : "/"}
                      onClick={currentPage !== 'main' ? (e) => {
                        e.preventDefault();
                        setIsMenuOpen(false);
                        setCurrentPage('main');
                        setTimeout(() => {
                          const section = document.getElementById('contact');
                          if (section) section.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      } : () => setIsMenuOpen(false)}
                      className="block px-3 py-2 text-gray-600 hover:text-[#037ffc] hover-lift"
                    >
                      Contact
                    </a>
                    <button
                      onClick={() => {
                        navigateToBlog();
                        setIsMenuOpen(false);
                      }}
                      className={`block w-full text-left px-3 py-2 text-gray-600 hover:text-[#037ffc] hover-lift ${currentPage === 'blog' || currentPage === 'blogPost' ? 'text-[#037ffc] font-medium' : ''
                        }`}
                    >
                      News
                    </button>
                    <button
                      onClick={handleLogin}
                      className="w-full mt-4 mb-2 bg-[#037ffc] text-white px-6 py-2 rounded-full hover:bg-[#0265ca] transition-all hover-lift"
                    >
                      Login
                    </button>
                  </div>
                </div>
              )}
            </nav>
          </header>
          <div>
            <main>
              {renderContent()}
              <Footer
                setCurrentPage={setCurrentPage}
                navigateToBlog={navigateToBlog}
              />
            </main>
          </div>
        </>
      )}
    </>
  );
}

export default App;