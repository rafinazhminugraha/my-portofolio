import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavbar } from '../contexts/NavbarContext';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: '#work', label: 'Work' },
    { href: '#what-i-do', label: 'Expertise' },
    { href: '#services', label: 'Services' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
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
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 w-full">
          <div className="text-lg sm:text-xl font-semibold tracking-tight">
            <Link to="/">RNazhmi</Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12 text-base font-medium text-gray-600">
            {navLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href} 
                className="hover:text-black transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <motion.button
            className="lg:hidden p-2 hover:bg-black/5 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-white shadow-2xl z-50 lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                  <span className="text-lg font-semibold">Menu</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5 text-gray-700" />
                  </button>
                </div>

                {/* Mobile Menu Links */}
                <nav className="flex-1 px-6 py-8">
                  <div className="flex flex-col gap-2">
                    {navLinks.map((link, index) => (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        className="text-lg font-medium text-gray-700 hover:text-black hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors"
                        onClick={handleLinkClick}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {link.label}
                      </motion.a>
                    ))}
                  </div>
                </nav>

                {/* Mobile Menu Footer */}
                <div className="px-6 py-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">
                    © 2025 Rafi Nazhmi Nugraha
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
