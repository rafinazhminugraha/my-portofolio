import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavbar } from '../contexts/NavbarContext';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { forceHidden } = useNavbar();

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
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.02)',
      }}
      initial={{ y: 0 }}
      animate={{ y: (isVisible && !forceHidden) ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex items-center justify-between px-6 py-4 w-full">
        <div className="text-xl font-semibold tracking-tight">
          <Link to="/">Vladimir</Link>
        </div>
        
        <div className="flex items-center gap-12 text-base font-medium text-gray-600">
          <a href="#work" className="hover:text-black transition-colors">Work</a>
          <a href="#what-i-do" className="hover:text-black transition-colors">Expertise</a>
          <a href="#services" className="hover:text-black transition-colors">Services</a>
          <a href="#about" className="hover:text-black transition-colors">About</a>
          <a href="#contact" className="hover:text-black transition-colors">Contact</a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
