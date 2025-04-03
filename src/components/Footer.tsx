import React from 'react';
import {
  ExternalLink,
  ChevronRight,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Heart,
  Mail,
  MapPin,
  Phone,
  Shield,
  FileText,
  ArrowUp,
  BookOpen
} from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: 'main' | 'terms' | 'privacy') => void;
  navigateToBlog: () => void;
}

const Footer: React.FC<FooterProps> = ({ setCurrentPage, navigateToBlog }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative overflow-hidden pt-16">
      {/* Wave pattern at the top */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 text-white fill-current">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      {/* Main footer content with gradient background */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white pt-10 pb-8 relative">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-700/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-700/20 rounded-full blur-3xl transform translate-x-1/3 translate-y-1/3"></div>
        </div>

        {/* Back to top button */}
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
          <button
            onClick={scrollToTop}
            className="bg-white text-blue-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 pb-12">
            {/* Logo and description - takes 2 columns */}
            <div className="md:col-span-2 space-y-6">
              <div className="flex flex-col">
                <div className="h-12 mb-6">
                  <img
                    src="https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/wehanda//WEHANDA%20FINAL%202%20copy.png"
                    alt="Wehanda Logo"
                    className="h-full object-contain cursor-pointer transform transition-transform duration-300 hover:scale-105"
                    onClick={() => setCurrentPage('main')}
                  />
                </div>

                <p className="text-blue-100 text-lg leading-relaxed max-w-md">
                  Revolutionizing food delivery for restaurants and customers alike.
                  Zero commissions, full control, and happier customers.
                </p>
              </div>

              {/* Contact Details */}
              <div className="mt-8 space-y-4">
                <a href="mailto:info@wehanda.com" className="flex items-center text-blue-200 hover:text-white transition-colors duration-300 group">
                  <div className="p-2 bg-blue-800/50 rounded-full mr-3 group-hover:bg-blue-700 transition-colors">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span>info@wehanda.com</span>
                </a>
                <a href="tel:+19999999999" className="flex items-center text-blue-200 hover:text-white transition-colors duration-300 group">
                  <div className="p-2 bg-blue-800/50 rounded-full mr-3 group-hover:bg-blue-700 transition-colors">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span>+1 (999) 999-9999</span>
                </a>
              </div>

              {/* Social Icons */}
              <div className="flex space-x-3 mt-6">
                <a href="#twitter" className="p-2 bg-blue-700 hover:bg-blue-600 rounded-full transition-all duration-300 hover:scale-110 text-white">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#facebook" className="p-2 bg-blue-700 hover:bg-blue-600 rounded-full transition-all duration-300 hover:scale-110 text-white">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#instagram" className="p-2 bg-blue-700 hover:bg-blue-600 rounded-full transition-all duration-300 hover:scale-110 text-white">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#linkedin" className="p-2 bg-blue-700 hover:bg-blue-600 rounded-full transition-all duration-300 hover:scale-110 text-white">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div className="border-t md:border-t-0 md:border-l border-blue-700/50 pl-0 md:pl-12 pt-6 md:pt-0"></div>

            {/* Links columns */}
            <div>
              <h3 className="text-xl font-bold mb-5 text-white flex items-center after:ml-4 after:content-[''] after:h-px after:flex-1 after:bg-blue-700/50">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#about" className="text-blue-200 hover:text-white transition-colors group flex items-center">
                    <ChevronRight className="h-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-300" />
                    <span>About Us</span>
                  </a>
                </li>
                <li>
                  <a href="#careers" className="text-blue-200 hover:text-white transition-colors group flex items-center">
                    <ChevronRight className="h-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-300" />
                    <span>Careers</span>
                  </a>
                </li>
                <li>
                  <button
                    onClick={navigateToBlog}
                    className="text-blue-200 hover:text-white transition-colors group flex items-center"
                  >
                    <BookOpen className="h-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-300" />
                    <span>Blog</span>
                  </button>
                </li>
                <li>
                  <a href="#press" className="text-blue-200 hover:text-white transition-colors group flex items-center">
                    <ChevronRight className="h-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-300" />
                    <span>Press</span>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-5 text-white flex items-center after:ml-4 after:content-[''] after:h-px after:flex-1 after:bg-blue-700/50">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => setCurrentPage('privacy')}
                    className="text-blue-200 hover:text-white transition-colors group flex items-center"
                  >
                    <Shield className="h-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-300" />
                    <span>Privacy Policy</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage('terms')}
                    className="text-blue-200 hover:text-white transition-colors group flex items-center"
                  >
                    <FileText className="h-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-300" />
                    <span>Terms of Service</span>
                  </button>
                </li>
                <li>
                  <a href="#cookies" className="text-blue-200 hover:text-white transition-colors group flex items-center">
                    <ChevronRight className="h-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-300" />
                    <span>Cookie Policy</span>
                  </a>
                </li>
                <li>
                  <a href="#compliance" className="text-blue-200 hover:text-white transition-colors group flex items-center">
                    <ChevronRight className="h-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-300" />
                    <span>Compliance</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar with copyright */}
          <div className="pt-8 border-t border-blue-700/50 flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-200">
              &copy; {new Date().getFullYear()} Wehanda. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex items-center space-x-2 text-blue-200">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-400 animate-pulse" fill="#F87171" />
              <span>in US</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;