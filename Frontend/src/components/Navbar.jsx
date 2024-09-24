import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-gray-800/70 backdrop-blur-md shadow-lg'
        : 'bg-gray-800'
    }`}>
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-white font-bold text-xl px-4 sm:px-6 md:px-8 lg:px-12">
          <a href="/">Logo</a>
        </div>
        <div className="hidden md:flex space-x-2 lg:space-x-4 px-4 sm:px-6 md:px-8 lg:px-12 gap-4">
          <a href="/" className="text-white font-bold hover:text-gray-300">Home</a>
          <a href="/about" className="text-white font-bold hover:text-gray-300">About</a>
          <a href="/contact" className="text-white font-bold hover:text-gray-300">Contact</a>
          <a href="/signup" className="text-white font-bold hover:text-gray-300">Signup</a>
          <a href="/login" className="text-white font-bold hover:text-gray-300">Login</a>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isOpen ? (
                <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
              ) : (
                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/" className="text-white block hover:bg-gray-700 px-3 py-2 rounded-md">Home</a>
            <a href="/about" className="text-white block hover:bg-gray-700 px-3 py-2 rounded-md">About</a>
            <a href="/contact" className="text-white block hover:bg-gray-700 px-3 py-2 rounded-md">Contact</a>
            <a href="/signup" className="text-white block hover:bg-gray-700 px-3 py-2 rounded-md">Signup</a>
            <a href="/login" className="text-white block hover:bg-gray-700 px-3 py-2 rounded-md">Login</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;