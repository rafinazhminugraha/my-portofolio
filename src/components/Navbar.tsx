import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when scrolling up or at top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } 
      // Hide navbar when scrolling down
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm"
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex items-center justify-between px-6 py-4 w-full">
        <div className="text-xl font-semibold tracking-tight">
          <Link to="/">Vladimir</Link>
        </div>
        
        <div className="flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link to="/work" className="hover:text-black transition-colors">Work</Link>
          <Link to="/about" className="hover:text-black transition-colors">About</Link>
          <Link to="/contact" className="hover:text-black transition-colors">Book a call</Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
