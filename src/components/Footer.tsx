import React from 'react';

interface FooterProps {
  setCurrentPage: (page: 'main' | 'terms' | 'privacy') => void;
}

const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center">
              <img 
                src="https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/wehanda//WEHANDA%20FINAL%202%20copy.png" 
                alt="Wehanda Logo" 
                className="h-8 w-auto cursor-pointer"
                onClick={() => setCurrentPage('main')}
              />
            </div>
            <p className="mt-4 text-gray-400">
              Revolutionizing food delivery for restaurants and customers alike.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="#careers" className="text-gray-400 hover:text-white">Careers</a></li>
              <li><a href="#blog" className="text-gray-400 hover:text-white">Blog</a></li>
              <li><a href="#press" className="text-gray-400 hover:text-white">Press</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setCurrentPage('privacy')} 
                  className="text-gray-400 hover:text-white"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('terms')} 
                  className="text-gray-400 hover:text-white"
                >
                  Terms of Service
                </button>
              </li>
              <li><a href="#cookies" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
              <li><a href="#compliance" className="text-gray-400 hover:text-white">Compliance</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="#twitter" className="text-gray-400 hover:text-white">Twitter</a></li>
              <li><a href="#facebook" className="text-gray-400 hover:text-white">Facebook</a></li>
              <li><a href="#instagram" className="text-gray-400 hover:text-white">Instagram</a></li>
              <li><a href="#linkedin" className="text-gray-400 hover:text-white">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Wehanda. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;